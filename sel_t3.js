/**
  Selection tools 3.

  Simplified version of [[MediaWiki:Gadget-sel_t.js]].
  IE browser is not supported (and won't be).
*/
var sel_t3 = {};
sel_t3.version = '3.0.0';

/**
  Get selected text.

  @returns null if nothing is focused (nothing editable).
*/
sel_t3.getSelection = function ()
{
	var result = {isEditable:false, isInput:false, selected:''};

	// check if nothing is focused then skip (both textarea and contenteditable has focus)
	var $focused = this.getFocused();
	if (!$focused) {
		return result;
	}
	result.isEditable = true;

	// check selected text
	var selected = '';
	var isInput = $focused.filter(":input").length == 1;
	result.isInput = isInput;
	if (isInput) {
		selected = $focused.textSelection('getSelection');
	} else {
		selected = window.getSelection().toString();
	}
	result.selected = selected;
	return result;
}

/**
  Inserts text to editable box.

  (*) Note! If both `tagClose` and `sampleText` is empty
  then `tagOpen` is used to replace selection.

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


  @param tagOpen Text to insert at selection start. (*) Or to replace selection.
  @param tagClose (optional) Text to insert at selection end.
  @param sampleText (optional) Text to insert in-between if selection is empty.

  @return false when nothing was inserted.
*/
sel_t3.insertText = function (tagOpen, tagClose, sampleText)
{
	// just a test
	// REMOVE ME LATER
	var getSelection = this.getSelection();
	console.log('[sel_t3]', {getSelection, tagOpen, tagClose, sampleText});

	// check if nothing is focused then skip (both textarea and contenteditable has focus)
	if (!sel_t3.getFocused()) {
		return false;
	}

	// defaults
	if (typeof (tagClose) !== 'string') {
		tagClose = ''
	}
	if (typeof (sampleText) !== 'string') {
		sampleText = ''
	}

	// simple replacement mode?
	var simpleMode = (tagClose.length === 0 && sampleText.length === 0)

	// setup new text
	var newText = '';
	if (simpleMode) {
		newText = tagOpen;
	} else {
		// check selection
		var result = this.getSelection();
		console.log('[sel_t3]', result);
		// sampleText to insert in-between if selection is empty.
		if (!result.selected.length) {
			newText = tagOpen + sampleText + tagClose;
		} else {
			newText = tagOpen + result.selected + tagClose;
		}
	}
	// paste text
	this.insertNewText(newText);
}

/**
  Just insert new text to focused editable.

  This checks nothing and just hopes for the best.
  You might want to use `insertText` instead.
*/
sel_t3.insertNewText = function (newText) {
    // attempting to paste to preserver undo functionality
    var pasted = true;
    try {
        if (!document.execCommand("insertText", false, newText)) {
			console.log('[sel_t3]', 'not execCommand')
            pasted = false;
        }
    } catch (e) {
        console.error('[sel_t3]', 'error caught:', e);
        pasted = false;
    }
    // could do a fallback here... (but would have to know what is focused)
    if (!pasted) {
        console.error('[sel_t3]', 'paste unsuccessful, execCommand not supported or no input focused');
		return false;
    }
	return pasted;
}

/**
  Get focused editable.

  return false when nothing editabled is focused.
*/
sel_t3.getFocused = function ()
{
	// check if something is focused (both textarea and contenteditable has focus)
	var $focused = $(':focus');
	if (!$focused.length) {
		return false;
	}
	return $focused;
}

// export
window.sel_t3 = sel_t3;
