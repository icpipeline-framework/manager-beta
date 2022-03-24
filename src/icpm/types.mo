import Principal "mo:base/Principal";

module {

  public type AppUsers = {

    administrators: [Principal];
    managers: [Principal];

  };



  public type CanisterStatusResponse = {
    uptime: Int;
    everLoggedIn: Text;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  public type LoginAttempt = {
    timestamp: Int;
    loginHash: Text;
    loginIp: Text;
    loginClient: Text;
  };

  public type LoginResponse = {
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  public type ManagePrincipalResponse = {
    listOfManagerPrincipals: [Principal];
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };
  

  public type User = {
    id: Int;
    name: Text; // persons name
    email: Text; // email address
    cellPhone: Text; // email address
    hashPass: Text; // hash of text password - sha512
    internetId: Text; // ref to InternetID
    apiToken: Text; // has the privedges of this user is pass as key 
    active: Bool;
    creatorId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  };

  // Environment 
  public type Environment = {
    id: Int;
    name: Text;
    environmentType: Text;
    description: Text;
    projectId: Int;
    projectRepoBranch: Text;
    identityId: Int;
    deploymentNetwork: Text;
    workerId: Int;
    creatorId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  };
          
  public type ManageEnvironmentResponse = {
    environmentObject: Environment;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };
  //CompleteEnvironmentResponse
  public type CompleteEnvironmentResponse = {
    environmentObject: Environment;
    projectObject: Project;
    workerObject: Worker;
    identityObject: Identity;
    latestDeploymentObject: Deployment;
    canisterProfiles: [Canister];
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };
  //CreateDeploymentResponse
  public type CreateDeploymentResponse = {
    deploymentObject: Deployment;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };
  //Project
  public type Project = {
    id: Int;
    name: Text;
    category: Text;
    description: Text;
    projectRepo: Text;
    dfxIdentities: [Int];
    creatorId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  };

  //CompleteProjectResponse
  public type CompleteProjectResponse = {
    projectObject: Project;
    environmentObjects: [Environment];
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };
  // Deployment
  public type Deployment = {
    id: Int;
    status: Text; // Created, Ready, In Progress, Success, Error, Aborted by User
    environmentId: Int;
    projectId: Int; // from Environment at time of creation
    identityId: Int;
    deploymentNotes: Text;
    projectRepo: Text ; // from Projects at time of creation
    projectRepoBranch : Text ; // from Environment at time of creation
    executeStartTime: Int;  // from interaction with Worker when job received and started
    executeFinishTime: Int; // from interaction with Worker when job completed and Success or Error
    creatorId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  };
  //CompleteDeploymentResponse
  public type CompleteDeploymentResponse = {
    deploymentObject: Deployment;
    environmentObject: Environment;
    projectObject: Project;
    workerObject: Worker;
    jobObject: Job;
    eventObjects: [Event];
    canisterObjects: [Canister];
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  public type Worker = {
    id: Int;
    name: Text;
    status: Text; // Unassigned, Assigned, Paused, Terminated
    category: Text; // Docker 
    description: Text;
    lastDeploymentId: Int;
    uniqueId: Text;
    publicIp: Text;
    privateIp: Text;
    dnsName: Text;
    iiEnabled: Text;
    dfxReplicaType: Text;
    ttydHttpsEnabled: Text;
    ttydHttpsCount: Int;
    lastTouch: Int;
    creatorId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  };
  
  //CompleteWorkerResponse
  public type CompleteWorkerResponse = {
    workerObject: Worker;
    environmentObject: Environment;
    projectObject: Project;
    latestDeploymentObject: Deployment;
    latestJobObject: Job;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  public type CreateIiEnableJobResponse = {
    jobObject: Job;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  public type TtydHttpsEnableDisableResponse = {
    jobObject: Job;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  public type Event = {
    id: Int;
    eventType: Text; // Log, Alert, Warning, Error, Status
    mainRefType: Text; // Environment, Project, Deployment, Worker, App
    environmentId :Int ;
    projectId :Int ;
    deploymentId :Int ;
    workerId :Int ;
    jobId :Int ;
    eventText: Text;
    localTime: Int;
    creatorId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  };

  public type Job = {
    id: Int;
    status: Text; //Created, Ready, Assigned, Completed, Terminated, Error
    jobType: Text; // Deploy, Launch Worker, Shutdown Worker, Image Worker
    refType :Text ; // component used for Job (i.e. Deployment)
    refId: Int;  // id assoctiate to refType if deployment then refId would be deployment as that is a job for a worker
    workerId: Int;
    environmentId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  };

  //CompleteJobResponse
  public type CompleteJobResponse = {
    jobObject: Job;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };
  public type UplinkResponse = {
    workerObject: Worker;
    jobObject: Job;
    deploymentObject: Deployment;
    environmentObject: Environment;
    identityObject: Identity;
    canisterProfiles : [Canister];
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  public type CompleteDashboardStats = {
    environmentsCount: Nat;
    environmentsActive: Nat;
    projectsCount: Nat;
    projectsActive: Nat;
    eventsCount: Nat;
    eventsCountLast30: Nat;
    deploymentsCount: Nat;
    deploymentsCountLastDay: Nat;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };


  public type Identity = {
    id: Int;
    name: Text; 
    category: Text; 
    description: Text; 
    principal: Text; 
    identityPem: Text; // the contents of the pem file that contains the Principal
    profileWalletId :Text ; // the contents of the wallets json file that contains the canister ID of the wallet
    creatorId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  }; // Identity

  public type ManageIdentityResponse = {
    identityObject: Identity;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  }; // ManageIdentityResponse

  public type CompleteIdentityResponse = {
    identityObject: Identity;
    environmentObjects :[Environment] ;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  }; // ManageIdentityResponse

  public type Canister = {
    id: Int;
    name: Text; 
    category: Text; // deployment, profile
    description: Text; 
    dfxJson: Text; 
    canisterName: Text; 
    canisterType: Text; 
    canisterNetwork: Text; 
    canisterId: Text;  
    identityId: Int;
    projectId: Int;
    environmentId: Int;
    lastDeploymentId: Int;
    creatorId: Int;
    dateCreated: Int;
    lastUpdated: Int;
  }; // Canister


  public type CompleteCanisterResponse = {
    canisterObject: Canister;
    lastDeploymentObject: Deployment ;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  }; // CompleteCanisterResponse

  public type ManageCanisterResponse = {
    canisterObject: Canister;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  }; //ManageCanisterResponse



  public type DownloadAllConfigResponse = {
    environments:[Environment];
    projects:[Project];
    identities:[Identity];
    canisterProfiles:[Canister];
    users:[User];
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  }; //DownloadAllConfigResponse

  public type DownloadAllLogResponse = {
    deployments:[Deployment];
    canisters:[Canister];
    events:[Event];
    jobs:[Job];
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  }; //DownloadAllLogResponse

} // end module def