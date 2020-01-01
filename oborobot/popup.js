chrome.tabs.query({
    active: true,
    currentWindow: true
  },
  function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: "sendMessage.js"
    });
  }
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let addr = "https://oborobot.asuscomm.com:1072"
  // let addr = "https://localhost:3000"
  if (request.type === "favorite") {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      addr + "/api/user/favorite",
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
    // let searchBoxValue = document.getElementById("question-value");
    // searchBoxValue.innerText = "もっと検索する｡";

    const xhr = new XMLHttpRequest();
    xhr.open("POST",
      addr + "/api/user/query",
      true);
    xhr.send(
      JSON.stringify({
        href: sender.tab.url
      })
    );

    xhr.open("POST",
      addr + "/api/question",
      true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var questions
        var suggest_url
        var suggest_url_title
        var suggest_url_description

        console.log(xhr.response);

        let res = JSON.parse(xhr.response)[0]
        console.log(res)
        questions = res.questions
        suggest_url = res.url
        suggest_url_title = res.title
        suggest_url_description = res.description

        let questionValue = document.getElementById("question-value");
        questionValue.innerText = questions

        let suggestURL = document.getElementById("suggest-site-url");
        suggestURL.innerText = suggest_url

        let suggestTitle = document.getElementById("suggest-site-title");
        suggestTitle.innerText = suggest_url_title

        let suggestDescription = document.getElementById("suggest-site-description");
        suggestDescription.innerText = suggest_url_description

      }
    }

    xhr.send(
      JSON.stringify({
        href: sender.tab.url,
        lang: "en"
      })
    );


    sendResponse({
      status: "ok"
    });
  }
});