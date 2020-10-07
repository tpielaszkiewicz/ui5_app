/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/ui/core/LabelEnablement","sap/ui/Device"],function(e,t,n,i){"use strict";var a=t.TextDirection;var s=t.ValueState;var r={apiVersion:2};r.render=function(t,r){var l=r.getValueState(),d=r.getTextDirection(),o=e.getTextAlign(r.getTextAlign(),d),u=sap.ui.getCore().getConfiguration().getAccessibility(),c=r.getAggregation("_beginIcon")||[],g=r.getAggregation("_endIcon")||[],p,f;t.openStart("div",r);this.addOuterStyles(t,r);this.addControlWidth(t,r);t.class("sapMInputBase");this.addPaddingClass(t,r);this.addCursorClass(t,r);this.addOuterClasses(t,r);if(!r.getEnabled()){t.class("sapMInputBaseDisabled")}if(!r.getEditable()){t.class("sapMInputBaseReadonly")}if(l!==s.None){t.class("sapMInputBaseState")}if(c.length){p=c.filter(function(e){return e.getVisible()});p.length&&t.class("sapMInputBaseHasBeginIcons")}if(g.length){f=g.filter(function(e){return e.getVisible()});f.length&&t.class("sapMInputBaseHasEndIcons")}this.writeOuterAttributes(t,r);var b=r.getTooltip_AsString();if(b){t.attr("title",b)}t.openEnd();t.openStart("div",r.getId()+"-content");t.class("sapMInputBaseContentWrapper");if(!r.getEnabled()){t.class("sapMInputBaseDisabledWrapper")}else if(!r.getEditable()){t.class("sapMInputBaseReadonlyWrapper")}if(l!==s.None){this.addValueStateClasses(t,r)}this.writeAccAttributes(t,r);this.addWrapperStyles(t,r);t.openEnd();if(c.length){this.writeIcons(t,c)}this.prependInnerContent(t,r);this.openInputTag(t,r);if(r.getName()){t.attr("name",r.getName())}if(!r.bShowLabelAsPlaceholder&&r._getPlaceholder()){t.attr("placeholder",r._getPlaceholder())}if(r.getMaxLength&&r.getMaxLength()>0){t.attr("maxlength",r.getMaxLength())}if(!r.getEnabled()){t.attr("disabled","disabled")}else if(!r.getEditable()){t.attr("readonly","readonly")}if(n.isRequired(r)){t.attr("required","required")}if(d!=a.Inherit){t.attr("dir",d.toLowerCase())}this.writeInnerValue(t,r);if(u){this.writeAccessibilityState(t,r)}if(i.browser.mozilla){if(b){t.attr("x-moz-errormessage",b)}else{t.attr("x-moz-errormessage"," ")}}this.writeInnerAttributes(t,r);t.class("sapMInputBaseInner");this.addInnerClasses(t,r);t.style("text-align",o);this.addInnerStyles(t,r);this.endInputTag(t,r);this.writeInnerContent(t,r);this.closeInputTag(t,r);if(g.length){this.writeIcons(t,g)}t.close("div");this.writeDecorations(t,r);if(u){this.renderAriaLabelledBy(t,r);this.renderAriaDescribedBy(t,r)}t.close("div")};r.getAriaRole=function(e){return"textbox"};r.getAriaLabelledBy=function(e){if(this.getLabelledByAnnouncement(e)){return e.getId()+"-labelledby"}};r.getLabelledByAnnouncement=function(e){return""};r.renderAriaLabelledBy=function(e,t){var n=this.getLabelledByAnnouncement(t);if(n){e.openStart("span",t.getId()+"-labelledby");e.attr("aria-hidden","true");e.class("sapUiInvisibleText");e.openEnd();e.text(n.trim());e.close("span")}};r.getAriaDescribedBy=function(e){if(this.getDescribedByAnnouncement(e)){return e.getId()+"-describedby"}};r.getDescribedByAnnouncement=function(e){return""};r.renderAriaDescribedBy=function(e,t){var n=this.getDescribedByAnnouncement(t);if(n){e.openStart("span",t.getId()+"-describedby");e.attr("aria-hidden","true");e.class("sapUiInvisibleText");e.openEnd();e.text(n.trim());e.close("span")}};r.getAccessibilityState=function(e){var t=this.getAriaLabelledBy(e),n=this.getAriaDescribedBy(e),i=this.getAriaRole(e),a={};if(i){a.role=i}if(e.getValueState()===s.Error){a.invalid=true}if(t){a.labelledby={value:t.trim(),append:true}}if(n){a.describedby={value:n.trim(),append:true}}a.disabled=null;a.readonly=null;a.required=null;return a};r.writeAccessibilityState=function(e,t){e.accessibilityState(t,this.getAccessibilityState(t))};r.openInputTag=function(e,t){e.voidStart("input",t.getId()+"-"+this.getInnerSuffix())};r.endInputTag=function(e,t){e.voidEnd()};r.writeInnerValue=function(e,t){e.attr("value",t.getValue())};r.addCursorClass=function(e,t){};r.addPaddingClass=function(e,t){e.class("sapMInputBaseHeightMargin")};r.addOuterStyles=function(e,t){};r.addControlWidth=function(e,t){if(!t.getProperty("width")){e.class("sapMInputBaseNoWidth")}e.style("width",t.getWidth())};r.addOuterClasses=function(e,t){};r.writeOuterAttributes=function(e,t){};r.writeAccAttributes=function(e,t){};r.addInnerStyles=function(e,t){};r.addWrapperStyles=function(e,t){e.style("width","100%")};r.addInnerClasses=function(e,t){};r.writeInnerAttributes=function(e,t){};r.prependInnerContent=function(e,t){};r.writeInnerContent=function(e,t){};r.writeIcons=function(e,t){e.openStart("div");e.attr("tabindex","-1");e.class("sapMInputBaseIconContainer");e.openEnd();t.forEach(e.renderControl,e);e.close("div")};r.writeDecorations=function(e,t){};r.closeInputTag=function(e,t){};r.addPlaceholderStyles=function(e,t){};r.addPlaceholderClasses=function(e,t){};r.addValueStateClasses=function(e,t){e.class("sapMInputBaseContentWrapperState");e.class("sapMInputBaseContentWrapper"+t.getValueState())};r.getInnerSuffix=function(){return"inner"};return r},true);