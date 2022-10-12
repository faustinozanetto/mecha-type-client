import type { TypingTestEntry } from '@prisma/client';
import { motion } from 'framer-motion';
import React from 'react';

interface ITypingResultsProps {
  results: TypingTestEntry;
}

const TypingResults: React.FC<ITypingResultsProps> = (props) => {
  const { results } = props;

  return (
    <motion.div
      variants={{
        hidden: {
          translateY: '-50px',
          opacity: 0,
        },
        visible: {
          translateY: 0,
          opacity: 1,
        },
      }}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col space-y-2 rounded-lg bg-accent p-4 text-white drop-shadow-2xl sm:space-y-4">
        <h2 className="text-3xl font-semibold">Results</h2>
      </div>
    </motion.div>
  );
};

export default TypingResults;
