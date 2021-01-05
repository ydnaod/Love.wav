import React, {useState, Fragment} from 'react';
import './Statement.css';

export function Statement({sentence}){



    return (
        <Fragment>
            <p>{sentence}</p>
        </Fragment>
    )
}