import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Timer } from 'lucide-react';
import { Stack, Text, useTheme } from '@tamagui/core';

interface CircularProgressProps {
  remainingTime: number;
  totalTime: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  remainingTime,
  totalTime,
  size = 240,
  strokeWidth = 20
}) => {
  const theme = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = remainingTime / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Stack position="relative" display="inline-flex">
      <svg width={size} height={size}>
        {/* 背景圆 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.borderColor?.val || '#E8EDF4'}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* 进度圆 */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.red10?.val || '#FF6B35'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </svg>
      
      {/* 中心内容 */}
      <Stack
        position="absolute"
        top="50%"
        left="50%"
        x="-50%"
        y="-50%"
        alignItems="center"
      >
        <Text color="$green10" fontSize="$4" marginBottom="$1">
          残り時間
        </Text>
        <Text fontSize={40} fontWeight="bold" color="$green10">
          {formatTime(remainingTime)}
        </Text>
        <Stack
          flexDirection="row"
          alignItems="center"
          gap="$2"
          marginTop="$2"
        >
          <Clock size={20} color={theme.colorHover?.val || '#888'} />
          <Text color="$colorHover">=</Text>
          <Timer size={20} color={theme.red10?.val || '#FF6B35'} />
        </Stack>
      </Stack>
    </Stack>
  );
};