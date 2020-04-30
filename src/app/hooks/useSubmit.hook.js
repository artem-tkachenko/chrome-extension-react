import {useState, useEffect} from 'react';

import {RESPONSE_CODES, FETCH} from '../../constants';

const useSubmitHook = () => {
    const [success, setSuccessShown] = useState();
    const [error, setErrorShown] = useState();

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request) => {
            switch (request.type) {
                case RESPONSE_CODES.SUCCESS:
                    setSuccessShown(RESPONSE_CODES.SUCCESS);
                case RESPONSE_CODES.FAILURE:
                    setErrorShown(RESPONSE_CODES.FAILURE);
                default:
                    return;
            }
        });
    }, []);

    return {
        fetch: ({domain, url}) => {
            chrome.runtime.sendMessage({
                type: FETCH.SUBMIT_DOMAIN,
                payload: {
                    domain,
                    url
                }
            });
        },
        success,
        error,
    };
};

export default useSubmitHook;
