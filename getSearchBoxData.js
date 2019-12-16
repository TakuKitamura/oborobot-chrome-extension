var searchBoxList = document.getElementsByName('q') || []
if (searchBoxList.length > 0) {
    for (const i in searchBoxList) {
        if (searchBoxList[i].type === 'text') {
            console.log(searchBoxList[i].value)
            break
        }
        if (i === searchBoxList.length - 1) {
            console.log("can't find search-box-value.")
        }
    }
}