const getActiveTab = callback => {
    chrome.tabs.query({active: true}, ([activeTab]) => {
        debugger;
        callback(activeTab);
    })
};

export default getActiveTab;
