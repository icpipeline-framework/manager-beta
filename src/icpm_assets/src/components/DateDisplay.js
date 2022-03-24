
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const DateDisplay = (props) => {

    const dateType = props.dateType;
    const dateValue = props.dateValue;
    var dateDisplay = dateValue.toString();
    var dateOptions = {   year: 'numeric', month: 'short', day: 'numeric' ,hour12: false ,timeZone: 'UTC', timeZoneName: 'short'};


    if (dateType == "icNano") {
        var dateValueMilliseconds = Number(dateValue)/1000000;
        const thisDate = new Date(dateValueMilliseconds);
        dateDisplay =thisDate.toLocaleTimeString("en-US", dateOptions) ;
        

    }// end if ic nano 
    if (dateType == "date") {
        var dateValueMilliseconds = Number(dateValue);
        const thisDate = new Date(dateValueMilliseconds);
        dateDisplay =thisDate.toLocaleTimeString("en-US", dateOptions) ;
        

    }// end if ic nano 

    return (
        <>
        {dateDisplay}
        </>
    );
  }// end Copyright

  export default DateDisplay ;
  