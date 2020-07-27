import React from 'react';
import { NavLink } from 'react-router-dom';

export type MainPageProps = {};
function MainPage(props: MainPageProps) {
  return (
    <nav>
      <NavLink to="/view-timesheet/">View Previous</NavLink>
      <NavLink to="/create-timesheet/">Create</NavLink>
    </nav>
  );
}

export default MainPage;
