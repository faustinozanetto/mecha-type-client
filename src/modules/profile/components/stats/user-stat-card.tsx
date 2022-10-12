import React from 'react';
import clsx from "clsx";
import { EUserStatType } from '@typedefs/mecha-types';

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
  const { icon, type, value, backgroundColor='bg-purple-500' } = props;

  return  (
    <div className={clsx("flex flex-row p-2 text-sm items-center rounded-lg sm:text-base", backgroundColor)}>
      <div className="bg-white p-3 rounded-lg text-black sm:p-4">
        {icon}
      </div>
      <div className="flex flex-1 flex-col ml-2.5">
        <span className="font-bold text-white text-lg">{value}</span>
        <span className="text-white">{type}</span>
      </div>
    </div>)
};

export default UserStatCard;
