import Skeleton from '@modules/ui/components/skeleton/skeleton';
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
  /** Wether content is loading or not */
  isLoading: boolean;
}

const UserStatCard: React.FC<IUserStatCardProps> = (props) => {
  const { icon, type, value, isLoading, backgroundColor = 'bg-purple-500' } = props;

  return (
    <div className={clsx('flex flex-row items-center rounded-lg p-2 text-sm sm:text-base', backgroundColor)}>
      <Skeleton isLoaded={!isLoading}>
        <div className="rounded-lg bg-white p-3 text-black sm:p-4">{icon}</div>
      </Skeleton>
      <div className="ml-2.5 flex flex-1 flex-col space-y-2">
        <Skeleton isLoaded={!isLoading}>
          <span className="text-lg font-bold text-white">{value}</span>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <span className="text-white">{type}</span>
        </Skeleton>
      </div>
    </div>
  );
};

export default UserStatCard;
