import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { DRAWER_WIDTH, PAGES } from '../constants';

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          position: 'relative'
        }
      }}
      variant="persistent"
      anchor="left"
      open={true}
      className="side-bar"
    >
      <List>
        {PAGES.map((page, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(page.url)}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
