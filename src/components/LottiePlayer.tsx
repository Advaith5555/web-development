import React from 'react';
import Lottie from 'react-lottie-player';

const LottiePlayer: React.FC<{ data: any; size?: number }> = ({ data, size = 120 }) => {
  if (!data) return null;
  return <Lottie play loop animationData={data} style={{ width: size, height: size }} />;
};

export default LottiePlayer;


