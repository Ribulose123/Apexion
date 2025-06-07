'use client'; 
import React from 'react';
import Navbar from '../DashboardComp/Navbar'; 



interface ClientLayoutComponentsProps {
  children: React.ReactNode;
}

const ClientLayoutCom: React.FC<ClientLayoutComponentsProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="">
        {children}
      </div>
    </>
  );
};

export default ClientLayoutCom;