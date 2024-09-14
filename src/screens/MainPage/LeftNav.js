import React, {useState} from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {MdMenu} from 'react-icons/md';

export default function LeftNav(props) {
  const {data: sideBarMenuData = []} = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {sideBarMenuData?.map((item, index) => (
          <ListItem button={true} sx={{color: '#ffffff'}} key={index}>
            <ListItemText sx={{color: '#ffffff'}} primary={item?.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <MdMenu size={30} onClick={toggleDrawer(true)} />
      <Drawer
        sx={{
          width: '200px',
          '& .MuiDrawer-paper': {width: '200px', backgroundColor: '#88cc00'},
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={open || !isMobile}
        onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}
