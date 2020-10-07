/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BarInPageEnabler","./ToolbarLayoutData","./ToolbarSpacer","./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/events/KeyCodes","./ToolbarRenderer"],function(t,e,o,n,r,i,a,s){"use strict";var p=n.ToolbarDesign,l=n.ToolbarStyle;var g=r.extend("sap.m.Toolbar",{metadata:{interfaces:["sap.ui.core.Toolbar","sap.m.IBar"],library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},active:{type:"boolean",group:"Behavior",defaultValue:false},enabled:{type:"boolean",group:"Behavior",defaultValue:true},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:""},design:{type:"sap.m.ToolbarDesign",group:"Appearance",defaultValue:p.Auto},style:{type:"sap.m.ToolbarStyle",group:"Appearance",defaultValue:l.Standard}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{parameters:{srcControl:{type:"sap.ui.core.Control"}}}},designtime:"sap/m/designtime/Toolbar.designtime"}});i.call(g.prototype);g.shrinkClass="sapMTBShrinkItem";g.isRelativeWidth=function(t){return/^([-+]?\d+%|auto|inherit|)$/i.test(t)};g.getOrigWidth=function(t){var e=sap.ui.getCore().byId(t);if(!e||!e.getWidth){return""}return e.getWidth()};g.checkShrinkable=function(t,n){if(t instanceof o){return this.isRelativeWidth(t.getWidth())}n=n||this.shrinkClass;t.removeStyleClass(n);var r=this.getOrigWidth(t.getId());if(!this.isRelativeWidth(r)){return}var i=t.getLayoutData();if(i instanceof e){return i.getShrinkable()&&t.addStyleClass(n)}if(r.indexOf("%")>0||t.getMetadata().isInstanceOf("sap.ui.core.IShrinkable")){return t.addStyleClass(n)}var a=t.getDomRef();if(a&&(a.firstChild||{}).nodeType==3){return t.addStyleClass(n)}};g.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);this._oContentDelegate={onAfterRendering:this._onAfterContentRendering}};g.prototype.onAfterRendering=function(){this._checkContents()};g.prototype.onLayoutDataChange=function(){this.rerender()};g.prototype.addContent=function(t){this.addAggregation("content",t);this._onContentInserted(t);return this};g.prototype.insertContent=function(t,e){this.insertAggregation("content",t,e);this._onContentInserted(t);return this};g.prototype.removeContent=function(t){t=this.removeAggregation("content",t);this._onContentRemoved(t);return t};g.prototype.removeAllContent=function(){var t=this.removeAllAggregation("content")||[];t.forEach(this._onContentRemoved,this);return t};g.prototype.ontap=function(t){if(this.getActive()&&!t.isMarked()){t.setMarked();this.firePress({srcControl:t.srcControl})}};g.prototype.onsapenter=function(t){if(this.getActive()&&t.srcControl===this&&!t.isMarked()){t.setMarked();this.firePress({srcControl:this})}};g.prototype.onsapspace=function(t){if(t.srcControl===this){t.preventDefault()}};g.prototype.onkeyup=function(t){if(t.which===a.SPACE){this.onsapenter(t)}};g.prototype.ontouchstart=function(t){this.getActive()&&t.setMarked()};g.prototype._checkContents=function(){this.getContent().forEach(function(t){g.checkShrinkable(t)})};g.prototype._onContentInserted=function(t){if(t){t.attachEvent("_change",this._onContentPropertyChanged,this);t.addEventDelegate(this._oContentDelegate,t)}};g.prototype._onContentRemoved=function(t){if(t){t.detachEvent("_change",this._onContentPropertyChanged,this);t.removeEventDelegate(this._oContentDelegate,t)}};g.prototype._onAfterContentRendering=function(){var t=this.getLayoutData();if(t instanceof e){t.applyProperties()}};g.prototype._onContentPropertyChanged=function(t){if(t.getParameter("name")!="width"){return}var e=t.getSource();var o=e.getWidth().indexOf("%")>0;e.toggleStyleClass(g.shrinkClass,o)};g.prototype._getAccessibilityRole=function(){var t=this._getRootAccessibilityRole();if(this.getActive()){t="button"}return t};g.prototype.setDesign=function(t,e){if(!e){return this.setProperty("design",t)}this._sAutoDesign=this.validateProperty("design",t);return this};g.prototype.getActiveDesign=function(){var t=this.getDesign();if(t!=p.Auto){return t}return this._sAutoDesign||t};g.prototype.getTitleControl=function(){var t=sap.ui.require("sap/m/Title");if(!t){return}var e=this.getContent();for(var o=0;o<e.length;o++){var n=e[o];if(n instanceof t&&n.getVisible()){return n}}};g.prototype.getTitleId=function(){var t=this.getTitleControl();return t?t.getId():""};g.prototype.isContextSensitive=t.prototype.isContextSensitive;g.prototype.setHTMLTag=t.prototype.setHTMLTag;g.prototype.getHTMLTag=t.prototype.getHTMLTag;g.prototype.applyTagAndContextClassFor=t.prototype.applyTagAndContextClassFor;g.prototype._applyContextClassFor=t.prototype._applyContextClassFor;g.prototype._applyTag=t.prototype._applyTag;g.prototype._getContextOptions=t.prototype._getContextOptions;g.prototype._setRootAccessibilityRole=t.prototype._setRootAccessibilityRole;g.prototype._getRootAccessibilityRole=t.prototype._getRootAccessibilityRole;g.prototype._setRootAriaLevel=t.prototype._setRootAriaLevel;g.prototype._getRootAriaLevel=t.prototype._getRootAriaLevel;return g});