(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("pd-sputil"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "pd-sputil"], factory);
	else if(typeof exports === 'object')
		exports["pdspapputil"] = factory(require("jquery"), require("pd-sputil"));
	else
		root["pdspapputil"] = factory(root["$"], root["pdsputil"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setFormSource"] = setFormSource;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorHandler", function() { return errorHandler; });
/* harmony export (immutable) */ __webpack_exports__["correctAttachmentTableNames"] = correctAttachmentTableNames;
/* harmony export (immutable) */ __webpack_exports__["prepBatchInfo"] = prepBatchInfo;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peoplePicker", function() { return peoplePicker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "termPicker", function() { return termPicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pd_sputil__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pd_sputil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_pd_sputil__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
    app name pd-apputil
 */
var $ = __webpack_require__(0);


function setFormSource(url) {
	var here = location,
	    formattedUrl = encodeURIComponent(url),
	    urlProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_pd_sputil__["URLparameters"])(here.search),
	    newFormSource;

	newFormSource = here.pathname + '?ID=' + urlProps.ID + '&Source=' + formattedUrl;

	$('#aspnetForm').attr('action', newFormSource);
}
var errorHandler = function () {
	function errorHandler() {
		_classCallCheck(this, errorHandler);

		this.errorContainer = [];
	}

	_createClass(errorHandler, [{
		key: 'getErrors',
		value: function getErrors() {
			return this.errorContainer.slice(0);
		}
	}, {
		key: 'addErrors',
		value: function addErrors(message) {
			this.errorContainer.push(message);
		}
	}, {
		key: 'getCount',
		value: function getCount() {
			return this.errorContainer.length;
		}
	}, {
		key: 'clearErrors',
		value: function clearErrors() {
			this.errorContainer = [];
		}
	}, {
		key: 'throwErrorDialog',
		value: function throwErrorDialog(title, text, cb) {
			var allErrors = text || this.getErrors().join('<br/>');

			if (allErrors === '') {
				allErrors = 'noErrors';
			}
			if (allErrors !== 'noErrors') {
				SP.UI.ModalDialog.showErrorDialog(title, allErrors, cb);
			}
			return allErrors;
		}
	}]);

	return errorHandler;
}();
function correctAttachmentTableNames(attachTable) {

	attachTable.children('tbody').find('tr').each(function () {
		var fileLink = $(this).find('td.ms-vb').find('span'),
		    domText,
		    textSplit;

		domText = fileLink.text();
		textSplit = domText.split('\\');

		if (textSplit.length > 1) {
			fileLink.text(textSplit[textSplit.length - 1]);
		}
	});
}
function prepBatchInfo(priObj, ary, cb) {

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
var peoplePicker = {
	getPickerField: function getPickerField(container, parentAttr, returnId) {
		//return id is a boolean for field id or just field
		//put class on the container div and pass that in
		var personField = container.find(parentAttr).children('div').children('div');

		if (returnId) {
			var fieldId = personField.length > 0 ? personField.attr('id') : null;
			return fieldId;
		}

		return personField;
	},
	removeObjRef: function removeObjRef(personFieldId) {
		if (SPClientPeoplePicker.SPClientPeoplePickerDict[personFieldId]) {
			delete SPClientPeoplePicker.SPClientPeoplePickerDict[personFieldId];
		}
		return SPClientPeoplePicker.SPClientPeoplePickerDict;
	},
	removeUsers: function removeUsers(personFieldId, allUsers) {
		//personFieldId is the id of the person div (formPersonPicker1_TopSpan)
		//allUsers is a boolean if true all users all deleted, else just one on far right
		var currentPickerField = SPClientPeoplePicker.SPClientPeoplePickerDict[personFieldId],
		    totalUsers = this.getUsersInfo(personFieldId).length;
		if (allUsers && totalUsers > 0) {
			$('#' + personFieldId.replace('$', '\\$')).find('span.sp-peoplepicker-userSpan').each(function () {
				currentPickerField.DeleteProcessedUser(this);
			});
			return currentPickerField;
		}
		if (totalUsers > 0) {
			currentPickerField.DeleteProcessedUser();
			return currentPickerField;
		}
	},
	addUser: function addUser(personFieldId, userProp1, userProp2, resolveUser) {
		//userProp1 should be AccountName, userProps2 PreferredName
		//or they can both be email
		var personObj = SPClientPeoplePicker.BuildUnresolvedEntity(userProp1, userProp2),
		    pickerField = SPClientPeoplePicker.SPClientPeoplePickerDict[personFieldId],
		    shouldUserBeResolved = resolveUser || true;

		pickerField.AddUnresolvedUser(personObj, shouldUserBeResolved);
		return pickerField;
	},
	getUsersInfo: function getUsersInfo(personFieldId) {
		//personFieldId is the id of the person div (formPersonPicker1_TopSpan)
		return SPClientPeoplePicker.SPClientPeoplePickerDict[personFieldId].GetAllUserInfo();
	},
	notifiyPeoplePickersReady: function notifiyPeoplePickersReady() {
		function test() {
			if ($.isEmptyObject(peoplePickers)) {
				setTimeout(test, 300);
			} else {
				def.resolve(peoplePickers);
			}
		}
		var def = $.Deferred(),
		    peoplePickers;

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_pd_sputil__["waitForScriptsReady"])('clientpeoplepicker.js').then(function () {
			peoplePickers = SPClientPeoplePicker.SPClientPeoplePickerDict;
			test();
			return def.promise();
		});
	},
	initializePeoplePicker: function initializePeoplePicker(options) {
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
var taxFields = {};
var termPicker = {
	addTerm: function addTerm(fieldId, termLabel, termId) {
		var field = this.getField(fieldId);
		field.setRawText(termLabel + '|' + termId);
		field.retrieveTerms();
		return true;
	},
	removeTerm: function removeTerm(fieldId, allTerms, termLabel, termId) {
		//all terms is a bool 
		var field = this.getField(fieldId),
		    termCorrected,
		    termsInField,
		    termsForField;

		if (allTerms) {
			field.setRawText('');
		} else {
			termCorrected = termLabel + '|' + termId;
			termsInField = field.getRawText().split(';');
			termsForField = termsInField.filter(function (item) {
				return item !== termCorrected;
			});
			field.setRawText(termsForField.join(';'));
		}

		field.retrieveTerms();
		return true;
	},
	getField: function getField(id) {
		if (!taxFields[id]) {
			//id will have the word container in it
			taxFields[id] = new Microsoft.SharePoint.Taxonomy.ControlObject(document.getElementById(id));
		}
		return taxFields[id];
	}
};

/***/ })
/******/ ]);
});