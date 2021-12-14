import React from 'react';
import dynamic from 'next/dynamic';
import { PracticeStatType, PracticeStatsEntry } from '@typings/practice.types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';

// @ts-ignore
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StatDonutChartProps {
  statsData: PracticeStatsEntry[];
  statType?: PracticeStatType;
}

export const StatDonutChart: React.FC<StatDonutChartProps> = ({ statsData, statType = PracticeStatType.WPM }) => {
  /**
   *
   * @returns the array containing the data based on the type passed from props
   */
  const generateData = (): number[] | string[] => {
    let data: string[] | number[] = [];
    if (statType !== PracticeStatType.CHARS) {
      data = statsData.map((entry) => {
        switch (statType) {
          case PracticeStatType.WPM: {
            return entry.wpm.toString();
          }
          case PracticeStatType.CPM: {
            return entry.cpm.toString();
          }
          case PracticeStatType.ACCURACY: {
            return entry.accuracy.toFixed(2);
          }
          case PracticeStatType.KEYSTROKES: {
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
