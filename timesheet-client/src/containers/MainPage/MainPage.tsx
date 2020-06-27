import React from 'react';
import { NavLink } from 'react-router-dom';

export type MainPageProps = {};
const MainPage: React.FC<MainPageProps> = (props) => {
  return (
    <nav>
      <NavLink to="/view-timesheet/">View Previous</NavLink>
      <NavLink to="/create-timesheet/">Create</NavLink>
    </nav>
  );
};

export default MainPage;
