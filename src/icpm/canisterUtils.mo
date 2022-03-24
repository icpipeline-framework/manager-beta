import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";


/// ****** CUSTOM IMPORTS 
import Types "types";


module {

  type Canister = Types.Canister;
  

  // general handler function for adding and editing Canisters in PipelineManager
  
  public func manageCanisterUtil(theCanisters : [Canister], thisCanister : Canister, nextCanisterId: Int ) : [Canister] {
    let now = Time.now();
    var foundCanister = false;
    let theCanistersNew: [Canister] = Array.map<Canister, Canister>(
      theCanisters,
      func (origCanister : Canister) : Canister {
        if (origCanister.id == thisCanister.id ) {
          foundCanister := true;
          // TODO - create a backup object and array so that the original object can be stored for history
          
          
          return {
            id = thisCanister.id;
            name = thisCanister.name;
            category = thisCanister.category;
            description = thisCanister.description;
            dfxJson = thisCanister.dfxJson;
            canisterName = thisCanister.canisterName;
            canisterType = thisCanister.canisterType;
            canisterNetwork = thisCanister.canisterNetwork;
            canisterId = thisCanister.canisterId;
            identityId = thisCanister.identityId;
            projectId = thisCanister.projectId;
            environmentId = thisCanister.environmentId;
            lastDeploymentId = thisCanister.lastDeploymentId;
            creatorId = origCanister.creatorId;
            dateCreated = origCanister.dateCreated;
            lastUpdated = now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origCanister
      } // end generic subfunction
    ); // end theCanistersNew declaration

    // inspect results of array.map interation
    if (thisCanister.id  > 0 and foundCanister == true ) {
      // found a Canister and updated it
      // return updated array to frontend calling function
      return theCanistersNew
    } else if (thisCanister.id  > 0 and foundCanister == false ) {
      // TODO
      // then I need to error out somehow that I meant to update a Canister with ID but could not find it which is bad
      return theCanistersNew
    } else if (thisCanister.id  == 0 and foundCanister == false) {
      // TODO - check if there was a duplicate while going through the map based on name
      // I use the nextCanisterId
      let newCanister: Canister = {
        id = nextCanisterId;
        name = thisCanister.name;
        category = thisCanister.category;
        description = thisCanister.description;
        dfxJson = thisCanister.dfxJson;
        canisterName = thisCanister.canisterName;
        canisterType = thisCanister.canisterType;
        canisterNetwork = thisCanister.canisterNetwork;
        canisterId = thisCanister.canisterId;
        identityId = thisCanister.identityId;
        projectId = thisCanister.projectId;
        environmentId = thisCanister.environmentId;
        lastDeploymentId = thisCanister.lastDeploymentId;
        creatorId = thisCanister.creatorId;
        dateCreated =  now;
        lastUpdated = now;
      }; // end newCanister declaration

      // then I add a new one to the array
      return Array.append<Canister>(theCanisters, [newCanister]);
    } else {
      // TODO
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theCanistersNew;
    } // end of if for insert/update or errors
  }; // end function manageCanisterUtil

  public func getCanisterByIdUtil (theCanisters : [Canister], thisCanisterId: Int ) : Canister  {
    // now we map through the array for a worker with that Id

      var foundCanister = false;
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

  
      
      let theCanistersNew: [Canister] = Array.map<Canister, Canister>(
        theCanisters,
        func (origCanister : Canister) : Canister {
          if (origCanister.id == thisCanisterId) {
            foundCanister := true;
            thisCanister := origCanister;
          }; // end if this is the same id as what was passed to us
          origCanister
        } // end generic subfunction
      ); // end Array Map



    return thisCanister;
    
  };// end getCanisterById

  public func getCanistersByDeploymentId (theCanisters : [Canister], theDeploymentId: Int ) : [Canister]  {
    // now we map through the array for a events with that deployment


      var foundCanisters = false;
      var theseCanisters :[Canister] = [];


      
      let theCanistersNew: [Canister] = Array.map<Canister, Canister>(
        theCanisters,
        func (origCanister : Canister) : Canister {
          // so since this is based on deployment we want to check for deployment
          
          if (origCanister.lastDeploymentId == theDeploymentId ) {
            foundCanisters := true;
            theseCanisters :=  Array.append<Canister>(theseCanisters, [origCanister]);
          }; // end if this is the same id as what was passed to us
          origCanister
        } // end generic subfunction
      ); // end Array Map



    return theseCanisters;
    
  };// end getCanistersByDeploymentId

  public func getCanisterProfilesByProjectEnvironmentId (theCanisters : [Canister], theProjectId: Int, theEnvironmentId: Int ) : [Canister]  {
    // now we map through the array for a events with that deployment


      var foundCanisters = false;
      var theseCanisters :[Canister] = [];


      
      let theCanistersNew: [Canister] = Array.map<Canister, Canister>(
        theCanisters,
        func (origCanister : Canister) : Canister {
          // so since this is based on deployment we want to check for profiles based on deployment of 0 for this project/environment pair
          
          if (origCanister.lastDeploymentId == 0 
              and origCanister.projectId ==  theProjectId
              and origCanister.environmentId ==  theEnvironmentId ) {
            foundCanisters := true;
            theseCanisters :=  Array.append<Canister>(theseCanisters, [origCanister]);
          }; // end if this is the same id as what was passed to us
          origCanister
        } // end generic subfunction
      ); // end Array Map

    return theseCanisters;
    
  };// end getCanisterProfilesByProjectEnvironmentId


  // this function checks to see if there is a profile canister for this project

  public func checkProjectEnvironmentCanister(theCanisters : [Canister], thisCanister : Canister, nextCanisterId : Int ) : [Canister] {
    let now = Time.now();
    var foundCanister = false;
    let theCanistersNew: [Canister] = Array.map<Canister, Canister>(
      theCanisters,
      func (origCanister : Canister) : Canister {
        if (origCanister.projectId == thisCanister.projectId 
          and origCanister.environmentId == thisCanister.environmentId 
          and origCanister.canisterName == thisCanister.canisterName 
          and origCanister.lastDeploymentId == 0 ) {
          
          foundCanister := true;
        

        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origCanister
      } // end generic subfunction
    ); // end theCanistersNew declaration

    // now we see if there was a canister with the same project, environment, and canister name
    if (foundCanister == false ) {

      let newCanister: Canister = {
        id = nextCanisterId;
        name = thisCanister.name;
        category = "profile";
        description = "Created as Profile from deployment: " # Int.toText(thisCanister.lastDeploymentId);
        dfxJson = thisCanister.dfxJson;
        canisterName = thisCanister.canisterName;
        canisterType = thisCanister.canisterType;
        canisterNetwork = thisCanister.canisterNetwork;
        canisterId = thisCanister.canisterId;
        identityId = thisCanister.identityId;
        projectId = thisCanister.projectId;
        environmentId = thisCanister.environmentId;
        lastDeploymentId = 0;
        creatorId = thisCanister.creatorId;
        dateCreated =  now;
        lastUpdated = now;
      }; // end newCanister declaration

      // then I add a new one to the array
      return Array.append<Canister>(theCanisters, [newCanister]);
    } else {
      // TODO
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theCanistersNew;
    } // end of if for insert/update or errors

  }; // end function checkProjectEnvironmentCanister


} // end module