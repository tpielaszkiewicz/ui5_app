/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Toolbar","./Button","./SuggestionsList","./SuggestionItem","sap/ui/Device","sap/m/library","sap/ui/core/Core"],function(e,t,n,s,i,r,o,a){"use strict";var u=o.PlacementType;function c(c){var l=c,p,f,d,g=r.system.phone,h=this;e.sap.require(g?"sap.m.Dialog":"sap.m.Popover");function m(e){var t=e.srcControl;var n;if(t instanceof i){n=t.getSuggestionText();h._suggestionItemTapped=true;p.close();window.setTimeout(function(){c.setValue(n);c.fireSearch({query:n,suggestionItem:t,refreshButtonPressed:false,clearButtonPressed:false})},0)}}function v(){var e,s,i,r,o,u;i=new(sap.ui.require("sap/m/SearchField"))({liveChange:function(e){var t=e.getParameter("newValue");c.setValue(t);c.fireLiveChange({newValue:t});c.fireSuggest({suggestValue:t});h.update()},search:function(t){if(!t.getParameter("clearButtonPressed")){e.close()}}});u=new n({icon:"sap-icon://decline",press:function(){h._cancelButtonTapped=true;e._oCloseTrigger=true;e.close();c.setValue(s)}});r=new t({content:[i,u]});o=new n({text:a.getLibraryResourceBundle("sap.m").getText("MSGBOX_OK"),press:function(){e.close()}});e=new(sap.ui.require("sap/m/Dialog"))({stretch:true,customHeader:r,content:S(),beginButton:o,beforeOpen:function(){s=c.getValue();i.setValue(s)},afterClose:function(e){if(!h._cancelButtonTapped&&!h._suggestionItemTapped){c.fireSearch({query:c.getValue(),refreshButtonPressed:false,clearButtonPressed:false})}}});e.addEventDelegate({ontap:m},c);return e}function w(){var e=h._oPopover=new(sap.ui.require("sap/m/Popover"))({showArrow:false,showHeader:false,horizontalScrolling:false,placement:u.Vertical,offsetX:0,offsetY:0,initialFocus:l,bounce:false,afterOpen:function(){c.$("I").attr("aria-autocomplete","list").attr("aria-haspopup","true")},beforeClose:function(){c.$("I").attr("aria-haspopup","false").removeAttr("aria-activedecendant")},content:S()}).addStyleClass("sapMSltPicker").addStyleClass("sapMSltPicker-CTX");e.open=function(){return this.openBy(l)};e.addEventDelegate({onAfterRendering:h.setPopoverMinWidth.bind(h),ontap:m},c);return e}function S(){if(!f){f=new s({parentInput:l})}return f}function P(){if(p===undefined){p=g?v():w()}return p}this.setPopoverMinWidth=function(){var e=h._oPopover.getDomRef();if(e){var t=c.$().outerWidth()/parseFloat(o.BaseFontSize)+"rem";e.style.minWidth=t}};this.destroy=function(){if(p){p.close();p.destroy();p=null}if(f){f.destroy();f=null}};this.close=function(){if(!g&&this.isOpen()){p.close()}};this.open=function(){if(!this.isOpen()){this.setSelected(-1);this._suggestionItemTapped=false;this._cancelButtonTapped=false;P().open()}};this.update=function(){var e=S();window.clearTimeout(d);if(this.isOpen()){d=window.setTimeout(e.update.bind(e),50)}};this.isOpen=function(){return!!p&&p.isOpen()};this.getSelected=function(){return S().getSelectedItemIndex()};this.setSelected=function(e,t){return S().selectByIndex(e,t)}}return c},true);