import React, { useState } from "react";

const LeaveTracker = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [hours, setHours] = useState(0);
  const [rate, setRate] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleCalculate = (updatedHours, updatedRate) => {
    const h = parseFloat(updatedHours) || 0;
    const r = parseFloat(updatedRate) || 0;
  
    setTotalPay(parseFloat((h * r).toFixed(2)));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!employeeName || hours <= 0 || rate <= 0) {
      setMessage("Please fill in all fields with valid values.");
      setIsError(true);
      return;
    }

    const payload = {
      employeeName: employeeName,
      overtimeHours: hours,
      hourlyRate: rate,
      totalOvertimePay: totalPay
    };

    try {
      const response = await fetch("http://localhost:5000/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setMessage("Leave tracker data saved successfully!");
        setIsError(false);
        setEmployeeName("");
        setHours(0);
        setRate(0);
        setTotalPay(0);
      }else {
        setMessage("Failed to save leave tracker data.");
        setIsError(true);
      }
    } catch (error) {
      setMessage("An error occurred while saving data.");
      setIsError(true);
    }
  };

  return (
    <div>
      <h4>Overtime Leave Tracker</h4>
      <form onSubmit={handleSave}>
        <div>
          <label>Employee Name:</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>
        <div>
          <label>Overtime Hours:</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => {
              const updatedHours = e.target.value;
              setHours(updatedHours);
              handleCalculate(updatedHours, rate);
            }}
          />
        </div>
        <div>
          <label>Hourly Rate:</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => {
              const updatedRate = e.target.value;
              setRate(updatedRate);
              handleCalculate(hours, updatedRate);
            }}
          />
        </div>
        <div>
          <label>Total Overtime Pay:</label>
          <input
            type="number"
            value={totalPay}
            readOnly
          />
        </div>
        <button type="submit">Save</button>
      </form>

      {message && (
        <p style={{ color: isError ? "red" : "green" }}>{message}</p>
      )}
    </div>
  );
};

export default LeaveTracker;
