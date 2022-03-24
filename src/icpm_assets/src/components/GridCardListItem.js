import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import 'regenerator-runtime/runtime';
import { is } from '@babel/types';


/// ****** CUSTOM IMPORTS 

import DateDisplay from "./DateDisplay"
import FormTextField from './FormTextField';


const GridCardListItem = (props) => {
    
    let thisTitle = props.title;



    var [processSave, setProcessSave] = useState(false);

    let thisValue = [
      <Box key={1} >
        <Typography  color="text.secondary" variant="body2">
         No Value Set
        </Typography>
      </Box>
      ];


    if (props.children ) {
        thisValue = props.children;
        
    } else {
      if (props.itemType == "link-github") {

          thisValue= [
          <Box key={1} >
            <Typography  color="text.primary" variant="body2">
            { props.value } 
            </Typography>
            <Link  target="_blank" to={{ pathname: props.value}}  style={{ textDecoration: 'none' }}  >view on GitHub</Link>
          </Box>
          ];

          


      } else if (props.itemType == "date-icNano") {

              if (props.value > 0 ){
              thisValue= [
                <Typography  key={2} color="text.primary" variant="body2" >
                  <DateDisplay dateType="icNano" dateValue={props.value} />
                </Typography>
              ]
              
              }
          
          
      } else if (props.value) {

          
          thisValue= [
            <Typography  key={2} color="text.primary" variant="body2" >
             {props.value}
            </Typography>
          ]
          

      }// end if a link
    } // end if there is children
    if (processSave) { 

      return (
        <>
        Processing
        </>
            
      )// end return

      

    } else if (props.itemType == "form-text") {
        
      const [formValue, setFormValue] = useState(props.value);

      const handleOnChange = (e) => {

        setFormValue(e.target.value);
        
        if (e.key === 'Enter') {
          props.itemFormHandler(thisTitle, formValue);
        } 
      } // end onLoginCodeChange

      let itemNoteDisplay = [];

      if (props.itemNote) {
        itemNoteDisplay = [
          <Grid item key={1} xs={12} sm={6} >
          <Typography variant="body2" sx={{fontSize: '.7rem', mb:2, mt:0}}>
          NOTE: {props.itemNote}
           </Typography>
            </Grid>
        ];
      }

      const handleOnClick = (e) => {

        props.itemFormHandler(thisTitle, formValue);
       // setProcessSave(true);

      } // end handleOnClick

      return (
          <>
          <Grid container spacing={0} sx={{ m:1 , borderBottom: '1px solid #9f9f9f' }}>
            <Grid item >

            <FormTextField 
              onChange={handleOnChange}
              value={formValue}
              label={thisTitle} //optional
              type="text"
              helperText="Enter a new value and hit save"
            />  

            <Button onClick={() => { handleOnClick ()
                                    }}  variant="outlined" sx={{ml:2, mr:2}}>save</Button>

                
            </Grid>

            {itemNoteDisplay}

            </Grid>
        </>
            
      )// end return


    } else {
      
      return (
          <>
          <Grid container spacing={0} sx={{ mb: 1 , borderBottom: '1px solid #9f9f9f' }}>
            <Grid item >
              <Typography variant="body2" color="text.secondary" align="left" sx={{fontWeight: "bold",mr:2 }} >
                {thisTitle}:
              </Typography>
            </Grid>
            <Grid item >
                {thisValue}
                
            </Grid>
          </Grid>
        </>
            
      )// end return
    } // end if form stuff

    
} // end function GridCardListItem



export default GridCardListItem;
