import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Badge from '@mui/material/Badge';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChatIcon from '@mui/icons-material/Chat';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LockIcon from '@mui/icons-material/Lock';


/// ****** CUSTOM IMPORTS 

import MainNavList from './nav/NavItems';
import StageRoutes from './StageRoutes';
import AppContext from './nav/AppContext';
import NavTitle from './nav/NavTitle';
import GetImage from './components/GetImage';






const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);




const StageMain = () => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const whereTo = myContext.whereToName ;
  //use state to track if menu is open - started closed
  
  const windowHeight = window.innerHeight ;
  const windowWidth = window.innerWidth ;
  
  console.log("windowHeight: ",windowHeight);
  console.log("windowWidth: ",windowWidth);
  var thisOpen = false;
  if (windowWidth > 600 ) { 


  }
  const [open, setOpen] = React.useState(true);
  // toggle menu
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  const location = useLocation();
  console.log ("- STAGE - location.pathname: ", location.pathname) ;

  let history = useHistory();

  const handleClick =  (whereTo) => {
        
    console.log ("StageNavItems-handleClick - start handleClick");
    if ( whereTo == "/help") {
      myContext.setNavSection ("Help")
    } else if ( whereTo == "/events" || whereTo == "/events/recent") {
      myContext.setNavSection ("Events")
      myContext.setEventsType ("recent")
    } else if ( whereTo == "/settings") {
      myContext.setNavSection ("Settings");
    } else if ( whereTo == "/lock")  {

      var r = confirm("Are you sure you want to log out?");
      if (r == true) {
        console.log ("Logging you out");
        let authClient = myContext.authClientName;
        authClient.logout();
        myContext.setIsAuthed (false);
      } else {
        console.log ("You decided not to logout, that's cool");
      }
    }
    console.log (whereTo);
    history.push (whereTo);

    console.log ("StageNavItems-handleClick - end handleClick");

  } // end handle click

  //now we check version the latest was grabbed at login

    var newVersionDisplay = [];
    if (myContext.showNewVersionName) {
    newVersionDisplay = [
      <ThemeProvider key={1} theme={myContext.environmentsThemeName}>
      <Box  component="span" sx={{ p: 1, mb:0, mt:0, mr:0
        , border: '0px solid #ffffff', borderRadius:2,
        bgcolor: 'primary',
        fontWeight: 'bold',
        }}>
          <Button variant="contained" size="small" target="_blank" sx={{ flexGrow:1,float:"right"  }} href="https://github.com/icpipeline-framework">
          New Version Available
          </Button>
      </Box> 
      </ThemeProvider>
      ];
    } // end if showNewVersion
    



  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar id="back-to-top-anchor"
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <ChevronRightIcon />
            </IconButton>
            <Box onClick={toggleDrawer} sx={{
                                    '&:hover': {
                                      background: "primary.superlite",
                                    },
                                    flexGrow: 1,
                                    cursor:'pointer', 
                                    overflowX:"auto",}} >
            <Typography 
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{  }}
            >
              
            <NavTitle navSectionName={myContext.navSectionName}/>
            
            </Typography>
            </Box>
            {newVersionDisplay}
            <IconButton sx={{ml:2}} color="inherit"  onClick={() => { handleClick("/events/recent")}}>
              <Badge badgeContent={0} color="secondary">
              <FormatListBulletedIcon /> 
              </Badge>
            </IconButton>
            <IconButton sx={{ml:2}} color="inherit" onClick={() => { handleClick("/help")}}>              
                <HelpOutlineIcon />
            </IconButton>
            <IconButton sx={{ml:2}} color="inherit" onClick={() => { handleClick("/lock")}}>              
                <LockIcon />
            </IconButton>
            
            
          </Toolbar>
        </AppBar>


        {/******************************** BEGIN SIDE NAV DRAWER */}
        <Drawer variant="permanent" open={open}>

        {/************ DRAWER TOOLBAR */}
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >

              <Box onClick={toggleDrawer} sx={{width:"1S50px"}} >
                  <GetImage imgSrc="icpipeline-forwbg.png" imgWidth="200px" imgAlt="could not have happened without help from the Dfinity Foundation!" />
                </Box>
            </Typography> 
            {/*
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
            */}

          </Toolbar>
          {/************ MENU LISTS */}
          <Divider />
          <List>
            <MainNavList open={open} />
          </List>
          
        </Drawer>
        {/******************************** END SIDE NAV DRAWER */}


        <Box
          id="stage-box"
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            mb:0,
          }}
        >
          <Toolbar />          
          <StageRoutes whereTo={whereTo}/>
        </Box>
      </Box>
  );
}

export default function Stage() {
  return <StageMain />;
}
