import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";


/// ****** CUSTOM IMPORTS 
import Types "types";
import EnvironmentUtils "environmentUtils";

module {

  type Project = Types.Project;
  type Environment = Types.Environment;

  // general handler function for adding and editing Projects in PipelineManager
  
  public func manageProjectUtil(theProjects : [Project], thisProject : Project, nextProjectId: Int ) : [Project] {
    let now = Time.now();
    var foundProject = false;
    let theProjectsNew: [Project]  = Array.map<Project, Project>(
      theProjects,
      func (origProject : Project) : Project {
        if (origProject.id == thisProject.id ) {
          foundProject := true;
          // TODO - create a backup object and array so that the original object can be stored for history
          return {
            id = thisProject.id;
            name =  thisProject.name;
            category = thisProject.category;
            description = thisProject.description;
            projectRepo = thisProject.projectRepo;
            dfxIdentities = thisProject.dfxIdentities;
            creatorId = origProject.creatorId;
            dateCreated =  origProject.dateCreated;
            lastUpdated =  now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origProject
      } // end subfunction in map

    ); // end manageProjectUtil

    // check results of Array.map iteration
    if (thisProject.id > 0 and foundProject == true ) {
      // found a matching project and updated it
      // return the whole modified array to the calling frontend function
      return theProjectsNew
    } else if (thisProject.id > 0 and foundProject == false ) {
      // TODO
      // need error handling/messaging for expected project id not found which means something amiss
      // in this case we return an UNmodified array back to the frontend calling function,
      // even though thisProjectId is > 0 meaning that we should have found a match and updated the array
      return theProjectsNew
    } else if (thisProject.id == 0 and foundProject == false) {
      // this is the correct/expected "add new" use case
      // we build a new Project type/object and append it to the array as new
      // TODO - check if there was a duplicate while going through the map based on name
      // use the nextProjectId
      let newProject: Project = {
        id = nextProjectId;
        name = thisProject.name;
        category = thisProject.category;
        description = thisProject.description;
        projectRepo = thisProject.projectRepo;
        dfxIdentities = thisProject.dfxIdentities;
        creatorId = thisProject.creatorId;
        dateCreated = now;
        lastUpdated = now;
      }; // END declaration of newProject var;

      // append new project to theProjects array
      // return the whole modified array to the calling frontend function
      return Array.append<Project>(theProjectsNew, [newProject]);

    } else {
      // TODO
      // theoretically this condition never occurs, does not fit any known use case or error case
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theProjectsNew;
    } // end if for insert/update or errors
  }; // END function manageProjectUtil


  public func getProjectByIdUtil (theProjects : [Project], thisProjectId: Int ) : Project {
    // now we map through the array for a worker with that Id

      var foundProject = false;
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
      
      let theProjectsNew: [Project] =Array.map<Project, Project>(
        theProjects,
        func (origProject : Project) : Project {
          if (origProject.id == thisProjectId) {
            foundProject := true;
            thisProject := origProject;
          }; // end if this is the same id as what was passed to us
          origProject
        } // end generic subfunction
      ); // end Array Map



    return thisProject;
    
  };// end getProjectById

  public func projectsActiveCount (theProjects : [Project], theEnvironments : [Environment]) : Nat  {
    // now we map through the array for a events that have happened in the last 30 min

      let now = Time.now();
      var foundProjects = false;
      var thisCount : Nat = 0 ;
        
        
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

      var projectEnvironments :[Environment]  = [] ;


        // five minutes time 60 sec time 1000 mili and 1000000 nano
        var fiveMin : Int = ( 5 * 60 * 1000 * 1000000) ;


      
      let theProjectsNew: [Project] = Array.map<Project, Project>(
        theProjects,
        func (origProject : Project) : Project {
          // so since this is based on deployment we want to check for deployment
          // now we check the worker
          
            projectEnvironments := EnvironmentUtils.getEnvironmentsByProjectIdUtil (theEnvironments , origProject.id );
            // now we want to see if this worker touched in < 5 min then the environment is active 
            
            if ((projectEnvironments.size() ) > 0  ) {
              foundProjects := true;
              thisCount += 1;
            }; // end if there are any environments with this project
          

          origProject
        } // end generic subfunction
      ); // end Array Map

    return thisCount;
    
  };// end projectsActiveCount

} // end module