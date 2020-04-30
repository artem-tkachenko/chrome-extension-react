import {FETCH, RESPONSE_CODES} from '../../constants';

const submit = ({domain, url, id}) => {
    debugger;
    fetch('​http://youta-api.ngrok.io/starter-project', {
        method: 'POST',
        body: JSON.stringify({
            timestamp: new Date().getTime(),
            username: 'test user',
            domain: domain,
            url: url
        }),
    })
        .then(() => {
            chrome.tabs.sendMessage(id, {
                type: RESPONSE_CODES.SUCCESS
            });
        })
        .catch(() => {
            chrome.tabs.sendMessage(id, {
                type: RESPONSE_CODES.FAILURE
            });
        });
};

chrome.runtime.onMessage.addListener(request => {
    switch (request.type) {
        case FETCH.SUBMIT_DOMAIN:
            submit(request.payload);
        default:
            return;
    }
});

