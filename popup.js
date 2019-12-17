// chrome.storage.sync.get('color', function (data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// });
// changeColor.onclick = function (element) {
//     // let color = element.target.value;
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function (tabs) {
    chrome.tabs.executeScript(
        tabs[0].id, {
            // code: 'document.body.style.backgroundColor = "' + color + '";'
            file: 'getSearchBoxData.js'
        });
});
// };

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        // alert(request.searchBoxValue)
        let searchBoxValue = document.getElementById('search-box-value');
        searchBoxValue.innerText = request.searchBoxValue

        const xhr = new XMLHttpRequest();
        // xhr.setRequestHeader("Content-Type", "application/json");
        xhr.open("POST", 'http://localhost:3000/api/user/query', true);
        xhr.send(JSON.stringify({
            href: sender.tab.url,
            searchValue: request.searchBoxValue
        }))

        sendResponse({
            status: "ok"
        });
    });