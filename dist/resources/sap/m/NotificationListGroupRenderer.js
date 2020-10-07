/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/InvisibleRenderer","sap/ui/Device"],function(e,i,r){"use strict";var t={};var s=e.Priority;t.render=function(e,t){if(!t.getVisible()){i.render(e,t,t.TagName);return false}if(!t.getItems().length&&!t.getShowEmptyGroup()){return false}var a=t.getCollapsed(),o=t.getPriority(),l=t.getShowItemsCounter(),d=t.getUnread(),p="",n=t._getVisibleItemsCount(),u,w=t.getId(),c=w+"-groupTitle",v=w+"-invisibleGroupTitleText",M=c+" "+v;e.write("<li");e.writeControlData(t);e.addClass("sapMLIB");e.addClass("sapMNLIB");e.addClass("sapMNLGroup");if(a){e.addClass("sapMNLGroupCollapsed")}if(d){e.addClass("sapMNLGroupUnread")}e.writeClasses();e.writeAttribute("tabindex","0");e.writeAccessibilityState(t,{role:"option",expanded:!t.getCollapsed(),labelledby:{value:M}});e.write(">");e.write('<div class="sapMNLGroupHeader">');e.write('<div class="sapMNLIItem sapMNLGroupCollapseButton">');e.renderControl(t._getCollapseButton());e.write("</div>");if(o!==s.None){e.write("<div");e.addClass("sapMNLIBPriority");switch(o){case s.High:p="sapMNLIBPriorityHigh";break;case s.Medium:p="sapMNLIBPriorityMedium";break;case s.Low:p="sapMNLIBPriorityLow";break}e.addClass(p);e.writeClasses();e.write(">");e.renderControl(t._getPriorityIcon());e.write("</div>")}e.write('<div class="sapMNLIItem sapMNLGroupTitle" id="'+w+'-groupTitle">');e.writeEscaped(t.getTitle());e.write("</div>");if(l){e.write('<div class="sapMNLGroupCount">('+n+")</div>")}e.write('<div class="sapMNLGroupHeaderSpacer"></div>');if(t._shouldRenderOverflowToolbar()&&(!a||r.system.phone)){e.write('<div class="sapMNLIItem sapMNLIActions">')}else{e.write('<div class="sapMNLIItem sapMNLIActions" style="display:none">')}if(t._shouldRenderOverflowToolbar()){e.renderControl(t._getOverflowToolbar())}e.write("</div>");if(t._shouldRenderCloseButton()){e.write('<div class="sapMNLIItem sapMNLICloseBtn">');e.renderControl(t._getCloseButton());e.write("</div>")}e.renderControl(t._getGroupTitleInvisibleText());e.write("</div>");e.write('<ul role="listbox" class="sapMNLGroupChildren">');t.getItems().forEach(function(i){e.renderControl(i)});if(t._isMaxNumberReached()){u=t._getMaxNumberReachedMsg();e.write('<div class="sapMNLGroupMaxNotifications">');e.write('<div  class="sapMNLGroupMNTitle">');e.write(u.title);e.write("</div>");e.write('<div class="sapMNLGroupMNDescription">');e.write(u.description);e.write("</div>");e.write("</div>")}e.write("</ul>");e.write("</li>")};return t},true);