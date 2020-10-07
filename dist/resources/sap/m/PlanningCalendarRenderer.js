/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText"],function(e){"use strict";var t={apiVersion:2};t.render=function(t,a){var i=a.getId();var s=a.getTooltip_AsString();var l=a._getHeader();t.openStart("div",a);t.class("sapMPlanCal");t.accessibilityState({role:"region",labelledby:e.getStaticId("sap.m","PLANNINGCALENDAR")});if(a._iSize!==undefined&&a._iSize!==null){t.class("sapMSize"+a._iSize)}if(!a.getSingleSelection()){t.class("sapMPlanCalMultiSel")}if(!a.getShowRowHeaders()){t.class("sapMPlanCalNoHead")}if(a.getShowWeekNumbers()&&a._viewAllowsWeekNumbers(a.getViewKey())){t.class("sapMPlanCalWithWeekNumbers")}if(a.getShowDayNamesLine()&&a._viewAllowsDayNamesLine(a.getViewKey())){t.class("sapMPlanCalWithDayNamesLine")}if(s){t.attr("title",s)}var n=a.getWidth();if(n){t.style("width",n)}var r=a.getHeight();if(r){t.style("height",r)}t.accessibilityState(a);t.openEnd();t.renderControl(l);var o=a.getAggregation("table");t.renderControl(o);var c=a._oRB.getText("PLANNINGCALENDAR");t.openStart("span",i+"-Descr");t.class("sapUiInvisibleText");t.openEnd();t.text(c);t.close("span");c=a._oRB.getText("PLANNINGCALENDAR_VIEW");t.openStart("span",i+"-SelDescr");t.class("sapUiInvisibleText");t.openEnd();t.text(c);t.close("span");t.close("div")};return t},true);