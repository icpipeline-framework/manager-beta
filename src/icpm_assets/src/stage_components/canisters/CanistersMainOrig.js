import React, { useContext } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import AppContext from '../../nav/AppContext';

function preventDefault(event) {
  event.preventDefault();
}

const EventsMain = (props) => {


  // now we get the global context 
  const myContext = useContext(AppContext);

  const eventsType = myContext.eventsTypeName;
  let theTitle = "Events";

  if (eventsType == "recent")
    theTitle = "Recent Events"  
  else if (eventsType == "environments")
    theTitle = "Environment Events" 
  else if (eventsType == "projects")
    theTitle = "Project Events"
  else if (eventsType == "workers")
    theTitle = "Worker Events"
  
    


  return (
    <React.Fragment>
      <Title><FormatListBulletedIcon sx={{mr:1}}/>{theTitle}</Title>
      <Typography component="p" variant="h6">
        Coming Soon ... 
      </Typography>
    </React.Fragment>
  );
}// end EventsMain
export default EventsMain;