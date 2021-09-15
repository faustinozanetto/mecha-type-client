import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import { ETypingStatType, ITypingStat } from '@components/practice/game/types/practice-game-input';
import { useColorModeValue, Flex } from '@chakra-ui/react';

const ChartContainer = styled.div`
  background-color: #0f172a;
  padding: 1.5rem;
  border-radius: 20px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  display: flex;

  /* max-width: 350px; */
  align-items: center;
  margin-bottom: 1rem;
`;

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
    const array = statsData.map((entry) => `${entry.time}s`);
    return array;
  };

  const data = {
    labels: generateLabels(),
    datasets: [
      {
        label: statType.valueOf(),
        data: generateData(),
        fill: true,
        backgroundColor: chartBackgroundColor,
        borderColor: '#7E22CE',
        tension: 0.3,
      },
    ],
  };

  const options = {
    sales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    title: {
      font: 'Poppins',
    },
  };

  defaults.font.family = 'Poppins';
  defaults.font.weight = '600';
  defaults.font.size = 14;
  defaults.color = useColorModeValue('black', 'white');

  return (
    <Flex>
      <Line data={data} options={options} />
    </Flex>
  );
};
