import React from 'react';
import dynamic from 'next/dynamic';
import { ETypingStatType, ITypingStat } from '@components/practice/game/types/practice-game';
import { useColorModeValue, Flex, Box } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StatLineChartProps {
  statsData: ITypingStat[];
  statType?: ETypingStatType;
}

export const StatLineChart: React.FC<StatLineChartProps> = ({ statsData, statType = ETypingStatType.WPM }) => {
  const chartBackgroundColor = useColorModeValue('rgba(68, 51, 122, 0.35)', 'rgba(68, 51, 122, 0.35)');
  /**
   *
   * @returns the array containing the data based on the type passed from props
   */
  const generateData = (): number[] | string[] => {
    const array: string[] = statsData.map((entry) => {
      switch (statType) {
        case ETypingStatType.ERRORS: {
          return entry.errors.toString();
        }
        case ETypingStatType.CORRECT: {
          return entry.correct.toString();
        }
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
    return array;
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
    },
    title: {
      text: `${statType.valueOf()} progression`,
      align: 'left',
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: generateLabels(),
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
      <ReactApexChart options={options} series={series} type="area" width="100%" height="100%" />
    </Box>
  );
};
