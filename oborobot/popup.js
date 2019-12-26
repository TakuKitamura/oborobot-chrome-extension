chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: "sendMessage.js"
    });
  }
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "favorite") {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://oborobot.asuscomm.com:1072/api/user/favorite",
      true
    );
    xhr.send(
      JSON.stringify({
        href: sender.tab.url
      })
    );
    let favoriteValue = document.getElementById("favorite-value");
    favoriteValue.innerText = "記事を登録しました｡";
  } else if (request.type === "googleSearch") {
    // alert(2)
    let searchBoxValue = document.getElementById("question-value");
    searchBoxValue.innerText = "もっと検索する｡";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://oborobot.asuscomm.com:1072/api/user/query", true);
    xhr.send(
      JSON.stringify({
        href: sender.tab.url
      })
    );

    sendResponse({
      status: "ok"
    });
  }
});
