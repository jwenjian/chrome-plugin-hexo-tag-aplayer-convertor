const NOTIFICATION_ID_UNSUPPORT_DOMAIN = "NOTIFICATION_ID_UNSUPPORT_DOMAIN";

function onCopyMenuContextClick(info, tab) {
  let scritpFile = generateContentScriptJsName(info, tab);
  if (scritpFile) {
    chrome.tabs.executeScript(
      tab.id,
      {
        file: scritpFile
      },
      copyTextToClipboard
    );

  }
}

function onNotificationClick(notificationId) {
  if (notificationId.indexOf('UNSUPPORTED_DOMAIN_') !== -1) {
    chrome.tabs.create({ url: 'https://github.com/jwenjian/chrome-plugin-hexo-tag-aplayer-convertor#supported-domains' });
  }
}

chrome.contextMenus.onClicked.addListener(onCopyMenuContextClick);
chrome.notifications.onClicked.addListener(onNotificationClick);

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
  if (tab.url.indexOf('y.qq.com/portal/player.html') !== -1) {
    domain = 'qq';
  } else {
    showUpsupportDomainNotificaction();
    return null;
  }


  return `${domain}_${info.menuItemId}.js`;
}



function showUpsupportDomainNotificaction() {
  let options = {
    type: 'basic',
    iconUrl: 'images/get_started48.png',
    title: 'Convert failed!',
    message: 'Current domain not supported yet, click [here] to see the supported domains.',
    silent: true
  };
  chrome.notifications.create(
    'UNSUPPORTED_DOMAIN_' + new Date().getTime(),
    options,
    null
  );
}

function showCopySuccessNotification() {
  let options = {
    type: 'basic',
    iconUrl: 'images/get_started48.png',
    title: 'Converted and copied!',
    message: 'Just go to your editor then press Ctrl-V.',
    silent: true
  };
  chrome.notifications.create(
    'CONVERTED_AND_COPIED_' + new Date().getTime(),
    options,
    null
  );
}

console.log('ok');

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

  // Show success notification
  showCopySuccessNotification();
}