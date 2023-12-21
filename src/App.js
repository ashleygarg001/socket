import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3009');

const CanvasDrawingApp = () => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    socket.on('draw', (drawingData) => {
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
  
      ctx.lineTo(drawingData.x, drawingData.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(drawingData.x, drawingData.y);
    });

    const startDrawing = (e) => {
      setIsDrawing(true);
      draw(e);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!isDrawing) return;

      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';

      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

      socket.emit('draw', {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop,
      });
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mousemove', draw);
    };
  }, [isDrawing]);

  return (
    <div>
      <canvas
        id="drawingCanvas"
        width={800}
        height={600}
        style={{ border: '1px solid #000' }}
      />
    </div>
  );
};

export default CanvasDrawingApp;
