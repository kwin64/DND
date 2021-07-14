import React, {useState} from 'react';
import s from './App.module.css';
import {PopUp} from "./components/common/PopUp/PopUp";
import {DND} from "./components/common/DND/DND";
import {Trello} from "./components/common/Trello/Trello";

function App() {

    let [timeoutId, setTimeoutId] = useState<any>([]);
    const [notification, setNotification] = useState(false);

    return (
        <div className={s.app}
            // onClick={() => {
            // }}
            // onMouseMove={() => {
            //     if (timeoutId.length > 0) {
            //         timeoutId.forEach((val: number) => {
            //             window.clearTimeout(val)
            //         });
            //         setTimeoutId([]);
            //         setNotification(false);
            //     }
            //     setTimeoutId([
            //         ...timeoutId,
            //         setTimeout(() => {
            //             setNotification(true)
            //         }, 5000)
            //     ]);
            // }}
        >

            {/*<DND/>*/}
            <Trello/>
            {notification && <PopUp/>}
        </div>
    );
}

export default App;
