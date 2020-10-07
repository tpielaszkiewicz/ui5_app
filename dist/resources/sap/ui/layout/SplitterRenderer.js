/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(t){"use strict";var i=t.Orientation;var e={};e.render=function(t,e){var a=e.getOrientation()===i.Horizontal;var r=a?"sapUiLoSplitterH":"sapUiLoSplitterV";var l=sap.ui.getCore().getConfiguration().getAnimation();t.write("<div");t.writeControlData(e);t.addClass("sapUiLoSplitter");t.addClass(r);if(l&&!e._liveResize){t.addClass("sapUiLoSplitterAnimated")}t.writeClasses();t.addStyle("width",e.getWidth());t.addStyle("height",e.getHeight());t.writeStyles();t.write(">");this.renderInitialContent(t,e);t.write("</div>")};e.renderInitialContent=function(t,e){var a=e.getId();var r=e.getOrientation()===i.Horizontal;var l=r?"width":"height";var n="sap-icon://"+(r?"horizontal":"vertical")+"-grip";var o=e._getContentAreas();var s=o.length;var p=e.getCalculatedSizes();for(var d=0;d<s;++d){var v=o[d].getLayoutData();var c="0";if(p[d]){c=p[d]+"px"}else if(v){c=v.getSize()}t.write("<section "+'id="'+a+"-content-"+d+'" '+'style="'+l+": "+c+';" '+'class="sapUiLoSplitterContent">');t.renderControl(o[d]);t.write("</section>");if(d<s-1){t.write('<div id="'+a+"-splitbar-"+d+'" '+'role="separator" '+'title="'+e._getText("SPLITTER_MOVE")+'" '+'class="sapUiLoSplitterBar" '+'aria-orientation="'+(r?"vertical":"horizontal")+'" '+'tabindex="0">');if(e._bUseIconForSeparator){t.writeIcon(n,"sapUiLoSplitterBarIcon",{id:a+"-splitbar-"+d+"-icon",title:null,"aria-label":null})}else{t.write("<span class='sapUiLoSplitterBarIcon'></span>")}t.write("</div>")}}t.write('<div id="'+a+'-overlay" class="sapUiLoSplitterOverlay" style="display: none;">'+'<div id="'+a+'-overlayBar" class="sapUiLoSplitterOverlayBar">');if(e._bUseIconForSeparator){t.writeIcon(n,"sapUiLoSplitterBarIcon",{id:a+"-splitbar-Overlay-icon",title:null,"aria-label":null})}else{t.write('<span class="sapUiLoSplitterBarIcon"></span>')}t.write("</div>"+"</div>")};return e},true);