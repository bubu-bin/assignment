import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import SecurityIcon from '@mui/icons-material/Security';

// TODO: pages will be fetched from the backend on initial load or not?
export const PAGES = [
  { label: 'Car deals', url: '/car_deals', icon: <TimeToLeaveIcon /> },
  {
    label: 'Insurance offers',
    url: '/insurance_offers',
    icon: <SecurityIcon />
  }
];

export const DRAWER_WIDTH = 240;
