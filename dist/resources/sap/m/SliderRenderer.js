/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SliderUtilities","sap/ui/core/InvisibleText"],function(e,t){"use strict";var i={};i.CSS_CLASS="sapMSlider";i.render=function(e,t){var r=t.getEnabled(),a=t.getTooltip_AsString(),s=i.CSS_CLASS,l=t.getAriaLabelledBy().reduce(function(e,t){return e+" "+t},"");e.write("<div");this.addClass(e,t);if(!r){e.addClass(s+"Disabled")}e.addStyle("width",t.getWidth());e.writeClasses();e.writeStyles();e.writeControlData(t);if(a&&t.getShowHandleTooltip()){e.writeAttributeEscaped("title",t._formatValueByCustomElement(a))}e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-inner");this.addInnerClass(e,t);if(!r){e.addClass(s+"InnerDisabled")}e.writeClasses();e.writeStyles();e.write(">");if(t.getProgress()){this.renderProgressIndicator(e,t,l)}this.renderHandles(e,t,l);e.write("</div>");if(t.getEnableTickmarks()){this.renderTickmarks(e,t)}this.renderLabels(e,t);if(t.getName()){this.renderInput(e,t)}e.write("</div>")};i.renderProgressIndicator=function(e,t){e.write("<div");e.writeAttribute("id",t.getId()+"-progress");this.addProgressIndicatorClass(e,t);e.addStyle("width",t._sProgressValue);e.writeClasses();e.writeStyles();e.write(' aria-hidden="true"></div>')};i.renderHandles=function(e,t,i){this.renderHandle(e,t,{id:t.getId()+"-handle",forwardedLabels:i})};i.renderHandle=function(e,i,r){var a=i.getEnabled();e.write("<span");if(r&&r.id!==undefined){e.writeAttributeEscaped("id",r.id)}if(i.getShowHandleTooltip()&&!i.getShowAdvancedTooltip()){this.writeHandleTooltip(e,i)}if(i.getInputsAsTooltips()){e.writeAttribute("aria-describedby",t.getStaticId("sap.m","SLIDER_INPUT_TOOLTIP"))}this.addHandleClass(e,i);e.addStyle(sap.ui.getCore().getConfiguration().getRTL()?"right":"left",i._sProgressValue);this.writeAccessibilityState(e,i,r);e.writeClasses();e.writeStyles();if(a){e.writeAttribute("tabindex","0")}e.write("></span>")};i.writeHandleTooltip=function(e,t){e.writeAttribute("title",t._formatValueByCustomElement(t.toFixed(t.getValue())))};i.renderInput=function(e,t){e.write('<input type="text"');e.writeAttribute("id",t.getId()+"-input");e.addClass(i.CSS_CLASS+"Input");if(!t.getEnabled()){e.write("disabled")}e.writeClasses();e.writeAttributeEscaped("name",t.getName());e.writeAttribute("value",t._formatValueByCustomElement(t.toFixed(t.getValue())));e.write("/>")};i.writeAccessibilityState=function(e,t,i){var r=t.getValue(),a=t._isElementsFormatterNotNumerical(r),s=t._formatValueByCustomElement(r),l;if(t._getUsedScale()&&!a){l=s}else{l=t.toFixed(r)}e.writeAccessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:t.toFixed(t.getMin()),valuemax:t.toFixed(t.getMax()),valuenow:l,labelledby:{value:(i.forwardedLabels+" "+t.getAggregation("_handlesLabels")[0].getId()).trim()}});if(a){e.writeAccessibilityState(t,{valuetext:s})}};i.renderTickmarks=function(t,r){var a,s,l,d,n,o,c,S,u=r._getUsedScale();if(!r.getEnableTickmarks()||!u){return}o=Math.abs(r.getMin()-r.getMax());c=r.getStep();d=u.getTickmarksBetweenLabels();s=u.calcNumberOfTickmarks(o,c,e.CONSTANTS.TICKMARKS.MAX_POSSIBLE);l=r._getPercentOfValue(this._calcTickmarksDistance(s,r.getMin(),r.getMax(),c));t.write('<ul class="'+i.CSS_CLASS+'Tickmarks">');this.renderTickmarksLabel(t,r,r.getMin());t.write('<li class="'+i.CSS_CLASS+'Tick" style="width: '+l+'%;"></li>');for(a=1;a<s-1;a++){S=false;if(d&&a%d===0){S=true;n=a*l;this.renderTickmarksLabel(t,r,r._getValueOfPercent(n))}t.write('<li class="'+i.CSS_CLASS+'Tick" '+'style="width: '+l+"%;"+(S?" opacity: 0;":"")+'">'+"</li>")}this.renderTickmarksLabel(t,r,r.getMax());t.write('<li class="'+i.CSS_CLASS+'Tick" style="width: 0;"></li>');t.write("</ul>")};i.renderTickmarksLabel=function(e,t,r){var a=t._getPercentOfValue(r);var s=sap.ui.getCore().getConfiguration().getRTL()?"right":"left";var l;r=t.toFixed(r,t.getDecimalPrecisionOfNumber(t.getStep()));l=t._formatValueByCustomElement(r,"scale");e.write('<li class="'+i.CSS_CLASS+'TickLabel"');e.addStyle(s,a+"%");e.writeStyles();e.write(">");e.write('<div class="'+i.CSS_CLASS+'Label">');e.writeEscaped(l);e.write("</div>");e.write("</li>")};i._calcTickmarksDistance=function(e,t,i,r){var a=Math.abs(t-i),s=Math.floor(a/r),l=Math.ceil(s/e);return t+l*r};i.addClass=function(e,t){e.addClass(i.CSS_CLASS)};i.addInnerClass=function(e,t){e.addClass(i.CSS_CLASS+"Inner")};i.addProgressIndicatorClass=function(e,t){e.addClass(i.CSS_CLASS+"Progress")};i.addHandleClass=function(e,t){e.addClass(i.CSS_CLASS+"Handle")};i.renderLabels=function(e,t){t.getAggregation("_handlesLabels").forEach(e.renderControl,e)};return i},true);