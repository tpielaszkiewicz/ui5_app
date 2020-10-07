/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ScrollEnablement","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/ResizeHandler","./TokenizerRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/core/EnabledPropagator","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(e,t,o,i,n,s,r,a,l,d,h,p){"use strict";var c=t.extend("sap.m.Tokenizer",{metadata:{library:"sap.m",properties:{editable:{type:"boolean",group:"Misc",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"}},defaultAggregation:"tokens",aggregations:{tokens:{type:"sap.m.Token",multiple:true,singularName:"token"},_tokensInfo:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tokenChange:{parameters:{type:{type:"string"},token:{type:"sap.m.Token"},tokens:{type:"sap.m.Token[]"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}},tokenUpdate:{allowPreventDefault:true,parameters:{type:{type:"string"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}}}}});var f=sap.ui.getCore().getLibraryResourceBundle("sap.m");h.apply(c.prototype,[true]);c.prototype.init=function(){this.bAllowTextSelection=false;this._oTokensWidthMap={};this._oIndicator=null;this._bAdjustable=false;this._aTokenValidators=[];this._oScroller=new o(this,this.getId()+"-scrollContainer",{horizontal:true,vertical:false,nonTouchScrolling:true});if(sap.ui.getCore().getConfiguration().getAccessibility()){var e=new n({text:f.getText("TOKENIZER_ARIA_CONTAIN_TOKEN")});this.setAggregation("_tokensInfo",e)}};c.prototype._handleNMoreIndicatorPress=function(e){this._fnOnNMorePress=e};c.prototype._hasMoreIndicator=function(){var e=this.$();return!!e.length&&this.$().find(".sapMHiddenToken").length>0};c.prototype._adjustTokensVisibility=function(){if(!this.getDomRef()){return}var e=parseInt(this.getMaxWidth()),t=this._getVisibleTokens().reverse(),o=t.length,i,n,s,r=-1;t.some(function(t,o){e=e-this._oTokensWidthMap[t.getId()];if(e<=0){r=o;return true}else{n=e}}.bind(this));if(r>-1){for(s=0;s<o;s++){if(s>=r){t[s].addStyleClass("sapMHiddenToken")}else{t[s].removeStyleClass("sapMHiddenToken")}}this._handleNMoreIndicator(o-r);i=this._oIndicator.width();if(i>=n){r=r-1;this._handleNMoreIndicator(o-r);t[r].addStyleClass("sapMHiddenToken")}}else{this._showAllTokens()}};c.prototype._handleNMoreIndicator=function(e){if(!this.getDomRef()){return this}if(e){var t="MULTIINPUT_SHOW_MORE_TOKENS";if(e===this._getVisibleTokens().length){this.$().css("overflow","visible");if(e===1){t="TOKENIZER_SHOW_ALL_ITEM"}else{t="TOKENIZER_SHOW_ALL_ITEMS"}}this._oIndicator.removeClass("sapUiHidden");this._oIndicator.html(f.getText(t,e))}else{this.$().css("overflow","hidden");this._oIndicator.addClass("sapUiHidden")}return this};c.prototype._getVisibleTokens=function(){return this.getTokens().filter(function(e){return e.getVisible()})};c.prototype._showAllTokens=function(){this._handleNMoreIndicator(0);this._getVisibleTokens().forEach(function(e){e.removeStyleClass("sapMHiddenToken")})};c.prototype.getScrollDelegate=function(){return this._oScroller};c.prototype.scrollToEnd=function(){var e=this.getDomRef(),t;if(!e){return}if(!this._sResizeHandlerId){t=this;this._sResizeHandlerId=s.register(e,function(){t.scrollToEnd()})}var o=this.$().find(".sapMTokenizerScrollContainer")[0];e.scrollLeft=o.scrollWidth};c.prototype.setMaxWidth=function(e){this.setProperty("maxWidth",e,true);this.$().css("max-width",this.getMaxWidth());if(this.getDomRef()&&this._getAdjustable()){this._adjustTokensVisibility()}return this};c.prototype._getIndicatorVisibility=function(){return this._oIndicator&&!this._oIndicator.hasClass("sapUiHidden")};c.prototype._setAdjustable=function(e){this._bAdjustable=e};c.prototype._getAdjustable=function(){return this._bAdjustable};c.prototype.setPixelWidth=function(e){if(typeof e!=="number"){d.warning("Tokenizer.setPixelWidth called with invalid parameter. Expected parameter of type number.");return}this.setWidth(e+"px");if(this._oScroller){this._oScroller.refresh()}};c.prototype.scrollToStart=function(){var e=this.getDomRef();if(!e){return}this._deactivateScrollToEnd();e.scrollLeft=0};c.prototype._deactivateScrollToEnd=function(){this._deregisterResizeHandler()};c.prototype.getScrollWidth=function(){if(!this.getDomRef()){return 0}return this.$().children(".sapMTokenizerScrollContainer")[0].scrollWidth};c.prototype.onBeforeRendering=function(){this._setTokensAria();this._deregisterResizeHandler()};c.prototype.onAfterRendering=function(){var e=this.getTokens(),t=e.length;this.scrollToEnd();this._oIndicator=this.$().find(".sapMTokenizerIndicator");for(var o=0;o<t;o++){var i=e[o].getDomRef();if(i){i.setAttribute("aria-posinset",o+1);i.setAttribute("aria-setsize",t)}}if(this._getAdjustable()){this._useCollapsedMode(this._hasMoreIndicator(),true)}};c.prototype.onThemeChanged=function(){if(!this._getAdjustable()){return}this.getTokens().forEach(function(e){if(e.getDomRef()&&!e.$().hasClass("sapMHiddenToken")){this._oTokensWidthMap[e.getId()]=e.$().outerWidth(true)}}.bind(this));this._adjustTokensVisibility()};c.prototype._useCollapsedMode=function(e,t){var o=this.getParent(),i=this._getVisibleTokens();if(!i.length){return}if(e){this._adjustTokensVisibility()}else{this._showAllTokens()}if(!t){o._syncInputWidth&&setTimeout(o["_syncInputWidth"].bind(o,this),0)}};c.prototype.invalidate=function(e){var o=this.getParent();if(o instanceof sap.m.MultiInput){o.invalidate(e)}else{t.prototype.invalidate.call(this,e)}};c.prototype.onsapfocusleave=function(e){if(document.activeElement==this.getDomRef()||!this._checkFocus()){this._changeAllTokensSelection(false);this._oSelectionOrigin=null}};c.prototype.isAllTokenSelected=function(){if(this._getVisibleTokens().length===this.getSelectedTokens().length){return true}return false};c.prototype.onkeydown=function(e){var t;if(!this.getEnabled()){return}if(e.which===l.TAB){this._changeAllTokensSelection(false)}if((e.ctrlKey||e.metaKey)&&e.which===l.A){this._iSelectedToken=this.getSelectedTokens().length;t=this.getSelectedTokens().length<this._getVisibleTokens().length;if(this._getVisibleTokens().length>0){this.focus();this._changeAllTokensSelection(t);e.preventDefault();e.stopPropagation()}}if((e.ctrlKey||e.metaKey)&&(e.which===l.C||e.which===l.INSERT)){this._copy()}if((e.ctrlKey||e.metaKey)&&e.which===l.X||e.shiftKey&&e.which===l.DELETE){if(this.getEditable()){this._cut()}else{this._copy()}}};c.prototype.onsappreviousmodifiers=function(e){this.onsapprevious(e)};c.prototype.onsapnextmodifiers=function(e){this.onsapnext(e)};c.prototype.onsaphomemodifiers=function(e){this._selectRange(false)};c.prototype.onsapendmodifiers=function(e){this._selectRange(true)};c.prototype._selectRange=function(e){var t={},o=this._getVisibleTokens(),i=p(document.activeElement).control()[0],n=o.indexOf(i);if(!i||!i.isA("sap.m.Token")){return}if(e){t.start=n;t.end=o.length-1}else{t.start=0;t.end=n}if(t.start<t.end){for(var s=t.start;s<=t.end;s++){o[s].setSelected(true)}}};c.prototype._copy=function(){var e=this.getSelectedTokens(),t="",o,n=function(e){if(e.clipboardData){e.clipboardData.setData("text/plain",t)}else{e.originalEvent.clipboardData.setData("text/plain",t)}e.preventDefault()};for(var s=0;s<e.length;s++){o=e[s];t+=(s>0?"\r\n":"")+o.getText()}if(!t){return}if(i.browser.msie&&window.clipboardData){window.clipboardData.setData("text",t)}else{document.addEventListener("copy",n);document.execCommand("copy");document.removeEventListener("copy",n)}};c.prototype._cut=function(){var e=this,t=e.getSelectedTokens(),o="",n=[],s,r,a=function(e){if(e.clipboardData){e.clipboardData.setData("text/plain",o)}else{e.originalEvent.clipboardData.setData("text/plain",o)}e.preventDefault()};s=e.fireTokenUpdate({addedTokens:[],removedTokens:n,type:c.TokenUpdateType.Removed});for(var l=0;l<t.length;l++){r=t[l];o+=(l>0?"\r\n":"")+r.getText();if(s&&r.getEditable()){e.removeToken(r);n.push(r);r.destroy()}}if(!o){return}if(i.browser.msie&&window.clipboardData){window.clipboardData.setData("text",o)}else{document.addEventListener("cut",a);document.execCommand("cut");document.removeEventListener("cut",a)}};c.prototype.onsapbackspace=function(e){var t=this.getSelectedTokens();if(!this.getEnabled()){return}if(t.length<2){this.onsapprevious(e)}else{this._focusUnselectedToken(e)}this._handleKeyboardDelete(e);e.setMarked()};c.prototype._focusUnselectedToken=function(e){var t=this.getSelectedTokens(),o=this._getVisibleTokens(),i,n;if(e.keyCode===l.DELETE){i=o.indexOf(t[t.length-1]);n=o[i+1]}if(e.keyCode===l.BACKSPACE){i=o.indexOf(t[0]);n=o[i-1]}if(n){n.focus()}else{e.setMarked("forwardFocusToParent");this.focus()}};c.prototype.onsapdelete=function(e){var t;if(!this.getEnabled()){return}t=this.getSelectedTokens();if(t.length<2){this.onsapnext(e)}else{this._focusUnselectedToken(e)}this._handleKeyboardDelete(e);e.setMarked()};c.prototype._handleKeyboardDelete=function(e){var t;if(this.getEditable()){t=p(e.target).control()[0];if(t&&t.isA("sap.m.Token")){this.handleTokenDeletion(t)}this._removeSelectedTokens();if(!this._getVisibleTokens().length){e.setMarked("forwardFocusToParent")}}};c.prototype._ensureTokenVisible=function(e){if(!e||!e.getDomRef()||!this.getDomRef()){return}var t=this.$().offset().left,o=this.$().width(),i=e.$().offset().left,n=e.$().width();if(this._getVisibleTokens().indexOf(e)==0){this.$().scrollLeft(0);return}if(i<t){this.$().scrollLeft(this.$().scrollLeft()-t+i)}if(i-t+n>o){this.$().scrollLeft(this.$().scrollLeft()+(i-t+n-o))}};c.prototype.onsapprevious=function(e){var t=this._getVisibleTokens(),o=t.length;if(o===0){return}var i=p(document.activeElement).control()[0];var n=i?t.indexOf(i):-1;if(n==0){e.setMarked("forwardFocusToParent");return}var s,r;if(n>0){s=t[n-1];s.focus()}else{s=t[t.length-1];s.focus()}if(e.shiftKey){r=t[n];s.setSelected(true);r.setSelected(true)}this._deactivateScrollToEnd();this._ensureTokenVisible(s);e.setMarked();e.preventDefault()};c.prototype.onsapnext=function(e){var t=this._getVisibleTokens(),o=t.length;if(o===0){return}var i=p(document.activeElement).control()[0];var n=i?t.indexOf(i):-1;if(n<o-1){var s=t[n+1],r=t[n];s.focus();if(e.shiftKey){s.setSelected(true);r.setSelected(true)}this._ensureTokenVisible(s)}else{e.setMarked("forwardFocusToParent");return}this._deactivateScrollToEnd();e.setMarked();e.preventDefault()};c.prototype.addValidator=function(e){if(typeof e==="function"){this._aTokenValidators.push(e)}};c.prototype.removeValidator=function(e){var t=this._aTokenValidators.indexOf(e);if(t!==-1){this._aTokenValidators.splice(t,1)}};c.prototype.removeAllValidators=function(){this._aTokenValidators=[]};c.prototype._validateToken=function(e,t){var o=e.token;var i;if(o&&o.getText()){i=o.getText()}else{i=e.text}var n=e.validationCallback;var s=e.suggestionObject;var r,a,l;if(!t){t=this._aTokenValidators}l=t.length;if(l===0){if(!o&&n){n(false)}return o}for(r=0;r<l;r++){a=t[r];o=a({text:i,suggestedToken:o,suggestionObject:s,asyncCallback:this._getAsyncValidationCallback(t,r,i,s,n)});if(!o){if(n){n(false)}return null}if(o===c.WaitForAsyncValidation){return null}}return o};c.prototype._getAsyncValidationCallback=function(e,t,o,i,n){var s=this,r;return function(a){if(a){e=e.slice(t+1);a=s._validateToken({text:o,token:a,suggestionObject:i,validationCallback:n},e);r=s._addUniqueToken(a,n);if(r){s.fireTokenUpdate({addedTokens:[a],removedTokens:[],type:c.TokenUpdateType.Added})}}else{if(n){n(false)}}}};c.prototype.addValidateToken=function(e){var t=this._validateToken(e);this._addUniqueToken(t,e.validationCallback)};c.prototype._addValidateToken=function(e){var t=this._validateToken(e),o=this._addUniqueToken(t,e.validationCallback);if(o){this.fireTokenUpdate({addedTokens:[t],removedTokens:[],type:c.TokenUpdateType.Added})}};c.prototype._addUniqueToken=function(e,t){if(!e){return false}var o=this._tokenExists(e);if(o){var i=this.getParent();if(i instanceof sap.m.MultiInput&&t){t(false)}return false}this.addToken(e);if(t){t(true)}this.fireTokenChange({addedTokens:[e],removedTokens:[],type:c.TokenChangeType.TokensChanged});return true};c.prototype._parseString=function(e){return e.split(/\r\n|\r|\n/g)};c.prototype._checkFocus=function(){return this.getDomRef()&&a(this.getDomRef(),document.activeElement)};c.prototype._tokenExists=function(e){var t=this.getTokens();if(!(t&&t.length)){return false}var o=e.getKey();if(!o){return false}var i=t.length;for(var n=0;n<i;n++){var s=t[n];var r=s.getKey();if(r===o){return true}}return false};c.prototype.addToken=function(e,t){var o=this.getParent();e.setProperty("editableParent",this.getEditable());if(o instanceof sap.m.MultiInput){if(o.getMaxTokens()!==undefined&&o.getTokens().length>=o.getMaxTokens()){return this}}this.addAggregation("tokens",e,t);this.fireTokenChange({token:e,type:c.TokenChangeType.Added});e.addEventDelegate({onAfterRendering:function(){if(sap.ui.getCore().isThemeApplied()&&e.getDomRef()&&!e.$().hasClass("sapMHiddenToken")){this._oTokensWidthMap[e.getId()]=e.$().outerWidth(true)}}.bind(this)});return this};c.prototype.removeToken=function(e){e=this.removeAggregation("tokens",e);this._bScrollToEndIsActive=true;this.fireTokenChange({token:e,type:c.TokenChangeType.Removed});return e};c.prototype.setTokens=function(e){var t=this.getTokens();this.removeAllTokens(false);var o;for(o=0;o<e.length;o++){this.addToken(e[o],true)}this.invalidate();this.fireTokenChange({addedTokens:e,removedTokens:t,type:c.TokenChangeType.TokensChanged})};c.prototype.removeAllTokens=function(e){var t=this.getTokens();var o=this.removeAllAggregation("tokens");if(typeof e==="boolean"&&!e){return o}this.fireTokenChange({addedTokens:[],removedTokens:t,type:c.TokenChangeType.TokensChanged});this.fireTokenChange({tokens:t,type:c.TokenChangeType.RemovedAll});return o};c.prototype.updateTokens=function(){this.destroyTokens();this.updateAggregation("tokens")};c.prototype._removeSelectedTokens=function(){var e=this.getSelectedTokens();if(e.length===0){return this}this.handleTokenDeletion(e);this._doSelect();return this};c.prototype.handleTokenDeletion=function(e){var t,o,i,n=[];n=n.concat(e);t=this.fireTokenUpdate({addedTokens:[],removedTokens:n,type:c.TokenUpdateType.Removed});if(!t){return}for(o=0;o<n.length;o++){i=n[o];if(i.getEditable()){i.destroy()}}this.scrollToEnd();this.fireTokenChange({addedTokens:[],removedTokens:n,type:c.TokenChangeType.TokensChanged})};c.prototype.selectAllTokens=function(e){if(e===undefined){e=true}var t=this._getVisibleTokens(),o=t.length,i;for(i=0;i<o;i++){t[i].setSelected(e)}this._doSelect();return this};c.prototype._changeAllTokensSelection=function(e,t){var o=this._getVisibleTokens(),i=o.length,n,s;for(s=0;s<i;s++){n=o[s];if(n!==t){n._changeSelection(e)}}this._doSelect();return this};c.prototype.getSelectedTokens=function(){var e=[],t=this._getVisibleTokens(),o,i,n=t.length;for(o=0;o<n;o++){i=t[o];if(i.getSelected()){e.push(i)}}return e};c.prototype._onTokenDelete=function(e){if(e&&this.getEditable()&&this.getEnabled()){var t=this.fireTokenUpdate({addedTokens:[],removedTokens:[e],type:c.TokenUpdateType.Removed});if(!t){return}delete this._oTokensWidthMap[e.getId()];e.destroy();this.fireTokenChange({addedTokens:[],removedTokens:[e],type:c.TokenChangeType.TokensChanged})}};c.prototype._onTokenSelect=function(e,t,o){var i=this._getVisibleTokens(),n,s;if(o){var r=this._getFocusedToken();if(!r){this._oSelectionOrigin=null;return}if(this._oSelectionOrigin){r=this._oSelectionOrigin}else{this._oSelectionOrigin=r}var a=this.indexOfToken(r),l=this.indexOfToken(e),d=Math.min(a,l),h=Math.max(a,l);for(s=0;s<i.length;s++){n=i[s];if(s>=d&&s<=h){n._changeSelection(true)}else if(!t){n._changeSelection(false)}}return}this._oSelectionOrigin=null;if(t){return}this._oSelectionOrigin=e;for(s=0;s<i.length;s++){n=i[s];if(n!==e){n._changeSelection(false)}}};c.prototype._getFocusedToken=function(){var e=sap.ui.getCore().byId(document.activeElement.id);if(!e||!(e instanceof sap.m.Token)||this.indexOfToken(e)==-1){return null}return e};c.prototype.onsaphome=function(e){this._getVisibleTokens()[0].focus();this.scrollToStart();e.preventDefault()};c.prototype.onsapend=function(e){var t=this._getVisibleTokens(),o=t[t.length-1];if(o.getDomRef()!==document.activeElement){o.focus();this.scrollToEnd();e.stopPropagation()}else{e.setMarked("forwardFocusToParent")}e.preventDefault()};c.prototype.onclick=function(e){var t;t=p(e.target).hasClass("sapMTokenizerIndicator")||e.target===this.getFocusDomRef();if(!this.getEnabled()){return}if(t){this._fnOnNMorePress&&this._fnOnNMorePress(e)}};c.prototype.ontouchstart=function(e){e.setMarked();if(i.browser.chrome&&window.getSelection()){window.getSelection().removeAllRanges()}};c.prototype.exit=function(){this._deregisterResizeHandler()};c.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){s.deregister(this._sResizeHandlerId);delete this._sResizeHandlerId}};c.prototype._setTokensAria=function(){var e=this._getVisibleTokens().length,t,o="";if(sap.ui.getCore().getConfiguration().getAccessibility()){t=this.getAggregation("_tokensInfo");switch(e){case 0:o=f.getText("TOKENIZER_ARIA_CONTAIN_TOKEN");break;case 1:o=f.getText("TOKENIZER_ARIA_CONTAIN_ONE_TOKEN");break;default:o=f.getText("TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS",e);break}t.setText(o)}};c.prototype._doSelect=function(){if(this._checkFocus()&&this._bCopyToClipboardSupport){var e=document.activeElement;var t=window.getSelection();t.removeAllRanges();if(this.getSelectedTokens().length){var o=document.createRange();o.selectNodeContents(this.getDomRef("clip"));t.addRange(o)}if(window.clipboardData&&e.id==this.getId()+"-clip"&&this.getDomRef()){this.getDomRef().focus()}}};c.prototype.getReverseTokens=function(){return!!this._reverseTokens};c.prototype.setReverseTokens=function(e){this._reverseTokens=e};c.prototype.setEditable=function(e){var t=this.getTokens();t.forEach(function(t){t.setProperty("editableParent",e)});this.setProperty("editable",e);return this};c.prototype.getTokensInfoId=function(){return this.getAggregation("_tokensInfo").getId()};c.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};c.TokenUpdateType={Added:"added",Removed:"removed"};c.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";return c});