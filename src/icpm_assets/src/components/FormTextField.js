import React, { useState } from 'react';

import TextField from '@mui/material/TextField';


const FormTextField = (props) => {
    

    return (
            
            <TextField
                onChange={props.onChange}
                value={props.value}
                label={props.label} //optional
                helperText={props.helperText}
                multiline={props.multiline}
                variant="outlined"
                type={props.type}
                onKeyPress={props.onKeyPress}
                sx={{mb:2}}
            />
            

    )
}


export default FormTextField;