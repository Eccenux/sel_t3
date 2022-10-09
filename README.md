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
2. This is executed: `sel_t3.insertText('<b>', '</b>', 'bold')`
3. This is inserted at cursor postion: `<b>bold</b>`

Same, but something is selected:
1. Selected text is "important".
2. This is executed: `sel_t3.insertText('<b>', '</b>', 'bold')`
3. This replaces selection: `<b>important</b>`

Note that when something is selected this is equivalent:
```
sel_t3.insertText('<b>', '</b>', 'bold')
sel_t3.insertText('<b>', '</b>')
```

And for a single argument...
1. Nothing is selected.
2. You run: `sel_t3.insertText('<br>')`
3. This is inserted at cursor postion: `<br>`

Same, but something is selected:
1. "x" is selected.
2. You run `sel_t3.insertText('<br>')`
3. This replaces selection: `<br>` (so "x" is removed)

## Why shouldn't you change input.value?

Good question 😉. Around 2018 or earlier browser vendors decided to kill undo buffer for inputs. Users cannot do CTRL+Z when you change a value of the input programmatically.

Back in 2016 when you did a text editor in JS you could just change `input.value` and everything would just work. IIRC it was first partially broken in Chrome (not sure about the version). Chrome made undos weird and span through different input fields. Then in Firefox 62 (2018) CTRL+Z was disabled (undo buffer was cleared). This killed undo buffer for a lot of JS text editors (including my own).

So what is the solutions? `document.execCommand("insertText", false, newText)`. Yes, this old API, but with a new twist. In January 2017 this got official support from Chrome (Blink) and Safari (WebKit) and a [w3c issue about execCommand](https://github.com/w3c/editing/issues/160) was added. [Firefox 89 implemented this in March 2021](https://bugzilla.mozilla.org/show_bug.cgi?id=1220696). So the command was defined long time ago, but really supported from 2021. Supported everywhere except IE, but IE is not developed any more.

Long story short: just use `sel_t3.insertText` 🙂. It will preserve undo buffer. CTRL+Z will just work (Command+Z on a Mac).