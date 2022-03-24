import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Title = (props) => {

  return (
    <Typography  align="left" component="h1" variant="h6"  gutterBottom>
    <Box   sx={{ bgcolor: 'transparent', 
      mb:2 ,
      borderBottom: 3, borderColor: 'primary.main',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      float: 'center', }}>
      {props.children}
    </Box>
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
