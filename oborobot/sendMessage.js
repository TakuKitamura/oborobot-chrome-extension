if (location.hostname + location.pathname !== 'www.google.com/search') {
    chrome.runtime.sendMessage({
        type: 'favorite'
    }, function (response) {
        if (response.status !== 'ok') {
            console.log('response-status is invalid.')
        }
    });
} else {
    chrome.runtime.sendMessage({
        type: 'googleSearch',
    }, function (response) {
        if (response.status !== 'ok') {
            console.log('response-status is invalid.')
        }
    });
}