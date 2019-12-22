if (location.hostname + location.pathname !== 'www.google.com/search') {
    let html_lang = document.getElementsByTagName('html')[0].lang || ''

    if (html_lang.length === 0) {
        const title = document.title
        const hiragana_re = /[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]/mu
        const katakana_re = /[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]/mu
        const kanzi_re = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu
        if (hiragana_re.test(title) || katakana_re.test(title) || kanzi_re.test(title)) {
            html_lang = 'ja'
        } else {
            html_lang = 'en'
        }
    }

    chrome.runtime.sendMessage({
        lang: html_lang,
        type: 'favorite'
    }, function (response) {
        if (response.status !== 'ok') {
            console.log('response-status is invalid.')
        }
    });
} else {
    var searchBoxList = document.getElementsByName('q') || []
    if (searchBoxList.length > 0) {
        for (const i in searchBoxList) {
            if (searchBoxList[i].type === 'text') {
                const searchBoxValue = searchBoxList[i].value
                if (searchBoxValue !== undefined) {
                    chrome.runtime.sendMessage({
                        type: 'googleSearch',
                        searchBoxValue: searchBoxValue
                    }, function (response) {
                        if (response.status !== 'ok') {
                            console.log('response-status is invalid.')
                        }
                    });
                } else {
                    console.log("can't find search-box-value.")
                }

                break
            }
            if (i === searchBoxList.length - 1) {
                console.log("can't find search-box-value.")
            }
        }
    }
}