import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";
import Types "types";

module {

  type Worker = Types.Worker;

  // general handler function for adding and editing Workers in PipelineManager

  public func manageWorkerUtil(theWorkers : [Worker], thisWorker : Worker, nextWorkerId: Int ) : [Worker] {
    let now = Time.now();
    var foundWorker = false;
    let theWorkersNew: [Worker] = Array.map<Worker, Worker>(
      theWorkers,
      func (origWorker : Worker) : Worker {
        if (origWorker.id == thisWorker.id ) {
          foundWorker := true;
          return {
            id = thisWorker.id;
            name = thisWorker.name;
            status = thisWorker.status;
            category = thisWorker.category;
            description = thisWorker.description;
            lastDeploymentId = thisWorker.lastDeploymentId;
            uniqueId = thisWorker.uniqueId;
            publicIp= thisWorker.publicIp;
            privateIp= thisWorker.privateIp;
            dnsName= thisWorker.dnsName;
            iiEnabled= thisWorker.iiEnabled;
            dfxReplicaType= thisWorker.dfxReplicaType;
            ttydHttpsEnabled= thisWorker.ttydHttpsEnabled;
            ttydHttpsCount= thisWorker.ttydHttpsCount;
            lastTouch = thisWorker.lastTouch;
            creatorId = thisWorker.creatorId;
            dateCreated = thisWorker.dateCreated;
            lastUpdated = now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        origWorker
      } // end generic subfunction
    ); // end theNewWorkers declaration

    // inspect results of array.map interation
    if (thisWorker.id  > 0 and foundWorker == true ) {
      // found a worker and updated it
      // return updated array to frontend calling function
      return theWorkersNew
    } else if (thisWorker.id  > 0 and foundWorker == false ) {
      // TODO
      // then I need to error out somehow that I meant to update a worker with ID but could not find it which is bad
      return theWorkersNew
    } else if (thisWorker.id  == 0 and foundWorker == false) {
      // TODO - check if there was a duplicate while going through the map based on name
      // I use the nextWorkerId
      let newWorker: Worker = {
        id = nextWorkerId;
        name = "Worker " # Int.toText(nextWorkerId);
        status = "Unassigned";
        category = thisWorker.category;
        description = "Created by Manager";
        lastDeploymentId = thisWorker.lastDeploymentId;
        uniqueId = thisWorker.uniqueId;
        publicIp= thisWorker.publicIp;
        privateIp= thisWorker.privateIp;
        dnsName= thisWorker.dnsName;
        iiEnabled= thisWorker.iiEnabled;
        dfxReplicaType= thisWorker.dfxReplicaType;
        ttydHttpsEnabled= thisWorker.ttydHttpsEnabled;
        ttydHttpsCount= thisWorker.ttydHttpsCount;
        lastTouch = now;
        creatorId = 0;
        dateCreated = now;
        lastUpdated = now;
      }; // end newWorker declaration

      // going to convert to Buffer and back as append is deprecated

      let theWorkersBuffer : Buffer.Buffer<Worker> = Buffer.Buffer(theWorkers.size());
        
      for (x in theWorkers.vals()) {
        
          theWorkersBuffer.add(x);
        
      };
    
      theWorkersBuffer.add(newWorker);

      return theWorkersBuffer.toArray();

    } else {
      // TODO
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theWorkersNew;
    } // end of if for insert/update or errors
  }; // end function manageWorkerUtil




public func getWorkerByIdUtil (theWorkers : [Worker], thisWorkerId: Int ) : Worker {
  // now we map through the array for a worker with that Id

    var foundWorker = false;
    var thisWorker : Worker = {
        id= 0;
        name= "";
        status= "";
        category= "";
        description= "";
        lastDeploymentId= 0;
        uniqueId= "";
        publicIp= "";
        dnsName= "";
        iiEnabled = "";
        dfxReplicaType= "";
        ttydHttpsEnabled= "";
        ttydHttpsCount= 0;
        privateIp= "";
        lastTouch= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };
    
    let theWorkersNew: [Worker] =Array.map<Worker, Worker>(
      theWorkers,
      func (origWorker : Worker) : Worker {
        if (origWorker.id == thisWorkerId) {
          foundWorker := true;
          thisWorker := origWorker;
        }; // end if this is the same id as what was passed to us
        origWorker
      } // end generic subfunction
    ); // end Array Map



  return thisWorker;
  
};// end getWorkerById


public func checkWorkerUtil (theWorkers : [Worker], callingWorker: Worker ) : Worker {
  // now we map through the array for a worker with that Id

    var foundWorker = false;
    var foundIpButNotWorker = false;
    
    var thisWorker : Worker = {
        id= 0;
        name= "";
        status= "";
        category= "";
        description= "";
        lastDeploymentId= 0;
        uniqueId= "";
        publicIp="";
        privateIp= "";
        dnsName= "";
        iiEnabled = "";
        dfxReplicaType= "";
        ttydHttpsEnabled= "";
        ttydHttpsCount= 0;
        lastTouch= 0;
        creatorId= 0;
        dateCreated= 0;
        lastUpdated= 0;
      };
    
    let theWorkersNew: [Worker] =Array.map<Worker, Worker>(
      theWorkers,
      func (origWorker : Worker) : Worker {
        if (origWorker.id == callingWorker.id and origWorker.uniqueId == callingWorker.uniqueId) {
          foundWorker := true;
          thisWorker := origWorker;
        }  else if (origWorker.id != callingWorker.id and origWorker.uniqueId == callingWorker.uniqueId) {
          foundIpButNotWorker :=true;
          thisWorker := origWorker;
          //set checkworker id to negative and clear the IP
          //TODO - create change log for workers and add call here
          thisWorker := {
                id= -(origWorker.id);
                name= origWorker.name;
                status= origWorker.status;
                category= origWorker.category;
                description= origWorker.description;
                lastDeploymentId= origWorker.lastDeploymentId;
                uniqueId= "";
                publicIp= origWorker.publicIp;
                privateIp= origWorker.privateIp;
                dnsName= thisWorker.dnsName;
                iiEnabled= origWorker.iiEnabled;
                dfxReplicaType= origWorker.dfxReplicaType;
                ttydHttpsEnabled= origWorker.ttydHttpsEnabled;
                ttydHttpsCount= origWorker.ttydHttpsCount;
                lastTouch= origWorker.lastTouch;
                creatorId= origWorker.creatorId;
                dateCreated= origWorker.dateCreated;
                lastUpdated= origWorker.lastUpdated;
              };
          

        }; // end if
        origWorker
      } // end subfunction
    ); // end Array Map

    return thisWorker;
  
};// end checkWorkerUtil



} // end module

