import styled from 'styled-components';

export const StyledTable = styled.table`
  font-variant-numeric: lining-nums tabular-nums;
  border-collapse: collapse;
  width: 100%;
`;

export const StyledTableColumnHeader = styled.th`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  text-align: center;
  padding-inline: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  line-height: 1rem;
  color: #a0aec0;
  border-bottom-width: 1px;
  border-bottom-style: 1px;
  border-color: #2d3748;
`;

export const StyledTableCell = styled.td`
  text-align: center;
  padding-inline: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  line-height: 1rem;
  border-bottom-width: 1px;
  border-bottom-style: 1px;
  border-color: #2d3748;
`;
