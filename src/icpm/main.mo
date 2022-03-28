import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import Option "mo:base/Option";
import Time "mo:base/Time";


/// ****** CUSTOM IMPORTS 
import Types "types";
import Token "token";
import EnvironmentUtils "environmentUtils";
import ProjectUtils "projectUtils";
import DeploymentUtils "deploymentUtils";
import WorkerUtils "workerUtils";
import EventUtils "eventUtils";
import UserUtils "userUtils";
import JobUtils "jobUtils";
import CanisterUtils "canisterUtils";
import IdentityUtils "identityUtils";


actor {

  type LoginAttempt =Types.LoginAttempt;
  type LoginResponse =Types.LoginResponse;
  type ManagePrincipalResponse =Types.ManagePrincipalResponse;
  type CanisterStatusResponse =Types.CanisterStatusResponse;
  
  
  type User = Types.User;
  type AppUsers = Types.AppUsers;

  type Environment = Types.Environment;
  type ManageEnvironmentResponse = Types.ManageEnvironmentResponse;
  type CompleteEnvironmentResponse = Types.CompleteEnvironmentResponse;
  type CompleteDeploymentResponse = Types.CompleteDeploymentResponse;
  type CompleteProjectResponse = Types.CompleteProjectResponse;
  type CompleteWorkerResponse = Types.CompleteWorkerResponse;
  type CompleteJobResponse = Types.CompleteJobResponse;
  type CreateIiEnableJobResponse = Types.CreateIiEnableJobResponse;
  type TtydHttpsEnableDisableResponse = Types.TtydHttpsEnableDisableResponse;
  
  type ManageIdentityResponse = Types.ManageIdentityResponse ;
  type CompleteIdentityResponse = Types.CompleteIdentityResponse ;
  type ManageCanisterResponse = Types.ManageCanisterResponse ;
  type CompleteCanisterResponse = Types.CompleteCanisterResponse ;
  

  type CreateDeploymentResponse = Types.CreateDeploymentResponse ;
  type Project = Types.Project;
  type Deployment = Types.Deployment;
  type Worker = Types.Worker;
  type Event = Types.Event;
  type Job = Types.Job;
  type Canister = Types.Canister;
  type Identity = Types.Identity;
  
  type UplinkResponse = Types.UplinkResponse ;

  type CompleteDashboardStats = Types.CompleteDashboardStats;

  type DownloadAllConfigResponse = Types.DownloadAllConfigResponse ;
  type DownloadAllLogResponse = Types.DownloadAllLogResponse ;

  stable var theLoginAttempts : [LoginAttempt] = [];
  stable var theUsers : [User] = [];

  stable var theEnvironments : [Environment] = [];
  stable var theProjects : [Project] = [];
  stable var theDeployments : [Deployment] = [];
  stable var theWorkers : [Worker] = [];   
  stable var theEvents : [Event] = [];   
  stable var theJobs : [Job] = [];   
  stable var theCanisters : [Canister] = [];   
  stable var theIdentities : [Identity] = [];   
  
  stable var nextUserId : Nat = 1;

  stable var nextEnvironmentId : Nat = 1;
  stable var nextProjectId : Nat = 1;
  stable var nextDeploymentId : Nat = 1;
  stable var nextWorkerId : Nat = 1;
  stable var nextEventId : Nat = 1;
  stable var nextJobId : Nat = 1;
  stable var nextCanisterId : Nat = 1;
  stable var nextIdentityId : Nat = 1;
  stable var everLoggedIn = "N";

  var startTime = Time.now();


// TODO - move this authentication and principals into separate mo

    // TODO - this is a text API Key that will replaced by principal auth for most use cases
    // there are use cases still for api Key access, but that needs to be discussed
    // possible for other CI/CD integrations
    // using "openssl rand -base64 32 | tr -d /=+
    //var apiToken: Text = "bgxurWgeS7bwZsKn7oisH6YDNtgsP2ObQ7Hz7SXcLg";

    var apiToken: Text = Token.getApiToken() ;

    //var apiToken: Text = "";    

    var appUsers: AppUsers = {
        administrators = [];
        managers = [];
    };


  // now we populate the Zero user that is the admin 

  var now = Time.now();
  // add two sample Environment profiles on build for test purposes
  var thisUser : User = {
            id = 0;
            name = "Manager Super Admin";
            email = "support@icpipeline.com";
            cellPhone = "";
            hashPass = "1b5aa2fe2320525e24d4e07d5902532954a2e053fdc1a70e117d2acc8cf9c726d8d97bbc80cd610ee5a476b254641a14e7e7b0a5d11012d8d45b7f0e2dc68b59"; // default pass 
            internetId = "";
            apiToken = apiToken;
            active = true ;
            creatorId = 0;
            dateCreated = now;
            lastUpdated = now;
  };

    var theUsersNew: [User] = UserUtils.manageUserUtil (theUsers, thisUser, 0);
    
    
    theUsers := theUsersNew;
    everLoggedIn := "N";
    
    // ************* -----------  GET CANISTERS
    public query({caller}) func getCanisterStatus () : async CanisterStatusResponse {
      // if (thisKey != apiToken and authManager(caller) != true ) {
      //   assert(false);
      // };// end if we need to assert

      var thisMsg: Text = "";
      now := Time.now(); 
      var uptime : Int = (now - startTime) ;

      var thisResponseStatus = "Green" ;
      
      var thisCanisterStatsResponse: CanisterStatusResponse = 
      {
        uptime = uptime;
        everLoggedIn = everLoggedIn;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisCanisterStatsResponse ;

      
    }; // end getCanisterStatus

  // ********************************************* 
  // ************* CANISTERS ******************
  // *********************************************
  
    // ************* -----------  GET CANISTERS
    public query({caller}) func getListOfCanisters(thisKey : Text, listType : Text) : async [Canister] {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert
        // flush the array of Cansters as response
      
      return theCanisters;
      
    }; // end getListOfCanisters

    // ************* -----------  MANAGE CANISTERS

    public shared({caller}) func manageCanisterMain(thisKey : Text, manageCanister : Canister) : async ManageCanisterResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert
      var thisMsg: Text = "";
      now := Time.now(); 
      var thisResponseStatus = "Green" ;
      var thisCanister : Canister = {
                id = 0;
                name = "";
                category = "";
                description = "";
                dfxJson = "";
                canisterName = "";
                canisterType = "";
                canisterNetwork = "";
                canisterId = "";
                identityId = 0;
                projectId = 0;
                environmentId = 0;
                lastDeploymentId = 0;
                creatorId = 0;
                dateCreated = 0;
                lastUpdated = 0;
              };


      // verify that there is a Canister with the id we want to update
      var theCanistersNew: [Canister] = CanisterUtils.manageCanisterUtil (theCanisters, manageCanister, nextCanisterId);
      // or if id = 0 then its an insert
      if (manageCanister.id == 0 and theCanistersNew != theCanisters ) {
      // because it was passed as a 0 so we know it was a new record request
        thisCanister := CanisterUtils.getCanisterByIdUtil (theCanistersNew, nextCanisterId);
      // increase nextCanisterId counter 
        nextCanisterId += 1;
      } else {

        thisCanister := CanisterUtils.getCanisterByIdUtil (theCanistersNew, manageCanister.id );
      
      }; // end if new

      // TODO - check for errors on update

      theCanisters := theCanistersNew;

      // now we check to see if this is a new canister for this project-environment
      // and we only do it if they are ic canisters

      if (thisCanister.lastDeploymentId > 0 and thisCanister.canisterNetwork == "ic") {

        // this will automagically add the canister as the profile canister by name, project, environment key.
        // a lastDeployment of 0 is active as the profile canister and will be injected into the canister_ids.json file
      
        var theCanistersNew: [Canister] = CanisterUtils.checkProjectEnvironmentCanister (theCanisters, thisCanister, nextCanisterId);
        if (theCanistersNew != theCanisters ) {
          
          // increase nextCanisterId counter 
            nextCanisterId += 1;
          // and we update the array
            theCanisters := theCanistersNew;
          
        }; // end if the array changed 


      }; // end if this has a deployment and is thereby from a deployment


      // TODO - think if this should return the full list again to refresh the app, needs to be in combination with error handling

      var thisManageCanisterResponse: ManageCanisterResponse = 
      {
        canisterObject = thisCanister;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisManageCanisterResponse;

    }; // end manageCanisterMain

    // ************* -----------  GET COMPLETE CANISTER

    public query({caller}) func getCompleteCanisterMain (thisKey : Text, theCanisterId : Int) : async CompleteCanisterResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus : Text = "Green" ;

      var thisCanister : Canister = {
                id = 0;
                name = "";
                category = "";
                description = "";
                dfxJson = "";
                canisterName = "";
                canisterType = "";
                canisterNetwork = "";
                canisterId = "";
                identityId = 0;
                projectId = 0;
                environmentId = 0;
                lastDeploymentId = 0;
                creatorId = 0;
                dateCreated = 0;
                lastUpdated = 0;
              };


      var thisDeployment : Deployment = {
            id= 0;
            status= "";
            environmentId= 0;
            projectId= 0;
            workerId = 0;
            identityId= 0;
            deploymentNotes = "";
            projectRepo= "";
            projectRepoBranch = "";
            executeStartTime= 0;
            executeFinishTime= 0;
            creatorId= 0;
            dateCreated= 0;
            lastUpdated= 0;
          };

      thisCanister := CanisterUtils.getCanisterByIdUtil (theCanisters, theCanisterId);

      if (thisCanister.id > 0 ) {
        // then we found a Canister

      } else {

        thisMsg := "There was no Canister with id "# Int.toText(theCanisterId) ;
        thisResponseStatus := "Red" ;

        
      }; // end if there was a thisCanister

      var thisCompleteCanister: CompleteCanisterResponse = 
      {
        canisterObject = thisCanister;
        lastDeploymentObject = thisDeployment;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisCompleteCanister;
    }; // end getCompleteCanisterMain



  // ********************************************* 
  // ************* IDENTITIES ******************
  // *********************************************
  
    // ************* -----------  GET IDENTITIES
    public query({caller}) func getListOfIdentities(thisKey : Text, listType : Text) : async [Identity] {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert
        // flush the array of Identities as response
      
      return theIdentities;
      
    }; // end getListOfIdentities

    // ************* -----------  MANAGE IDENTITIES

    public shared({caller}) func manageIdentityMain(thisKey : Text, manageIdentity : Identity) : async ManageIdentityResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert
      var thisMsg: Text = "";
      var thisResponseStatus = "Green" ;
      var thisIdentity : Identity = {
                id = 0;
                name = "";
                category = "";
                description = "";
                principal = "" ;
                identityPem = "";
                profileWalletId = "";
                creatorId = 0;
                dateCreated = 0;
                lastUpdated = 0;
              };

      // verify that there is a Identity with the id we want to update
      var theIdentitiesNew: [Identity] = IdentityUtils.manageIdentityUtil (theIdentities, manageIdentity, nextIdentityId);
      // or if id = 0 then its an insert
      if (manageIdentity.id == 0 and theIdentitiesNew != theIdentities ) {
      // because it was passed as a 0 so we know it was a new record request
        thisIdentity := IdentityUtils.getIdentityByIdUtil (theIdentitiesNew, nextIdentityId);
      // increase nextIdentityId counter 
        nextIdentityId += 1;
      } else {

        thisIdentity := IdentityUtils.getIdentityByIdUtil (theIdentitiesNew, manageIdentity.id );
      
      }; // end if new

      // TODO - check for errors on update

      theIdentities := theIdentitiesNew;

      // TODO - think if this should return the full list again to refresh the app, needs to be in combination with error handling

      var thisManageIdentityResponse: ManageIdentityResponse = 
      {
        identityObject = thisIdentity;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisManageIdentityResponse;

    }; // end manageIdentityMain

    // ************* -----------  GET COMPLETE IDENTITY

    public query({caller}) func getCompleteIdentityMain (thisKey : Text, theIdentityId : Int) : async CompleteIdentityResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus : Text = "Green" ;
      var thisIdentity : Identity = {
                id = 0;
                name = "";
                category = "";
                description = "";
                principal = "" ;
                identityPem = "";
                profileWalletId = "";
                creatorId = 0;
                dateCreated = 0;
                lastUpdated = 0;
              };


      var theseEnvironments: [Environment] = [] ;

      thisIdentity := IdentityUtils.getIdentityByIdUtil (theIdentities, theIdentityId);

      if (thisIdentity.id > 0 ) {
        // then we found a Identity

      } else {

        thisMsg := "There was no Identity with id "# Int.toText(theIdentityId) ;
        thisResponseStatus := "Red" ;

        
      }; // end if there was a thisIdentity

      var thisCompleteIdentity: CompleteIdentityResponse = 
      {
        identityObject = thisIdentity;
        environmentObjects = theseEnvironments;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisCompleteIdentity;
    }; // end getCompleteIdentityMain



  // ********************************************* 
  // ************* ENVIRONMENTS ******************
  // *********************************************
  
    // ************* -----------  GET ENVIRONMENTS
    public query({caller}) func getListOfEnvironments(thisKey : Text, listType : Text) : async [Environment] {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert
        // flush the array of Environments as response
      
      return theEnvironments;
      
      
      
    }; // end getListOfEnvironments

    // ************* -----------  MANAGE ENVIRONEMENTS

    public shared({caller}) func manageEnvironmentMain(thisKey : Text, manageEnvironment : Environment) : async ManageEnvironmentResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert
      var thisMsg: Text = "";
      var thisResponseStatus = "Green" ;
      var thisEnvironment : Environment = {
            id = 0;
            name = "";
            environmentType = "" ;
            description = "" ;
            projectId = 0 ;
            projectRepoBranch = "";
            identityId = 0;
            deploymentNetwork = "";
            workerId = 0;
            creatorId = 0;
            dateCreated = 0;
            lastUpdated = 0;
          };


      // verify that there is a Environment with the id we want to update
      var theEnvironmentsNew: [Environment] = EnvironmentUtils.manageEnvironmentUtil (theEnvironments, manageEnvironment, nextEnvironmentId);
      // or if id = 0 then its an insert
      if (manageEnvironment.id == 0 and theEnvironmentsNew != theEnvironments ) {
      // because it was passed as a 0 so we know it was a new record request
        thisEnvironment := EnvironmentUtils.getEnvironmentByIdUtil (theEnvironmentsNew, nextEnvironmentId);
      // increase nextEnvironmentId counter 
        nextEnvironmentId += 1;
      } else {

        thisEnvironment := EnvironmentUtils.getEnvironmentByIdUtil (theEnvironmentsNew, manageEnvironment.id );
      
      }; // end if new

      // TODO - check for errors on update

      theEnvironments := theEnvironmentsNew;

      // TODO - think if this should return the full list again to refresh the app, needs to be in combination with error handling

      var thisManageEnvironmentResponse: ManageEnvironmentResponse = 
      {
        environmentObject = thisEnvironment;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisManageEnvironmentResponse;

    }; // end manageEnvironmentMain

  // ********************************************* 
  // ************* ENVIRONMENT TOOLS *************
  // *********************************************

    // ************* -----------  GET COMPLETE ENVIRONMENT

    public query({caller}) func getCompleteEnvironmentMain (thisKey : Text, theEnvironmentId : Int) : async CompleteEnvironmentResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus = "Green" ;

    var thisEnvironment : Environment = {
          id = 0;
          name = "";
          environmentType = "" ;
          description = "" ;
          projectId = 0 ;
          projectRepoBranch = "";
          identityId = 0;
          deploymentNetwork = "";
          workerId = 0;
          creatorId = 0;
          dateCreated = 0;
          lastUpdated = 0;
        };
    var thisProject : Project = {
          id=0;
          name = "";
          category = "";
          description="";
          projectRepo = "";
          dfxIdentities = [];
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
    var thisWorker : Worker = {
        id= 0;
        name= "";
        status= "";
        category= "";
        description= "";
        lastDeploymentId= 0;
        uniqueId= "";
        publicIp= "";
        privateIp= "";
        dnsName= "";
        iiEnabled= "";
        dfxReplicaType= "";
        ttydHttpsEnabled= "";
        ttydHttpsCount= 0;
        lastTouch= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };
    var thisDeployment : Deployment = {
          id= 0;
          status= "";
          environmentId= 0;
          projectId= 0;
          workerId = 0;
          identityId= 0;
          deploymentNotes = "";
          projectRepo= "";
          projectRepoBranch = "";
          executeStartTime= 0;
          executeFinishTime= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
      var thisIdentity : Identity = {
                id = 0;
                name = "";
                category = "";
                description = "";
                principal = "" ;
                identityPem = "";
                profileWalletId = "";
                creatorId = 0;
                dateCreated = 0;
                lastUpdated = 0;
              };

      var theseCanisterProfiles : [Canister] = [];
      
      thisEnvironment := EnvironmentUtils.getEnvironmentByIdUtil (theEnvironments, theEnvironmentId );
      if (thisEnvironment.projectId > 0 ) {
        thisProject := ProjectUtils.getProjectByIdUtil (theProjects, thisEnvironment.projectId);
        // then we check for canister profiles
        theseCanisterProfiles := CanisterUtils.getCanisterProfilesByProjectEnvironmentId (theCanisters, thisEnvironment.projectId, thisEnvironment.id );
      };
      if (thisEnvironment.workerId > 0 ) {
      thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, thisEnvironment.workerId);
      };
      
      thisDeployment := DeploymentUtils.getLatestDeploymentByEnvironmentId (theDeployments, thisEnvironment.id);
      

      if (thisEnvironment.identityId > 0 ) {
        thisIdentity := IdentityUtils.getIdentityByIdUtil (theIdentities, thisEnvironment.identityId);
      }; // end if we have an identity 

      // now we set the vars to nothing so javascript can't see it
      // only available if they can edit the identity 

      
      var thisCompleteEnvironment: CompleteEnvironmentResponse = 
      {
        environmentObject = thisEnvironment;
        projectObject = thisProject;
        workerObject = thisWorker;
        identityObject = thisIdentity;
        latestDeploymentObject = thisDeployment;
        canisterProfiles = theseCanisterProfiles;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisCompleteEnvironment;
    }; // end getCompleteEnvironmentMain

    // ************* -----------  CREATE DEPLOYMENT

    public shared({caller}) func createDeploymentMain(thisKey : Text, deploymentEnvironment : Environment) : async CreateDeploymentResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus = "Green" ;

    var thisEnvironment : Environment = {
          id = 0;
          name = "";
          environmentType = "" ;
          description = "" ;
          projectId = 0 ;
          projectRepoBranch = "";
          identityId = 0;
          deploymentNetwork = "";
          workerId = 0;
          creatorId = 0;
          dateCreated = 0;
          lastUpdated = 0;
        };
    var thisProject : Project = {
          id=0;
          name = "";
          category = "";
          description="";
          projectRepo = "";
          dfxIdentities = [];
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
    var thisDeployment : Deployment = {
          id= 0;
          status= "";
          environmentId= 0;
          projectId= 0;
          workerId = 0;
          identityId= 0;
          deploymentNotes = "";
          projectRepo= "";
          projectRepoBranch = "";
          executeStartTime= 0;
          executeFinishTime= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
    var thisJob : Job = {
          id = 0;
          status= "";
          jobType= "";
          refType ="";
          refId= 0;
          workerId= 0;
          environmentId=0;
          dateCreated= 0;
          lastUpdated= 0;
        };

      // first we check if the passed environment is valid
      if (deploymentEnvironment.id > 0 ) {
      var thisEnvironment :Environment = EnvironmentUtils.getEnvironmentByIdUtil (theEnvironments, deploymentEnvironment.id );
      if (thisEnvironment.id > 0 ) {
      // then we know there is an environment with that ID and we have the latest version 
      if (thisEnvironment.projectId > 0 ) {

          thisProject := ProjectUtils.getProjectByIdUtil (theProjects, thisEnvironment.projectId);
          //thisMsg := thisMsg # " - thisProject = "# Int.toText(thisProject.id) #" - ";

        if (thisProject.id > 0 ) {
            // we have everything now to create a deployment

            thisDeployment := {
                  id= 0;
                  status= "Ready";
                  environmentId= thisEnvironment.id ;
                  projectId= thisProject.id;
                  identityId= thisEnvironment.identityId;
                  deploymentNotes = "Created by User";
                  projectRepo= thisProject.projectRepo;
                  projectRepoBranch = thisEnvironment.projectRepoBranch;
                  executeStartTime= 0;
                  executeFinishTime= 0;
                  creatorId= 0;
                  dateCreated= now;
                  lastUpdated= now;
                };
                          
                // verify that there is a deployment with the id we want to update
                var theDeploymentsNew: [Deployment] = DeploymentUtils.manageDeploymentUtil (theDeployments, thisDeployment, nextDeploymentId);
                
                if (thisDeployment.id == 0 and theDeploymentsNew != theDeployments ) {
                  // because it was passed as a 0 so we know it was a new record request
                  // increase nextDeploymentId counter 
                  thisDeployment := DeploymentUtils.getDeploymentByIdUtil (theDeploymentsNew, nextDeploymentId);
                  //thisMsg := thisMsg # " - thisDeployment = "# Int.toText(thisDeployment.id) #" - ";
                  nextDeploymentId += 1;
                }; // end if

                // TODO - check for errors on update

                theDeployments := theDeploymentsNew;

                // now we build a job 
                // TODO - separate this into a two step process

                thisJob := {
                      id = 0;
                      status= "Ready";
                      jobType= "Deploy";
                      refType ="Deployment";
                      refId= thisDeployment.id;
                      workerId= 0;
                      environmentId=thisEnvironment.id;
                      dateCreated= now;
                      lastUpdated= now;
                    };
                // verify that there is a event with the id we want to update
                var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
                
                if (thisJob.id == 0 and theJobsNew != theJobs ) {
                  // because it was passed as a 0 so we know it was a new record request
                  // increase nextJobId counter 
                  nextJobId += 1;
                }; // end if new

                // TODO - check for errors on update

                theJobs := theJobsNew;
                // now we should have a job and a Deployment


        } else {
          
          thisMsg := thisMsg # " - ERROR=thisProject.id= "# Int.toText(thisProject.id) #" There is no Project with this ID - ";
      
        };// end if passed projectId > 0 

      } else {
        
        thisMsg := thisMsg # " - ERROR=thisEnvironment.projectId= "# Int.toText(thisEnvironment.projectId) #" NEED PROJECT ID - ";
    
      }; // end if passed projectId > 0 

      } else {
        thisMsg := thisMsg # " - ERROR=thisEnvironment= "# Int.toText(thisEnvironment.id) #" NOT VALID- ";
      }; // end if passed projectId > 0 

      } else {
        thisMsg := thisMsg # " - ERROR=deploymentEnvironment= "# Int.toText(deploymentEnvironment.id) #" NOT VALID- ";
      }; // end if passed projectId > 0 
      


      var thisCreateDeploymentResponse: CreateDeploymentResponse = 
      {
        deploymentObject = thisDeployment;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisCreateDeploymentResponse;
    }; // end createDeploymentMain


  // ********************************************* 
  // ************* DEPLOYMENT TOOLS *************
  // *********************************************

    // ************* -----------  GET COMPLETE DEPLOYMENT

    public query({caller}) func getCompleteDeploymentMain (thisKey : Text, theDeploymentId : Int) : async CompleteDeploymentResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus : Text = "Green" ;

    var thisDeployment : Deployment = {
          id= 0;
          status= "";
          environmentId= 0;
          projectId= 0;
          identityId= 0;
          deploymentNotes = "";
          projectRepo= "";
          projectRepoBranch = "";
          executeStartTime= 0;
          executeFinishTime= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
    var thisEnvironment : Environment = {
          id = 0;
          name = "";
          environmentType = "" ;
          description = "" ;
          projectId = 0 ;
          projectRepoBranch = "";
          identityId = 0;
          deploymentNetwork = "";
          workerId = 0;
          creatorId = 0;
          dateCreated = 0;
          lastUpdated = 0;
        };
    var thisProject : Project = {
          id=0;
          name = "";
          category = "";
          description="";
          projectRepo = "";
          dfxIdentities = [];
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
    var thisJob : Job = {
          id = 0;
          status= "";
          jobType= "";
          refType ="";
          refId= 0;
          workerId= 0;
          environmentId=0;
          dateCreated= 0;
          lastUpdated= 0;
        };    
    var thisWorker : Worker = {
        id= 0;
        name= "";
        status= "";
        category= "";
        description= "";
        lastDeploymentId= 0;
        uniqueId= "";
        publicIp= "";
        privateIp= "" ;
        dnsName= "";
        iiEnabled= "";
        dfxReplicaType= "";
        ttydHttpsEnabled= "";
        ttydHttpsCount= 0;
        lastTouch= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };
    var theseEvents: [Event] = [];
    var theseCanisters: [Canister] = [];

      thisDeployment := DeploymentUtils.getDeploymentByIdUtil (theDeployments, theDeploymentId);

      if (thisDeployment.id > 0 ) {
        // then we found a deployment
        if (thisDeployment.environmentId > 0 ) {
          thisEnvironment := EnvironmentUtils.getEnvironmentByIdUtil (theEnvironments, thisDeployment.environmentId );
        };
        if (thisDeployment.projectId > 0 ) {
          thisProject := ProjectUtils.getProjectByIdUtil (theProjects, thisDeployment.projectId);
        };

        // now we check for a Job with this deployment

        thisJob := JobUtils.getJobByDeploymentId (theJobs, thisDeployment.id);

        if (thisJob.id > 0  and thisJob.workerId > 0 ) {
          thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, thisJob.workerId);
        };
        
        theseEvents := EventUtils.getEventsByDeploymentId (theEvents, thisDeployment.id);
        theseCanisters := CanisterUtils.getCanistersByDeploymentId (theCanisters, thisDeployment.id);
        

      } else {

        thisMsg := "There was no deployment with id "# Int.toText(theDeploymentId) ;
        thisResponseStatus := "Red" ;

        
      }; // end if there was a deployment

      var thisCompleteDeployment: CompleteDeploymentResponse = 
      {
        deploymentObject = thisDeployment;
        environmentObject = thisEnvironment;
        projectObject = thisProject;
        workerObject = thisWorker;
        jobObject = thisJob;
        eventObjects = theseEvents;
        canisterObjects = theseCanisters;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisCompleteDeployment;
    }; // end getCompleteDeploymentMain



  // *********************************************  
  // ************* PROJECTS **********************
  // *********************************************

  // ************* -----------  GET PROJECTS
  public query({caller}) func getListOfProjects(thisKey : Text, listType : Text) : async [Project] {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert
    // flush the array of theProjects as response
    return theProjects;
  }; // end getListOfProjects

  // ************* ----------- MANAGE PROJECT
  public shared({caller}) func manageProjectMain(thisKey : Text, theProject : Project) : async CompleteProjectResponse {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert
    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus : Text = "Green" ;
    var thisProjectId :Int = theProject.id ;



    var thisProject : Project = {
          id=0;
          name = "";
          category = "";
          description="";
          projectRepo = "";
          dfxIdentities = [];
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };

    var theseEnvironments: [Environment] = [];
        
    // verify that there is a project with the id we want to update
    var theProjectsNew: [Project] = ProjectUtils.manageProjectUtil (theProjects, theProject, nextProjectId);
    // or if id = 0 then its an insert
    if (theProject.id == 0 and theProjectsNew != theProjects ) {
      // because it was passed as a 0 so we know it was a new record request
      // increase nextProjectId counter 
      thisProjectId :=nextProjectId ;
      nextProjectId += 1;
      
    }; // end if new

    // TODO - check for errors on update
    theProjects := theProjectsNew;
    // TODO - need to consider: this should return the full list again to refresh the app, needs to be in combination with error handling

      thisProject := ProjectUtils.getProjectByIdUtil (theProjects, thisProjectId);
      

      var thisCompleteProject: CompleteProjectResponse = 
      {
        projectObject = thisProject;
        environmentObjects = theseEnvironments;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };
    return thisCompleteProject;

  }; // end manageProjectMain


    // ************* -----------  GET COMPLETE PROJECT

    public query({caller}) func getCompleteProjectMain (thisKey : Text, theProjectId : Int) : async CompleteProjectResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus : Text = "Green" ;

    var thisProject : Project = {
          id=0;
          name = "";
          category = "";
          description="";
          projectRepo = "";
          dfxIdentities=  [];
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
    var thisEnvironment : Environment = {
          id = 0;
          name = "";
          environmentType = "" ;
          description = "" ;
          projectId = 0 ;
          projectRepoBranch = "";
          identityId = 0;
          deploymentNetwork = "";
          workerId = 0;
          creatorId = 0;
          dateCreated = 0;
          lastUpdated = 0;
        };
    var theseEnvironments: [Environment] = [];

      thisProject := ProjectUtils.getProjectByIdUtil (theProjects, theProjectId);

      if (thisProject.id > 0 ) {
        // then we found a project
        // now we get the Environments that have this project
        
        theseEnvironments := EnvironmentUtils.getEnvironmentsByProjectIdUtil (theEnvironments, thisProject.id);

      } else {

        thisMsg := "There was no project with id "# Int.toText(theProjectId) ;
        thisResponseStatus := "Red" ;

        
      }; // end if there was a deployment

      var thisCompleteProject: CompleteProjectResponse = 
      {
        projectObject = thisProject;
        environmentObjects = theseEnvironments;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisCompleteProject;
    }; // end getCompleteProjectMain



  // *********************************************
  // ************* DEPLOYMENTS *******************
  // *********************************************

  // ************* -----------  GET DEPLOYMENTS
  public query({caller}) func getListOfDeployments(thisKey : Text, listType : Text) : async [Deployment] {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert
    // flush the array of theDeployments as response
    
    var theLast30Deployments: [Deployment] = DeploymentUtils.getDeploymentsRecent (theDeployments, 30);
    return theLast30Deployments;

  };// end getListOfDeployments

  // ************* -----------  MANAGE DEPLOYMENT
  public shared({caller}) func manageDeploymentMain(thisKey : Text, thisDeployment : Deployment) : async Text {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert

    // verify that there is a deployment with the id we want to update
    var theDeploymentsNew: [Deployment] = DeploymentUtils.manageDeploymentUtil (theDeployments, thisDeployment, nextDeploymentId);
    
    if (thisDeployment.id == 0 and theDeploymentsNew != theDeployments ) {
      // because it was passed as a 0 so we know it was a new record request
      // increase nextDeploymentId counter 
      nextDeploymentId += 1;
    }; // end if

    // TODO - check for errors on update

    theDeployments := theDeploymentsNew;
    // TODO - think if this should return the full list again to refresh the app, needs to be in combination with error handling
    return "done";

  };// end manageDeploymentMain

  // *********************************************
  // ************* WORKERS ***********************
  // *********************************************

  // ************* -----------  GET WORKERS
  public query({caller}) func getListOfWorkers(thisKey : Text, listType : Text) : async [Worker] {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert
    // flush the array of theWorkers as response
    return theWorkers;
    
  };// end getListOfWorkers
  
  // ************* -----------  MANAGE WORKER
  public shared({caller}) func manageWorkerMain(thisKey : Text, thisWorker : Worker) : async Text {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert

    // verify that there is a worker with the id we want to update
    var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, thisWorker, nextWorkerId);
    
    if (thisWorker.id == 0 and theWorkersNew != theWorkers ) {
      // because it was passed as a 0 so we know it was a new record request
      // increase nextWorkerId counter 
      nextWorkerId += 1;
    }; // end if

    // TODO - check for errors on update

    theWorkers := theWorkersNew;
    // TODO - think if this should return the full list again to refresh the app, needs to be in combination with error handling
    return "done";

  };// end manageWorkerMain

  public query({caller}) func getCompleteWorkerMain (thisKey : Text, theWorkerId : Int) : async CompleteWorkerResponse {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert

  now := Time.now(); 
  var thisMsg: Text = "";
  var thisResponseStatus = "Green" ;

  var thisWorker : Worker = {
      id= 0;
      name= "";
      status= "";
      category= "";
      description= "";
      lastDeploymentId= 0;
      uniqueId= "";
      publicIp= "";
      privateIp= "";
      dnsName= "";
      iiEnabled= "";
      dfxReplicaType= "";
      ttydHttpsEnabled= "";
      ttydHttpsCount= 0;
      lastTouch= 0;
      creatorId= 0;
      dateCreated= 0;
      lastUpdated= 0;
    };
  var thisProject : Project = {
        id=0;
        name = "";
        category = "";
        description="";
        projectRepo = "";
        dfxIdentities = [];
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };
  var thisEnvironment : Environment = {
        id = 0;
        name = "";
        environmentType = "" ;
        description = "" ;
        projectId = 0 ;
        projectRepoBranch = "";
        identityId = 0;
        deploymentNetwork = "";
        workerId = 0;
        creatorId = 0;
        dateCreated = 0;
        lastUpdated = 0;
      };
  var thisDeployment : Deployment = {
        id= 0;
        status= "";
        environmentId= 0;
        projectId= 0;
        identityId= 0;
        deploymentNotes = "";
        projectRepo= "";
        projectRepoBranch = "";
        executeStartTime= 0;
        executeFinishTime= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };

    var thisJob : Job = {
          id = 0;
          status= "";
          jobType= "";
          refType ="";
          refId= 0;
          workerId= 0;
          environmentId=0;
          dateCreated= 0;
          lastUpdated= 0;
        };    

    thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, theWorkerId);

    thisEnvironment := EnvironmentUtils.getEnvironmentByWorkerIdUtil (theEnvironments, thisWorker.id );

    if (thisEnvironment.projectId > 0 ) {
      thisProject := ProjectUtils.getProjectByIdUtil (theProjects, thisEnvironment.projectId);
    };
    
    
    thisDeployment := DeploymentUtils.getLatestDeploymentByWorkerId (theDeployments, theJobs, thisWorker.id);
    
    thisJob  := JobUtils.getJobByWorkerIdUtil (theJobs, thisWorker.id, "Latest");

    var thisCompleteWorker: CompleteWorkerResponse = 
    {
      workerObject = thisWorker;
      environmentObject = thisEnvironment;
      projectObject = thisProject;
      latestDeploymentObject = thisDeployment;
      latestJobObject = thisJob;
      msg = thisMsg;
      timeStamp = now;
      responseStatus = thisResponseStatus;
    };

    return thisCompleteWorker;
  }; // end getCompleteWorkerMain


  // ********************************************* 
  // ************* WORKER UTILS *****************
  // *********************************************


  // ************* -----------  Uplink
  public shared({caller}) func workerUplink(thisKey : Text, callingWorker : Worker) : async UplinkResponse {

    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert
    var thisMsg: Text = "";
    var thisResponseStatus: Text  = "Green" ;
    now := Time.now(); 
    var thisWorker : Worker = {
        id= 0;
        name= "";
        status= "";
        category= "";
        description= "";
        lastDeploymentId= 0;
        uniqueId= "";
        publicIp= "";
        privateIp= "";
        dnsName= "";
        iiEnabled= "";
        dfxReplicaType= "";
        ttydHttpsEnabled= "";
        ttydHttpsCount= 0;
        lastTouch= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };
    var thisJob : Job = {
          id = 0;
          status= "";
          jobType= "";
          refType ="";
          refId= 0;
          workerId= 0;
          environmentId=0;
          dateCreated= 0;
          lastUpdated= 0;
        };    
    var thisDeployment : Deployment = {
          id= 0;
          status= "";
          environmentId= 0;
          projectId= 0;
          identityId= 0;
          deploymentNotes = "";
          projectRepo= "";
          projectRepoBranch = "";
          executeStartTime= 0;
          executeFinishTime= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
    var thisEnvironment : Environment = {
          id = 0;
          name = "";
          environmentType = "" ;
          description = "" ;
          projectId = 0 ;
          projectRepoBranch = "";
          identityId = 0;
          deploymentNetwork = "";
          workerId = 0;
          creatorId = 0;
          dateCreated = 0;
          lastUpdated = 0;
        };

      var thisIdentity : Identity = {
                id = 0;
                name = "";
                category = "";
                description = "";
                principal = "" ;
                identityPem = "";
                profileWalletId = "";
                creatorId = 0;
                dateCreated = 0;
                lastUpdated = 0;
              };

      var theseCanisterProfiles : [Canister] = [];


    // we take the worker we were passed and check it against existing workers
    // if it returns anythign > 0 than we continue
    thisWorker := WorkerUtils.checkWorkerUtil (theWorkers, callingWorker);

    if (thisWorker.id < 0 and callingWorker.id == 0 ) {
        // then we need to deactivate the one with the s the one with the same unique ID

          thisWorker := {
                id= -(thisWorker.id);
                name= thisWorker.name;
                status= "Terminated";
                category= thisWorker.category;
                description= thisWorker.description;
                lastDeploymentId= thisWorker.lastDeploymentId;
                uniqueId= "Removed: " # thisWorker.uniqueId;
                publicIp= thisWorker.publicIp;
                privateIp= thisWorker.privateIp;
                dnsName= thisWorker.dnsName;
                iiEnabled= thisWorker.iiEnabled;
                dfxReplicaType= thisWorker.dfxReplicaType;
                ttydHttpsEnabled= thisWorker.ttydHttpsEnabled;
                ttydHttpsCount= thisWorker.ttydHttpsCount;
                lastTouch= thisWorker.lastTouch;
                creatorId= thisWorker.creatorId;
                dateCreated= thisWorker.dateCreated;
                lastUpdated= thisWorker.lastUpdated;
              };

        var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, thisWorker, nextWorkerId);
        
        // now we set thisWorker == callingWorker to move forward
        thisWorker := callingWorker ;

        // We don't need to increase the nextWorkerId becuase this should be an update

        // TODO - check for errors on update
        theWorkers := theWorkersNew;

    }; // end if the Ip was already in use
    
    if (thisWorker.id >=  0 and callingWorker.id == 0 ) {
        // then we need to create a new worker
        // verify that there is a worker with the id we want to update
        var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, callingWorker, nextWorkerId);
        
        if (callingWorker.id == 0 and theWorkersNew != theWorkers ) {
          // because it was passed as a 0 so we know it was a new record request
          // increase nextWorkerId counter 
          

        // and now since we know this is a new Worker we need to get the worker object
        // and we set thisWorker == callingWorker to move forward
          thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkersNew, nextWorkerId);
          thisMsg := thisMsg # " - thisWorker = "# Int.toText(thisWorker.id) #" - ";


          nextWorkerId += 1;
        }; // end if

        // TODO - check for errors on update

        theWorkers := theWorkersNew;

    };// end if
  
    // at this point if they are equal and > 0 we want to update last touch

    if (callingWorker.id  == thisWorker.id and callingWorker.id > 0 ) {
      // then we need to update the lastTouch value
      
      

          thisWorker := {
                id= thisWorker.id;
                name= thisWorker.name;
                status= thisWorker.status;
                category= thisWorker.category;
                description= thisWorker.description;
                lastDeploymentId= thisWorker.lastDeploymentId;
                uniqueId= thisWorker.uniqueId;
                publicIp= thisWorker.publicIp;
                privateIp= thisWorker.privateIp;
                dnsName= thisWorker.dnsName;
                iiEnabled= thisWorker.iiEnabled;
                dfxReplicaType= thisWorker.dfxReplicaType;
                ttydHttpsEnabled= thisWorker.ttydHttpsEnabled;
                ttydHttpsCount= thisWorker.ttydHttpsCount;
                lastTouch= now;
                creatorId= thisWorker.creatorId;
                dateCreated= thisWorker.dateCreated;
                lastUpdated= thisWorker.lastUpdated;
              };

      // now we update the lastTouch
      var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, thisWorker, nextWorkerId);

      // TODO - check for errors on update
      theWorkers := theWorkersNew;

    }; //end if the id's are the same
  

    if (callingWorker.id > 0 and thisWorker.id == 0 ) {
      thisResponseStatus := "Red" ;
      thisMsg := "Worker (id: " # Int.toText(callingWorker.id) # ", uniqueId: " # callingWorker.uniqueId # ") is not registered";

    } else if (callingWorker.id  == thisWorker.id or ( callingWorker.id == 0 and thisWorker.id > 0 )) {
      // now we first check for Jobs assigned directly to the worker
      // they get priority over environment jobs
  
    thisJob  := JobUtils.getJobByWorkerIdUtil (theJobs, thisWorker.id, "Ready");

    if (thisJob.id > 0 ) {


        if (thisJob.environmentId >  0 ) { 
          // we need an environment to make it worth installing the II 
          thisEnvironment := EnvironmentUtils.getEnvironmentByIdUtil (theEnvironments, thisJob.environmentId );
   
            
          thisResponseStatus := "Green" ;
          thisMsg := thisMsg # "Worker has a Job to do: (" # Int.toText(thisJob.id)# ")";

              thisJob := {
                      id = thisJob.id;
                      status=  "Assigned";
                      jobType= thisJob.jobType;
                      refType = thisJob.refType;
                      refId=thisJob.refId;
                      workerId= thisWorker.id;
                      environmentId=thisJob.environmentId;
                      dateCreated= thisJob.dateCreated;
                      lastUpdated= now;
                    };

              var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId); 
              theJobs := theJobsNew;
        } else {

        thisResponseStatus := "Yellow" ;
        thisMsg := thisMsg # "Worker has a Job but it does not have an environment";
        };// end if environment ID

    } else {
      // then we check for Environment
        
        
        thisEnvironment := EnvironmentUtils.getEnvironmentByWorkerIdUplinkUtil (theEnvironments, thisWorker.id );
        

      if (thisEnvironment.id == 0 ) {
        thisResponseStatus := "Yellow" ;
        thisMsg := thisMsg # "Worker does not have an Environment";

      } else {


        // now if the environment that returned has a workerId of 0 then it was the next available and we will set it to this worker
        if (thisEnvironment.workerId == 0 ) {
          // now we set the object to this workerId
        

          thisEnvironment := {
              id = thisEnvironment.id;
              name = thisEnvironment.name;
              environmentType = thisEnvironment.environmentType ;
              description = thisEnvironment.description ;
              projectId = thisEnvironment.projectId;
              projectRepoBranch = thisEnvironment.projectRepoBranch;
              identityId = thisEnvironment.identityId;
              deploymentNetwork = thisEnvironment.deploymentNetwork;
              workerId = thisWorker.id;
              creatorId = thisEnvironment.creatorId;
              dateCreated = thisEnvironment.dateCreated;
              lastUpdated = thisEnvironment.lastUpdated;
            };
            
          //now we have to update the array
          // TODO  - better error checking
          var theEnvironmentsNew: [Environment] = EnvironmentUtils.manageEnvironmentUtil (theEnvironments, thisEnvironment, nextEnvironmentId);
          theEnvironments := theEnvironmentsNew ;
          // and now update the worker.status
          thisWorker := {
                id= (thisWorker.id);
                name= thisWorker.name;
                status= "Assigned";
                category= thisWorker.category;
                description= thisWorker.description;
                lastDeploymentId= thisWorker.lastDeploymentId;
                uniqueId= thisWorker.uniqueId;
                publicIp= thisWorker.publicIp;
                privateIp= thisWorker.privateIp;
                dnsName= thisWorker.dnsName;
                iiEnabled= thisWorker.iiEnabled;
                dfxReplicaType= thisWorker.dfxReplicaType;
                ttydHttpsEnabled= thisWorker.ttydHttpsEnabled;
                ttydHttpsCount= thisWorker.ttydHttpsCount;
                lastTouch= thisWorker.lastTouch;
                creatorId= thisWorker.creatorId;
                dateCreated= thisWorker.dateCreated;
                lastUpdated= thisWorker.lastUpdated;
              };
          // TODO  - better error checking
          var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, thisWorker, nextWorkerId); 
          theWorkers := theWorkersNew ;

          
        }; // end if we need to do an update of the Environment and assign this worker to it

        // then we check for Jobs
        
        thisJob  := JobUtils.getJobByEnvironmentIdUtil (theJobs, thisEnvironment.id, "Ready");


        if (thisJob.id == 0 ) {
          
          thisMsg := thisMsg #  "Environment ("# Int.toText(thisEnvironment.id) #") does not have any Jobs to do";

        } else {
          // then we check based on JobType

          // then we need to set the job to assigned, and attach the worker Id
            
            thisJob := {
                    id = thisJob.id;
                    status=  "Assigned";
                    jobType= thisJob.jobType;
                    refType = thisJob.refType;
                    refId=thisJob.refId;
                    workerId= thisWorker.id;
                    environmentId=thisJob.environmentId;
                    dateCreated= thisJob.dateCreated;
                    lastUpdated= now;
                  };

            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId); 
            theJobs := theJobsNew;
                      
          if (thisJob.jobType == "Deploy" ){

            var thisDeploymentId = thisJob.refId ;
            
            thisDeployment := DeploymentUtils.getDeploymentByIdUtil (theDeployments, thisDeploymentId);

            // now we we update the workers last deploymentId 
            thisWorker := {
                id= (thisWorker.id);
                name= thisWorker.name;
                status= thisWorker.status;
                category= thisWorker.category;
                description= thisWorker.description;
                lastDeploymentId= thisDeploymentId;
                uniqueId= thisWorker.uniqueId;
                publicIp= thisWorker.publicIp;
                privateIp= thisWorker.privateIp;
                dnsName= thisWorker.dnsName;
                iiEnabled= thisWorker.iiEnabled;
                dfxReplicaType= thisWorker.dfxReplicaType;
                ttydHttpsEnabled= thisWorker.ttydHttpsEnabled;
                ttydHttpsCount= thisWorker.ttydHttpsCount;
                lastTouch= thisWorker.lastTouch;
                creatorId= thisWorker.creatorId;
                dateCreated= thisWorker.dateCreated;
                lastUpdated= thisWorker.lastUpdated;
              };
          // TODO  - better error checking
          var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, thisWorker, nextWorkerId); 
          theWorkers := theWorkersNew ;
          // then we get the identity if there is one attached


          if (thisDeployment.identityId > 0 ) {
            thisIdentity := IdentityUtils.getIdentityByIdUtil (theIdentities, thisDeployment.identityId);
          }; // end if we have an identity 
          
          // lastly we check for canisterProfiles

          theseCanisterProfiles := CanisterUtils.getCanisterProfilesByProjectEnvironmentId (theCanisters, thisDeployment.projectId, thisDeployment.environmentId );


          };// end jobType


        }; // end check if the environment has a job to do


      }; // end check if the environment is assigned
    }; // end if there was a worker specific Job

    } else {

      thisResponseStatus := "Red" ;
      if (callingWorker.uniqueId == thisWorker.uniqueId and thisWorker.id < 0) {
        // then this is the same IP address but a worker that does not exist
          thisMsg := thisMsg #  "Same IP .";

      };
      thisMsg := thisMsg #  "Something went wrong with worker check (callingWorker.id: "# Int.toText(callingWorker.id) #", callingWorker.uniqueId: "# callingWorker.uniqueId #", thisWorker.id: "# Int.toText(thisWorker.id) #", thisWorker.uniqueId: "# thisWorker.uniqueId #").";
    
    }; // end check if the worker is registered
    

    //var thisMsg: Text = "Testing Message";

    var thisUplinkResponse: UplinkResponse = 
    {
        workerObject= thisWorker;
        jobObject =  thisJob ;
        deploymentObject = thisDeployment;
        environmentObject = thisEnvironment ;
        identityObject  = thisIdentity ;
        canisterProfiles = theseCanisterProfiles;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

    return thisUplinkResponse;

  };// end workerUplink

  
    // ************* -----------  CREATE IIEnableJob 

    public shared({caller}) func createIiEnableJob(thisKey : Text,  theWorkerId : Int) : async CreateIiEnableJobResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus = "Green" ;

    var thisJob : Job = {
          id = 0;
          status= "";
          jobType= "";
          refType ="";
          refId= 0;
          workerId= 0;
          environmentId=0;
          dateCreated= 0;
          lastUpdated= 0;
        };

    var thisWorker : Worker = {
        id= 0;
        name= "";
        status= "";
        category= "";
        description= "";
        lastDeploymentId= 0;
        uniqueId= "";
        publicIp= "";
        privateIp= "";
        dnsName= "";
        iiEnabled= "";
        dfxReplicaType= "";
        ttydHttpsEnabled= "";
        ttydHttpsCount= 0;
        lastTouch= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };

    var thisEnvironment : Environment = {
          id = 0;
          name = "";
          environmentType = "" ;
          description = "" ;
          projectId = 0 ;
          projectRepoBranch = "";
          identityId = 0;
          deploymentNetwork = "";
          workerId = 0;
          creatorId = 0;
          dateCreated = 0;
          lastUpdated = 0;
        };

    thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, theWorkerId);
      if (thisWorker.id > 0 ) {
        // so we want to check if they already have it flagged as installed
          // now we build the job

              thisEnvironment := EnvironmentUtils.getEnvironmentByWorkerIdUtil (theEnvironments, thisWorker.id );

              if (thisEnvironment.id > 0 ) {
                

                thisJob := {
                      id = 0;
                      status= "Ready";
                      jobType= "Install II";
                      refType ="Worker";
                      refId= thisWorker.id;
                      workerId= thisWorker.id;
                      environmentId=thisEnvironment.id;
                      dateCreated= now;
                      lastUpdated= now;
                    };
                // verify that there is a event with the id we want to update
                var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
                
                if (thisJob.id == 0 and theJobsNew != theJobs ) {
                  // because it was passed as a 0 so we know it was a new record request
                  // increase nextJobId counter 
                  nextJobId += 1;
                }; // end if new

                // TODO - check for errors on update

                theJobs := theJobsNew;

              } else {

                thisMsg := thisMsg # " - ERROR: getEnvironmentByWorkerIdUtil= "# Int.toText(theWorkerId) #" NOT in environment set- ";
                thisResponseStatus := "Red" ;
              };


      } else {

        thisMsg := thisMsg # " - ERROR: getWorkerByIdUtil= "# Int.toText(theWorkerId) #" NOT in dataset- ";
        thisResponseStatus := "Red" ;
      };

      


      var thisCreateIiEnableJob : CreateIiEnableJobResponse = 
      {
        jobObject = thisJob;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisCreateIiEnableJob;

    }; // end createIiEnableJob

    // ************* -----------  CREATE IIEnableJob 

    public shared({caller}) func ttydHttpsEnableDisable(thisKey : Text,  theWorkerId : Int) : async TtydHttpsEnableDisableResponse {
      if (thisKey != apiToken and authManager(caller) != true ) {
        assert(false);
      };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus = "Green" ;

    var thisJob : Job = {
          id = 0;
          status= "";
          jobType= "";
          refType ="";
          refId= 0;
          workerId= 0;
          environmentId=0;
          dateCreated= 0;
          lastUpdated= 0;
        };

    var thisWorker : Worker = {
        id= 0;
        name= "";
        status= "";
        category= "";
        description= "";
        lastDeploymentId= 0;
        uniqueId= "";
        publicIp= "";
        privateIp= "";
        dnsName= "";
        iiEnabled= "";
        dfxReplicaType= "";
        ttydHttpsEnabled= "";
        ttydHttpsCount= 0;
        lastTouch= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };

    var thisEnvironment : Environment = {
          id = 0;
          name = "";
          environmentType = "" ;
          description = "" ;
          projectId = 0 ;
          projectRepoBranch = "";
          identityId = 0;
          deploymentNetwork = "";
          workerId = 0;
          creatorId = 0;
          dateCreated = 0;
          lastUpdated = 0;
        };

    thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, theWorkerId);
      if (thisWorker.id > 0 ) {
        
          // now we build the job

          // if the worker is currenty enabled, we will disable, and if disabled enable

          var thisJobType: Text = "Enable ttyd Bash HTTPS";

          if (thisWorker.ttydHttpsEnabled =="Y" ) {
            thisJobType := "Disable ttyd Bash HTTPS";
          } ;

              thisEnvironment := EnvironmentUtils.getEnvironmentByWorkerIdUtil (theEnvironments, thisWorker.id );

              if (thisEnvironment.id > 0 ) {
                

                    thisJob := {
                          id = 0;
                          status= "Ready";
                          jobType= thisJobType;
                          refType ="Worker";
                          refId= thisWorker.id;
                          workerId= thisWorker.id;
                          environmentId=thisEnvironment.id;
                          dateCreated= now;
                          lastUpdated= now;
                        };
                    // verify that there is a event with the id we want to update
                    var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
                    
                    if (thisJob.id == 0 and theJobsNew != theJobs ) {
                      // because it was passed as a 0 so we know it was a new record request
                      // increase nextJobId counter 
                      nextJobId += 1;
                    }; // end if new

                    // TODO - check for errors on update

                    theJobs := theJobsNew;


              } else {

                thisMsg := thisMsg # " - ERROR: getEnvironmentByWorkerIdUtil= "# Int.toText(theWorkerId) #" NOT in environment set- ";
                thisResponseStatus := "Red" ;
              };

              

      } else {

        thisMsg := thisMsg # " - ERROR: getWorkerByIdUtil= "# Int.toText(theWorkerId) #" NOT in dataset- ";
        thisResponseStatus := "Red" ;
      };

      


      var thisTtydHttpsEnableDisableResponse : TtydHttpsEnableDisableResponse = 
      {
        jobObject = thisJob;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };

      return thisTtydHttpsEnableDisableResponse;

    }; // end 


  // *********************************************
  // ************* EVENTS ***********************
  // *********************************************

  // ************* -----------  GET EVENTS
  public query({caller}) func getListOfEvents (thisKey : Text, listType : Text) : async [Event] {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert
    //get the last 30 Events

    var theseEvents: [Event] = EventUtils.getEventsRecent (theEvents, 30);
    
    return theseEvents;
    
  };// end getListOfEvents

  // ************* -----------  MANAGE EVENT
  public shared({caller}) func manageEventMain(thisKey : Text, thisEvent : Event) : async Text {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert
    var thisMsg: Text = "";
    var thisResponseStatus = "Green" ;
    now := Time.now(); 

    var thisJob : Job = {
          id = 0;
          status= "";
          jobType= "";
          refType ="";
          refId= 0;
          workerId= 0;
          environmentId=0;
          dateCreated= 0;
          lastUpdated= 0;
        };    
    var thisDeployment : Deployment = {
          id= 0;
          status= "";
          environmentId= 0;
          projectId= 0;
          identityId= 0;
          deploymentNotes = "";
          projectRepo= "";
          projectRepoBranch = "";
          executeStartTime= 0;
          executeFinishTime= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
        
    var thisWorker : Worker = {
        id= 0;
        name= "";
        status= "";
        category= "";
        description= "";
        lastDeploymentId= 0;
        uniqueId= "";
        publicIp= "";
        privateIp= "";
        dnsName= "";
        iiEnabled= "";
        dfxReplicaType= "";
        ttydHttpsEnabled= "";
        ttydHttpsCount= 0;
        lastTouch= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };

    // verify that there is a event with the id we want to update
    var theEventsNew: [Event] = EventUtils.manageEventUtil (theEvents, thisEvent, nextEventId);
    
    if (thisEvent.id == 0 and theEventsNew != theEvents ) {
      // because it was passed as a 0 so we know it was a new record request
      // increase nextEventId counter 
      nextEventId += 1;
    }; // end if new

    // TODO - check for errors on update

    theEvents := theEventsNew;

    thisJob := JobUtils.getJobByIdUtil (theJobs, thisEvent.jobId);

    // now if it was type Status or Error, we need to do some updates
    if (thisEvent.eventType == "Status" and thisEvent.mainRefType == "Deploy") {

      if (thisEvent.eventText == "JOB START" and thisJob.status == "Assigned" ) {
        // then we want to update deployments and jobs
        thisDeployment := DeploymentUtils.getDeploymentByIdUtil (theDeployments, thisEvent.deploymentId);
        if (thisDeployment.id > 0 ) {
          // now we set the start date and change the status
          
            thisDeployment  := {
                  id= thisDeployment.id;
                  status= "In Progress";
                  environmentId= thisDeployment.environmentId;
                  projectId= thisDeployment.projectId;
                  identityId = thisDeployment.identityId;
                  deploymentNotes = thisDeployment.deploymentNotes;
                  projectRepo= thisDeployment.projectRepo;
                  projectRepoBranch = thisDeployment.projectRepoBranch;
                  executeStartTime= now ;
                  executeFinishTime= thisDeployment.executeFinishTime;
                  creatorId= thisDeployment.creatorId;
                  dateCreated= thisDeployment.dateCreated;
                  lastUpdated = now;
                };
              
            var theDeploymentsNew: [Deployment] = DeploymentUtils.manageDeploymentUtil (theDeployments, thisDeployment, nextDeploymentId);
            theDeployments := theDeploymentsNew ;

        };// end if there was a deployment returned


      } else if (thisEvent.eventText == "JOB END" and (thisJob.status == "Running" or thisJob.status == "Assigned")) {

        thisDeployment := DeploymentUtils.getDeploymentByIdUtil (theDeployments, thisEvent.deploymentId);
        if (thisDeployment.id > 0 ) {
          // now we set the start date and change the status
          
            thisDeployment  := {
                  id= thisDeployment.id;
                  status= "Success";
                  environmentId= thisDeployment.environmentId;
                  projectId= thisDeployment.projectId;
                  identityId= thisDeployment.identityId;
                  deploymentNotes = thisDeployment.deploymentNotes;
                  projectRepo= thisDeployment.projectRepo;
                  projectRepoBranch = thisDeployment.projectRepoBranch;
                  executeStartTime= thisDeployment.executeStartTime ;
                  executeFinishTime= now;
                  creatorId= thisDeployment.creatorId;
                  dateCreated= thisDeployment.dateCreated;
                  lastUpdated = now;
                };
              
            var theDeploymentsNew: [Deployment] = DeploymentUtils.manageDeploymentUtil (theDeployments, thisDeployment, nextDeploymentId);
            theDeployments := theDeploymentsNew ;

        };// end if there was a deployment returned

        if (thisJob.id > 0 ) {
          // now we change the status
          
            thisJob  := {
                  id= thisJob.id;
                  status= "Completed";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;
                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;

        };// end if there was a job returned

      } else if (thisEvent.eventText == "JOB ERROR") {

        thisDeployment := DeploymentUtils.getDeploymentByIdUtil (theDeployments, thisEvent.deploymentId);
        if (thisDeployment.id > 0 ) {
          // now we set the start date and change the status
          
            thisDeployment  := {
                  id= thisDeployment.id;
                  status= "Error";
                  environmentId= thisDeployment.environmentId;
                  projectId= thisDeployment.projectId;
                  identityId= thisDeployment.identityId;
                  deploymentNotes = thisDeployment.deploymentNotes;
                  projectRepo= thisDeployment.projectRepo;
                  projectRepoBranch = thisDeployment.projectRepoBranch;
                  executeStartTime= thisDeployment.executeStartTime ;
                  executeFinishTime= now;
                  creatorId= thisDeployment.creatorId;
                  dateCreated= thisDeployment.dateCreated;
                  lastUpdated= now;
                };
              
            var theDeploymentsNew: [Deployment] = DeploymentUtils.manageDeploymentUtil (theDeployments, thisDeployment, nextDeploymentId);
            theDeployments := theDeploymentsNew ;

        };// end if there was a deployment returned

        if (thisJob.id > 0 ) {
          // now we change the status
          
            thisJob  := {
                  id= thisJob.id;
                  status= "Error";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;
                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;

        };// end if there was a job returned

      }; // end eventText check

    } else if (thisEvent.eventType == "Status" and thisEvent.mainRefType == "Install II") {


      if (thisEvent.eventText == "JOB START" and thisJob.status == "Assigned") {


        if (thisJob.id > 0 ) {
          // now we change the status
          
            thisJob  := {
                  id= thisJob.id;
                  status= "Running";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;

                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;

        };// end if there was a job returned
      } else if (thisEvent.eventText == "JOB END" and (thisJob.status == "Running" or thisJob.status == "Assigned")) {
       

          if (thisJob.id > 0 ) {

            // update the Job to complete
            thisJob  := {
                  id= thisJob.id;
                  status= "Complete";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;
                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;


          // update the worker to have II enabled
          thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, thisJob.workerId);

          if (thisWorker.id >  0 ) {
            
            thisWorker := {
                  id= thisWorker.id;
                  name= thisWorker.name;
                  status= thisWorker.status;
                  category= thisWorker.category;
                  description= thisWorker.description;
                  lastDeploymentId= thisWorker.lastDeploymentId;
                  uniqueId= thisWorker.uniqueId;
                  publicIp= thisWorker.publicIp;
                  privateIp= thisWorker.privateIp;
                  dnsName= thisWorker.dnsName;
                  iiEnabled= "Y";
                  dfxReplicaType= thisWorker.dfxReplicaType;
                  ttydHttpsEnabled= thisWorker.ttydHttpsEnabled;
                  ttydHttpsCount= thisWorker.ttydHttpsCount;
                  lastTouch= thisWorker.lastTouch;
                  creatorId= thisWorker.creatorId;
                  dateCreated= thisWorker.dateCreated;
                  lastUpdated= now;
                };

              var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, thisWorker, nextWorkerId);
            
              theWorkers := theWorkersNew;
          }; // end if we found a worker
        }; // end if we found a job


      } else if (thisEvent.eventText == "JOB ERROR") {


        if (thisJob.id > 0 ) {
          // now we change the status
          
            thisJob  := {
                  id= thisJob.id;
                  status= "Error";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;
                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;

        };// end if there was a job returned

      };// end eventText check

    } else if (thisEvent.eventType == "Status" and thisEvent.mainRefType == "Enable ttyd Bash HTTPS") {


      if (thisEvent.eventText == "JOB START" and thisJob.status == "Assigned") {


        if (thisJob.id > 0 ) {
          // now we change the status
          
            thisJob  := {
                  id= thisJob.id;
                  status= "Running";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;

                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;

        };// end if there was a job returned
      } else if (thisEvent.eventText == "JOB END" and (thisJob.status == "Running" or thisJob.status == "Assigned") ) {
       

          if (thisJob.id > 0 ) {

            // update the Job to complete
            thisJob  := {
                  id= thisJob.id;
                  status= "Complete";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;
                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;


          // update the worker to have II enabled
          thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, thisJob.workerId);

          if (thisWorker.id >  0 ) {
            
            thisWorker := {
                  id= thisWorker.id;
                  name= thisWorker.name;
                  status= thisWorker.status;
                  category= thisWorker.category;
                  description= thisWorker.description;
                  lastDeploymentId= thisWorker.lastDeploymentId;
                  uniqueId= thisWorker.uniqueId;
                  publicIp= thisWorker.publicIp;
                  privateIp= thisWorker.privateIp;
                  dnsName= thisWorker.dnsName;
                  iiEnabled= thisWorker.iiEnabled;
                  dfxReplicaType= thisWorker.dfxReplicaType;
                  ttydHttpsEnabled= "Y";
                  ttydHttpsCount= 1; // currently hardcoded to 1
                  lastTouch= thisWorker.lastTouch;
                  creatorId= thisWorker.creatorId;
                  dateCreated= thisWorker.dateCreated;
                  lastUpdated= now;
                };

              var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, thisWorker, nextWorkerId);
            
              theWorkers := theWorkersNew;
          }; // end if we found a worker
        }; // end if we found a job


      } else if (thisEvent.eventText == "JOB ERROR") {


        if (thisJob.id > 0 ) {
          // now we change the status
          
            thisJob  := {
                  id= thisJob.id;
                  status= "Error";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;
                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;

        };// end if there was a job returned

      };// end eventText check

    } else if (thisEvent.eventType == "Status" and thisEvent.mainRefType == "Disable ttyd Bash HTTPS") {


      if (thisEvent.eventText == "JOB START" and thisJob.status == "Ready") {


        if (thisJob.id > 0 ) {
          // now we change the status
          
            thisJob  := {
                  id= thisJob.id;
                  status= "Running";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;

                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;

        };// end if there was a job returned
      } else if (thisEvent.eventText == "JOB END" and thisJob.status == "Running") {
       

          if (thisJob.id > 0 ) {

            // update the Job to complete
            thisJob  := {
                  id= thisJob.id;
                  status= "Complete";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;
                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;


          // update the worker to have ttyd enabled
          thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, thisJob.workerId);

          if (thisWorker.id >  0 ) {
            
            thisWorker := {
                  id= thisWorker.id;
                  name= thisWorker.name;
                  status= thisWorker.status;
                  category= thisWorker.category;
                  description= thisWorker.description;
                  lastDeploymentId= thisWorker.lastDeploymentId;
                  uniqueId= thisWorker.uniqueId;
                  publicIp= thisWorker.publicIp;
                  privateIp= thisWorker.privateIp;
                  dnsName= thisWorker.dnsName;
                  iiEnabled= thisWorker.iiEnabled;
                  dfxReplicaType= thisWorker.dfxReplicaType;
                  ttydHttpsEnabled= "N";
                  ttydHttpsCount= 1; // currently hardcoded to 1
                  lastTouch= thisWorker.lastTouch;
                  creatorId= thisWorker.creatorId;
                  dateCreated= thisWorker.dateCreated;
                  lastUpdated= now;
                };

              var theWorkersNew: [Worker] = WorkerUtils.manageWorkerUtil (theWorkers, thisWorker, nextWorkerId);
            
              theWorkers := theWorkersNew;
          }; // end if we found a worker
        }; // end if we found a job


      } else if (thisEvent.eventText == "JOB ERROR" ) {


        if (thisJob.id > 0 ) {
          // now we change the status
          
            thisJob  := {
                  id= thisJob.id;
                  status= "Error";
                  jobType = thisJob.jobType;
                  refType= thisJob.refType;
                  refId = thisJob.refId;
                  workerId= thisJob.workerId;
                  environmentId= thisJob.environmentId;
                  dateCreated= thisJob.dateCreated;
                  lastUpdated= now;
                };
              
            var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
            theJobs := theJobsNew ;

        };// end if there was a job returned

      };// end eventText check



    }; // end if event type and job type specific updates
    // TODO - think if this should return the full list again to refresh the app, needs to be in combination with error handling
    return "done";

  };// end manageEventMain


  // *********************************************
  // ************* JOBS **************************
  // *********************************************

  // ************* -----------  GET JOBS
  public query({caller}) func getListOfJobs (thisKey : Text, listType : Text) : async [Job] {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert
    // flush the array of theJobs as response
    return theJobs;
    
  };// end getListOfJobs

  // ************* -----------  MANAGE JOB
  public shared({caller}) func manageJobMain(thisKey : Text, thisJob : Job) : async Text {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert

    // verify that there is a event with the id we want to update
    var theJobsNew: [Job] = JobUtils.manageJobUtil (theJobs, thisJob, nextJobId);
    
    if (thisJob.id == 0 and theJobsNew != theJobs ) {
      // because it was passed as a 0 so we know it was a new record request
      // increase nextJobId counter 
      nextJobId += 1;
    }; // end if new

    // TODO - check for errors on update

    theJobs := theJobsNew;
    // TODO - think if this should return the full list again to refresh the app, needs to be in combination with error handling
    return "done";

  };// end manageJobMain


  public query({caller}) func getCompleteJobMain (thisKey : Text, theJobId : Int) : async CompleteJobResponse {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert

  now := Time.now(); 
  var thisMsg: Text = "";
  var thisResponseStatus = "Green" ;


    var thisJob : Job = {
          id = 0;
          status= "";
          jobType= "";
          refType ="";
          refId= 0;
          workerId= 0;
          environmentId=0;
          dateCreated= 0;
          lastUpdated= 0;
        };    

    thisJob  := JobUtils.getJobByIdUtil (theJobs, theJobId);

    var thisCompleteJob: CompleteJobResponse = 
    {
      jobObject = thisJob;
      msg = thisMsg;
      timeStamp = now;
      responseStatus = thisResponseStatus;
    };

    return thisCompleteJob;
  }; // end getCompleteJobMain


  // *********************************************
  // ************* USERS ***********************
  // *********************************************

  // ************* -----------  GET USERS
  public query({caller}) func getListOfUsers (thisKey : Text, listType : Text) : async [User] {
    // only available to admins
    assert (authAdminstrator(caller));
    // flush the array of theUsers as response
    return theUsers;
    
  };// end getListOfUsers

  // ************* -----------  MANAGE USER
  public shared({caller}) func manageUserMain(thisKey : Text, thisUser : User) : async Text {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert

    // verify that there is a User with the id we want to update
    var theUsersNew: [User] = UserUtils.manageUserUtil (theUsers, thisUser, nextUserId);
    
    if (thisUser.id == 0 and theUsersNew != theUsers ) {
      // because it was passed as a 0 so we know it was a new record request
      // increase nextUserId counter 
      nextUserId += 1;
    }; // end if new

    // TODO - check for errors on update

    theUsers := theUsersNew;
    // TODO - think if this should return the full list again to refresh the app, needs to be in combination with error handling
    return "done";

  };// end manageUserMain


  // ********************************************* 
  // ************* Dashboard *********************
  // *********************************************


    // ************* -----------  GET COMPLETE DASHBOARD STATS

    public query({caller}) func getCompleteDashboardStats (thisKey : Text) : async CompleteDashboardStats {
    if (thisKey != apiToken and authManager(caller) != true ) {
      assert(false);
    };// end if we need to assert

    now := Time.now(); 
    var thisMsg: Text = "";
    var thisResponseStatus = "Green" ;

    var thisEnvironmentsCount: Nat = 0 ;
    var thisEnvironmentsActive: Nat = 0 ;
    var thisProjectsCount: Nat = 0 ;
    var thisProjectsActive: Nat = 0 ;
    var thisEventsCount: Nat = 0 ;
    var thisEventsCountLast30: Nat = 0 ;
    var thisDeploymentsCount: Nat = 0 ;
    var thisDeploymentsCountLastDay: Nat = 0 ;


      
      thisEnvironmentsCount := theEnvironments.size() ;
      thisProjectsCount := theProjects.size() ;
      thisEventsCount := theEvents.size() ;
      thisDeploymentsCount := theDeployments.size() ;
      
      thisEnvironmentsActive := EnvironmentUtils.environmentsActiveCount (theEnvironments,theWorkers);
      thisProjectsActive := ProjectUtils.projectsActiveCount (theProjects, theEnvironments);
      thisEventsCountLast30 := EventUtils.eventsCountLast30 (theEvents);
      thisDeploymentsCountLastDay := DeploymentUtils.deploymentsCountLastDay (theDeployments);
      var theDashboardStats: CompleteDashboardStats = 
      {
        environmentsCount = thisEnvironmentsCount;
        environmentsActive = thisEnvironmentsActive;
        projectsCount = thisProjectsCount;
        projectsActive = thisProjectsActive;
        eventsCount = thisEventsCount;
        eventsCountLast30 = thisEventsCountLast30;
        deploymentsCount = thisDeploymentsCount;
        deploymentsCountLastDay = thisDeploymentsCountLastDay;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
      };


      return theDashboardStats;
    }; // end getCompleteDashboardStats
  

  // ********************************************* 
  // ************* APP UTILITIES *****************
  // *********************************************
  // a public WhoAmI that just replies with the Principal
  public query ({caller}) func checkPrincipalMain() : async Int {
      //TODO check user array
      var thisUserId: Int = 0;

      if (authManager(caller)) {
        thisUserId := 1;
      };
      return thisUserId;
  }; // end checkPrincipalMain
  

  public shared({caller})  func addManagerPrincipalMain(thisKey : Text, thisHashPass : Text, thisPrincipal : Principal) : async LoginResponse {
      // we don't check the assert since we are checking the hash pass
      // and the principal will be the default javascript one
      // and we woudl not have the apikey until we logged in
      // if (thisKey != apiToken and authManager(caller) != true ) {
      //   assert(false);
      // };// end if we need to assert

    var thisMsg: Text = "";
    var thisResponseStatus: Text = "Green" ;
    let now = Time.now();
      //set up user object
      var thisUser: User = {
            id = 0;
            name = "";
            email = "";
            cellPhone = "";
            hashPass = "";
            internetId = "";
            apiToken = "";
            active = true ;
            creatorId = 0;
            dateCreated = 0;
            lastUpdated = 0;
          };
      // first need to get the manager user 0
    thisUser := UserUtils.getUserByIdUtil (theUsers, 0);
    if (thisUser.hashPass == thisHashPass) {
      // then we add this callers principal to the workers

      // going to convert to Buffer and back as append is deprecated

      let appManagersBuffer : Buffer.Buffer<Principal> = Buffer.Buffer(appUsers.managers.size());
        
      for (x in appUsers.managers.vals()) {
        
          appManagersBuffer.add(x);
        
      };
    
      appManagersBuffer.add(thisPrincipal);

      let appManagers : [Principal] = appManagersBuffer.toArray();

       
      var newAppUsers: AppUsers = {
        administrators = appUsers.administrators;
        managers = appManagers;
      };
      appUsers := newAppUsers;
      thisResponseStatus := "Green";
    } else {

      thisMsg := "Manager Code incorrect, please try again";
      thisResponseStatus := "Red" ;
    };// end if the admin passwords match


    var thisLoginResponse: LoginResponse = 
    {
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
    };

    return thisLoginResponse;
  }; // end addManagerPrincipalMain

  public shared({caller})  func managePrincipalsMain(thisKey : Text, thisHashPass : Text, thisRemovePrincipal : Text) : async ManagePrincipalResponse {
      // we don't check the assert since we are checking the hash pass
      // if (thisKey != apiToken and authManager(caller) != true ) {
      //   assert(false);
      // };// end if we need to assert

    var foundPrincipal = false;
    var thisMsg: Text = "";
    var thisResponseStatus: Text = "Green" ;
    let now = Time.now();
      //set up user object
      var thisUser: User = {
            id = 0;
            name = "";
            email = "";
            cellPhone = "";
            hashPass = "";
            internetId = "";
            apiToken = "";
            active = true ;
            creatorId = 0;
            dateCreated = 0;
            lastUpdated = 0;
          };
      // first need to get the manager user 0
    
    var thisListOfManagerPrincipals : Buffer.Buffer<Principal> = Buffer.Buffer(0);

    thisUser := UserUtils.getUserByIdUtil (theUsers, 0);
    if (thisUser.hashPass == thisHashPass ) {
      // then we add this callers principal to the workers
      //let appManagers : [Principal] = Array.append<Principal>(appUsers.managers, [thisPrincipal]);
      

      if (thisRemovePrincipal.size() > 0 ) {
        let theNewManagers: [Principal] = Array.map<Principal, Principal>(
          appUsers.managers,
          func (origPrincipal : Principal) : Principal {
            // so since this is based on deployment we want to check for deployment
            
            if (origPrincipal == Principal.fromText(thisRemovePrincipal) ) {
              foundPrincipal := true;
            } else {
              thisListOfManagerPrincipals.add(origPrincipal);

            }; // end if this is the same id as what was passed to us
            origPrincipal
          } // end generic subfunction
        ); // end Array Map
        var newAppUsers: AppUsers = {
          administrators = appUsers.administrators;
          managers = thisListOfManagerPrincipals.toArray();
        };
        appUsers := newAppUsers;
      } else {

        

        for (x in appUsers.managers.vals()) {
          
            thisListOfManagerPrincipals.add(x);
          
        };
        
      };// end if there is a removal 
      thisResponseStatus := "Green";
    } else {

      thisMsg := "Manager Code incorrect, please try again";
      thisResponseStatus := "Red" ;

    };// end if the admin passwords match


    var thisManagePrincipalResponse: ManagePrincipalResponse = 
    {
        listOfManagerPrincipals = thisListOfManagerPrincipals.toArray();
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
    };

    return thisManagePrincipalResponse;
  }; // end addManagerPrincipalMain

  // ************* -----------  authenticateMain
  public shared({caller}) func authenticateMain (thisLoginAttempt : LoginAttempt, thisNewHashPass: Text) : async LoginResponse {
    // removed the key from this one since its a login
    // assert (thisKey == apiToken);
    var thisMsg: Text = "";
    var thisResponseStatus: Text = "Red" ;
    let now = Time.now();
    var thisUser: User = {
            id = 0;
            name = "";
            email = "";
            cellPhone = "";
            hashPass = "";
            internetId = "";
            apiToken = "";
            active = true ;
            creatorId = 0;
            dateCreated = 0;
            lastUpdated = 0;
          };
    // for now we check the password agains the one of the 0 user
    // TODO create ability for users to have their own.
    thisUser := UserUtils.getUserByIdUtil (theUsers, 0);


    // flush the array of theWorkers as response
    //return theWorkers;
    var newLoginAttempt: LoginAttempt = {
      timestamp = now;
      loginHash = thisLoginAttempt.loginHash;
      loginIp = thisLoginAttempt.loginIp;
      loginClient = thisLoginAttempt.loginClient;
    };

    // going to convert to Buffer and back as append is deprecated

    let newLoginAttempts : Buffer.Buffer<LoginAttempt> = Buffer.Buffer(theLoginAttempts.size());
      
    for (x in theLoginAttempts.vals()) {
      
        newLoginAttempts.add(x);
      
    };
  
    newLoginAttempts.add(newLoginAttempt);


    
    theLoginAttempts := newLoginAttempts.toArray();

    // now we check if we have a winner 
    if (thisLoginAttempt.loginHash == thisUser.hashPass ) {
      thisResponseStatus := "Green" ;
      // then we set the flagg that they logged in

      everLoggedIn := "Y";

      // will include the apiToken from a successful login
      thisMsg := thisUser.apiToken ;
      //TODO - log successful login
      // now we check if there is a new HashPass, which if we have gotten to here,
      // the user request is authenticated
        if (thisNewHashPass != "" and thisNewHashPass != thisUser.hashPass) {
          var thisNewUser: User = {
                  id = 0;
                  name = thisUser.name;
                  email = thisUser.email;
                  cellPhone = thisUser.cellPhone;
                  hashPass = thisNewHashPass;
                  internetId = thisUser.internetId;
                  apiToken = thisUser.apiToken;
                  active = thisUser.active;
                  creatorId = thisUser.creatorId;
                  dateCreated = thisUser.dateCreated;
                  lastUpdated = now;
                };
          var theUsersNew: [User] = UserUtils.manageUserUtil (theUsers, thisNewUser, 0);

          theUsers := theUsersNew;
        } else if (thisNewHashPass == thisUser.hashPass) {
          thisResponseStatus := "Red" ;
          thisMsg := "The New Manager Code cannot be the same as your last one.";
        }; // end new thisNewHashPass

    } else {
      thisResponseStatus := "Red" ;
      thisMsg := "Manager Code incorrect, please try again";
    };

    var thisLoginResponse: LoginResponse = 
    {
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
    };

    return thisLoginResponse;
    
  }; // end authenticateMain

  public shared({caller})  func getICPMConfigDownload(thisKey : Text, thisHashPass : Text) : async DownloadAllConfigResponse {
      // we don't check the assert since we are checking the hash pass
      // if (thisKey != apiToken and authManager(caller) != true ) {
      //   assert(false);
      // };// end if we need to assert

    var thisMsg: Text = "";
    var thisResponseStatus: Text = "Green" ;
    let now = Time.now();
      //set up user object
      var thisUser: User = {
            id = 0;
            name = "";
            email = "";
            cellPhone = "";
            hashPass = "";
            internetId = "";
            apiToken = "";
            active = true ;
            creatorId = 0;
            dateCreated = 0;
            lastUpdated = 0;
          };
      // first need to get the manager user 0
      var theseEnvironments : [Environment] = [];
      var theseProjects : [Project] = [];
      var theseIdentities : [Identity] = [];
      var theseCanisterProfiles : [Canister] = [];
      var theseUsers : [User] = [];
      
    thisUser := UserUtils.getUserByIdUtil (theUsers, 0);
    if (thisUser.hashPass == thisHashPass) {
       // now we set the variable arrays for the response

        theseEnvironments := theEnvironments;
        theseProjects := theProjects;
        theseIdentities := theIdentities;
        theseCanisterProfiles := CanisterUtils.getCanistersByDeploymentId (theCanisters, 0);
        theseUsers := theUsers ;
        

      thisResponseStatus := "Green";
    } else {

      thisMsg := "Manager Code incorrect, please try again";
      thisResponseStatus := "Red" ;
    };// end if the admin passwords match


    var thisDownloadResponse: DownloadAllConfigResponse = 
    {
        environments= theseEnvironments;
        projects = theseProjects;
        identities = theseIdentities;
        canisterProfiles = theseCanisterProfiles;
        users = theseUsers;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
    };

    return thisDownloadResponse;
  }; // end getICPMConfigDownload

  public shared({caller})  func getICPMLogDownload(thisKey : Text, thisHashPass : Text) : async DownloadAllLogResponse {
      // we don't check the assert since we are checking the hash pass
      // if (thisKey != apiToken and authManager(caller) != true ) {
      //   assert(false);
      // };// end if we need to assert

    var thisMsg: Text = "";
    var thisResponseStatus: Text = "Green" ;
    let now = Time.now();
      //set up user object
      var thisUser: User = {
            id = 0;
            name = "";
            email = "";
            cellPhone = "";
            hashPass = "";
            internetId = "";
            apiToken = "";
            active = true ;
            creatorId = 0;
            dateCreated = 0;
            lastUpdated = 0;
          };
      // first need to get the manager user 0
      var theseEvents : [Event] = [];
      var theseDeployments : [Deployment] = [];
      var theseCanisters : [Canister] = [];
      var theseJobs : [Job] = [];
      
    thisUser := UserUtils.getUserByIdUtil (theUsers, 0);
    if (thisUser.hashPass == thisHashPass) {
       // now we set the variable arrays for the response

        theseEvents := theEvents;
        theseDeployments := theDeployments;
        theseCanisters := theCanisters;
        theseJobs := theJobs;
        

      thisResponseStatus := "Green";
    } else {

      thisMsg := "Manager Code incorrect, please try again";
      thisResponseStatus := "Red" ;
    };// end if the admin passwords match


    var thisDownloadResponse: DownloadAllLogResponse = 
    {
        events= theseEvents;
        deployments = theseDeployments;
        canisters = theseCanisters;
        jobs = theseJobs;
        msg = thisMsg;
        timeStamp = now;
        responseStatus = thisResponseStatus;
    };

    return thisDownloadResponse;
  }; // end getICPMLogDownload


  // check to make sure the Principal is in the administors array of principals
  private func authAdminstrator(c: Principal): Bool {
      let found = Array.find<Principal>(appUsers.administrators, func(p: Principal) {p == c});
      return Option.isSome(found);
  };  // end authAdminstrator

  // check to make sure the Principal is in the workers array of principals
  private func authManager(c: Principal): Bool {
      let found = Array.find<Principal>(appUsers.managers, func(p: Principal) {p == c});
      return Option.isSome(found);
  }; // end isWorker

}; // end actor