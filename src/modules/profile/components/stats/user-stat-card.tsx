import React from 'react';

interface IUserStatCardProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

const UserStatCard: React.FC<IUserStatCardProps> = (props) => {
  const { icon, label, value } = props;

  return <div className="flex flex-row p-2 bg-purple-500 items-center rounded-lg">
    <div className="bg-white p-4 rounded-lg text-black">
      {icon}
    </div>
    <div className="flex flex-1 flex-col ml-2.5">
      <span className="font-bold text-lg">{value}</span>
      <span className="text-gray-200">{label}</span>
    </div>
  </div>;
};

export default UserStatCard;
