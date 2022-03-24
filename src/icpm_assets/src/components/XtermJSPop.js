import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import "../../../../node_modules/xterm/css/xterm.css"; 

import { Terminal } from 'xterm';

export default function XtermJSPop (props) {
  const [open, setOpen] = useState(false);
  const [terminalLaunch, setTerminalLaunch] = useState(false);
  const term = new Terminal();
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    if (!terminalLaunch) {
      term.open(document.getElementById('terminal'));
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
      term.onKey(e => {
        console.log(e.key);
        term.write(e.key);
        if (e.key == '\r')
            term.write('\n');
    })
      setTerminalLaunch (true);
    }
    setOpen(!open);
  };



  return (
    <div>
      <Button onClick={handleToggle}>Show XtermJS</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex:10, backgroundColor:"blue"}}
        open={open}
        
      >
        <Box onClick={handleClose}> this is the close </Box>
        <div id="terminal"></div>
        {props.children}
      </Backdrop>
    </div>
  );
}// XtermJSPop