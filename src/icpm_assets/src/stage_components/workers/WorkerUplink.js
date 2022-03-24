import React, { useState,useContext } from 'react';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 



import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';

const WorkerUplink = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const icpmDapp = myContext.icpmDappName;
    const apiToken = myContext.apiTokenName;

    const worker = props.worker;

    console.log ("WorkerUplink - Inside my WorkerUplink");

  const [thisUplink, setThisUplink] = useState([]);
  

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchUplink = async (worker)  =>  {

      // going to creat call to canister
      console.log ("1- fetchUplink - before await");
      
      
      const fetchData = await icpmDapp.workerUplink(apiToken,worker)
      await sleep(500);
      console.log ("2- fetchUplink - after await");
      console.log (fetchData);
      console.log ("3- fetchUplink - after logging return");
      // set the state which should redraw the component
  
      setThisUplink (fetchData);
      console.log  ("THE LENGTH  = " + fetchData.msg);
      console.log ("4- fetchUplink - after setstateListData");

      
  } // end fetchWorkersList
    if ( thisUplink.msg   ) {
        
          
        
        return (
        <CardContent sx={{bgcolor:"#ffffff",  borderRadius:2, width:"100%"}}>
            <Title>
            <WorkspacesIcon sx={{mr:1}}/> currrent Uplink: {worker.name} 
            </Title>
            <Typography  color="text.secondary" gutterBottom>
                msg = {thisUplink.msg}
            </Typography>
            <Typography  color="text.secondary" gutterBottom>
                uplinkResponse=
                
            
            </Typography>
            <Typography  color="text.secondary" sx={{overflow: "auto", bgcolor: '#efefef' }} gutterBottom>
            
             {JSON.stringify (thisUplink, (key, value) =>
                            typeof value === 'bigint'
                                ? value.toString()
                                : value // return everything else unchanged
                            )}
            
            </Typography>
                        
                
            
        </CardContent>
        )// end return

    } else { 
        fetchUplink(worker);

        return (
            <>
            
            <PleaseWait><WorkspacesIcon sx={{mr:1}}/>Loading Uplink</PleaseWait>
            </>
        )// end return
    } // end if there is a uplink already

} // end function WorkerUplink




export default WorkerUplink;
