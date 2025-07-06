'use client';
import React from 'react';
import { Smartphone, Activity } from 'lucide-react';
import SecurityOption from './SecurityOption';
import { SecurityState } from '../data/data'; // Import SecurityState

interface DeviceActivitiesSectionProps {
  securityOptions: SecurityState; // Still need this to pass to other sections if applicable, or for consistency
  onActionClick: (option: string) => void;
}

const DeviceActivitiesSection: React.FC<DeviceActivitiesSectionProps> = ({ 
  onActionClick
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-[15px] font-medium mb-4 text-white">Device & Activities</h2>

      <SecurityOption
        icon={<Smartphone size={18} />}
        title="Device Management"
        description="Manage devices allowed to access your account."
        // NO 'status' prop needed here
        action="manage"
        onActionClick={() => onActionClick('deviceManagement')}
        link={'settings/verfication'}
      />

      <SecurityOption
        icon={<Activity size={18} />}
        title="Account Activity"
        description="Review your recent account logs."
        // NO 'status' prop needed here
        action="more"
        onActionClick={() => onActionClick('accountActivity')}
        link={undefined}
      />
    </div>
  );
};

export default DeviceActivitiesSection;