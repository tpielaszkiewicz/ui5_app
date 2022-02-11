/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/SemanticButton","sap/m/library","sap/ui/events/KeyCodes"],function(e,t,s){"use strict";var n=t.ButtonType;var r=e.extend("sap.m.semantic.SemanticToggleButton",{metadata:{library:"sap.m",abstract:true,properties:{pressed:{type:"boolean",group:"Data",defaultValue:false}}}});r.prototype._onTap=function(e){e.setMarked();if(this.getEnabled()){this.setPressed(!this.getPressed());this.firePress({pressed:this.getPressed()})}};r.prototype._onKeydown=function(e){if(e.which===s.SPACE||e.which===s.ENTER){this._onTap(e)}};r.prototype._onAfterRendering=function(){var e=this._getControl().getType(),t=e===n.Emphasized;this.$().attr("aria-pressed",t)};r.prototype._applyProperty=function(t,s,n){if(t==="pressed"){this._setPressed(s,n)}else{e.prototype._applyProperty.apply(this,arguments)}};r.prototype._setPressed=function(e,t){var s=e?n.Emphasized:n.Default;this._getControl().setType(s,t)};r.prototype._createInstance=function(e){var t=new e({id:this.getId()+"-toggleButton"});t.addEventDelegate({ontap:this._onTap,onkeydown:this._onKeydown,onAfterRendering:this._onAfterRendering},this);return t};return r});