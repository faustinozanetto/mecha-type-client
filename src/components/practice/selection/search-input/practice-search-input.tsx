import React from 'react';
import { Container, Text, useColorModeValue } from '@chakra-ui/react';
import { PracticeSearchForm } from './practice-search.form';

interface PracticeSearchInputProps {}

export const PracticeSearchInput: React.FC<PracticeSearchInputProps> = ({}) => {
  return <PracticeSearchForm />;
};
