import React, {useCallback, useEffect, useState} from 'react';
import useSubmit from '../hooks/useSubmit.hook';
import getActiveTab from '../../utils/get-active-tab.util';

import 'bootstrap/dist/css/bootstrap.min.css';

const EMPTY_STATE = '';

const PopupExtension = () => {
    const [tab, setTab] = useState({domain: EMPTY_STATE, url: EMPTY_STATE});
    const {fetch, success, error} = useSubmit();

    useEffect(() => {
        getActiveTab(({url}) => {
            const origin = new URL(url).origin;

            setTab({
                domain: origin,
                url
            });
        });
    }, []);

    const submitDomain = useCallback(() => {
        fetch(tab);
    }, [tab]);

    return (
        <div className="card text-center" style={{
            width: "18rem",
        }}>
            <div className="card-body">
                <p className="card-text">
                    {tab.domain}
                </p>
                <button className="btn btn-primary" onClick={submitDomain}>Submit</button>
                <p className="card-text">
                    {success && <div>{success}</div>}
                    {error && <div>{error}</div>}
                </p>
            </div>
        </div>
    );
};

export default PopupExtension;
