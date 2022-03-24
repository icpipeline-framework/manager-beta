
import React from 'react';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';


/// ****** CUSTOM IMPORTS 
import GetImage from '../components/GetImage';

const DfinityInfinity = (props) => {

        return (
          <Card elevation={0} sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={props.onClickFunc} >
              <GetImage imgSrc="dinfinity.png" imgWidth="200px" imgAlt="Internet Identity" />
          </CardActionArea>
         </Card>
        );
  }// end DfinityInfinity

  export default DfinityInfinity ;
  

