import React, { useEffect, useState } from "react";
import Board from "../board/Board";
import "./style.css";
export default function Container() {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("5");
  return (
    <div className="container">
      <div className="tools-section">
        <div className="color-picker-container">
          Select Brush Color : &nbsp;
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </div>
        <div className="brushsize-container">
          Select Brush Size : &nbsp;
          <select
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
          </select>
        </div>
      </div>

      <div className="board-container">
        <Board color={color} size={size} />
      </div>
    </div>
  );
}
