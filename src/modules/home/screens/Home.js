import React, {useState} from 'react';
import {Box, Button, Stack} from '@mui/joy';
import './home.css';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DrawerIcon from '@mui/icons-material/Menu';
import Profile from '../../user-management/screens/Profile';
import TaskScreen from '../../sample-module/screens/TaskScreen';
import {useAuth} from '../../user-management/hooks/useAuth';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

const drawerWidth = 240;

const Home = props => {
  const {navigation} = props;
  const [open, setOpen] = useState(false);
  const [menuIndex, updateMenuIndex] = useState(0);
  const [isDark, updateIsDark] = useState(false);
  const {logout} = useAuth();

  const menusArray = [
    {
      name: 'Home',
      activeIcon: HomeIcon,
      unActiveIcon: HomeOutlinedIcon,
      component: TaskScreen,
    },
    {
      name: 'User',
      activeIcon: PersonIcon,
      unActiveIcon: PersonOutlinedIcon,
      component: Profile,
    },
  ];
  const Component = menusArray[menuIndex].component;
  return (
    <Box className="mainContainer">
      <Toolbar variant="dense" className="toolbar">
        <Box
          flexDirection={'row'}
          display={'flex'}
          alignItems={'center'}
          gap={1}>
          <IconButton onClick={() => setOpen(!open)}>
            <DrawerIcon />
          </IconButton>
          <Typography variant="h6">Hello!</Typography>
        </Box>
        <Box onClick={() => logout()} style={{cursor: 'pointer'}}>
          <Typography color="red">Logout</Typography>
        </Box>
      </Toolbar>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}>
        <Toolbar variant="dense">
          <Typography>My App</Typography>
        </Toolbar>
        <Divider />
        <List>
          {menusArray.map((menu, index) => {
            const Icon =
              index === menuIndex ? menu.activeIcon : menu.unActiveIcon;
            return (
              <ListItemButton
                key={index}
                selected={menuIndex === index}
                onClick={() => {
                  updateMenuIndex(index);
                  setOpen(false);
                }}
                sx={{gap: '10px'}}>
                <Icon />
                <ListItemText primary={menu.name} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <Box flex={1}>
        <Component {...props} />
      </Box>
    </Box>
  );
};

export default Home;
