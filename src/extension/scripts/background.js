import {FETCH, RESPONSE_CODES} from '../../constants';

const submitDomain = ({domain, url}) => {
    fetch('​http://youta-api.ngrok.io/starter-project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            timestamp: new Date(),
            username: 'test user',
            domain,
            url
        }),
    })
        .then(() => {
            chrome.runtime.sendMessage({
                type: RESPONSE_CODES.SUCCESS
            });
        })
        .catch(() => {
            chrome.runtime.sendMessage({
                type: RESPONSE_CODES.FAILURE
            });
        });
};

chrome.runtime.onMessage.addListener(request => {
    switch (request.type) {
        case FETCH.SUBMIT_DOMAIN:
            submitDomain(request.payload);
        default:
            return;
    }
});

