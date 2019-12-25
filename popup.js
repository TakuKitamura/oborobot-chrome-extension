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
            file: 'sendMessage.js'
        });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // console.log(sender.tab ?
        //     "from a content script:" + sender.tab.url :
        //     "from the extension");
        // alert(3)
        if (request.type === 'favorite') {
            // alert(1)
            const xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://localhost:3000/api/user/favorite', true);
            xhr.send(JSON.stringify({
                href: sender.tab.url,
                // lang: request.lang,
            }))
            let favoriteValue = document.getElementById('favorite-value');
            favoriteValue.innerText = '記事を登録しました｡'
        } else if (request.type === 'googleSearch') {
            // alert(2)
            let searchBoxValue = document.getElementById('question-value');
            searchBoxValue.innerText = 'もっと検索する｡'

            const xhr = new XMLHttpRequest();
            // xhr.setRequestHeader("Content-Type", "application/json");
            xhr.open("POST", 'http://localhost:3000/api/user/query', true);
            xhr.send(JSON.stringify({
                href: sender.tab.url,
                // lang: request.lang,
                // searchValue: request.searchBoxValue
            }))

            sendResponse({
                status: "ok"
            });
        }

    });