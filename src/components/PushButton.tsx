import React, { useState } from 'react';
import '../styles/PushButton.css'; // Add CSS for button styling

type Props = {
  onPress: () => void;
  onRelease: () => void;
};

const PushButton: React.FC<Props> = ({ onPress, onRelease }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
    onPress();
  };

  const handleMouseUp = () => {
    if (isHolding) {
      setIsHolding(false);
      onRelease();
    } 
    setIsPressed(false);
  };

  return (
    <button
      className={`push-button ${isPressed ? 'pressed' : ''} ${isHolding ? 'holding' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Handle case when mouse leaves the button while pressed
    >
      Press, Hold, Release
    </button>
  );
};

export default PushButton;
