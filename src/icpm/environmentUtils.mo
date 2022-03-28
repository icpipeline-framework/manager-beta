import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";


/// ****** CUSTOM IMPORTS 
import Types "types";
import WorkerUtils "workerUtils";

module {

  type Environment = Types.Environment;
  type Worker = Types.Worker;

  // general handler function for adding and editing Environments in PipelineManager
  
  public func manageEnvironmentUtil(theEnvironments : [Environment], thisEnvironment : Environment, nextEnvironmentId: Int ) : [Environment] {
    let now = Time.now();
    var foundEnvironment = false;
    let theEnvironmentsNew: [Environment] = Array.map<Environment, Environment>(
      theEnvironments,
      func (origEnvironment : Environment) : Environment {
        if (origEnvironment.id == thisEnvironment.id ) {
          foundEnvironment := true;
          // TODO - create a backup object and array so that the original object can be stored for history
          return {
            id = thisEnvironment.id;
            name = thisEnvironment.name;
            environmentType = thisEnvironment.environmentType;
            description = thisEnvironment.description;
            projectId = thisEnvironment.projectId;
            projectRepoBranch = thisEnvironment.projectRepoBranch;
            identityId = thisEnvironment.identityId;
            deploymentNetwork = thisEnvironment.deploymentNetwork;
            workerId = thisEnvironment.workerId;
            creatorId = origEnvironment.creatorId;
            dateCreated = origEnvironment.dateCreated;
            lastUpdated = now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origEnvironment
      } // end generic subfunction
    ); // end theEnvironmentsNew declaration

    // inspect results of array.map interation
    if (thisEnvironment.id  > 0 and foundEnvironment == true ) {
      // found a Environment and updated it
      // return updated array to frontend calling function
      return theEnvironmentsNew
    } else if (thisEnvironment.id  > 0 and foundEnvironment == false ) {
      // TODO
      // then I need to error out somehow that I meant to update a Environment with ID but could not find it which is bad
      return theEnvironmentsNew
    } else if (thisEnvironment.id  == 0 and foundEnvironment == false) {
      // TODO - check if there was a duplicate while going through the map based on name
      // I use the nextEnvironmentId
      let newEnvironment: Environment = {
        id = nextEnvironmentId;
        name =  thisEnvironment.name;
        environmentType = thisEnvironment.environmentType;
        description = thisEnvironment.description;
        projectId = thisEnvironment.projectId;
        projectRepoBranch = thisEnvironment.projectRepoBranch;
        identityId = thisEnvironment.identityId;
        deploymentNetwork = thisEnvironment.deploymentNetwork;
        workerId = thisEnvironment.workerId;
        creatorId = thisEnvironment.creatorId;
        dateCreated =  now;
        lastUpdated = now;
      }; // end newEnvironment declaration

      // then I add a new one to the array
      // going to convert to Buffer and back as append is deprecated

      let theEnvironmentsBuffer : Buffer.Buffer<Environment> = Buffer.Buffer(theEnvironments.size());
        
      for (x in theEnvironments.vals()) {
        
          theEnvironmentsBuffer.add(x);
        
      };
    
      theEnvironmentsBuffer.add(newEnvironment);

      return theEnvironmentsBuffer.toArray();

      

    } else {
      // TODO
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theEnvironmentsNew;
    } // end of if for insert/update or errors
  }; // end function manageEnvironmentUtil

public func getEnvironmentByIdUtil (theEnvironments : [Environment], thisEnvironmentId: Int ) : Environment  {
  // now we map through the array for a worker with that Id

    var foundEnvironment = false;
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

 
    
    let theEnvironmentsNew: [Environment] = Array.map<Environment, Environment>(
      theEnvironments,
      func (origEnvironment : Environment) : Environment {
        if (origEnvironment.id == thisEnvironmentId) {
          foundEnvironment := true;
          thisEnvironment := origEnvironment;
        }; // end if this is the same id as what was passed to us
        origEnvironment
      } // end generic subfunction
    ); // end Array Map



  return thisEnvironment;
  
};// end getEnvironmentById

public func getEnvironmentByWorkerIdUtil (theEnvironments : [Environment], theWorkerId: Int ) : Environment  {
  // this one will look for a workers environment and if there is not one will check if any environments need one and assign it

  // now we map through the array for a worker with that Id

    var foundEnvironment = false;
    
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
    // use thisEnvironment to create an empty firstUnassigned

    var firstUnassigendEnvironment : Environment = thisEnvironment; 
 
    
    let theEnvironmentsNew: [Environment] = Array.map<Environment, Environment>(
      theEnvironments,
      func (origEnvironment : Environment) : Environment {
        if (origEnvironment.workerId == theWorkerId ) {
          foundEnvironment := true;
          thisEnvironment := origEnvironment;
        };  // end if this is the same id as what was passed to us
        origEnvironment
      } // end generic subfunction
    ); // end Array Map



  return thisEnvironment;
  
};// end getEnvironmentByWorkerIdUtil

public func getEnvironmentByWorkerIdUplinkUtil (theEnvironments : [Environment], theWorkerId: Int ) : Environment  {
  // this one will look for a workers environment and if there is not one will check if any environments need one and assign it

  // now we map through the array for a worker with that Id

    var foundEnvironment = false;
    
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
    // use thisEnvironment to create an empty firstUnassigned

    var firstUnassigendEnvironment : Environment = thisEnvironment; 
 
    
    let theEnvironmentsNew: [Environment] = Array.map<Environment, Environment>(
      theEnvironments,
      func (origEnvironment : Environment) : Environment {
        if (origEnvironment.workerId == theWorkerId ) {
          foundEnvironment := true;
          thisEnvironment := origEnvironment;
        } else if (origEnvironment.workerId == 0 and firstUnassigendEnvironment.id == 0) {
          // then this is the first environment without a workerId
          firstUnassigendEnvironment := origEnvironment ;
        };  // end if this is the same id as what was passed to us
        origEnvironment
      } // end generic subfunction
    ); // end Array Map

    // if we did not have an environent for this worker but there is at least one environment available 
    if ((foundEnvironment == false) and (firstUnassigendEnvironment.id > 0 )) {
      // then we want to return it as the environment
      
      thisEnvironment := firstUnassigendEnvironment ;
      



      // and in main we will check that the worker is 0 and set it to that 

    }; // end if we have a new match 


  return thisEnvironment;
  
};// end getEnvironmentByWorkerIdUplinkUtil

public func getEnvironmentsByProjectIdUtil (theEnvironments : [Environment], theProjectId: Int ) : [Environment]   {
  // now we map through the array for a project with that Id
  // and return a list of environments

    var foundEnvironments = false;
    
    // use thisEnvironment to create an empty firstUnassigned
    

    var theseEnvironments : Buffer.Buffer<Environment> = Buffer.Buffer(0);
 
    
      let theEnvironmentsNew: [Environment] = Array.map<Environment, Environment>(
        theEnvironments,
        func (origEnvironment : Environment) : Environment {
          // so since this is based on deployment we want to check for deployment
          
          if (origEnvironment.projectId == theProjectId ) {
            foundEnvironments := true;
            theseEnvironments.add (origEnvironment);

          }; // end if this is the same id as what was passed to us
          origEnvironment
        } // end generic subfunction
      ); // end Array Map



  return theseEnvironments.toArray();
  
};// end getEnvironmentByProjectIdUtil

  public func environmentsActiveCount (theEnvironments : [Environment], theWorkers : [Worker]) : Nat  {
    // now we map through the array for a events that have happened in the last 30 min

      let now = Time.now();
      var foundEnvironments = false;
      var thisCount : Nat = 0 ;
        
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
          dfxReplicaType= "";
          iiEnabled= "";
          ttydHttpsEnabled= "";
          ttydHttpsCount= 0;
          lastTouch= 0;
          creatorId= 0;
          dateCreated= 0;
          lastUpdated= 0;
        };
        // five minutes time 60 sec time 1000 mili and 1000000 nano
        var fiveMin : Int = ( 5 * 60 * 1000 * 1000000) ;


      
      let theEnvironmentsNew: [Environment] = Array.map<Environment, Environment>(
        theEnvironments,
        func (origEnvironment : Environment) : Environment {
          // so since this is based on deployment we want to check for deployment
          // now we check the worker
          if (origEnvironment.workerId > 0 ) {
            thisWorker := WorkerUtils.getWorkerByIdUtil (theWorkers, origEnvironment.workerId);
            // now we want to see if this worker touched in < 5 min then the environment is active 
            
            if ((now - thisWorker.lastTouch) < fiveMin ) {
              foundEnvironments := true;
              thisCount += 1;
            } 
            
          }; // end if there is a worker

          origEnvironment
        } // end generic subfunction
      ); // end Array Map


    return thisCount;
    
  };// end environmentsActiveCount

} // end module