
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import { dateFormat, language } from "../utils/constant";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
function Home() {
    const [startDate, setStartDate] = useState(moment().startOf('day').valueOf());
    const [hour, setHour] = useState('00:00:00');
    const [showSelectHour, setShowSelectHour] = useState(false);
    const lang = useSelector((state) => state.app.language);

    console.log(moment(startDate).format('DD/MM/yyyy'));

    return (

        <div className="container">
            <div className="card">
                <div className="card-header">
                    Welcome to Calculator Age
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label>Choose your birth date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(moment(date).startOf('day').valueOf())}
                            dateFormat={lang === language.VI ? dateFormat.VI : dateFormat.EN}
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="show-select-hour">
                        {showSelectHour === false && <h6>
                            If you know exact time your birth date,click here to select time➡️


                            <button
                                className="btn btn-info"
                                onClick={() => setShowSelectHour(true)}
                            >Select Time</button>
                        </h6>
                        }
                    </div>
                    <div className="select-time">
                        <TimePicker onChange={setHour} value={hour} />
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Home;