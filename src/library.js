/**
    app name pd-apputil
 */
import * as $ from "jquery";

export function setFormSource(url) {
	var formattedUrl = encodeURIComponent(url),
		urlProps = api.URLparameters(location.search),
		newFormSource;

	urlProps.Source = formattedUrl;
	newFormSource = location.pathname + "?ID=" +urlProps.ID+ "&Source=" +urlProps.Source;

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
export function appButtonSetup(props) {
	// {
	//	element: $('somethin'), optional
	// 	discard: [],
	// 	add: [{class: , displayText}],
	// 	listner: function() {},
	// 	loopCB: function() {}
	// }
	//to remove buttons pass the class name in an array for discard
	//add is an array for new buttons, [{class: '', displayText: ''}]
	var buttonRow = props.element || $('#doeaAppNavigation'),
		buttonEle,
		newButtons;

	if (!props.listner) {
		throw new Error('appButtons must have a event listner');
	}

	if (props.add) {
		// add buttons to the end
		buttonEle = $('<li/>');
		buttonEle = buttonEle.append(
			$('<a/>',{
				href: '#'
			})
		);
		newButtons = props.add.map(function(buttonInfo) {
			var button = buttonEle.clone();
			button
				.find('a')
				.attr('class', buttonInfo.className)
				.text(buttonInfo.displayText);
			return button;
		});
		buttonRow
			.find('.navList')
			.append(newButtons);	
	}

	buttonRow
	.find('a')
	.each(function(ind, item) {
		var $button = $(item);

		if (props.discard && props.discard.indexOf($button.attr('class')) > -1) {
			$button.closest('li').remove();
			return;
		}
		if(props.loopCB) {
			props.loopCB.call($button, $button);
		}
	})
	.end()
	.removeClass('buttonsNotShowing')
	.off()
	.on('click', 'a', props.listner);
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