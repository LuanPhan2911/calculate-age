import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function Home() {
    const [selectedDate, setSelectedDate] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedYear, setSelectedYear] = useState(1970);
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [dates, setDates] = useState([]);
    const [age, setAge] = useState({});
    const [showAge, setShowAge] = useState(false);

    useEffect(() => {
        setYears(generateYear());
        setMonths(generateMonth());
        setDates(generateDate());
    }, []);
    useEffect(() => {
        setMonths(generateMonth());
        setDates(generateDate());
    }, [selectedYear])
    useEffect(() => {
        setDates(generateDate());
    }, [selectedMonth]);
    const generateYear = () => {
        let currentYear = (new Date()).getFullYear();
        let years = [];
        for (let index = 1970; index <= currentYear; index++) {
            years.push(index);
        }
        return years;
    }
    const generateMonth = () => {
        let currentYear = (new Date()).getFullYear();
        let currentMonth = (new Date()).getMonth();
        let years = [];
        if (+selectedYear === currentYear) {

            for (let index = 1; index <= currentMonth + 1; index++) {
                years.push(index);
            }
        } else {
            for (let index = 1; index <= 12; index++) {
                years.push(index);
            }
        }

        return years;
    }
    const generateDate = () => {
        let dates = [];
        let currentYear = (new Date()).getFullYear();
        let currentMonth = (new Date()).getMonth();
        let currentDate = (new Date()).getDate();
        if (+selectedYear === currentYear && +selectedMonth === currentMonth + 1) {
            for (let index = 1; index <= currentDate; index++) {
                dates.push(index);

            }
        } else if (
            +selectedMonth === 1 ||
            +selectedMonth === 3 ||
            +selectedMonth === 5 ||
            +selectedMonth === 7 ||
            +selectedMonth === 8 ||
            +selectedMonth === 10 ||
            +selectedMonth === 12
        ) {
            for (let index = 1; index <= 31; index++) {
                dates.push(index);
            }
        } else if (
            +selectedMonth === 4 ||
            +selectedMonth === 6 ||
            +selectedMonth === 9 ||
            +selectedMonth === 11
        ) {
            for (let index = 1; index <= 30; index++) {
                dates.push(index);
            }
        } else if (
            +selectedMonth === 2 &&
            isLeapYear(selectedYear)
        ) {
            for (let index = 1; index <= 29; index++) {
                dates.push(index);
            }
        } else if (
            +selectedMonth === 2 &&
            !isLeapYear(selectedYear)
        ) {
            for (let index = 1; index <= 28; index++) {
                dates.push(index);
            }
        } else {
            for (let index = 1; index <= 31; index++) {
                dates.push(index);
            }
        }


        return dates;

    }


    function isLeapYear(year) {
        return ((+year % 4 === 0) && (+year % 100 !== 0)) || (+year % 400 === 0);
    }
    const handleCalculatorAge = () => {
        let currentYear = (new Date()).getFullYear();
        let currentMonth = (new Date()).getMonth();
        let currentDate = (new Date()).getDate();
        let calculatorAge = currentYear - selectedYear;
        let calculatorMonth = '';
        let calculatorDay = '';
        if (currentMonth + 1 >= selectedMonth) {
            calculatorMonth = currentMonth + 1 - selectedMonth;
        } else {
            calculatorAge--;
            calculatorMonth = 12 + currentMonth + 1 - selectedMonth;
        }
        if (currentDate >= selectedDate) {
            calculatorDay = currentDate - selectedDate;
        } else {
            calculatorMonth--;
            calculatorDay = 31 + currentDate - selectedDate;
            if (calculatorMonth < 0) {
                calculatorMonth = 12;
                calculatorAge--;
            }
        }
        setAge({
            year: calculatorAge,
            month: calculatorMonth,
            day: calculatorDay,

        });
        setShowAge(true);
    }

    return (

        <div className="container">
            <div className="card">
                <div className="card-header">
                    Welcome to Calculator Age
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="form-group col-2">
                            <label>Enter your year of birth</label>
                            <select
                                className="form-control"
                                onChange={(event) => setSelectedYear(+event.target.value)}
                                value={selectedYear}
                            >
                                {
                                    years && years.length > 0 && years.map(
                                        (item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >{item}</option>
                                            );
                                        }
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group col-2">
                            <label>Enter your month of birth</label>
                            <select
                                className="form-control"
                                onChange={(event) => setSelectedMonth(+event.target.value)}
                                value={selectedMonth}
                            >
                                {
                                    months && months.length > 0 && months.map(
                                        (item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >{item}</option>
                                            );
                                        }
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-group col-2">
                            <label>Enter your date of birth</label>
                            <select
                                className="form-control"
                                onChange={(event) => setSelectedDate(+event.target.value)}
                                value={selectedDate}
                            >
                                {
                                    dates && dates.length > 0 && dates.map(
                                        (item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >{item}</option>
                                            );
                                        }
                                    )
                                }
                            </select>
                        </div>

                    </div>
                    <div className="calculator-age my-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleCalculatorAge()}
                        >Calculator Age</button>
                    </div>
                    {
                        showAge &&
                        <div className="show-age">
                            <h4>
                                You alive {age.year} years {age.month} months {age.day} days
                            </h4>
                        </div>
                    }



                </div>
            </div>
        </div>
    );
}
export default Home;