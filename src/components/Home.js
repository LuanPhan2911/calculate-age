
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { dateFormat, language } from "../utils/constant";
import { FormattedMessage } from 'react-intl';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import './Home.scss';
function Home() {
    // function usePrevious(value) {
    //     const ref = useRef();
    //     useEffect(() => {
    //         ref.current = value;
    //     });
    //     return ref.current;
    // }

    const [startDate, setStartDate] = useState(moment().startOf('day').valueOf());
    const currentDate = moment().startOf('day').valueOf();
    const [age, setAge] = useState({
        years: 0,
        months: 0,
        days: 0,
    });
    const lang = useSelector((state) => state.app.language);

    if (startDate) {

    }
    useEffect(() => {
        if (!startDate) {
            setAge({
                years: 0,
                months: 0,
                days: 0,
            })
        }
        let idTime = setTimeout(() => {
            let years = moment(currentDate).diff(moment(startDate), 'years');
            let months = moment(currentDate).diff(moment(startDate), 'months');
            let days = moment(currentDate).diff(moment(startDate), 'days');
            setAge({ ...age, years, months, days });
        }, 1000);
        return () => {
            clearTimeout(idTime);
        }
    }, [startDate]);
    return (

        <div className="container">
            <div className="home-container">
                <div className="home-content-header">
                    <FormattedMessage id="menu.welcome" />
                </div>
                <div className="home-content-body">
                    <div className="form-group">
                        <label><FormattedMessage id="menu.select-age" /></label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(moment(date).startOf('day').valueOf())}
                            dateFormat={lang === language.VI ? dateFormat.VI : dateFormat.EN}
                            maxDate={new Date()}
                            placeholderText={lang === language.VI ? dateFormat.VI.toUpperCase() : dateFormat.EN.toUpperCase()}
                        />
                    </div>
                    <div className="calculator-age">

                        <h5>
                            <FormattedMessage id="calculator-age.content" />
                            {age.years}
                            <FormattedMessage id="calculator-age.year" /> .
                        </h5>
                        <h5>
                            <FormattedMessage id="calculator-age.content2" />
                            {age.months}
                            <FormattedMessage id="calculator-age.month" />
                        </h5>
                        <h5>
                            <FormattedMessage id="calculator-age.content2" />
                            {age.days}
                            <FormattedMessage id="calculator-age.day" />
                        </h5>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;