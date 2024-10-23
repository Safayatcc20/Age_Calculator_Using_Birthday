import { useState } from "react";
import "./App.css";

function App() {
  const [birthday, setBirthday] = useState("");
  const [birthmonth, setBirthonth] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const [age, setAge] = useState("");
  const [errormessage, setErrormessage] = useState("");

  // Calculate Age
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    
    let ageInYears = today.getFullYear() - birthDate.getFullYear();
    let ageInMonths = today.getMonth()+ 1- birthDate.getMonth();
    let ageInDays = today.getDate() - birthDate.getDate();

    
    if (ageInDays < 0) {
      ageInMonths--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageInDays += lastMonth.getDate(); 
    }

    if (ageInMonths < 0) {
      ageInYears--;
      ageInMonths += 12; 
    }

    return { years: ageInYears, months: ageInMonths, days: ageInDays };
  };

  // Function to validate the dates and calculate age
  const validation = (e) => {
    e.preventDefault();

    const birthtd = Number(birthday);
    const birthtm = Number(birthmonth);
    const birthty = Number(birthyear);
    const today = new Date();

    
    const dob = new Date(birthty, birthtm - 1, birthtd);

    
    if (dob > today) {
      setErrormessage("Date of birth cannot be in the future.");
      setAge("");
      return;
    }

    setErrormessage("");
    const { years, months, days } = calculateAge(dob);
    setAge(`Age: ${years} years, ${months} months, and ${days} days`);
  };

  // Function to check the maximum day based on month and year
  const getMaxDaysInMonth = (month, year) => {
    if (month === 2) { // February
      return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }
  };

  return (
    <>
      <div className="information">
        <h1>Age Calculator</h1>
        <form onSubmit={validation}>
          <div className="birth">
            <label htmlFor="begin">Date of Birth:</label>
            <input
              type="number"
              id="begin"
              placeholder="Year"
              value={birthyear}
              onChange={(e) => setBirthyear(e.target.value)}
              required
            />
            <input
              type="number"
              id="begin"
              placeholder="Month"
              value={birthmonth}
              min="1"
              max="12"
              onChange={(e) => setBirthonth(e.target.value)}
              required
            />
            <input
              type="number"
              id="begin"
              placeholder="Day"
              value={birthday}
              min="1"
              max={getMaxDaysInMonth(Number(birthmonth), Number(birthyear))}
              onChange={(e) => setBirthday(e.target.value)}
              required
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
