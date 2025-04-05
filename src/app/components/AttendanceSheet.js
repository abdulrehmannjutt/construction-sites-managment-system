import React, { useState } from "react";

function AttendanceSheet({ site, updateAttendance }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Generate days in the selected month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Format options for attendance status
  const attendanceOptions = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "half", label: "Half Day" },
  ];

  // Month names for dropdown
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate year options (current year and a few previous years)
  const yearOptions = [];
  const currentYearValue = new Date().getFullYear();
  for (let i = currentYearValue - 2; i <= currentYearValue + 1; i++) {
    yearOptions.push(i);
  }

  const handleAttendanceChange = (workerId, day, e) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    updateAttendance(workerId, date, e.target.value);
  };

  const getAttendanceStatus = (worker, day) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return worker.attendance[date] || "";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "present":
        return "status-present";
      case "absent":
        return "status-absent";
      case "half":
        return "status-half";
      default:
        return "";
    }
  };

  return (
    <div className="attendance-container">
      <div className="attendance-controls">
        <div className="month-selector">
          <label>Month:</label>
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>

          <label>Year:</label>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="attendance-table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th className="worker-name-header">Worker Name</th>
              {days.map((day) => (
                <th key={day} className="date-header">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {site.workers.map((worker) => (
              <tr key={worker.id}>
                <td className="worker-name">{worker.name}</td>
                {days.map((day) => {
                  const status = getAttendanceStatus(worker, day);
                  return (
                    <td
                      key={day}
                      className={`attendance-cell ${getStatusClass(status)}`}
                    >
                      <select
                        value={status}
                        onChange={(e) =>
                          handleAttendanceChange(worker.id, day, e)
                        }
                      >
                        <option value="">-</option>
                        {attendanceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceSheet;
