# TODO

## Adapt scripts using sel_t 2.0

Should use sel_t3 were possible. To support undo, various editors and to remove old sel_t in future.

* ✅ htag.
** [diff](https://pl.wikipedia.org/w/index.php?title=Wikipedysta%3ANux%2Fhtag.js&type=revision&diff=68474795&oldid=64750873)
** Added custom `getEditField`.
** Multiline inserts... not the best (seem to add empty lines in-between and space at the end of each line).
** CTRL+A with insert brakes syntax highlighting. Might be a CodeMirror bug.
* WP:SK -- has some custom impl to support undo. Maybe replace that?
* refToolbar -- probably only need an insert.
* nuxTBKeys -- should also be easy.
* SearchBox -- check what am I using there still.

Gadgets:
* [MediaWiki:Gadgets-definition](https://pl.wikipedia.org/wiki/MediaWiki:Gadgets-definition) -- dependencies and config.
* [Specjalna:Gadżety](https://pl.wikipedia.org/wiki/Specjalna:Gad%C5%BCety) -- links and descriptions. 

## Scroll range into view?

I probably need that for search&replace. But do I actually use it?

In theory `sel_t.ScrollIntoView` is marked as private, but might be used via `setSelBound`.

## A way to change selection range

I guess I use that in SearchBox.

`sel_t.setSelBound(input, sel_boundaries, scroll)` [In 2.0]

In short: set boundaries (sel_boundaries) of a selection in the input.

Optionally it can scroll the selection into view.

The sel_boundaries must have the following attributes:

* start – 0 based postion of the start of the selection
* end – 0 based postion of the end of the selection

https://pl.wikipedia.org/wiki/Dyskusja_MediaWiki:Gadget-sel_t.js#functions

## Get current selection range

`getSelBound(input)` [In 2.0]

Returns an object with boundaries of selection in the input. Returned object has following attributes:

* start – 0 based postion of the start of the selection
* end – 0 based postion of the end of the selection

This is aimed to work the same in all browsers (well IE) as selectionStart/End attributes of textarea does in other browsers. Should work the same in all of them.

## Focus input

Was not really needed in 2.0. All functions worked on a specific input.

* In new version I would need to be able to focus both textarea and wyswig field.
* Maybe I could check for contenteditable attribute?   
* Did I/we did something like that in MediaWiki already?
* Phab: https://phabricator.wikimedia.org/T33780#7827277

Maybe I should do this in a separate library?
* Might be same repo, but different file(s) (and different page/lib on wiki).
* I could do various implementations for different editors.
* Should that be classes? Maybe not, probably one functions for each and no state.


### Focus and Wiki editors test

Check getting an active editor:
```
$('[contenteditable]:visible, textarea:visible', '.wikiEditor-ui')
```
* Plain editor on WS/WP ✅. → `textarea#wpTextbox1`.
* Syntax code editor on WS/WP ✅. → `div.CodeMirror`.
* Script code editor on WP ✅. → `textarea.ace_text`.
* VE editor on WP ❌. → multiple contenteditable elements... (like e.g. 1007 elements on a mid sized article)

### Focus and getSelection
Seems to work fine in a button:
```js
htag.insert = function() {
	$editables = $('[contenteditable]:visible, textarea:visible', '.wikiEditor-ui');
	if (!$editables.length) {
		return;
	}
	$editables[0].focus();
	console.log('sel_t3: ', sel_t3.getSelection())
}
```
Note! This will NOT work in a JS console (not in FF DevTools). Focus is stolen by the DevTools even when you `focus` right before `getSelection`.
But when testing with htag link-button this worked fine. So should be fine with any standard button.

Only Visual Editor is a problem (because of a mentioned problem of multiple contenteditable elements). Would need to detect VE specifically probably.
