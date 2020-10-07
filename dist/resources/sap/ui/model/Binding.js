/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","./ChangeReason","./DataState","sap/base/Log","sap/base/util/each"],function(t,e,a,n,i){"use strict";var s=t.extend("sap.ui.model.Binding",{constructor:function(e,a,n,i){t.apply(this);this.oModel=e;this.bRelative=!a.startsWith("/");this.sPath=a;this.oContext=n;this.vMessages=undefined;this.mParameters=i;this.bInitial=false;this.bSuspended=false;this.oDataState=null},metadata:{abstract:true,publicMethods:["getPath","getContext","getModel","attachChange","detachChange","refresh","isInitial","attachDataStateChange","detachDataStateChange","attachAggregatedDataStateChange","detachAggregatedDataStateChange","attachDataRequested","detachDataRequested","attachDataReceived","detachDataReceived","suspend","resume","isSuspended"]}});s.prototype.getPath=function(){return this.sPath};s.prototype.getContext=function(){return this.oContext};s.prototype.setContext=function(t){if(this.oContext!=t){sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(),true);this.oContext=t;this.oDataState=null;this._fireChange({reason:e.Context})}};s.prototype.getMessages=function(){return this.vMessages};s.prototype.getDataState=function(){if(!this.oDataState){this.oDataState=new a}return this.oDataState};s.prototype.getModel=function(){return this.oModel};s.prototype.attachChange=function(t,e){if(!this.hasListeners("change")){this.oModel.addBinding(this)}this.attachEvent("change",t,e)};s.prototype.detachChange=function(t,e){this.detachEvent("change",t,e);if(!this.hasListeners("change")){this.oModel.removeBinding(this)}};s.prototype._fireDataStateChange=function(t){this.fireEvent("DataStateChange",t)};s.prototype.attachDataStateChange=function(t,e){this.attachEvent("DataStateChange",t,e)};s.prototype.detachDataStateChange=function(t,e){this.detachEvent("DataStateChange",t,e)};s.prototype.attachAggregatedDataStateChange=function(t,e){this.attachEvent("AggregatedDataStateChange",t,e)};s.prototype.detachAggregatedDataStateChange=function(t,e){this.detachEvent("AggregatedDataStateChange",t,e)};s.prototype._fireChange=function(t){this.fireEvent("change",t)};s.prototype.attachDataRequested=function(t,e){this.attachEvent("dataRequested",t,e)};s.prototype.detachDataRequested=function(t,e){this.detachEvent("dataRequested",t,e)};s.prototype.fireDataRequested=function(t){this.fireEvent("dataRequested",t)};s.prototype.attachDataReceived=function(t,e){this.attachEvent("dataReceived",t,e)};s.prototype.detachDataReceived=function(t,e){this.detachEvent("dataReceived",t,e)};s.prototype.fireDataReceived=function(t){this.fireEvent("dataReceived",t)};s.prototype.updateRequired=function(t){return t&&this.getModel()===t};s.prototype.hasValidation=function(){return!!this.getType()};s.prototype.checkUpdate=function(t){if(this.bSuspended&&!t){return}this._fireChange({reason:e.Change})};s.prototype.refresh=function(t){if(this.bSuspended&&!t){return}this.checkUpdate(t)};s.prototype.initialize=function(){if(!this.bSuspended){this.checkUpdate(true)}return this};s.prototype._refresh=function(t){this.refresh(t)};s.prototype.isResolved=function(){if(this.bRelative&&!this.oContext){return false}return true};s.prototype.isInitial=function(){return this.bInitial};s.prototype.isRelative=function(){return this.bRelative};s.prototype.attachEvents=function(t){if(!t){return this}var e=this;i(t,function(t,a){var i="attach"+t.substring(0,1).toUpperCase()+t.substring(1);if(e[i]){e[i](a)}else{n.warning(e.toString()+" has no handler for event '"+t+"'")}});return this};s.prototype.detachEvents=function(t){if(!t){return this}var e=this;i(t,function(t,a){var i="detach"+t.substring(0,1).toUpperCase()+t.substring(1);if(e[i]){e[i](a)}else{n.warning(e.toString()+" has no handler for event '"+t+"'")}});return this};s.prototype.attachRefresh=function(t,e){this.attachEvent("refresh",t,e)};s.prototype.detachRefresh=function(t,e){this.detachEvent("refresh",t,e)};s.prototype._fireRefresh=function(t){this.fireEvent("refresh",t)};s.prototype.suspend=function(){this.bSuspended=true};s.prototype.isSuspended=function(){return this.bSuspended};s.prototype.resume=function(){this.bSuspended=false;this.checkUpdate()};s.prototype.destroy=function(){this.bIsBeingDestroyed=true;sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(),true);t.prototype.destroy.apply(this,arguments);this.bIsBeingDestroyed=false};return s});