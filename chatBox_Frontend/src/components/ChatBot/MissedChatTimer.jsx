import React, { useState,useEffect } from "react";
import "../../cssFiles/ChatBot/MissedChatTimer.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveChatBoxConfig } from "../../stateManagement/chatBoxSlice";
import {toast} from 'react-hot-toast'

export default function MissedChatTimer() {
 const { missedChatTimer } = useSelector((state) => state.chatBox);

const dispatch = useDispatch();
const [hours, setHours] = useState("00");
const [minutes, setMinutes] = useState("00");
const [seconds, setSeconds] = useState("00");

useEffect(() => {
  if (missedChatTimer !== undefined && missedChatTimer !== null) {
    const formatted = String(missedChatTimer).padStart(2, "0");
    if (formatted !== minutes) {
      setMinutes(formatted);
    }
  }
}, [missedChatTimer, minutes]);

  const generateOptions = (range) =>
    Array.from({ length: range }, (_, i) => String(i).padStart(2, "0"));

  const handleSave = () => {
    const totalMinutes =
      parseInt(hours, 10) * 60 +
      parseInt(minutes, 10) +
      parseInt(seconds, 10) / 60;

    dispatch(
      saveChatBoxConfig({
        missedChatTimer: totalMinutes,
      })
    )
    .unwrap() // unwraps the thunk promise
    .then(() => {
      toast.success("Missed chat timer saved successfully!");
    })
    .catch(() => {
      toast.error("Failed to save missed chat timer.");
    });
  };
  return (
    <div className="timer-container">
      <h3>Missed Chat Timer</h3>
      <div className="dropdown-row">
        <select value={hours} onChange={(e) => setHours(e.target.value)}>
          {generateOptions(24).map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span>:</span>
        <select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
          {generateOptions(60).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <span>:</span>
        <select value={seconds} onChange={(e) => setSeconds(e.target.value)}>
          {generateOptions(60).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="save-btn-row">
        <button className="save-btn-timer" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
