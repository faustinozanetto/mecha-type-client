import React from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

const ChartContainer = styled.div`
  background-color: #0f172a;
  padding: 1.5rem;
  border-radius: 20px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  display: flex;

  max-width: 350px;
  align-items: center;
  margin-bottom: 1rem;
`;

interface StatPieChartProps {
  correct?: number;
  incorrect?: number;
  spaces?: number;
}

export const StatPieChart: React.FC<StatPieChartProps> = ({ correct = 0, incorrect = 0, spaces = 0 }) => {
  const data = {
    labels: ["Correct", "Incorrect", "Spaces"],
    datasets: [
      {
        label: "Characters",
        data: [correct, incorrect, spaces],
        backgroundColor: ["rgba(22, 163, 74, 0.35)", "rgba(220, 38, 38, 0.35)", "rgba(8, 145, 178, 0.35)"],
        borderColor: ["#16A34A", "#DC2626", "#0891B2"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartContainer>
      <Pie id="Characters Chart" data={data} width={325} height={325} options={{ maintainAspectRatio: false }} />
    </ChartContainer>
  );
};
