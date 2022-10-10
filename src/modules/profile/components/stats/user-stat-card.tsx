import React from 'react';

interface IUserStatCardProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

const UserStatCard: React.FC<IUserStatCardProps> = (props) => {
  const { icon, label, value } = props;

  return <div></div>;
};

export default UserStatCard;
