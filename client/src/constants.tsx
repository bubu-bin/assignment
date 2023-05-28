import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import SecurityIcon from '@mui/icons-material/Security';

export const PAGES = [
  { label: 'Car deals', url: '/car_deals', icon: <TimeToLeaveIcon /> },
  {
    label: 'Insurance offers',
    url: '/insurance_offers',
    icon: <SecurityIcon />
  }
];

export const DRAWER_WIDTH = 240;

export const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  REQUEST_TIMEOUT: 408,
  UNPROCESSABLE_ENTITY: 422,
  CREATED: 201,
  NO_CONTENT: 204,
  FORBIDDEN: 403
};

export const HTTP_METHOD = {
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH'
};

export const BASE_URL = '/api';
