// DeviceActivitiesSection.tsx - Device & Activities section
import React from 'react';
import { Smartphone, Activity } from 'lucide-react';
import SecurityOption from './SecurityOption';

interface DeviceActivitiesSectionProps {
  onActionClick: (option: string) => void;
}

const DeviceActivitiesSection: React.FC<DeviceActivitiesSectionProps> = ({ onActionClick }) => {
  return (
    <div>
      <h2 className="text-sm font-medium mb-4">Device & Activities</h2>
      
      <SecurityOption
        icon={<Smartphone size={18} />}
        title="Device Management"
        description="Manage devices allowed to access your account."
        status=""
        action="manage"
        onActionClick={() => onActionClick('deviceManagement')}
        link='settings/verification'
      />
      
      <SecurityOption
        icon={<Activity size={18} />}
        title="Account Activity"
        description="Review your recent account logs."
        status=""
        action="more"
        onActionClick={() => onActionClick('accountActivity')}
      />
    </div>
  );
};

export default DeviceActivitiesSection;