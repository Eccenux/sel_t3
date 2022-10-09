# Selection tools 3

It is an evolution of my previous selections tools that with time got too much evolved with MediaWiki specific support.
I hope to keep this one simple and compatible with any editable field (plain and WYSIWYG).

For original sel_t see (do note it has a lot of MediaWiki/Wikipedia specific parts):
https://pl.wikipedia.org/wiki/MediaWiki:Gadget-sel_t.js

## insertText

With `sel_t3.insertText` you should be able to insert text into any editable. It doesn't matter if it is a text input, textarea
or some content-ediable WYSIWYGs (like CKEditor or VisualEditor).

Note! The `insertText` function assumes the element is already focused. So this will work great if you use shortcuts.
Not so much with buttons. Focus the input if you use this with buttons.

For example:
1. Nothing is selected.
2. This is executed: sel_t3.insertText('<b>', '</b>', 'bold')
3. This is inserted at cursor postion: <b>bold</b>

1. Selected text is "important".
2. This is executed: sel_t3.insertText('<b>', '</b>', 'bold')
3. This replaces selection: <b>important</b>

When something is selected this is equivalent:
sel_t3.insertText('<b>', '</b>', 'bold')
sel_t3.insertText('<b>', '</b>')

And for a single argument...
1. Nothing is selected.
2. You run sel_t3.insertText('<br>')
3. This is inserted at cursor postion: <br>

1. "x" is selected.
2. You run sel_t3.insertText('<br>')
3. This replaces selection: <br> (so "x" is removed)
