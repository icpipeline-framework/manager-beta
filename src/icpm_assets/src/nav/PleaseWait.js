
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LinearProgress from '@mui/material/LinearProgress';

const PleaseWait = (props) => {
    if (props.waitType == "query" ) {
        return (
            <>
            <Box sx={{ borderBottom: 0, bgcolor:"background.paper", borderColor: 'divider', mt:4, height:"1000px" }}>
            
            </Box>
            </>
        );
    } else {

        return (
            <Box sx={{ borderBottom: 0,  borderColor: 'divider', mt:4 }}>
                <Typography variant="h5" color="text.secondary" align="center" {...props}>
                    
                    {(props.children) ? props.children : ""}
                </Typography>
                <LinearProgress sx={{m:4}}/>
            </Box>
        );
    }
  }// end PleaseWait

  export default PleaseWait ;
  