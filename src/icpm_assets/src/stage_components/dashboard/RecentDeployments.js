import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AltRouteIcon from '@mui/icons-material/AltRoute';

/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';


export default function RecentDeployments() {

  // now we get the global context 
  const myContext = useContext(AppContext);

  let history = useHistory();

  const handleClick =  (whereTo) => {
        
    console.log ("RecentDeployments-handleClick - start");
    console.log (whereTo);
    history.push (whereTo);
    if ( whereTo == "/dashboard") 
      myContext.setNavSection ("Dashboard")
    else if ( whereTo == "/environments") 
      myContext.setNavSection ("Environments")
    else if ( whereTo == "/workers") 
      myContext.setNavSection ("Workers")
    else if ( whereTo == "/projects") 
      myContext.setNavSection ("Projects")
    else if ( whereTo == "/deployments") 
      myContext.setNavSection ("Deployments")
    else if ( whereTo == "/events") {
      myContext.setNavSection ("Events") 
      myContext.setEventsType ("")
    } else if ( whereTo == "/settings") 
      myContext.setNavSection ("Settings")

    console.log ("RecentDeployments-handleClick - end");

  } // end handle click

  return (
    <React.Fragment>
      <Title><AltRouteIcon sx={{mr:1}}/>Recent Deployments</Title>
      <Typography variant="body2" color="text.secondary" sx={{ mt:2,flex: 1 }}>
       Env:QA-1/Pro: ABC - 13 Oct, 2021
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
      Env:QA-2/Pro: DEF - 23 Sept, 2021
      </Typography>
      <div>
        <Link color="primary" href="#"  sx={{textDecoration:"none"}} onClick={() => { handleClick("/deployments")}}>
          View Deployments
        </Link>
      </div>
    </React.Fragment>
  );
}
  