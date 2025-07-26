import React, { useState, useEffect } from 'react';
import { HelpCircle, MoreVertical } from 'lucide-react';
import { Stack, Text } from '@tamagui/core';
import { YStack, XStack } from '@tamagui/stacks';
import { Button } from '@tamagui/button';
import { Card } from '@tamagui/card';
import { Separator } from '@tamagui/separator';
import { Sheet } from '@tamagui/sheet';
import { H1, H2, H3 } from '@tamagui/text';
import { CircularProgress } from './components/CircularProgress';

interface ChargingState {
  remainingTime: number;
  startTime: string;
  endTime: string;
  usageTime: number;
  freeTime: number;
}

export const ChargingScreen: React.FC = () => {
  const [chargingState, setChargingState] = useState<ChargingState>({
    remainingTime: 1620, // 27分钟 = 1620秒
    startTime: '19:12',
    endTime: '19:40',
    usageTime: 1,
    freeTime: -1
  });
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setChargingState(prev => {
        if (prev.remainingTime > 0) {
          return { ...prev, remainingTime: prev.remainingTime - 1 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEndCharging = () => {
    alert('充電を終了します');
  };

  return (
    <YStack flex={1} backgroundColor="$background" height="100%">
      {/* 头部 */}
      <XStack 
        paddingHorizontal="$4" 
        paddingVertical="$3" 
        alignItems="center" 
        justifyContent="space-between"
        backgroundColor="$backgroundStrong"
      >
        <Stack width={40} />
        <H1 fontSize="$6" fontWeight="600" color="$color">充電可能です...</H1>
        <MoreVertical size={24} color="currentColor" />
      </XStack>

      <YStack flex={1} padding="$5" gap="$4" alignItems="center">
        {/* 进度圆环 */}
        <YStack alignItems="center" justifyContent="center" marginVertical="$4">
          <CircularProgress
            remainingTime={chargingState.remainingTime}
            totalTime={1620}
          />
        </YStack>

        {/* 结束充电按钮 */}
        <Button 
          size="$5" 
          backgroundColor="$red10" 
          color="white"
          onPress={handleEndCharging}
          width="100%"
          maxWidth={300}
          borderRadius="$3"
          height={50}
          fontSize="$5"
          fontWeight="600"
          pressStyle={{ scale: 0.98, opacity: 0.9 }}
        >
          利用を終了する
        </Button>

        {/* 帮助按钮 */}
        <Button 
          size="$3" 
          backgroundColor="transparent"
          onPress={() => setShowHelp(true)}
          icon={<HelpCircle size={18} />}
          color="$color"
          pressStyle={{ opacity: 0.6 }}
        >
          利用を終了するには
        </Button>

        {/* 使用状态信息 */}
        <Card 
          elevate 
          size="$4" 
          width="100%" 
          maxWidth={400}
          backgroundColor="$backgroundStrong"
          padding="$4"
        >
          <H3 fontSize="$5" marginBottom="$3">利用状況</H3>
          <Separator marginBottom="$3" />
          
          <XStack justifyContent="space-between" marginBottom="$2">
            <Text color="$colorHover" fontSize="$3">利用開始時刻</Text>
            <Text fontWeight="600" fontSize="$3">{chargingState.startTime}</Text>
          </XStack>

          <XStack justifyContent="space-between" marginBottom="$2">
            <Text color="$colorHover" fontSize="$3">利用終了時刻</Text>
            <Text fontWeight="600" fontSize="$3">{chargingState.endTime}</Text>
          </XStack>

          <XStack justifyContent="space-between" marginBottom="$2">
            <Text color="$colorHover" fontSize="$3">利用時間(1分未満切り上げ)</Text>
            <Text fontWeight="600" fontSize="$3">{chargingState.usageTime}分</Text>
          </XStack>

          <XStack justifyContent="space-between">
            <Text color="$colorHover" fontSize="$3">うち無料時間(準備時間として)</Text>
            <Text fontWeight="600" fontSize="$3">{chargingState.freeTime}分</Text>
          </XStack>
        </Card>
      </YStack>

      {/* 帮助弹窗 */}
      <Sheet
        modal
        open={showHelp}
        onOpenChange={setShowHelp}
        snapPoints={[30]}
        position={0}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          <YStack gap="$4">
            <H2 fontSize="$6">充電を終了する方法</H2>
            <Text fontSize="$4" color="$colorHover">
              充電器を車両から取り外すか、「利用を終了する」ボタンを押してください
            </Text>
            <Button
              size="$4"
              onPress={() => setShowHelp(false)}
              backgroundColor="$backgroundStrong"
            >
              閉じる
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
};