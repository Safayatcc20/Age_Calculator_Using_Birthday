import { useState } from "react";
import "./App.css";

function my() {
  const [startday, setStartday] = useState("");
  const [endday, setEndday] = useState("");
  const [startmonth, setStartonth] = useState("");
  const [endmonth, setEndmonth] = useState("");
  const [startyear, setStartyear] = useState("");
  const [endyear, setEndyear] = useState("");
  const [age, setAge] = useState("");

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();
  const [errormessage, setErrormeassage] = useState("");

  //Calculate Age
  const calculateAge = (startd, startm, starty, endd, endm, endy) => {
    let yeardifference = endy - starty;
    let monthdifference = endm - startm;
    let daydifference = endd - startd;

    if (daydifference < 0) {
      monthdifference -= 1;
      daydifference += new Date(endy, endm - 1, 0).getDate();
    }
    if (monthdifference < 0) {
      yeardifference -= 1;
      monthdifference += 12;
    }
    return `${yeardifference} years, ${monthdifference} months, and ${daydifference} days`;
  };

  // Function to validate the dates and check the range
  const validation = (e) => {
    e.preventDefault();

    const startd = Number(startday);
    const startm = Number(startmonth);
    const starty = Number(startyear);

    const endd = endday ? Number(endday) : todayDay;
    const endm = endmonth ? Number(endmonth) : todayMonth;
    const endy = endyear ? Number(endyear) : todayYear;

    if (endy < starty) {
      setErrormeassage(
        "End year must be greater than or equal to the start year."
      );
      setAge("");
      return;
    } else if (endy === starty && endm < startm) {
      setErrormeassage(
        "If the year is the same, the end month must be greater than or equal to the start month."
      );
      setAge("");
      return;
    } else if (endy === starty && endm === startm && endd < startd) {
      setErrormeassage(
        "If the year and month are the same, the end day must be greater than or equal to the start day."
      );
      setAge("");
      return;
    }

    setErrormeassage("");
    const age = calculateAge(startd, startm, starty, endd, endm, endy);
    setAge(`Age:${age}`);
  };

  return (
    <>
      <div className="information">
        <h1>Age Calculator</h1>
        <form onSubmit={validation}>
          <div className="start">
            <label htmlFor="begin">Start Date:</label>
            <input
              type="number"
              id="begin"
              placeholder="Day"
              value={startday}
              min="1"
              max="31"
              onChange={(e) => setStartday(e.target.value)}
              required
            />
            <input
              type="number"
              id="begin"
              placeholder="Month"
              value={startmonth}
              min="1"
              max="12"
              onChange={(e) => setStartonth(e.target.value)}
              required
            />
            <input
              type="number"
              id="begin"
              placeholder="Year"
              value={startyear}
              onChange={(e) => setStartyear(e.target.value)}
              required
            />
          </div>

          <div className="end">
            <label htmlFor="finish">End Date:</label>
            <input
              type="number"
              id="finish"
              placeholder="Day"
              value={endday}
              min="1"
              max="31"
              onChange={(e) => setEndday(e.target.value)}
            />
            <input
              type="number"
              id="finish"
              placeholder="Month"
              value={endmonth}
              min="1"
              max="12"
              onChange={(e) => setEndmonth(e.target.value)}
            />
            <input
              type="number"
              id="finish"
              placeholder="Year"
              value={endyear}
              onChange={(e) => setEndyear(e.target.value)}
            />
          </div>

          <button type="submit">Calculate Age</button>
        </form>

        {errormessage && <p className="error">{errormessage}</p>}

        {age && <h2>{age}</h2>}
      </div>
    </>
  );
}

export default App;
