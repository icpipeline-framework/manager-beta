
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = (props) => {
    return (
      <>

      <Box sx={{display:"flex", justifyContent:"center", mt:2, border:"1px solid #9f9f9f", borderRadius:1}}
      >

        <Box
        component="img"
        sx={{backgroundColor:"transparent", p:1}}
        src="ic-badge.svg"
        alt="Dfinity"
        />
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link target="_blank" color="inherit" style={{ textDecoration: 'none' }} href="https://icpipeline.com/">
        {'Copyright © '}
          ICPipeline
        {' '}
        {new Date().getFullYear()}
        {'.'}
        </Link>
      </Typography>
      </>
   );
  }// end Copyright

  export default Copyright ;
  