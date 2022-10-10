# TODO

## Adapt scripts using sel_t 2.0

Should use sel_t3 were possible. To support undo, various editors and to remove old sel_t in future.

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

In new version I would need to be able to focus both textarea and wyswig field.
Maybe I could check for contenteditable attribute?   
Did I/we did something like that in MediaWiki already?
Phab: https://phabricator.wikimedia.org/T33780#7827277
