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
            play();
        } else {
            stop();
        }

    }, [props.playingSound])
    const handleStop = () => {
        props.handleSetPlayingSound(false);
        stop();
    }
    const handlePlay = () => {
        props.handleSetPlayingSound(true);
        play();
    }
    return (
        <div className='sound-container'>
            <button onClick={() => handlePlay()}>Play</button>
            <button onClick={() => handleStop()}>Stop</button>
        </div>
    );

};
export default Sound