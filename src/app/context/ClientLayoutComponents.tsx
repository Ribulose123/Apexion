
'use client'; 

import React from 'react';
import Navbar from '../DashboardComp/Navbar'; 
import SiderBar from '../DashboardComp/SiderBar'; 


interface ClientLayoutComponentsProps {
  children: React.ReactNode;
}

const ClientLayoutComponents: React.FC<ClientLayoutComponentsProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-1">
        <SiderBar />
        {children}
      </div>
    </>
  );
};

export default ClientLayoutComponents;