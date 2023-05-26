import React from 'react';
import TopBar from './TopBar';
import Body from './Body';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const AppContainer = () => {
  return (
    <div className="app-container">
      <TopBar />
      <Body>
        <Outlet />
      </Body>
      <SideBar />
    </div>
  );
};

export default AppContainer;
