import styled from 'styled-components';
import { IStackProps } from './StackContainer';

export const StyledStack = styled.div<IStackProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  flex-wrap: ${(props) => props.wrap};
  margin: ${(props) => props.spacing};
`;
