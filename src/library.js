/**
    app name pd-apputil
 */
var $ = require('jquery');
import {URLparameters,waitForScriptsReady} from 'pd-sputil';

export function setFormSource(url) {
	var here = location,
		formattedUrl = encodeURIComponent(url),
		urlProps = URLparameters(here.search),
		newFormSource;

	newFormSource = `${here.pathname}?ID=${urlProps.ID}&Source=${formattedUrl}`;

	$('#aspnetForm').attr('action',newFormSource);
}
export class errorHandler {

    constructor() {
        this.errorContainer = [];
    }

    getErrors() {
        return this.errorContainer.slice(0);
    }
    addErrors(message) {
        this.errorContainer.push(message);
    }
    getCount() {
        return this.errorContainer.length;
    }
    clearErrors() {
        this.errorContainer = [];
    }
    throwErrorDialog(title, text, cb) {
        var allErrors = text || this.getErrors().join('<br/>');

        if (allErrors === '') {
            allErrors = 'noErrors';
        }
        if (allErrors !== 'noErrors') {
            SP.UI.ModalDialog.showErrorDialog(title,allErrors,cb);
        } 
        return allErrors;
    }
}
export function correctAttachmentTableNames(attachTable) {

	attachTable.children('tbody').find('tr')
	.each(function() {
		var fileLink = $(this).find('td.ms-vb').find('span'),
			domText,
			textSplit;
			
		domText = fileLink.text();
		textSplit = domText.split('\\');

		if (textSplit.length > 1) {
			fileLink.text(textSplit[ textSplit.length -1 ]);
		}
		
	});
}
export function prepBatchInfo(priObj, ary, cb) {

	/*
		priObj keeps track of the state
		ary is the array of items to iterate over
		cb must returns items for server or next function
		
		example of a function that uses this
		
		getBatchListData: function(prevState) {
			//retrieves from this.batchUrls,
			//gets context and queries to this.batchFetchUrl
			
			var self = this,
				totalToGet = this.batchUrls.length,
				batchTracker = prevState || {};


			api.prepBatchInfo(batchTracker, self.batchUrls, function(url) {
				return url;
			});

			return api.server.ajaxGetContext(self.batchFetchUrl)
			.then(function(response) {

				return api.server.ajaxGetBatch(batchTracker.batchItems, {
					context: response.FormDigestValue,
					url: self.batchFetchUrl
				});
			}).then(function(response) {
				self.serverData = self.serverData.concat(response);
				if (batchTracker.startIndex === totalToGet) {
					self.batchUrls = null;
					self.batchFetchUrl = null;
					return self;
				}
				return self.getBatchListData(batchTracker);
			});
		}
		---or----
		getActiveRecords: function(prevState) {

			//retrieves from this.batchUrls,
			//gets context and queries to this.batchFetchUrl
			
			var self = this,
				guids = api.property.listGuid,
				totalToGet = this.selectedProperty.length,
				batchTracker = prevState || {};

			this.batchFetchUrl = this.sysUrls.propertySite;

			api.prepBatchInfo(batchTracker, this.selectedProperty, function(item) {
				return self.string.format(self.sysUrls.activeRecords, guids.transferList, item.Id);
			});

			return api.server.ajaxGetContext(self.batchFetchUrl)
			.then(function(response) {

				return api.server.ajaxGetBatch(batchTracker.batchItems, {
					context: response.FormDigestValue,
					url: self.batchFetchUrl
				});
			}).then(function(response) {
				self.serverData = self.serverData.concat(response);
				if (batchTracker.startIndex === totalToGet) {
					return self;
				}
				return self.getActiveRecords(batchTracker);
			});
		},
		----or-----
		updateMasterRecords: function(prevState) {
			
			var self = this,
				totalToGet = this.getSelectedProperty.length,
				batchTracker = prevState || {},
				toServerData,
				sc = api.jsomCUD;


			api.prepBatchInfo(batchTracker, self.getSelectedProperty, function(dataItem) {
				var prepData = {
					property_status: new sc.ValuePrep(sc.columnType.choice, self.status),
					dispositionDate: new sc.ValuePrep(sc.columnType.date, self.date.toISOString())
				};
				if(self.folderId) {
					prepData.eolFolderId = new sc.ValuePrep(sc.columnType.num, self.folderId);
				}

				return new sc.PrepClientData ("update", prepData, dataItem.Id);
			});

			toServerData = sc.prepServerData(
				api.property.listGuid.masterInventory,
				appObj.urls.propertySite,
				batchTracker.batchItems
			);

			return api.server.jsomSendDataToServer(toServerData)
			.then(function() {
				if (batchTracker.startIndex === totalToGet) {
					return self;
				}
				return self.updateMasterRecords(batchTracker);
			});
		},
	*/

	var self = priObj || {},
		index = self.startIndex || 0,
		totalPerTrip = self.totalPerTrip || 100,
		totalToGet = ary.length,
		returnFromcb;

	self.batchItems = [];

	for (index; index < totalToGet; index++) {

		returnFromcb = cb.call(self, ary[index]);

		if (returnFromcb) {
			self.batchItems.push(returnFromcb);
		}

		if (self.batchItems.length === totalPerTrip) {
			//tick counter and get out
			index++;
			break;
		}
	}
	self.startIndex = index;

	return self;
}
export const peoplePicker = {
    getPickerField: function(container, parentAttr, returnId) {
        //return id is a boolean for field id or just field
        //put class on the container div and pass that in
        var personField = container
            .find(parentAttr)
            .children('div')
            .children('div');

        if (returnId) {
            var fieldId = personField.length > 0 ? 
                personField.attr('id') :
                null;
            return fieldId;
        }

        return personField;		
    },
    removeObjRef: function(personFieldId) {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict[personFieldId]) {
            delete SPClientPeoplePicker.SPClientPeoplePickerDict[personFieldId];
        }
        return SPClientPeoplePicker.SPClientPeoplePickerDict;
    },
    removeUsers: function(personFieldId, allUsers) {
        //personFieldId is the id of the person div (formPersonPicker1_TopSpan)
        //allUsers is a boolean if true all users all deleted, else just one on far right
        var currentPickerField = SPClientPeoplePicker.SPClientPeoplePickerDict[ personFieldId ],
            totalUsers = this.getUsersInfo(personFieldId).length;
        if (allUsers && totalUsers > 0) {
            $('#'+ personFieldId.replace('$', '\\$'))
            .find('span.sp-peoplepicker-userSpan')
            .each(function() {
                currentPickerField.DeleteProcessedUser(this);
            });
            return currentPickerField;
        } 
        if (totalUsers > 0) {
            currentPickerField.DeleteProcessedUser();
            return currentPickerField;
        }		
    },
    addUser: function(personFieldId, userProp1, userProp2, resolveUser) {
        //userProp1 should be AccountName, userProps2 PreferredName
        //or they can both be email
        var personObj = SPClientPeoplePicker.BuildUnresolvedEntity(userProp1, userProp2),
            pickerField = SPClientPeoplePicker.SPClientPeoplePickerDict[ personFieldId ],
            shouldUserBeResolved = resolveUser || true;	

        pickerField.AddUnresolvedUser(personObj, shouldUserBeResolved);
        return pickerField;
    },
    getUsersInfo: function(personFieldId) {
        //personFieldId is the id of the person div (formPersonPicker1_TopSpan)
        return SPClientPeoplePicker.SPClientPeoplePickerDict[ personFieldId ].GetAllUserInfo();
    },
    notifiyPeoplePickersReady: function() {
        function test() {
            if ($.isEmptyObject(peoplePickers)) {
                setTimeout(test, 300);
            } 
            else {
                def.resolve(peoplePickers);
            }
        }
        var def = $.Deferred(),
            peoplePickers;

        return waitForScriptsReady('clientpeoplepicker.js')
        .then(function() {
            peoplePickers = SPClientPeoplePicker.SPClientPeoplePickerDict;
            test();
            return def.promise();
        });
    },
    initializePeoplePicker: function(options) {
        /*need 
            <SharePoint:ScriptLink name="" runat="server" LoadAfterUI="true" Localizable="false" />
            clienttemplates.js
            clientforms.js
            clientpeoplepicker.js
            autofill.js
            sp.js
            sp.runtime.js
            sp.core.js
        */
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema.PrincipalAccountType = options.type || 'User,DL,SecGroup,SPGroup';
        schema.SearchPrincipalSource = options.Search || 15;
        schema.ResolvePrincipalSource = options.Resolve || 15;
        schema.AllowMultipleValues = options.MultipleValues || false;
        schema.MaximumEntitySuggestions = options.EntitySuggestions || 50;
        schema.Width = options.width || '250px';

        // Render and initialize the picker. 
        // Pass the ID of the DOM element that contains the picker, an array of initial
        // PickerEntity objects to set the picker value, and a schema that defines
        // picker properties.
        SPClientPeoplePicker_InitStandaloneControlWrapper(options.elementId, null, schema);
    }
};
const taxFields = {};
export const termPicker = {
	addTerm: function(fieldId, termLabel, termId) {
		var field = this.getField(fieldId);
		field.setRawText(termLabel +'|'+ termId);
		field.retrieveTerms();
		return true;
	},
	removeTerm: function(fieldId, allTerms, termLabel, termId) {
		//all terms is a bool 
		var field = this.getField(fieldId),
			termCorrected,
			termsInField,
			termsForField;

		if (allTerms) {
			field.setRawText('');
		} else {
			termCorrected = termLabel +'|'+ termId;
			termsInField = field.getRawText().split(';');
			termsForField = termsInField.filter(function(item) {
				return item !== termCorrected;
			});
			field.setRawText(
				termsForField.join(';')
			);
		}

		field.retrieveTerms();
		return true;
	},
	getField: function(id) {
		if (!taxFields[id]) {
			//id will have the word container in it
			taxFields[id] = new Microsoft.SharePoint.Taxonomy.ControlObject(
				document.getElementById(id)
			);
		}
		return taxFields[id];
	}
};