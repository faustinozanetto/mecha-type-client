import React from 'react';
import dynamic from 'next/dynamic';
import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import { PracticeStatType, PracticeStatsEntry } from '@typings/practice.types';

// @ts-ignore
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StatLineChartProps {
  statsData: PracticeStatsEntry[];
  statType?: PracticeStatType;
}

export const StatLineChart: React.FC<StatLineChartProps> = ({ statsData, statType = PracticeStatType.WPM }) => {
  const { colorMode } = useColorMode();
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
      type: 'area',
      height: 350,
      zoom: { enabled: false },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#F44336', '#E91E63', '#9C27B0'],
      },
    },
    title: {
      text: `${statType.valueOf()} progression`,
      align: 'left',
      style: { color: useColorModeValue('#000', '#fff'), fontWeight: '600', fontSize: '16' },
    },
    colors: ['#F44336', '#E91E63', '#9C27B0'],
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: generateLabels(),
      labels: { style: { colors: useColorModeValue('#000', '#fff') } },
    },
    yaxis: {
      labels: { style: { colors: useColorModeValue('#000', '#fff') } },
    },
    markers: {
      colors: ['#F44336', '#E91E63', '#9C27B0'],
    },
    tooltip: {
      x: {
        format: 'yy/MM/dd',
      },
    },
  };

  const series = [
    {
      name: statType.valueOf(),
      data: generateData(),
    },
  ];

  return (
    <Box w="100%" h={{ sm: '300px' }} ps="8px">
      {/* @ts-ignore */}
      <ReactApexChart options={options} series={series} type="area" width="100%" height="100%" />
    </Box>
  );
};
