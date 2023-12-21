import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3003');

function App() {
  const [drawing, setDrawing] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Set up event listeners
    socket.on('draw', (drawingData) => {
      setDrawing(drawingData);
    });

    // Clean up event listeners on unmount
    return () => {
      socket.off('draw');
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    socket.emit('draw', drawing);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { clientX, clientY } = e;
    const point = { x: clientX, y: clientY };

    setDrawing((prevDrawing) => [...prevDrawing, point]);
  };

  return (
    <div>
      <div>
      <div>Mouse is moving {drawing.length}</div>
        <canvas
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          width={800}
          height={600}
          style={{ border: '1px solid #000' }}
        />
      </div>
    </div>
  );
}

export default App;