import React from 'react';
import dynamic from 'next/dynamic';
import { ETypingStatType, ITypingStat } from '@components/practice/game/types/practice-game';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';

// @ts-ignore
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StatDonutChartProps {
  statsData: ITypingStat[];
  statType?: ETypingStatType;
}

export const StatDonutChart: React.FC<StatDonutChartProps> = ({ statsData, statType = ETypingStatType.WPM }) => {
  /**
   *
   * @returns the array containing the data based on the type passed from props
   */
  const generateData = (): number[] | string[] => {
    let data: string[] | number[] = [];
    if (statType !== ETypingStatType.CHARS) {
      data = statsData.map((entry) => {
        switch (statType) {
          case ETypingStatType.WPM: {
            return entry.wpm.toString();
          }
          case ETypingStatType.CPM: {
            return entry.cpm.toString();
          }
          case ETypingStatType.ACCURACY: {
            return entry.accuracy.toFixed(2);
          }
          case ETypingStatType.KEYSTROKES: {
            return entry.keystrokes.toString();
          }
          default: {
            return entry.wpm.toString();
          }
        }
      });
    } else {
      const correctChars = statsData
        .map((entry) => entry.correct)
        .reduce((tot, char) => {
          return tot + char;
        }, 0);
      const incorrectChars = statsData
        .map((entry) => entry.errors)
        .reduce((tot, char) => {
          return tot + char;
        }, 0);
      data = [correctChars, incorrectChars];
    }
    return data;
  };

  /**
   *
   * @returns the array containing the labels for the chart.
   */
  const generateLabels = (): string[] => {
    return statsData.map((entry) => {
      // If time registry is of type number, we parse it as second, timestamp.
      if (typeof entry.time === 'number') {
        return `${entry.time}s`;
      } else {
        const date = new Date(entry.time);
        return date.toISOString().split('T')[0];
      }
    });
  };

  const options: ApexOptions = {
    chart: {
      width: 300,
      type: 'pie',
    },
    dataLabels: {
      enabled: true,
    },
    labels: ['Correct', 'Incorrect'],
    colors: ['#48BB78', '#E53E3E'],
    title: {
      text: `${statType.valueOf()} progression`,
      align: 'left',
      style: { color: useColorModeValue('#000', '#fff'), fontWeight: '600', fontSize: '16' },
    },
  };

  return (
    <Box w="100%" h={{ sm: '300px' }} ps="8px">
      {/* @ts-ignore */}
      <ReactApexChart options={options} series={generateData()} type="pie" width={400} />
    </Box>
  );
};
