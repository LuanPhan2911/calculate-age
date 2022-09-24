import { FormattedMessage } from "react-intl";
import './Countdown.scss';
import { useState, useEffect } from "react";
import musicList from '../../assets/sound';
import Sound from "../../containers/Sound";
import MusicList from "../Sound/MusicList";
const Countdown = () => {
    //countdown 
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [selectedSong, setSelectedSong] = useState({});

    //sound effect
    const [playingSound, setPlayingSound] = useState(false);
    const [displaySound, setDisplaySound] = useState(false);
    useEffect(() => {

        if (running && time > 0) {
            let id = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            setAllTime(time);
            return () => {
                clearInterval(id);
            }
        } else if (time === 0 && running) {
        }


        setAllTime(time);

    }, [time, running]);
    const setAllTime = (time) => {
        let hour = zeroPadding(Math.floor(time / 3600), 2);
        let minute = zeroPadding(Math.floor((time - hour * 60 * 60) / 60), 2);
        let second = zeroPadding(Math.floor(time % 60), 2);
        setHour(hour);
        setMinute(minute);
        setSecond(second);
    }
    function zeroPadding(num, digit) {
        var zero = '';
        for (let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }
    const start = () => {
        if (time > 0) {
            setRunning(true);
        }

    };
    const pause = () => setRunning(false);
    const reset = () => {
        setTime(0);
    };
    const setInitTime = (time) => {
        setRunning(false);
        setTime(time);
    }
    const handleSetSelectedSong = (song) => {
        setDisplaySound(true);
        setPlayingSound(false);
        setSelectedSong(song);

    }
    const handleSetPlayingSound = (value) => {
        setPlayingSound(value);
    }
    return (
        <div className=" container">
            <div className="countdown-container">
                <div className="countdown-header">
                    <FormattedMessage id="countdown.header" />
                </div>
                <div className="countdown-body">
                    <div className="time">
                        {hour}:{minute}:{second}
                    </div>
                    <div className="select-time">
                        <h5><FormattedMessage id="countdown.select-time" /></h5>
                        <div className=" select-time-button">
                            <button onClick={() => setInitTime(30)}>
                                30 <FormattedMessage id="countdown.second" />
                            </button>
                            <button onClick={() => setInitTime(60)}>
                                1 <FormattedMessage id="countdown.minute" />
                            </button>
                            <button onClick={() => setInitTime(5 * 60)}>
                                5 <FormattedMessage id="countdown.minute" />
                            </button>
                            <button onClick={() => setInitTime(10 * 60)}>
                                10 <FormattedMessage id="countdown.minute" />
                            </button>
                            <button onClick={() => setInitTime(15 * 60)}>
                                15 <FormattedMessage id="countdown.minute" />
                            </button>
                            <button onClick={() => setInitTime(30 * 60)}>
                                30 <FormattedMessage id="countdown.minute" />
                            </button>
                            <button onClick={() => setInitTime(1 * 60 * 60)}>
                                1 <FormattedMessage id="countdown.hour" />
                            </button>
                        </div>
                        <h5><FormattedMessage id="countdown.config" /></h5>
                        <div className="config-time">
                            <button
                                onClick={() => start()}
                                className="btn btn-primary"
                            >
                                <FormattedMessage id="countdown.start" />
                            </button>
                            <button
                                onClick={() => pause()}
                                className="btn btn-warning mx-1"
                            >
                                <FormattedMessage id="countdown.pause" />
                            </button>
                            <button
                                onClick={() => reset()}
                                className="btn btn-info"
                            >
                                <FormattedMessage id="countdown.reset" />
                            </button>
                        </div>
                        <div className="sound-alert">
                            <h5>
                                Music list
                            </h5>
                            <MusicList
                                musicList={musicList}
                                handleSetSelectedSong={handleSetSelectedSong}
                            />
                            <h5>Sounds Config</h5>
                            {
                                displaySound
                                && <Sound
                                    sound={selectedSong && selectedSong.value}
                                    playingSound={playingSound}
                                    handleSetPlayingSound={handleSetPlayingSound}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}
export default Countdown;