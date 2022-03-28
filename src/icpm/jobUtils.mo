import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";
import Types "types";

module {

  type Job = Types.Job;

  // general handler function for adding and editing Jobs in PipelineManager
  
  public func manageJobUtil(theJobs : [Job], thisJob : Job, nextJobId: Int ) : [Job] {
    let now = Time.now();
    var foundJob = false;
    let theJobsNew: [Job] = Array.map<Job, Job>(
      theJobs,
      func (origJob : Job) : Job {
        if (origJob.id == thisJob.id ) {
          foundJob := true;
          // TODO - create a backup object and array so that the original object can be stored for history
          return {
            id = thisJob.id;
            status = thisJob.status;
            jobType = thisJob.jobType;
            refType = thisJob.refType;
            refId = thisJob.refId;
            workerId = thisJob.workerId;
            environmentId = thisJob.environmentId;
            dateCreated = thisJob.dateCreated;
            lastUpdated = now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origJob
      } // end generic subfunction
    ); // end theJobsNew declaration

    // inspect results of array.map interation
    if (thisJob.id  > 0 and foundJob == true ) {
      // found a Job and updated it
      // return updated array to frontend calling function
      return theJobsNew
    } else if (thisJob.id  > 0 and foundJob == false ) {
      // TODO
      // then I need to error out somehow that I meant to update a Job with ID but could not find it which is bad
      return theJobsNew
    } else if (thisJob.id  == 0 and foundJob == false) {
      // TODO - check if there was a duplicate while going through the map based on name
      // use the nextJobId
      let newJob: Job = {
        id = nextJobId;
        status = thisJob.status;
        jobType = thisJob.jobType;
        refType = thisJob.refType;
        refId = thisJob.refId;
        workerId = thisJob.workerId;
        environmentId = thisJob.environmentId;
        dateCreated = now;
        lastUpdated = now;
      }; // end newJob declaration

      // then I add a new one to the array

      // going to convert to Buffer and back as append is deprecated

      let theJobsBuffer : Buffer.Buffer<Job> = Buffer.Buffer(theJobs.size());
        
      for (x in theJobs.vals()) {
        
          theJobsBuffer.add(x);
        
      };
    
      theJobsBuffer.add(newJob);

      return theJobsBuffer.toArray();

      
    } else {
      // TODO
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theJobsNew;
    } // end of if for insert/update or errors
  }; // end function manageJobUtil



public func getJobByIdUtil (theJobs : [Job], thisJobId: Int ) : Job  {
  // now we map through the array for a worker with that Id

    var foundJob = false;
    var thisJob : Job = {
    id = 0;
    status= "";
    jobType= "";
    refType ="";
    refId= 0;
    workerId= 0;
    environmentId= 0;
    dateCreated= 0;
    lastUpdated= 0;
  };
    
    let theJobsNew: [Job] = Array.map<Job, Job>(
      theJobs,
      func (origJob : Job) : Job {
        if (origJob.id == thisJobId) {
          foundJob := true;
          thisJob := origJob;
        }; // end if this is the same id as what was passed to us
        origJob
      } // end generic subfunction
    ); // end Array Map



  return thisJob;
  
};// end getJobByIdUtil

public func getJobByEnvironmentIdUtil (theJobs : [Job], thisEnvironmentId: Int, jobStatus :Text ) : Job  {
  // now we map through the array for a job with that environment
  // it may have more than one, but will return the oldest one (the one created first)


    var foundJob = false;
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
    
    let theJobsNew: [Job] = Array.map<Job, Job>(
      theJobs,
      func (origJob : Job) : Job {
        // so since this is based on environment we want to confirm Id and Status
        
        if (origJob.environmentId == thisEnvironmentId and origJob.status == jobStatus and foundJob == false) {
          foundJob := true;
          thisJob := origJob;
        }; // end if this is the same id as what was passed to us
        origJob
      } // end generic subfunction
    ); // end Array Map



  return thisJob;
  
};// end getJobByEnvironmentIdUtil

public func getJobByDeploymentId (theJobs : [Job], theDeploymentId: Int ) : Job  {
  // now we map through the array for a job with that environment
  // it may have more than one, but will return the oldest one (the one created first)
  // TODO create error checking if there is somehow 2 for the same deployment


    var foundJob = false;
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
    
    let theJobsNew: [Job] = Array.map<Job, Job>(
      theJobs,
      func (origJob : Job) : Job {
        // so since this is based on environment we want to confirm Id and Status
        
        if (origJob.refType == "Deployment" and origJob.refId == theDeploymentId and foundJob == false) {
          foundJob := true;
          thisJob := origJob;
        }; // end if this is the same id as what was passed to us
        origJob
      } // end generic subfunction
    ); // end Array Map



  return thisJob;
  
};// end getJobByDeploymentId


public func getJobByWorkerIdUtil (theJobs : [Job], theWorkerId: Int, jobStatus :Text ) : Job  {
  // now we map through the array for a job with that environment
  // it may have more than one, but will return the oldest one (the one created first)
  // TODO create error checking if there is somehow 2 for the same deployment


    var foundJob = false;
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
    
    let theJobsNew: [Job] = Array.map<Job, Job>(
      theJobs,
      func (origJob : Job) : Job {
        // so we start with a Job type of Install II
        
        if (origJob.status == jobStatus and origJob.jobType == "Install II" and origJob.refType == "Worker" and origJob.refId == theWorkerId and foundJob == false) {
          foundJob := true;
          thisJob := origJob;
        } else if (jobStatus == "Latest" and origJob.refType == "Worker" and origJob.refId == theWorkerId ) {
          //we do not mark it as found
          foundJob := true;
          thisJob := origJob;          
        }; // end if this is the same id as what was passed to us
        origJob
      } // end generic subfunction
    ); // end Array Map



  return thisJob;
  
};// end getJobByWorkerIdUtil






} // end module