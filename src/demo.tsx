import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { MenuItem } from '@mui/material';
import "./App.css";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };


  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <h1>Benchmarks</h1>

      <div><t class="bold">Life cycle phases (DIN EN 15978) : </t></div>
      <div><t>A1-3, B4, B6, C3, C4, D </t></div>
      <div><t class="bold"> Lifetime in years:          </t></div>
      <div><t> 60      </t></div>

      <h4>Structural Benchmarks</h4>
      <table width="100%" >
        <thead>
          <tr>
            <th>Structure</th>
            <th>Min</th>
            <th>Avg</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
            <tr>
            <td>Solid</td>
              <td>379.50</td>
              <td>513.25</td>
              <td>741.00</td>
            </tr>
            <tr>
              <td>Skeleton</td>
              <td>431.40</td>
              <td>583.36</td>
              <td>844.20</td>
            </tr>
            <tr>
              <td>Wood</td>
              <td>-69.00</td>
              <td>162.00</td>
              <td>382.80</td>
            </tr>
        </tbody>
    </table>
    <h4>Facade Benchmarks</h4>
    <table width="100%">
        <thead >
          <tr>
            <th>Facade</th>
            <th>Min</th>
            <th>Avg</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
            <tr>
            <td>Full Glazing</td>
              <td>290.50</td>
              <td>385.00</td>
              <td>493.00</td>
            </tr>
            <tr>
              <td>Half Glazing</td>
              <td>169.50</td>
              <td>236.43</td>
              <td>297.00</td>
            </tr>
            <tr>
              <td>Solid Wall</td>
              <td>81.64</td>
              <td>92.02</td>
              <td>108.00</td>
            </tr>
        </tbody>
    </table>
    

{/*
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
     */} 
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Library</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}