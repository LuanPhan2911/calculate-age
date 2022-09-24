import { FormattedMessage } from 'react-intl';
import './TrafficLight.scss';
import { useState, useEffect } from 'react';
const TrafficLight = (props) => {
    const [time, setTime] = useState('');
    const [timeSkip, setTimeSkip] = useState({
        red: 20,
        green: 30,
        yellow: 3,
    });
    const [status, setStatus] = useState({
        red: false,
        green: false,
        yellow: false,
        next: '',
    })
    useEffect(() => {
        setTime(timeSkip.green);
        setStatus({
            red: false,
            green: true,
            yellow: false,
            next: 'green',
        });
    }, []);
    useEffect(() => {
        switch (status.next) {
            case 'green':
                if (time > -1) {
                    let id = setInterval(() => {
                        setTime(time - 1);
                    }, 1000);
                    return () => {
                        clearInterval(id);
                    }
                } else {
                    setTime(timeSkip.yellow);
                    setStatus({
                        red: false,
                        green: false,
                        yellow: true,
                        next: 'yellow',
                    });
                }
                break;
            case 'red':
                if (time > -1) {
                    let id = setInterval(() => {
                        setTime(time - 1);
                    }, 1000);
                    return () => {
                        clearInterval(id);
                    }
                } else {
                    setTime(timeSkip.green);
                    setStatus({
                        red: false,
                        green: true,
                        yellow: false,
                        next: 'green',
                    });
                }
                break;
            case 'yellow':
                if (time > -1) {
                    let id = setInterval(() => {
                        setTime(time - 1);
                    }, 1000);
                    return () => {
                        clearInterval(id);
                    }
                } else {
                    setTime(timeSkip.red);
                    setStatus({
                        red: true,
                        green: false,
                        yellow: false,
                        next: 'red',
                    })
                }
                break;

            default:
                break;
        }


    }, [time])
    return (
        <>
            <div className='traffic-light-container'>
                <div className='traffic-light-header'>
                    <FormattedMessage id="traffic-light.header" />
                </div>
                <div className='traffic-light-body'>
                    <div className="traffic-light">
                        <span className={status.red ? "red" : "grey"}></span>
                        <span className={status.yellow ? "yellow" : "grey"}></span>
                        <span className={status.green ? "green" : "grey"}></span>
                    </div>
                    <div className='countdown'>
                        {time}
                    </div>
                </div>
                <div className='traffic-light-footer'></div>
            </div>

        </>
    )
}
export default TrafficLight;