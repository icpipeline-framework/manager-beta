import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const GetImage = (props) => {
  const styles = 
  {
  
  media: {
    height: "100%",
    width: "100%",
    margin:'auto'
  }
    };
  return (

    <Card elevation={0} sx={{ display: 'flex', flexGrow: 1 , m:1,  borderRadius:0, justifyContent: "center"}}>
    <CardMedia
    
    component="img"
    sx={{  backgroundColor:"transparent" }}
    image={props.imgSrc}
    alt={props.imgAlt}
      />
    </Card>
  );
}// end ICPipelineLogo

GetImage.propTypes = {
  children: PropTypes.node,
};

export default GetImage;
