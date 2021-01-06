import React, {useState, Fragment} from 'react';
import './Statement.css';

export function Statement({sentence}){



    return (
        <Fragment>
            <p className="sentence">{sentence}</p>
        </Fragment>
    )
}