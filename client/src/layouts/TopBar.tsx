import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { UserFavourites } from '../components';
import FavoriteIcon from '@mui/icons-material/Favorite';

function TopBar() {
  const [isUserFavouritesOpen, setIsUserFavouritesOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleCloseUserMenu = () => {
    setIsUserFavouritesOpen(false);
  };

  return (
    <>
      <AppBar position="static" className="top-bar">
        <Toolbar disableGutters sx={{ mx: 2 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            Assignment
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open favourites">
              <IconButton
                size="large"
                onClick={() => setIsUserFavouritesOpen(true)}
                sx={{ p: 0 }}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      {isUserFavouritesOpen && (
        <UserFavourites
          isOpen={isUserFavouritesOpen}
          onClose={handleCloseUserMenu}
        />
      )}
    </>
  );
}
export default TopBar;
