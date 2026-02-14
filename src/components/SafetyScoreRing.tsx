import React, { useEffect, useState } from 'react';
import { SafetyScore } from '../types';
import { getTierColor } from '../utils/helpers';

interface SafetyScoreRingProps {
  safetyScore: SafetyScore;
  size?: number;
}

const SafetyScoreRing: React.FC<SafetyScoreRingProps> = ({
  safetyScore,
  size = 80,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 30;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let currentScore = 0;
    const increment = safetyScore.score / 30;
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= safetyScore.score) {
        setAnimatedScore(safetyScore.score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [safetyScore.score]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size + 16, height: size + 16 }}>
      <svg width={size + 16} height={size + 16} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={(size + 16) / 2}
          cy={(size + 16) / 2}
          r={30}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="white"
        />
        {/* Progress circle */}
        <circle
          cx={(size + 16) / 2}
          cy={(size + 16) / 2}
          r={30}
          stroke={getTierColor(safetyScore.tier)}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${(animatedScore / 100) * circumference} ${circumference}`}
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ width: size + 16, height: size + 16 }}>
        <span className="text-xl font-bold text-gray-800">{animatedScore}</span>
        <span className="text-xs text-gray-500">{safetyScore.tier}</span>
      </div>
    </div>
  );
};

export default SafetyScoreRing;
