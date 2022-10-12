import type { EUserStatType } from '@typedefs/mecha-types';
import clsx from 'clsx';
import React from 'react';

interface IUserStatCardProps {
  /** Icon to display in the card */
  icon: JSX.Element;
  /** Label of the stat */
  type: EUserStatType;
  /** Value of the stat */
  value: string;
  /** Optional, modify background color of the card */
  backgroundColor?: string;
}

const UserStatCard: React.FC<IUserStatCardProps> = (props) => {
  const { icon, type, value, backgroundColor = 'bg-purple-500' } = props;

  return (
    <div className={clsx('flex flex-row items-center rounded-lg p-2 text-sm sm:text-base', backgroundColor)}>
      <div className="rounded-lg bg-white p-3 text-black sm:p-4">{icon}</div>
      <div className="ml-2.5 flex flex-1 flex-col">
        <span className="text-lg font-bold text-white">{value}</span>
        <span className="text-white">{type}</span>
      </div>
    </div>
  );
};

export default UserStatCard;
