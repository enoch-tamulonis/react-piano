import { React } from "react"
import { useRef, useEffect, useState } from "react"

const WaveVisual = ({ type }) => {
  useEffect(() => {
    const oscillatorTypeMap = {
      sine: plotSine,
      square: plotSquare,
      sawtooth: plotSawtooth,
      triangle: plotTriangle,
    }
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (Object.keys(oscillatorTypeMap).includes(type)) {
      oscillatorTypeMap[type]()
    }
  }, [type])
  const canvasRef = useRef(null)
  const plotSine = () => {
    const ctx = canvasRef.current.getContext("2d");
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgb(151, 139, 255)";

    let x = 0;
    let y = 0;
    const amplitude = 40;
    const frequency = 20;
    //ctx.moveTo(x, y);
    while (x < width) {
        y = height/2 + amplitude * Math.sin(x/frequency);
        ctx.lineTo(x, y);
        x = x + 1;
    }
    ctx.stroke();
  }

  const plotSquare = () => {
    const ctx = canvasRef.current.getContext("2d");
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.strokeStyle = "rgb(151, 139, 255)";
    const padding = 10
    let x = 0
    let y = padding
    ctx.beginPath();
    ctx.moveTo(0, padding);
    while(x < width) {
      x += 100
      ctx.lineTo(x, y);
      if (x != width) {
        let newY;
        if (y == padding) {
          newY = height - 10
        } else {
          newY = padding
        }
        ctx.lineTo(x, newY);
        y = newY
      }
    }
    ctx.stroke();
  }

  const plotSawtooth = () => {
    const ctx = canvasRef.current.getContext("2d");
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.strokeStyle = "rgb(151, 139, 255)";
    const padding = 10
    let x = 0
    ctx.beginPath();
    ctx.moveTo(0, padding);
    while(x < width) {
      x += 100
      ctx.lineTo(x, height - padding);
      if (x != width) ctx.lineTo(x, padding);
    }
    ctx.stroke();
  }

  const plotTriangle = () => {
    const ctx = canvasRef.current.getContext("2d");
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.strokeStyle = "rgb(151, 139, 255)";
    const padding = 10
    let x = 0
    let y = padding
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    while(x < width) {
      x += 100
      ctx.lineTo(x, y);
      if (y == padding) {
        y = height - padding
      } else {
        y = padding
      }
    }
    ctx.stroke();
  }

  return (
    <div className="w-full">
      <canvas id="canvas" width="500" height="100" ref={canvasRef} className="w-full h-full bg-gray-500"></canvas>
    </div>
  )
}

export default WaveVisual
