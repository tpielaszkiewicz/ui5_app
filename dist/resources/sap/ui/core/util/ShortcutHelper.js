/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/events/jquery/EventExtension"],function(e){"use strict";var t={Plus:"+",Space:" "};var r=1.1;var a=r.toLocaleString().substring(1,2);var n={Win:"Meta",Scroll:"ScrollLock",Spacebar:" ",Down:"ArrowDown",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Del:"Delete",Apps:"ContextMenu",Esc:"Escape",Multiply:"*",Decimal:a,OS:"Meta"};var o={"ctrl+l":"jump to address bar","ctrl+n":"new window, cannot be registered in Chrome","ctrl+shift+n":"new incognito window, cannot be registered in Chrome","ctrl+alt+shift+p":"UI5 Technical Info","ctrl+q":"quit Chrome in Mac","ctrl+alt+shift+s":"UI5 Support Popup","ctrl+t":"new tab, cannot be registered in Chrome","ctrl+shift+t":"reopen last tab, cannot be registered in Chrome","ctrl+w":"close tab, cannot be registered in Chrome","ctrl+shift+w":"close window, cannot be registered in Chrome","ctrl+0":"reset zoom","ctrl+-":"zoom out","ctrl+plus":"zoom in","ctrl+shift+=":"cannot be handled",tab:"TAB-based keyboard navigation","shift+tab":"TAB-based keyboard navigation","ctrl+tab":"cycling through tabs, cannot be registered in Chrome","ctrl+shift+tab":"cycling through tabs, cannot be registered in Chrome","ctrl+alt+delete":"nice try","ctrl+pageup":"cycling through tabs, cannot be registered in Chrome","ctrl+pagedown":"cycling through tabs, cannot be registered in Chrome","ctrl+alt+left":"cannot be handled in IE","ctrl+alt+right":"cannot be handled in IE","ctrl+f1":"always opens help menu in IE","ctrl+f4":"always closes tab in IE",f6:"F6-based group navigation",f11:"fullscreen, cannot be registered in Chrome",f12:"browser dev tools"};var i=false;document.addEventListener("keydown",function(e){try{if(e.keyCode===18){i=typeof e.location!=="number"||e.location===1;return}}catch(e){}});var s={findShortcut:function(e,t){var r=e.data("sap.ui.core.Shortcut");if(!r){return}var a=r.filter(function(e){var r=e.shortcutSpec.key===t.key&&e.shortcutSpec.ctrlKey===t.ctrlKey&&e.shortcutSpec.altKey===t.altKey&&e.shortcutSpec.shiftKey===t.shiftKey&&e.shortcutSpec.metaKey===t.metaKey;return r});return a[0]},getNormalizedShortcutSpec:function(t){var r;if(typeof t==="string"){r=s.parseShortcut(t)}else{var a=t.key;var n=/^([a-z0-9\.,\-\*\/=]|Plus|Tab|Space|Enter|Backspace|Home|Delete|End|Pageup|Pagedown|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Escape|F[1-9]|F1[0-2])$/i.test(a);if(!n){throw new Error("Shortcut key '"+a+"' is not a valid shortcut key. It must match /^([a-z0-9.,-*/=]|Plus|Tab|Space|Enter|Backspace|Home|Delete|End|Pageup|Pagedown|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Escape|F[1-9]|F1[0-2])$/i")}r={key:s.translateRegisteredKeyToStandard(a).toLowerCase(),ctrlKey:e.os.macintosh?false:!!t.ctrl,ctrlRequested:t.ctrl,altKey:!!t.alt,shiftKey:!!t.shift,metaKey:e.os.macintosh?!!t.ctrl:false}}return r},parseShortcut:function(t){this.validateShortcutString(t);var r=t.toLowerCase().split("+");return{key:s.translateRegisteredKeyToStandard(r.pop()),ctrlKey:e.os.macintosh?false:r.indexOf("ctrl")>-1,ctrlRequested:r.indexOf("ctrl")>-1,altKey:r.indexOf("alt")>-1,shiftKey:r.indexOf("shift")>-1,metaKey:e.os.macintosh?r.indexOf("ctrl")>-1:false}},translateRegisteredKeyToStandard:function(e){return t.hasOwnProperty(e)?t[e]:e},validateShortcutString:function(e){var t=/^((Ctrl|Shift|Alt)\+){0,3}([a-z0-9\.,\-\*\/=]|Plus|Tab|Space|Enter|Backspace|Home|Delete|End|Pageup|Pagedown|Escape|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|F[1-9]|F1[0-2])$/i.test(e);if(!t){throw new Error("Shortcut '"+e+"' is not a valid shortcut string. It must be a '+'-separated list of modifier keys and the actual key, like 'Ctrl+Alt+S'. Or more generally, it must match the expression /^((Ctrl|Shift|Alt)+){0,3}([a-z0-9.,-*/=]|Plus|Tab|Space|Enter|Backspace|Home|Delete|End|Pageup|Pagedown|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Escape|F[1-9]|F1[0-2])$/i.")}},validateKeyCombination:function(e){var t=e.ctrlRequested?"ctrl+":"";t+=e.altKey?"alt+":"";t+=e.shiftKey?"shift+":"";t+=e.key;if(o[t]){throw new Error("Registering the shortcut '"+t+"' is not allowed ("+o[t]+").")}if([".",",","-","plus","=","*","/"].indexOf(e.key)>-1&&t.indexOf("shift")>-1){throw new Error("Registering the shortcut '"+t+"' is not allowed because the 'Shift' modifier changes the meaning of the "+e.key+" key on many keyboards.")}},getNormalizedShortcutString:function(e){var t=e.ctrlRequested?"ctrl+":"";t+=e.altKey?"alt+":"";t+=e.shiftKey?"shift+":"";t+=e.key;return t},shortcutMayBeUsedHere:function(e,t){var r=t.tagName.toLowerCase();if((r==="input"||r==="textarea")&&e.key.includes("arrow")){return false}return true},handleKeydown:function(e,t,r,a){if(a.key==="Control"||a.key==="Shift"||a.key==="Alt"||a.key==="AltGraph"||a.key==="Meta"){return}if(a.isMarked()){return}if(a.altKey&&!i){return}var o=n.hasOwnProperty(a.key)?n[a.key]:a.key;o=o.toLowerCase();if(o!==e.key||a.ctrlKey!==e.ctrlKey||a.altKey!==e.altKey||a.shiftKey!==e.shiftKey||a.metaKey!==e.metaKey){return}if(!s.shortcutMayBeUsedHere(e,a.target||a.srcElement)){return}a.preventDefault();a.setMarked();a.stopPropagation();var c={registeredShortcut:t,originalBrowserEvent:a.originalEvent||a};r(c)}};return s});