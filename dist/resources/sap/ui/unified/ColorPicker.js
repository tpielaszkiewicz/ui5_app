/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/HTML","sap/ui/core/ResizeHandler","sap/ui/layout/Grid","sap/ui/layout/GridData","sap/ui/layout/VerticalLayout","sap/ui/layout/HorizontalLayout","sap/ui/core/Icon","sap/ui/core/theming/Parameters","sap/ui/core/InvisibleText","sap/ui/Device","sap/ui/core/library","./ColorPickerRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/Global"],function(e,t,i,s,o,a,r,l,h,n,d,u,p,C,c,g){"use strict";var f=p.ValueState,S=e.ColorPickerMode,b=e.ColorPickerDisplayMode;var _=t.extend("sap.ui.unified.ColorPicker",{metadata:{library:"sap.ui.unified",properties:{colorString:{type:"string",group:"Misc",defaultValue:null},mode:{type:"sap.ui.unified.ColorPickerMode",group:"Appearance",defaultValue:S.HSV},displayMode:{type:"sap.ui.unified.ColorPickerDisplayMode",group:"Appearance",defaultValue:b.Default}},aggregations:{_grid:{type:"sap.ui.layout.Grid",group:"Appearance",multiple:false,visibility:"hidden"},_invisibleTexts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"},_oCPBox:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oSlider:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oAlphaSlider:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oHexField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oRedField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oGreenField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oBlueField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oHueField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oSatField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oLitField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oValField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oAlphaField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oAlphaField2:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oRGBorHSLRBUnifiedGroup:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oButton:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"}},events:{change:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}},liveChange:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}}}}});var y="",R=sap.ui.resource("sap.ui.unified","img/ColorPicker/Alphaslider_BG.png"),H=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),F={};Object.defineProperties(F,{RGB:{value:"RGB"},CPResponsiveClass:{value:"sapUnifiedColorPicker"},CPMatrixClass:{value:"sapUiColorPicker-ColorPickerMatrix"},HSLClass:{value:"sapUiColorPickerHSL"},LabelClass:{value:"sapUiColorPicker-ColorPickerLabels"},UnitLabelClass:{value:"sapUiCPUnitLabel"},HEXClass:{value:"sapUiColorPicker-ColorPickerHexField"},LeftColumnInputClass:{value:"sapUiColorPicker-ColorPickerInputFieldsLeft"},RightColumnInputClass:{value:"sapUiColorPicker-ColorPickerInputFieldsRight"},SliderClass:{value:"sapUiColorPicker-ColorPickerSlider"},AlphaSliderClass:{value:"sapUiColorPicker-ColorPickerAlphaSlider"},OutputSelectorClass:{value:"sapUiColorPickerHSL-RB"},OutputSelectorRowClass:{value:"sapUiColorPicker-RBRow"},CPBoxClass:{value:"sapUiColorPicker-ColorPickerBox"},CPCircleClass:{value:"sapUiColorPicker-ColorPickerCircle"},LastColumnClass:{value:"sapUiColorPicker-ColorPickerLastColumn"},HideForHSVClass:{value:"hideForHSV"},HideForHSLClass:{value:"hideForHSL"},OldColorClass:{value:"sapUiColorPicker-ColorPickerOldColor"},NewColorClass:{value:"sapUiColorPicker-ColorPickerNewColor"},SwatchesClass:{value:"sapUiColorPicker-swatches"},Colors:{value:{aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32",transparent:"00000000"}}});_.prototype.init=function(){if(u.browser.firefox){y="-moz-linear-gradient"}else if(u.browser.msie){y="-ms-linear-gradient"}else if(u.browser.webkit){y="-webkit-linear-gradient"}else{y="linear-gradient"}this.Color={r:255,g:255,b:255,h:0,s:0,l:100,v:100,a:1,oldA:1,hex:"#ffffff",old:"#ffffff"};this.sHexString="ffffff";this.$CPBox=null;this.$CPCur=null;this.RGB={r:0,g:0,b:0};this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this.data("sap-ui-fastnavgroup","true",true);this.bResponsive=e.ColorPickerHelper.isResponsive();var t=this.bResponsive?"_sap_ui_unified_ColorPicker_CircleSize":"_sap_ui_commons_ColorPicker_CircleSize";this._iCPCursorSize=parseInt(n.get(t));this._processChanges=this._processHSVChanges;this._bHSLMode=false;if(this.getDisplayMode()===b.Simplified){F.HideForDisplay.value=".hideDisplay"}this.bPressed=false};var L=t.extend("sap.ui.unified._ColorPickerBox",{metadata:{events:{select:{parameters:{value:{type:"int"},saturation:{type:"int"}}},resize:{parameters:{size:{type:"int"}}}}},init:function(){this.bRtl=sap.ui.getCore().getConfiguration().getRTL()},exit:function(){if(this._sResizeListener){s.deregister(this._sResizeListener)}},getWidth:function(){return this.$().width()},getOffset:function(){return this.$().offset()},onBeforeRendering:function(){if(this._sResizeListener){s.deregister(this._sResizeListener)}},onAfterRendering:function(){this._handle=this.$().find("> div."+F.CPCircleClass);this._sResizeListener=s.register(this.getDomRef(),this.handleResize.bind(this))},handleResize:function(e){this.fireResize({size:e.size.width})},getHandle:function(){return this._handle},ontouchstart:function(e){this.handleTouch(e)},ontouchend:function(e){this.handleTouch(e)},ontouchmove:function(e){this.handleTouch(e)},handleTouch:function(e){var t=this.calculateValuesFromEvent(e);if(t){this.fireSelect(t)}},calculateValuesFromEvent:function(e){var t=e.offsetX,i=e.offsetY,s,o=s=this.getWidth(),a,r;e.preventDefault&&e.preventDefault();if(!t){a=e.targetTouches?e.targetTouches[0]:e;if(!a||!a.pageX){a=e;if((!a||!a.pageX)&&e.changedTouches){a=e.changedTouches[0]}}if(!a.pageX){return false}r=this.getOffset();t=a.pageX-r.left;i=a.pageY-r.top}t=Math.min(Math.max(t,0),o);i=Math.min(Math.max(i,0),s);if(this.bRtl){t=o-t}return{value:t/o*100,saturation:(1-i/s)*100}},renderer:function(e,t){e.write("<div");e.addClass(F.CPBoxClass);e.writeControlData(t);e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-cpCur");e.addClass(F.CPCircleClass);e.writeClasses();e.write("></div>");e.write("</div>")}});_.prototype._createRowFromInput=function(t,i,s,o){var a=H.getText(i),r;r=new l({content:[e.ColorPickerHelper.factory.createLabel({text:s,tooltip:a,labelFor:t}).addStyleClass(F.LabelClass),t.setTooltip(a)]});if(o){r.addContent(e.ColorPickerHelper.factory.createLabel({text:o,labelFor:t}).addStyleClass(F.UnitLabelClass).addStyleClass(F.LabelClass))}return r};_.prototype._updateColorStringProperty=function(e,t){var i=this._getCSSColorString();this.setProperty("colorString",i,true);if(t){this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,l:this.Color.l,alpha:this.Color.a,hex:this.Color.hex,formatHSL:this.Color.formatHSL,colorString:i})}if(e){this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,l:this.Color.l,alpha:this.Color.a,hex:this.Color.hex,formatHSL:this.Color.formatHSL,colorString:i})}};_.prototype._handleCPBoxSelectEvent=function(e){var t=e.getParameter("value"),i=e.getParameter("saturation");this.oSatField.setValue(i);if(this._bHSLMode){this.oLitField.setValue(t)}else{this.oValField.setValue(t)}this._processChanges();this._updateColorStringProperty(false,true)};_.prototype._handleCPBoxResizeEvent=function(e){this._iCPBoxSize=e.getParameter("size");this._updateCursorPosition()};_.prototype._handleCPBoxTouchEndEvent=function(e){this._updateColorStringProperty(true,false)};_.prototype._createInteractionControls=function(){var t=this.getId();this.oCPBox=new L(t+"-cpBox",{select:this._handleCPBoxSelectEvent.bind(this),resize:this._handleCPBoxResizeEvent.bind(this)});this.oCPBox.addDelegate({ontouchend:this._handleCPBoxTouchEndEvent.bind(this)});this.oHexField=e.ColorPickerHelper.factory.createInput(t+"-hxF",{value:this.Color.hex.substr(1),change:this._handleHexValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_HEX")}).addStyleClass(F.HEXClass);this.oRedField=e.ColorPickerHelper.factory.createInput(t+"-rF",{value:this.Color.r,change:this._handleRedValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_RED")}).addStyleClass(F.LeftColumnInputClass);this.oGreenField=e.ColorPickerHelper.factory.createInput(t+"-gF",{value:this.Color.g,change:this._handleGreenValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_GREEN")}).addStyleClass(F.LeftColumnInputClass);this.oBlueField=e.ColorPickerHelper.factory.createInput(t+"-bF",{value:this.Color.b,change:this._handleBlueValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_BLUE")}).addStyleClass(F.LeftColumnInputClass);this.oHueField=e.ColorPickerHelper.factory.createInput(t+"-hF",{value:this.Color.h,change:this._handleHueValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_HUE")}).addStyleClass(F.RightColumnInputClass);this.oSatField=e.ColorPickerHelper.factory.createInput(t+"-sF",{value:this.Color.s,change:this._handleSatValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_SAT")+" "+d.getStaticId("sap.ui.unified","COLORPICKER_PERCENTAGE")}).addStyleClass(F.RightColumnInputClass);this.oLitField=e.ColorPickerHelper.factory.createInput(t+"-lF",{value:this.Color.l,change:this._handleLitValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_LIGHTNESS")+" "+d.getStaticId("sap.ui.unified","COLORPICKER_PERCENTAGE")}).addStyleClass(F.RightColumnInputClass).addStyleClass(F.HideForHSVClass);this.oAlphaField=e.ColorPickerHelper.factory.createInput(t+"-aF",{value:this.Color.a,change:this._handleAlphaValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_ALPHA")}).addStyleClass(F.RightColumnInputClass).addStyleClass(F.HideForHSVClass).addStyleClass("sapUnifiedA");this.oAlphaField2=e.ColorPickerHelper.factory.createInput(t+"-aF2",{value:this.Color.a,change:this._handleAlphaValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_ALPHA")}).addStyleClass(F.RightColumnInputClass).addStyleClass(F.HideForHSVClass).addStyleClass("sapUnifiedA");this.oValField=e.ColorPickerHelper.factory.createInput(t+"-vF",{value:this.Color.v,change:this._handleValValueChange.bind(this),ariaLabelledBy:d.getStaticId("sap.ui.unified","COLORPICKER_VALUE")}).addStyleClass(F.RightColumnInputClass).addStyleClass(F.HideForHSLClass);this.oRGBorHSLRBGroup=e.ColorPickerHelper.factory.createRadioButtonGroup({columns:2,buttons:[e.ColorPickerHelper.factory.createRadioButtonItem({text:F.RGB}),e.ColorPickerHelper.factory.createRadioButtonItem({text:e.ColorPickerMode.HSL})],select:this._handleRGBorHSLValueChange.bind(this),selectedIndex:this.Color.formatHSL?1:0}).addStyleClass(F.OutputSelectorClass);this.oHueInvisibleText=new d({text:H.getText("COLORPICKER_HUE_SLIDER")}).toStatic();this.addAggregation("_invisibleTexts",this.oHueInvisibleText,true);this.oSlider=e.ColorPickerHelper.factory.createSlider(t+"-hSLD",{max:360,step:1,tooltip:H.getText("COLORPICKER_HUE"),value:parseInt(this.oHueField.getValue())}).addStyleClass(F.SliderClass).addAriaLabelledBy(this.oHueInvisibleText);this.oSlider.attachEvent("liveChange","liveChange",this._handleSliderChange.bind(this));this.oSlider.attachEvent("change","change",this._handleSliderChange.bind(this));this.oAlphaInvisibleText=new d({text:H.getText("COLORPICKER_ALPHA_SLIDER")}).toStatic();this.addAggregation("_invisibleTexts",this.oAlphaInvisibleText,true);this.oAlphaSlider=e.ColorPickerHelper.factory.createSlider(t+"-aSLD",{max:1,value:1,step:.01,tooltip:H.getText("COLORPICKER_ALPHA")}).addStyleClass(F.AlphaSliderClass).addAriaLabelledBy(this.oAlphaInvisibleText);this.oAlphaSlider.attachEvent("liveChange","liveChange",this._handleAlphaSliderChange.bind(this));this.oAlphaSlider.attachEvent("change","change",this._handleAlphaSliderChange.bind(this))};_.prototype._createLayout=function(){var e=this.getId(),t;if(this._bLayoutControlsCreated){return}this._createInteractionControls();this.oCPBoxGD=new a({span:"L6 M6 S12"});this.icOne=new a({span:"L3 M3 S6"});this.icTwo=new a({span:"L3 M3 S6"});this.swatches=new a({span:"L3 M3 S12"});this.rbg=new a({span:"L6 M8 S12"});if(this.bResponsive){this._createUnifiedColorPicker(e)}else{t=this._createCommonsColorPicker(t,e);this.setAggregation("_grid",t,true)}this._bLayoutControlsCreated=true;if(!this.bResponsive){this._adaptControlToLibrary()}};_.prototype._adaptControlToLibrary=function(){var e;if(!this._bLayoutControlsCreated){return}e=this.getAggregation("_grid");if(this.bResponsive){if(!u.system.phone&&!g("html").hasClass("sapUiMedia-Std-Phone")){e._setBreakPointTablet(400)}e.addStyleClass(F.CPResponsiveClass)}else{e.setProperty("hSpacing",0,true);e.setProperty("vSpacing",0,true);this.oCPBoxGD.setSpanS(5);this.icOne.setSpanS(4);this.icTwo.setSpanS(3);this.rbg.setSpanS(8)}};_.prototype._updateControlVisualState=function(){var e=this.getAggregation("_grid");if(!e){return}if(this.bResponsive){if(this._bHSLMode){e.addStyleClass(F.HSLClass);this.swatches.setSpanM(4).setLinebreak(true)}else{e.removeStyleClass(F.HSLClass);this.swatches.setSpanM(3).setLinebreak(false)}}else{if(this._bHSLMode){e.addStyleClass(F.HSLClass);this.swatches.setSpanS(4).setLinebreak(true)}else{e.removeStyleClass(F.HSLClass);this.swatches.setSpanS(3).setLinebreak(false)}}};_.prototype._processChanges=function(){};_.prototype.setMode=function(t,i){this._bLayoutControlsCreated=false;switch(t){case e.ColorPickerMode.HSL:this._processChanges=this._processHSLChanges;break;case e.ColorPickerMode.HSV:this._processChanges=this._processHSVChanges;break;default:c.error("Control must have a valid mode set to work correct");break}this._bHSLMode=t===e.ColorPickerMode.HSL;return this.setProperty("mode",t,i)};_.prototype.setDisplayMode=function(e){this._bLayoutControlsCreated=false;return this.setProperty("displayMode",e,false)};_.prototype._cleanup=function(){var e=[this.getAggregation("_grid"),this.getAggregation("_oCPBox"),this.getAggregation("_oHexField"),this.getAggregation("_oRedField"),this.getAggregation("_oGreenField"),this.getAggregation("_oBlueField"),this.getAggregation("_oHueField"),this.getAggregation("_oSatField"),this.getAggregation("_oLitField"),this.getAggregation("_oAlphaField"),this.getAggregation("_oAlphaField2"),this.getAggregation("_oValField"),this.getAggregation("_oSlider"),this.getAggregation("_oAlphaSlider"),this.oRGBorHSLRBUnifiedGroup,this.oCPBoxGD,this.icOne,this.icTwo,this.rbg,this.swatches,this.oAlphaInvisibleText,this.oHueInvisibleText,this.getAggregation("_oButton"),this.getAggregation("_oRGBorHSLRBUnifiedGroup"),this.oRGBorHSLRBGroup];e.forEach(function(e){if(e){e.destroy()}},this);this._bLayoutControlsCreated=false};_.prototype.exit=function(){this._cleanup()};_.prototype.onBeforeRendering=function(){this._cleanup();this._createLayout();this._updateControlVisualState();this._updateColorString()};_.prototype._updateColorString=function(){this._parseColorString(this.getColorString());this.oHexField.setValue(this.Color.hex.substr(1));this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);if(this._bHSLMode){this.oLitField.setValue(this.Color.l);this.oAlphaField.setValue(this.Color.a);this.oAlphaField2.setValue(this.Color.a);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);if(this.bResponsive){this.oRGBorHSLRBUnifiedGroup.setSelectedIndex(this.Color.formatHSL?1:0)}else{this.oRGBorHSLRBGroup.setSelectedIndex(this.Color.formatHSL?1:0)}}else{this.oValField.setValue(this.Color.v);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);this.oAlphaField.setValue(this.Color.a);this.oAlphaField2.setValue(this.Color.a)}this._updateColorStringProperty(true,true)};_.prototype.isColor=function(e){return this._parseColorString(e,true)};_.prototype._handleSliderChange=function(e,t){var i=parseInt(this.oSlider.getValue());this.oHueField.setValue(i);this._processChanges();this._updateColorStringProperty(t==="change",t==="liveChange")};_.prototype._handleAlphaSliderChange=function(e,t){this.Color.a=this.oAlphaSlider.getValue();if(this._bHSLMode){this.oAlphaField.setValue(this.Color.a);this.oAlphaField2.setValue(this.Color.a)}if(!this.Color.formatHSL){this._processRGBChanges()}else{this._processChanges()}this._updateColorStringProperty(t==="change",t==="liveChange")};_.prototype._getValueInRange=function(e,t,i){if(isNaN(e)){e=0}return Math.min(Math.max(e,t),i)};_.prototype._handleAlphaValueChange=function(e){var t=e.getParameter("id")=="cp-aF2"?parseFloat(this.oAlphaField2.getValue(),10):parseFloat(this.oAlphaField.getValue(),10);t=this._getValueInRange(t,0,1);this.Color.a=t;this.oAlphaField.setValue(t);this.oAlphaField2.setValue(t);this.oAlphaSlider.setValue(t);if(!this.Color.formatHSL){this._processRGBChanges()}else{this._processChanges()}this._updateColorStringProperty(true,true)};_.prototype._handleRGBorHSLValueChange=function(){var e=this.oRGBorHSLRBUnifiedGroup;this.Color.formatHSL=e?e.getSelectedIndex()===1:this.oRGBorHSLRBGroup.getSelectedIndex()===1;this._updateColorStringProperty(true,true)};_.prototype._handleHueValueChange=function(){var e=parseInt(this.oHueField.getValue());e=this._getValueInRange(e,0,360);this.oHueField.setValue(e);this.oSlider.setValue(e);this._processChanges();this._updateColorStringProperty(true,true)};_.prototype._handleSatValueChange=function(){var e=parseInt(this.oSatField.getValue());e=this._getValueInRange(e,0,100);this.oSatField.setValue(e);this._processChanges();this._updateColorStringProperty(true,true)};_.prototype._handleValValueChange=function(){var e=parseInt(this.oValField.getValue());e=this._getValueInRange(e,0,100);this.oValField.setValue(e);this._processHSVChanges();this._updateColorStringProperty(true,true)};_.prototype._handleLitValueChange=function(){var e=parseInt(this.oLitField.getValue());e=this._getValueInRange(e,0,100);this.oLitField.setValue(e);this._processHSLChanges();this._updateColorStringProperty(true,true)};_.prototype._handleRedValueChange=function(){var e=parseInt(this.oRedField.getValue());e=this._getValueInRange(e,0,255);this.oRedField.setValue(e);this._processRGBChanges();this._updateColorStringProperty(true,true)};_.prototype._handleGreenValueChange=function(){var e=parseInt(this.oGreenField.getValue());e=this._getValueInRange(e,0,255);this.oGreenField.setValue(e);this._processRGBChanges();this._updateColorStringProperty(true,true)};_.prototype._handleBlueValueChange=function(){var e=parseInt(this.oBlueField.getValue());e=this._getValueInRange(e,0,255);this.oBlueField.setValue(e);this._processRGBChanges();this._updateColorStringProperty(true,true)};_.prototype._processHSVChanges=function(){var e=parseInt(this.oHueField.getValue());var t=parseInt(this.oSatField.getValue());var i=parseInt(this.oValField.getValue());this._calculateRGB(e,t,i);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.sHexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=e;this.Color.s=t;this.Color.v=i;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oValField.setValue(this.Color.v);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground()};_.prototype._processHSLChanges=function(){var e=parseInt(this.oHueField.getValue()),t=parseInt(this.oSatField.getValue()),i=parseInt(this.oLitField.getValue());if(e>360){e%=360}this._calculateRGB(e,t,i);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.sHexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=e;this.Color.s=t;this.Color.l=i;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oLitField.setValue(this.Color.l);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateAlphaBackground();this._updateSelColorBackground()};_.prototype._processRGBChanges=function(){var e=Math.round(parseInt(this.oRedField.getValue())),t=Math.round(parseInt(this.oGreenField.getValue())),i=Math.round(parseInt(this.oBlueField.getValue())),s=e+t+i===765;this._calculateHEX(e,t,i);this.oHexField.setValue(this.sHexString);if(this._bHSLMode){this._calculateHSL(e,t,i);this.oLitField.setValue(this.Color.l)}else{if(!s){this._calculateHSV(e,t,i)}this.oValField.setValue(this.Color.v)}if(!s){this.oHueField.setValue(this.Color.h)}this.oSatField.setValue(this.Color.s);this.oSlider.setValue(parseInt(this.oHueField.getValue()));this.Color.r=e;this.Color.g=t;this.Color.b=i;this.Color.hex="#"+this.oHexField.getValue();this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground()};_.prototype._handleHexValueChange=function(){var e=this.oHexField.getValue().toLowerCase(),t=1,i;if(e.substr(0,1)==="#"){e=e.substr(1)}i=/^([0-9a-fA-F]{8})$/;if(i.test(e)!==false){t=Number((parseInt(e.substr(6,2),16)/255).toFixed(2));e=e.substr(0,6)}i=/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;if(i.test(e)===false){this.oHexField.setValueState(f.Error);this.oSlider.setEnabled(false);this.oAlphaSlider.setEnabled(false);this.oHueField.setEnabled(false);this.oRedField.setEnabled(false);this.oGreenField.setEnabled(false);this.oBlueField.setEnabled(false);this.oSatField.setEnabled(false);this.oAlphaField.setEnabled(false);this.oAlphaField2.setEnabled(false);if(this._bHSLMode){this.oLitField.setEnabled(false)}else{this.oValField.setEnabled(false)}return}else if(this.oHexField.getValueState()===f.Error){this.oHexField.setValueState(f.None);this.oSlider.setEnabled(true);this.oAlphaSlider.setEnabled(true);this.oHueField.setEnabled(true);this.oRedField.setEnabled(true);this.oGreenField.setEnabled(true);this.oBlueField.setEnabled(true);this.oSatField.setEnabled(true);this.oAlphaField.setEnabled(true);this.oAlphaField2.setEnabled(true);if(this._bHSLMode){this.oLitField.setEnabled(true)}else{this.oValField.setEnabled(true)}}if(e.length===3){e=e.charAt(0)+e.charAt(0)+e.charAt(1)+e.charAt(1)+e.charAt(2)+e.charAt(2)}this._processHexChanges(e);this.oHexField.setValue(e);this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);if(this._bHSLMode){this.oLitField.setValue(this.Color.l);this.oAlphaField.setValue(1);this.oAlphaField2.setValue(1)}else{this.oValField.setValue(this.Color.v)}this.oSlider.setValue(parseInt(this.oHueField.getValue()));this.oAlphaSlider.setValue(t);this.Color.a=t;if(this._bHSLMode){this.oAlphaField.setValue(t);this.oAlphaField2.setValue(t)}this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();this._updateColorStringProperty(true,true)};_.prototype._processHexChanges=function(e){this._convertRGB(e);if(this._bHSLMode){this._calculateHSL(this.Color.r,this.Color.g,this.Color.b)}else{this._calculateHSV(this.Color.r,this.Color.g,this.Color.b)}this.Color.hex="#"+e.toLowerCase()};_.prototype._updateAlphaBackground=function(){var e=[this.Color.r,this.Color.g,this.Color.b].join(","),t=y+"(left,rgba("+e+",0),rgba("+e+",1)),url("+R+")";if(this.lastAlphaSliderGradient!==t){this.oAlphaSlider.$().find(this.bResponsive?".sapMSliderInner":".sapUiSliBar").css("background-image",t);this.lastAlphaSliderGradient=t}};_.prototype._updateCursorPosition=function(){var e,t;if(!this._iCPBoxSize){return}if(this._bHSLMode){e=Math.round(this.oLitField.getValue()*this._iCPBoxSize/100)}else{e=Math.round(this.oValField.getValue()*this._iCPBoxSize/100)}if(sap.ui.getCore().getConfiguration().getRTL()){e=this._iCPBoxSize-e}t=Math.round((1-this.oSatField.getValue()/100)*this._iCPBoxSize);e=Math.round(Math.max(e,0)-this._iCPCursorSize/2-1);t=Math.round(Math.max(t,0)-this._iCPCursorSize/2-1);this.$CPCur.css("left",e).css("top",t);if(sap.ui.Device.browser.edge){var i=document.getElementById(this.oCPBox.getId());i.style.verticalAlign="top";setTimeout(function(){i.style.verticalAlign="initial"},0)}};_.prototype._calculateRGB=function(e,t,i){var s,o,a,r,l,h,n;if(this._bHSLMode){this._calculateRGBAdvanced(e,t,i);return}e%=360;e/=60;t/=100;i/=100;h=i*t;l=h*(1-Math.abs(e%2-1));r=i-h;s=0;o=0;a=0;n=Math.floor(e);switch(n){case 0:s=h;o=l;break;case 1:s=l;o=h;break;case 2:o=h;a=l;break;case 3:o=l;a=h;break;case 4:s=l;a=h;break;case 5:s=h;a=l;break;default:s=0;a=0;o=0;break}this.RGB.r=Math.floor((s+r)*255);this.RGB.g=Math.floor((o+r)*255);this.RGB.b=Math.floor((a+r)*255)};_.prototype._calculateRGBAdvanced=function(e,t,i){var s,o,a,r,l,h,n,d,u;e=this._getValueInRange(e,0,360);e%=360;if(t>100){t=1}else if(t<0){t=0}else{t=t/100}if(i>100){i=1}else if(i<0){i=0}else{i=i/100}d=t*(1-Math.abs(2*i-1));n=255*(i-.5*d);h=d*(1-Math.abs(e/60%2-1));u=Math.floor(e/60);l=n+255*h;r=n+255*d;switch(u){case 0:s=r;o=l;a=n;break;case 1:s=l;o=r;a=n;break;case 2:s=n;o=r;a=l;break;case 3:s=n;o=l;a=r;break;case 4:s=l;o=n;a=r;break;case 5:s=r;o=n;a=l;break;default:s=0;o=0;a=0;break}this.RGB.r=Math.round(s);this.RGB.g=Math.round(o);this.RGB.b=Math.round(a)};_.prototype._getCSSColorString=function(){if(this.Color.formatHSL){if(this.Color.a<1){return"hsla("+this.Color.h+","+this.Color.s+"%,"+this.Color.l+"%, "+this.Color.a+")"}else{return"hsl("+this.Color.h+","+this.Color.s+"%,"+this.Color.l+"%)"}}if(this.Color.a<1){return"rgba("+this.Color.r+","+this.Color.g+","+this.Color.b+", "+this.Color.a+")"}else{return"rgb("+this.Color.r+","+this.Color.g+","+this.Color.b+")"}};_.prototype._calculateHEX=function(e,t,i){var s=e.toString(16),o=t.toString(16),a=i.toString(16);if(s.length===1){s="0"+s}if(o.length===1){o="0"+o}if(a.length===1){a="0"+a}this.sHexString=(s+o+a).toLowerCase()};_.prototype._calculateHSV=function(e,t,i){var s=Math.max(Math.max(e,t),i),o=Math.min(Math.min(e,t),i),a=s-o,r=Math.round(s*100/255),l=s===0?0:100*a/s,h=0;if(l===0){h=0}else if(e===s){h=60*(t-i)/a}else if(t===s){h=120+60*(i-e)/a}else if(i===s){h=240+60*(e-t)/a}if(h<0){h+=359.9}h=Math.round(h);l=Math.round(l);this.Color.h=h;this.Color.s=l;this.Color.v=r};_.prototype._calculateHSL=function(e,t,i){var s=Math.max(e,t,i),o=Math.min(e,t,i),a=(s-o)/255,r=(s+o)/510,l=1-Math.abs(2*r-1),h=r===0?0:a/l,n=l!==0?h:0,d=0;r=Math.round(r*100);n=Math.round(n*100);if(r===0||n===0||e+t+i===765){d=0}else{var u=s-o;if(s===e){d=(t-i)/u%6}if(s===t){d=(i-e)/u+2}if(s===i){d=(e-t)/u+4}if(u===0){d=0}d*=60;if(d<0){d+=360}}if(d!==0||this.Color.h!==360){this.Color.h=Math.round(d)}this.Color.s=n;this.Color.l=r};_.prototype._convertRGB=function(e){this.Color.r=parseInt(e.substr(0,2),16);this.Color.g=parseInt(e.substr(2,2),16);this.Color.b=parseInt(e.substr(4,2),16)};_.prototype._updateGradientBoxBackground=function(e){if(this._bHSLMode){this._calculateRGBAdvanced(e,100,50)}else{this._calculateRGB(e,100,100)}this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.$CPBox.css("background-color","rgb("+[this.RGB.r,this.RGB.g,this.RGB.b].join(",")+")")};_.prototype._updateSelColorBackground=function(){this.$().find(".sapUiColorPicker-ColorPickerNewColor").css("background-color",this._getCSSColorString())};_.prototype._parseColorString=function(e,t){var i;if(e.substr(0,1)==="#"){e=e.substr(1)}e=e.trim().toLowerCase();i=this._parseColorName(e);if(i){if(t){return true}if(i.length===8){this.Color.a=this.Color.oldA=Number((parseInt(i.substr(6,2),16)/255).toFixed(2));i=i.substring(0,6)}this._processHexChanges(i);this.Color.old=this.Color.hex;if(this._bHSLMode){this.Color.formatHSL=false}return true}if(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e)){if(t){return true}if(e.length===3){i=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]}else{i=e}this._processHexChanges(i);this.Color.old=this.Color.hex;if(this._bHSLMode){this.Color.formatHSL=false}return true}if(e.substr(0,3)==="rgb"){return this._parseRGB(e,t)}if(this._bHSLMode){return this._parseHSL(e,t)}else if(e.substr(0,3)==="hsv"){return this._parseHSV(e,t)}return false};_.prototype._parseHSV=function(e,t){var i=/^(((\d{1,2})|([1,2]\d{2})|(3[0-5]\d)|(360)),)(((\d{1,2})|(100)),)((\d{1,2})|(100))$/,s,o,a,r;e=e.substr(3).replace("(","").replace(")","").split(" ").join("");if(i.test(e)===true){if(t){return true}s=e.split(",");o=parseInt(s[0]);a=parseInt(s[1]);r=parseInt(s[2]);this._calculateRGB(o,a,r);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=o;this.Color.s=a;this.Color.v=r;this.Color.hex="#"+this.sHexString;this.Color.old=this.Color.hex;return true}return false};_.prototype._parseHSL=function(e,t){var i,s=e.substr(0,4),o,a,r,l,h;if(s==="hsla"){o=true}else if(s==="hsl("){o=false}else{return false}e=e.substr(o?4:3).replace("(","").replace(")","").split(" ").join("");i=e.split(",");a=parseInt(i[0]);r=parseFloat(i[1]);l=parseFloat(i[2]);if(o){h=parseFloat(i[3])}else{if(i[3]&&parseFloat(i[3])>=0){return false}h=1}r=r<1&&r>0?r*100:r;l=l<1&&l>0?l*100:l;if(a>=0&&a<=360&&(r>=0&&r<=100)&&(l>=0&&l<=100)&&(h>=0&&h<=1)){if(t){return true}this._calculateRGB(a,r,l);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=a;this.Color.s=r;this.Color.l=l;this.Color.hex="#"+this.sHexString;this.Color.old=this.Color.hex;this.Color.a=this.Color.oldA=h;this.Color.formatHSL=true}else{return false}return true};_.prototype._parseRGB=function(e,t){var i,s,o,a;s=e.substring(0,4);if(s==="rgba"){a=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),)([0]|([0]\.[0-9]+)|(\.[0-9]+)|[1])$/;o=true}else if(s.substring(0,3)==="rgb"){a=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])))$/;o=false}else{return false}e=e.substr(o?4:3).replace("(","").replace(")","").split(" ").join("");if(a.test(e)){if(t){return true}i=e.split(",");this._calculateHEX(parseInt(i[0]),parseInt(i[1]),parseInt(i[2]));this._processHexChanges(this.sHexString);this.Color.old=this.Color.hex;if(o){this.Color.a=this.Color.oldA=parseFloat(i[3])}return true}if(this._bHSLMode){this.Color.formatHSL=false}return false};_.prototype._parseColorName=function(e){return F.Colors[e]};_.prototype.onAfterRendering=function(){var e=this._getCSSColorString(),t=this.getParent();this.$CPBox=this.oCPBox.$();this.$CPCur=this.oCPBox.getHandle();this.$().find(".sapUiColorPicker-ColorPickerNewColor").css("background-color",e);this.$().find(".sapUiColorPicker-ColorPickerOldColor").css("background-color",e);this._updateGradientBoxBackground(this.Color.h);this._iCPBoxSize=this.oCPBox.getWidth();this._updateCursorPosition();if(this._bHSLMode){this._updateAlphaBackground()}this.oSlider.iShiftGrip=Math.round(g(this.oSlider.oGrip).outerWidth()/2);this.oAlphaSlider.iShiftGrip=Math.round(g(this.oAlphaSlider.oGrip).outerWidth()/2);if(t&&t.getMetadata().getName()==="sap.m.Dialog"){t.addStyleClass("sapUiCPDialog")}this.addStyleClass("sapUiCPDisplayRGB");if(u.system.phone){this._toggleFields()}};_.prototype.getRGB=function(){return{r:this.Color.r,g:this.Color.g,b:this.Color.b}};_.prototype._getConstants=function(){return F};_.prototype._createCommonsColorPicker=function(t,s){t=new o({containerQuery:true,content:[this.oCPBox.setLayoutData(this.oCPBoxGD),new r({content:[this._createRowFromInput(this.oRedField,"COLORPICKER_RED","R:"),this._createRowFromInput(this.oGreenField,"COLORPICKER_GREEN","G:"),this._createRowFromInput(this.oBlueField,"COLORPICKER_BLUE","B:"),this._createRowFromInput(this.oHexField,"COLORPICKER_HEX","#:")],layoutData:this.icOne}),new r({content:[this._createRowFromInput(this.oHueField,"COLORPICKER_HUE","H:"),this._createRowFromInput(this.oSatField,"COLORPICKER_SAT","S:","%"),this._createRowFromInput(this.oLitField,"COLORPICKER_LIGHTNESS","L:","%").addStyleClass(F.HideForHSVClass),this._createRowFromInput(this.oAlphaField,"COLORPICKER_ALPHA","A:").addStyleClass(F.HideForHSVClass),this._createRowFromInput(this.oAlphaField2,"COLORPICKER_ALPHA","A:").addStyleClass(F.HideForHSVClass),this._createRowFromInput(this.oValField,"COLORPICKER_VALUE","V:").addStyleClass(F.HideForHSLClass)],layoutData:this.icTwo}).addStyleClass(F.LastColumnClass),new l({content:[new i({content:["<div id='",s,"-ocBox' class='",F.OldColorClass,"'></div>"].join("")}),new i({content:["<div id='",s,"-ncBox' class='",F.NewColorClass,"'></div>"].join("")})],layoutData:this.swatches}).addStyleClass(F.SwatchesClass),new l({content:[e.ColorPickerHelper.factory.createLabel({text:"Output:",labelFor:this.oRGBorHSLRBGroup}),this.oRGBorHSLRBGroup],layoutData:this.rbg}).addStyleClass(F.HideForHSVClass).addStyleClass(F.OutputSelectorRowClass),this.oSlider.setLayoutData(new a({span:"L6 M6 S12",linebreak:true})),this.oAlphaSlider.setLayoutData(new a({span:"L6 M6 S12"}))]}).addStyleClass(F.CPMatrixClass);return t};_.prototype._createUnifiedColorPicker=function(t){var i=this;this.oRbRGB=e.ColorPickerHelper.factory.createRadioButtonItem({tooltip:H.getText("COLORPICKER_SELECT_RGB_TOOLTIP")});this.oRbRGB.addStyleClass("sapUiCPRB");this.oRbHSLV=e.ColorPickerHelper.factory.createRadioButtonItem({tooltip:H.getText("COLORPICKER_SELECT_HSL_TOOLTIP")});this.oRbHSLV.addStyleClass("sapUiCPRB");this.oButton=e.ColorPickerHelper.factory.createButton(t+"-toggleMode",{type:u.system.phone?"Default":"Transparent",tooltip:H.getText("COLORPICKER_TOGGLE_BTN_TOOLTIP"),icon:"sap-icon://source-code",press:function(e){i._toggleFields()}});this.setAggregation("_oButton",this.oButton,true);this.oRGBorHSLRBUnifiedGroup=e.ColorPickerHelper.factory.createRadioButtonGroup({select:this._handleRGBorHSLValueChange.bind(this),selectedIndex:this.Color.formatHSL?1:0});this.oRGBorHSLRBUnifiedGroup.addButton(this.oRbRGB);this.oRGBorHSLRBUnifiedGroup.addButton(this.oRbHSLV);this.setAggregation("_oRGBorHSLRBUnifiedGroup",this.oRGBorHSLRBUnifiedGroup,true);this.setAggregation("_oCPBox",this.oCPBox,true);this.setAggregation("_oHexField",this.oHexField,true);this.setAggregation("_oRedField",this.oRedField,true);this.setAggregation("_oGreenField",this.oGreenField,true);this.setAggregation("_oBlueField",this.oBlueField,true);this.setAggregation("_oHueField",this.oHueField,true);this.setAggregation("_oSatField",this.oSatField,true);this.setAggregation("_oLitField",this.oLitField,true);this.setAggregation("_oAlphaField",this.oAlphaField,true);this.setAggregation("_oAlphaField2",this.oAlphaField2,true);this.setAggregation("_oValField",this.oValField,true);this.setAggregation("_oSlider",this.oSlider,true);this.setAggregation("_oAlphaSlider",this.oAlphaSlider,true)};_.prototype._toggleFields=function(){if(!u.system.phone){this.toggleStyleClass("sapUiCPDisplayRGB",this.bPressed);this.bPressed=!this.bPressed}else{switch(this.sVisibleFiled){case"HSL":this.removeStyleClass("sapUiCPHexVisible");this.toggleStyleClass("sapUiCPDisplayRGB",false);this.addStyleClass("sapUiCPHideHex");this.sVisibleFiled="RGB";break;case"RGB":this.removeStyleClass("sapUiCPHexVisible");this.addStyleClass("sapUiCPHideHex");this.toggleStyleClass("sapUiCPDisplayRGB",true);this.sVisibleFiled="Hex";break;case"Hex":default:this.addStyleClass("sapUiCPHexVisible");this.removeStyleClass("sapUiCPHideHex");this.sVisibleFiled="HSL";break}}};return _});