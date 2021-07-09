import React from 'react';
import s from './PopUp.module.css'

export const PopUp: React.FC = props => {

    const {} = props


    return (
        <div className={s.loadingWrap}>
            <div className={s.gooey}>
                Hello
            </div>
        </div>
    );
}