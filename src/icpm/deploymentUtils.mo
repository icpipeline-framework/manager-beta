import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";
import Types "types";

module {

  type Deployment = Types.Deployment;
  type Job = Types.Job;

  // general handler function for adding and editing theDeployments in PipelineManager

  public func manageDeploymentUtil(theDeployments : [Deployment], thisDeployment : Deployment, nextDeploymentId: Int ) : [Deployment] {
    let now = Time.now();
    var foundDeployment = false;
    let theDeploymentsNew: [Deployment]  = Array.map<Deployment, Deployment>(
      theDeployments,
      func (origDeployment : Deployment) : Deployment {
        if (origDeployment.id == thisDeployment.id ) {
          foundDeployment := true;
          // TODO - create a backup object and array so that the original object can be stored for history
          return {
            id = thisDeployment.id;
            status = thisDeployment.status;
            environmentId = thisDeployment.environmentId;
            projectId = thisDeployment.projectId;
            identityId = thisDeployment.identityId;
            deploymentNotes = thisDeployment.deploymentNotes;
            projectRepo = thisDeployment.projectRepo;
            projectRepoBranch = thisDeployment.projectRepoBranch;
            executeStartTime = thisDeployment.executeStartTime;
            executeFinishTime = thisDeployment.executeFinishTime;
            creatorId = thisDeployment.creatorId;
            dateCreated = thisDeployment.dateCreated;
            lastUpdated = now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origDeployment
      } // end sub function in map

    ); // end theDeploymentsNew

    // check results of Array.map iteration
    if (thisDeployment.id > 0 and foundDeployment == true ) {
      // found a matching deployment and updated it
      // return the whole modified array to the calling frontend function
      return theDeploymentsNew
    } else if (thisDeployment.id > 0 and foundDeployment == false ) {
      // TODO
      // need error handling/messaging for expected project id not found which means something amiss
      // in this case we return an UNmodified array back to the frontend calling function,
      // even though thisDeploymentId is > 0 meaning that we should have found a match and updated the array
      return theDeploymentsNew
    } else if (thisDeployment.id == 0 and foundDeployment == false) {
      // this is the correct/expected "add new" use case
      // we build a new Deployment type/object and append it to the array as new
      // TODO - check if there was a duplicate while going through the map based on name
      // use the nextDeploymentId
      let newDeployment: Deployment = {
        id = nextDeploymentId;
        status = thisDeployment.status;
        environmentId = thisDeployment.environmentId;
        projectId = thisDeployment.projectId;
        identityId = thisDeployment.identityId;
        deploymentNotes = thisDeployment.deploymentNotes;
        projectRepo = thisDeployment.projectRepo;
        projectRepoBranch = thisDeployment.projectRepoBranch;
        executeStartTime = thisDeployment.executeStartTime;
        executeFinishTime = thisDeployment.executeFinishTime;
        creatorId = thisDeployment.creatorId;
        dateCreated = now;
        lastUpdated = now;
      }; // END declaration of newDeployment var;

      // append new project to theDeployments array
      // return the whole modified array to the calling frontend function
      return Array.append<Deployment>(theDeployments, [newDeployment]);

    } else {
      // TODO
      // theoretically this condition never occurs, does not fit any known use case or error case
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theDeploymentsNew;
    } // end if for insert/update or errors
  }; // END function manageDeploymentUtil

public func getDeploymentByIdUtil (theDeployments : [Deployment], thisDeploymentId: Int ) : Deployment  {
  // now we map through the array for a worker with that Id

    var foundDeployment = false;
    var thisDeployment : Deployment = {
          id= 0;
          status= "";
          environmentId= 0;
          projectId= 0;
          identityId = 0;
          deploymentNotes = "";
          projectRepo= "";
          projectRepoBranch = "";
          executeStartTime= 0;
          executeFinishTime= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };

 
    
    let theDeploymentsNew: [Deployment] = Array.map<Deployment, Deployment>(
      theDeployments,
      func (origDeployment : Deployment) : Deployment {
        if (origDeployment.id == thisDeploymentId) {
          foundDeployment := true;
          thisDeployment := origDeployment;
        }; // end if this is the same id as what was passed to us
        origDeployment
      } // end generic subfunction
    ); // end Array Map



  return thisDeployment;
  
};// end getDeploymentById

public func getLatestDeploymentByEnvironmentId (theDeployments : [Deployment], thisEnvironmentId: Int ) : Deployment  {
  // now we map through the array for a worker with that Id

    var foundDeployment = false;
    var thisDeployment : Deployment = {
          id= 0;
          status= "";
          environmentId= 0;
          projectId= 0;
          identityId = 0;
          deploymentNotes = "";
          projectRepo= "";
          projectRepoBranch = "";
          executeStartTime= 0;
          executeFinishTime= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };

 
    
    let theDeploymentsNew: [Deployment] = Array.map<Deployment, Deployment>(
      theDeployments,
      func (origDeployment : Deployment) : Deployment {
        if (origDeployment.environmentId == thisEnvironmentId) {
          // then we know its the environment we are looking for.
          // but we need to see if its latest. 
          if (foundDeployment == true) {
            // then we have one already and we need to see if its the latest based on create date

            if (origDeployment.dateCreated  > thisDeployment.dateCreated ) {

              foundDeployment := true;
              thisDeployment := origDeployment;

            }// end if older 

          } else {
            foundDeployment := true;
            thisDeployment := origDeployment;
          } // end if already found, otherwise we take this one

        }; // end if this is the same id as what was passed to us
        origDeployment
      } // end generic subfunction
    ); // end Array Map



  return thisDeployment;
  
};// end getLatestDeploymentByEnvironment

public func getLatestDeploymentByWorkerId(theDeployments : [Deployment], theJobs: [Job], thisWorkerId: Int ) : Deployment  {
  // now we map through the array for a worker with that Id

    var foundDeployment = false;
    let lastDate:Int=0;
    var thisDeployment : Deployment = {
          id= 0;
          status= "";
          environmentId= 0;
          projectId= 0;
          identityId = 0;
          deploymentNotes = "";
          projectRepo= "";
          projectRepoBranch = "";
          executeStartTime= 0;
          executeFinishTime= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };

 
    
    let theDeploymentsNew: [Deployment] = Array.map<Deployment, Deployment>(
      theDeployments,
      func (origDeployment : Deployment) : Deployment {
          // now we check Jobs with that Deployment to get the worker
          let theJobsNew: [Job] = Array.map<Job, Job>(
            theJobs,
            func (origJob : Job) : Job {
              if (origJob.refId == origDeployment.id and origJob.refType == "Deployment" and origJob.workerId == thisWorkerId  and origJob.lastUpdated > lastDate) {
                
                thisDeployment := origDeployment ;
                foundDeployment := true;
                

              };// end if this is a job for that deployment 
              origJob
            } // end function
          );//end array map

        origDeployment
      } // end generic subfunction
    ); // end Array Map



  return thisDeployment;
  
};// end getLatestDeploymentByWorker

public func deploymentsCountLastDay (theDeployments : [Deployment]) : Nat  {
    // now we map through the array for a deployments in the last 24 hours with that deployment

      let now = Time.now();
      var foundDeployments = false;
      var thisCount : Nat = 0 ;
      // (24hrs times 60 min) in min times 60 sec per min times 1000 milli seconds per second * 1,000,000 nano seconds per milli second
      var twentyFourHoursAgo : Int = now - ((24*60) * 60 * 1000 * 1000000) ;


      
      let theDeploymentsNew: [Deployment] = Array.map<Deployment, Deployment>(
        theDeployments,
        func (origDeployment : Deployment) : Deployment {
          // so since this is based on deployment we want to check for deployment
          
          if (origDeployment.dateCreated > twentyFourHoursAgo ) {
            foundDeployments := true;
            thisCount += 1;
          }; // end if this is the same id as what was passed to us
          origDeployment
        } // end generic subfunction
      ); // end Array Map

    //thisCount := Int.abs(thirtyMinAgo) ;


    return thisCount;
    
  };// end deploymentsCountLastDay

public func getDeploymentsRecent (theDeployments : [Deployment], thisHowMany: Int) : [Deployment]  {
    // now we map through the array for a deployments in the last 24 hours with that deployment

      let now = Time.now();
      var foundDeployments = false;
      var thisCount : Nat = 0 ;
      // (24hrs times 60 min) in min times 60 sec per min times 1000 milli seconds per second * 1,000,000 nano seconds per milli second
      var twentyFourHoursAgo : Int = now - ((24*60) * 60 * 1000 * 1000000) ;

      var theseDeployments :[Deployment] = [];

      var thisDeploymentsCount : Int = theDeployments.size() ;

      let theDeploymentsNew: [Deployment] = Array.map<Deployment, Deployment>(
        theDeployments,
        func (origDeployment : Deployment) : Deployment {
          // so since this is based on deployment we want to check for deployment
          thisCount += 1;
          if (thisCount >  (thisDeploymentsCount - thisHowMany)  ) {
            
              foundDeployments := true;
              
            
              theseDeployments := Array.append<Deployment>(theseDeployments, [origDeployment]);
          }; // end if this count is < 30
            origDeployment
        } // end generic subfunction
      ); // end Array Map

    //thisCount := Int.abs(thirtyMinAgo) ;


    return theseDeployments;
    
  };// end getEventsByDeploymentId

} // end module