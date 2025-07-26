import React, { useState, useEffect } from 'react';
import { Stack, Text } from '@tamagui/core';
import { XStack, YStack } from '@tamagui/stacks';
import { Battery, Wifi, Signal } from 'lucide-react';

interface IPhoneWrapperProps {
  children: React.ReactNode;
  model?: 'iPhone14' | 'iPhone14Pro' | 'iPhone15Pro';
}

export const IPhoneWrapper: React.FC<IPhoneWrapperProps> = ({ 
  children, 
  model = 'iPhone14Pro' 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const deviceSpecs = {
    iPhone14: {
      width: 390,
      height: 844,
      scale: 0.6,
      hasNotch: true,
      hasDynamicIsland: false,
    },
    iPhone14Pro: {
      width: 393,
      height: 852,
      scale: 0.6,
      hasNotch: false,
      hasDynamicIsland: true,
    },
    iPhone15Pro: {
      width: 393,
      height: 852,
      scale: 0.6,
      hasNotch: false,
      hasDynamicIsland: true,
    },
  };

  const specs = deviceSpecs[model];

  return (
    <YStack
      backgroundColor="#f0f0f0"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      padding="$4"
    >
      {/* iPhone Device Frame */}
      <Stack
        backgroundColor="#1c1c1c"
        borderRadius={50}
        padding={8}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 20 }}
        shadowOpacity={0.3}
        shadowRadius={40}
        transform={[{ scale: specs.scale }]}
      >
        {/* Screen */}
        <Stack
          width={specs.width}
          height={specs.height}
          backgroundColor="#000"
          borderRadius={42}
          overflow="hidden"
          position="relative"
        >
          {/* Status Bar */}
          <XStack
            position="absolute"
            top={0}
            left={0}
            right={0}
            height={44}
            paddingHorizontal="$4"
            paddingTop="$2"
            alignItems="center"
            justifyContent="space-between"
            zIndex={1000}
            backgroundColor="transparent"
          >
            {/* Left side - Time */}
            <Text color="white" fontSize={15} fontWeight="600">
              {formatTime(currentTime)}
            </Text>

            {/* Center - Dynamic Island or Notch */}
            {specs.hasDynamicIsland && (
              <Stack
                position="absolute"
                top={10}
                left="50%"
                x="-50%"
                width={120}
                height={32}
                backgroundColor="#000"
                borderRadius={20}
              />
            )}

            {/* Right side - Status icons */}
            <XStack alignItems="center" gap="$1">
              <Signal size={16} color="white" fill="white" />
              <Wifi size={16} color="white" fill="white" />
              <Battery size={20} color="white" fill="white" />
            </XStack>
          </XStack>

          {/* App Content */}
          <Stack flex={1} backgroundColor="white">
            {children}
          </Stack>

          {/* Home Indicator */}
          <Stack
            position="absolute"
            bottom={8}
            left="50%"
            x="-50%"
            width={134}
            height={5}
            backgroundColor="white"
            borderRadius={3}
            opacity={0.6}
          />
        </Stack>
      </Stack>

      {/* Device Model Label */}
      <Text
        marginTop="$4"
        color="#666"
        fontSize="$3"
      >
        {model} Simulator
      </Text>
    </YStack>
  );
};