import useSound from 'use-sound';
import './Sound.scss';
import { useState, useEffect } from 'react';
const Sound = (props) => {
    const [sound, setSound] = useState(props.sound);
    const [volume, setVolume] = useState(0.5);
    useEffect(() => {
        setSound(props.sound);
    }, [props.sound]);
    const [play, { stop }] = useSound(sound, {
        volume,
        interrupt: true,
    });

    useEffect(() => {
        if (props.playingSound) {
            console.log('true');
            play();
        } else {
            stop();
        }

    }, [props.playingSound])



    return (
        <div className='sound-container'>
            <button onClick={() => play()}>Play</button>
            <button onClick={() => stop()}>Stop</button>
        </div>
    );

};
export default Sound