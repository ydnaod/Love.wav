import React, { Fragment } from 'react';
import './LoadingMatchDashboard.css';

export function LoadingMatchDashboard() {
    return (
        <Fragment>
            <div className="Profile">
                <div className="slideTitle loadingSlideTitle">
                    <h2 className='loading-gradient'>Loading</h2>
                </div>
                <div className="pictureSlide">
                    <img className="loading-gradient loadingPicture profilePicture" />
                    <div id="percentMatch">
                        <h3 className='loading-gradient h3-loading'>Loading</h3>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}