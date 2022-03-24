import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';

// Generate Order Data
function createData(id, environment, worker, lastTouch, project,gitBranch, gitShortHash, deploymentDate) {
  return { id, environment, worker, lastTouch, project,gitBranch, gitShortHash, deploymentDate };
}

const rows = [
  createData(
    0,
    'QA',
    'Worker 1',
    '2021-10-05 12:34 EST (17:34 UTC)',
    'ABC Project',
    'git://feature-JIR-123',
    'b8d53348',
    '2021-10-04 09:34 EST (14:34 UTC)'
  ),
  createData(
    1,
    'QA',
    'Worker 1',
    '2021-10-05 12:34 EST (17:34 UTC)',
    'ABC Project',
    'git://feature-JIR-123',
    'b8d53348',
    '2021-10-04 09:34 EST (14:34 UTC)'
  ),
  createData(
    2, 
    'QA',
    'Worker 1',
    '2021-10-05 12:34 EST (17:34 UTC)',
    'ABC Project',
    'git://feature-JIR-123',
    'b8d53348',
    '2021-10-04 09:34 EST (14:34 UTC)'
  ),
  createData(
    3,
    'QA',
    'Worker 1',
    '2021-10-05 12:34 EST (17:34 UTC)',
    'ABC Project',
    'git://feature-JIR-123',
    'b8d53348',
    '2021-10-04 09:34 EST (14:34 UTC)'
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const ActiveEnvironments = () => {
  
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
      <Title><SettingsSystemDaydreamIcon sx={{mr:1}}/>Active Environments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Environment</TableCell>
            <TableCell>Worker</TableCell>
            
            <TableCell>Project</TableCell>
            <TableCell>Git Branch</TableCell>
            
            <TableCell>Deployed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            
            <TableRow key={row.id}>
              <TableCell>{row.environment}</TableCell>
              <TableCell>{row.worker}</TableCell>
              
              <TableCell>{row.project}</TableCell>
              <TableCell>{row.gitBranch}</TableCell>
              
              <TableCell>{row.deploymentDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#"  onClick={() => { handleClick("/environments")}} sx={{ mt: 3, textDecoration:"none" }}>
        List Environments
      </Link>
    </React.Fragment>
  );
} // end ActiveEnvironments

export default ActiveEnvironments;
