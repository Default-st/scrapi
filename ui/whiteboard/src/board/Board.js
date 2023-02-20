import React from "react";
import "./style.css";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/socket";

export default function Board(props) {
  const color = props.color;
  const brushSize = props.size;
  const socket = useContext(SocketContext);
  let isDrawing = false;

  useEffect(() => {
    console.log("Inside UseEffect");
    drawOnCanvas();
    socket.on("canvas-data", function (data) {
      const interval = setInterval(function () {
        if (isDrawing) return;
        isDrawing = true;
        clearInterval(interval);
        const image = new Image();
        const canvas = document.querySelector("#board");
        const ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
          isDrawing = false;
        };
        image.src = data;
      });
    });
  }, []);

  useEffect(() => {
    let canvas = document.querySelector("#board");
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
  }, [brushSize, color]);

  const drawOnCanvas = () => {
    var canvas = document.querySelector("#board");
    var ctx = canvas.getContext("2d");

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = brushSize;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );
    let rootTimeout;
    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (rootTimeout !== undefined) {
        clearTimeout(rootTimeout);
      }
      rootTimeout = setTimeout(() => {
        const base64ImageData = canvas.toDataURL("image/png");
        socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  };
  return (
    <div className="sketch" id="sketch">
      <canvas className="board" id="board"></canvas>
    </div>
  );
}
