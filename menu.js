function onCopyMenuContextClick(info, tab) {
  chrome.tabs.executeScript(
    tab.id,
    {
      file: generateContentScriptJsName(info, tab)
    },
    copyTextToClipboard
  );
}

chrome.contextMenus.onClicked.addListener(onCopyMenuContextClick);

chrome.contextMenus.create({ "id": "copy-as-aplayer-tag", "title": "Copy as aplayer tag", "contexts": ["page"] });
chrome.contextMenus.create({ "id": "copy-as-aplayer-list-item", "title": "Copy as aplayer list item", "contexts": ["page"] });

/**
 * Generate content script to be executed.
 * 
 * @param {*} info 
 * @param {*} tab 
 */
function generateContentScriptJsName(info, tab) {
  let domain;
  if (tab.url.indexOf('qq.com') > 0) {
    domain = 'qq';
  }

  return `${domain}_${info.menuItemId}.js`;
}

/**
 * Copy the input {text} to clipboard
 * 
 * @param {String} text text to be copied
 */
function copyTextToClipboard(text) {
  console.log(text);
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  var copied = document.execCommand('copy', false, null);

  console.log(copied);

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  console.log(copyFrom);

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}