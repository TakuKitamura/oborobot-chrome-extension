var searchBoxList = document.getElementsByName('q') || []
if (searchBoxList.length > 0) {
    for (const i in searchBoxList) {
        if (searchBoxList[i].type === 'text') {
            const searchBoxValue = searchBoxList[i].value
            if (searchBoxValue !== undefined) {
                chrome.runtime.sendMessage({
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