import type { Principal } from '@dfinity/principal';
export interface Canister {
  'id' : bigint,
  'canisterName' : string,
  'canisterType' : string,
  'canisterNetwork' : string,
  'dateCreated' : bigint,
  'name' : string,
  'dfxJson' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'description' : string,
  'lastDeploymentId' : bigint,
  'projectId' : bigint,
  'environmentId' : bigint,
  'category' : string,
  'identityId' : bigint,
  'canisterId' : string,
}
export interface CanisterStatusResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'responseStatus' : string,
  'uptime' : bigint,
  'everLoggedIn' : string,
}
export interface Canister__1 {
  'id' : bigint,
  'canisterName' : string,
  'canisterType' : string,
  'canisterNetwork' : string,
  'dateCreated' : bigint,
  'name' : string,
  'dfxJson' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'description' : string,
  'lastDeploymentId' : bigint,
  'projectId' : bigint,
  'environmentId' : bigint,
  'category' : string,
  'identityId' : bigint,
  'canisterId' : string,
}
export interface CompleteCanisterResponse {
  'msg' : string,
  'canisterObject' : Canister,
  'lastDeploymentObject' : Deployment,
  'timeStamp' : bigint,
  'responseStatus' : string,
}
export interface CompleteDashboardStats {
  'msg' : string,
  'environmentsCount' : bigint,
  'timeStamp' : bigint,
  'projectsCount' : bigint,
  'projectsActive' : bigint,
  'responseStatus' : string,
  'eventsCountLast30' : bigint,
  'environmentsActive' : bigint,
  'deploymentsCountLastDay' : bigint,
  'deploymentsCount' : bigint,
  'eventsCount' : bigint,
}
export interface CompleteDeploymentResponse {
  'msg' : string,
  'eventObjects' : Array<Event__1>,
  'timeStamp' : bigint,
  'canisterObjects' : Array<Canister>,
  'jobObject' : Job,
  'deploymentObject' : Deployment,
  'responseStatus' : string,
  'environmentObject' : Environment,
  'workerObject' : Worker__1,
  'projectObject' : Project__1,
}
export interface CompleteEnvironmentResponse {
  'msg' : string,
  'latestDeploymentObject' : Deployment,
  'timeStamp' : bigint,
  'canisterProfiles' : Array<Canister>,
  'responseStatus' : string,
  'environmentObject' : Environment,
  'workerObject' : Worker__1,
  'projectObject' : Project__1,
  'identityObject' : Identity,
}
export interface CompleteIdentityResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'environmentObjects' : Array<Environment>,
  'responseStatus' : string,
  'identityObject' : Identity,
}
export interface CompleteJobResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'jobObject' : Job,
  'responseStatus' : string,
}
export interface CompleteProjectResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'environmentObjects' : Array<Environment>,
  'responseStatus' : string,
  'projectObject' : Project__1,
}
export interface CompleteWorkerResponse {
  'msg' : string,
  'latestDeploymentObject' : Deployment,
  'latestJobObject' : Job,
  'timeStamp' : bigint,
  'responseStatus' : string,
  'environmentObject' : Environment,
  'workerObject' : Worker__1,
  'projectObject' : Project__1,
}
export interface CreateDeploymentResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'deploymentObject' : Deployment,
  'responseStatus' : string,
}
export interface CreateIiEnableJobResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'jobObject' : Job,
  'responseStatus' : string,
}
export interface Deployment {
  'id' : bigint,
  'status' : string,
  'projectRepo' : string,
  'executeStartTime' : bigint,
  'dateCreated' : bigint,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'executeFinishTime' : bigint,
  'projectId' : bigint,
  'environmentId' : bigint,
  'projectRepoBranch' : string,
  'identityId' : bigint,
  'deploymentNotes' : string,
}
export interface Deployment__1 {
  'id' : bigint,
  'status' : string,
  'projectRepo' : string,
  'executeStartTime' : bigint,
  'dateCreated' : bigint,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'executeFinishTime' : bigint,
  'projectId' : bigint,
  'environmentId' : bigint,
  'projectRepoBranch' : string,
  'identityId' : bigint,
  'deploymentNotes' : string,
}
export interface DownloadAllConfigResponse {
  'msg' : string,
  'projects' : Array<Project__1>,
  'timeStamp' : bigint,
  'canisterProfiles' : Array<Canister>,
  'responseStatus' : string,
  'users' : Array<User__1>,
  'identities' : Array<Identity>,
  'environments' : Array<Environment>,
}
export interface DownloadAllLogResponse {
  'msg' : string,
  'deployments' : Array<Deployment>,
  'timeStamp' : bigint,
  'jobs' : Array<Job>,
  'responseStatus' : string,
  'events' : Array<Event__1>,
  'canisters' : Array<Canister>,
}
export interface Environment {
  'id' : bigint,
  'workerId' : bigint,
  'dateCreated' : bigint,
  'name' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'description' : string,
  'projectId' : bigint,
  'projectRepoBranch' : string,
  'environmentType' : string,
  'deploymentNetwork' : string,
  'identityId' : bigint,
}
export interface Environment__1 {
  'id' : bigint,
  'workerId' : bigint,
  'dateCreated' : bigint,
  'name' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'description' : string,
  'projectId' : bigint,
  'projectRepoBranch' : string,
  'environmentType' : string,
  'deploymentNetwork' : string,
  'identityId' : bigint,
}
export interface Event {
  'id' : bigint,
  'localTime' : bigint,
  'workerId' : bigint,
  'deploymentId' : bigint,
  'dateCreated' : bigint,
  'creatorId' : bigint,
  'jobId' : bigint,
  'lastUpdated' : bigint,
  'mainRefType' : string,
  'projectId' : bigint,
  'environmentId' : bigint,
  'eventText' : string,
  'eventType' : string,
}
export interface Event__1 {
  'id' : bigint,
  'localTime' : bigint,
  'workerId' : bigint,
  'deploymentId' : bigint,
  'dateCreated' : bigint,
  'creatorId' : bigint,
  'jobId' : bigint,
  'lastUpdated' : bigint,
  'mainRefType' : string,
  'projectId' : bigint,
  'environmentId' : bigint,
  'eventText' : string,
  'eventType' : string,
}
export interface Identity {
  'id' : bigint,
  'principal' : string,
  'dateCreated' : bigint,
  'name' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'profileWalletId' : string,
  'description' : string,
  'category' : string,
  'identityPem' : string,
}
export interface Identity__1 {
  'id' : bigint,
  'principal' : string,
  'dateCreated' : bigint,
  'name' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'profileWalletId' : string,
  'description' : string,
  'category' : string,
  'identityPem' : string,
}
export interface Job {
  'id' : bigint,
  'status' : string,
  'workerId' : bigint,
  'dateCreated' : bigint,
  'jobType' : string,
  'lastUpdated' : bigint,
  'environmentId' : bigint,
  'refType' : string,
  'refId' : bigint,
}
export interface Job__1 {
  'id' : bigint,
  'status' : string,
  'workerId' : bigint,
  'dateCreated' : bigint,
  'jobType' : string,
  'lastUpdated' : bigint,
  'environmentId' : bigint,
  'refType' : string,
  'refId' : bigint,
}
export interface LoginAttempt {
  'loginHash' : string,
  'loginClient' : string,
  'loginIp' : string,
  'timestamp' : bigint,
}
export interface LoginResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'responseStatus' : string,
}
export interface ManageCanisterResponse {
  'msg' : string,
  'canisterObject' : Canister,
  'timeStamp' : bigint,
  'responseStatus' : string,
}
export interface ManageEnvironmentResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'responseStatus' : string,
  'environmentObject' : Environment,
}
export interface ManageIdentityResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'responseStatus' : string,
  'identityObject' : Identity,
}
export interface ManagePrincipalResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'listOfManagerPrincipals' : Array<Principal>,
  'responseStatus' : string,
}
export interface Project {
  'id' : bigint,
  'projectRepo' : string,
  'dateCreated' : bigint,
  'name' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'description' : string,
  'dfxIdentities' : Array<bigint>,
  'category' : string,
}
export interface Project__1 {
  'id' : bigint,
  'projectRepo' : string,
  'dateCreated' : bigint,
  'name' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'description' : string,
  'dfxIdentities' : Array<bigint>,
  'category' : string,
}
export interface TtydHttpsEnableDisableResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'jobObject' : Job,
  'responseStatus' : string,
}
export interface UplinkResponse {
  'msg' : string,
  'timeStamp' : bigint,
  'canisterProfiles' : Array<Canister>,
  'jobObject' : Job,
  'deploymentObject' : Deployment,
  'responseStatus' : string,
  'environmentObject' : Environment,
  'workerObject' : Worker__1,
  'identityObject' : Identity,
}
export interface User {
  'id' : bigint,
  'internetId' : string,
  'hashPass' : string,
  'active' : boolean,
  'cellPhone' : string,
  'dateCreated' : bigint,
  'name' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'email' : string,
  'apiToken' : string,
}
export interface User__1 {
  'id' : bigint,
  'internetId' : string,
  'hashPass' : string,
  'active' : boolean,
  'cellPhone' : string,
  'dateCreated' : bigint,
  'name' : string,
  'creatorId' : bigint,
  'lastUpdated' : bigint,
  'email' : string,
  'apiToken' : string,
}
export interface Worker {
  'id' : bigint,
  'status' : string,
  'privateIp' : string,
  'dateCreated' : bigint,
  'iiEnabled' : string,
  'name' : string,
  'creatorId' : bigint,
  'ttydHttpsEnabled' : string,
  'lastUpdated' : bigint,
  'uniqueId' : string,
  'description' : string,
  'lastTouch' : bigint,
  'lastDeploymentId' : bigint,
  'dnsName' : string,
  'publicIp' : string,
  'category' : string,
  'ttydHttpsCount' : bigint,
  'dfxReplicaType' : string,
}
export interface Worker__1 {
  'id' : bigint,
  'status' : string,
  'privateIp' : string,
  'dateCreated' : bigint,
  'iiEnabled' : string,
  'name' : string,
  'creatorId' : bigint,
  'ttydHttpsEnabled' : string,
  'lastUpdated' : bigint,
  'uniqueId' : string,
  'description' : string,
  'lastTouch' : bigint,
  'lastDeploymentId' : bigint,
  'dnsName' : string,
  'publicIp' : string,
  'category' : string,
  'ttydHttpsCount' : bigint,
  'dfxReplicaType' : string,
}
export interface _SERVICE {
  'addManagerPrincipalMain' : (
      arg_0: string,
      arg_1: string,
      arg_2: Principal,
    ) => Promise<LoginResponse>,
  'authenticateMain' : (arg_0: LoginAttempt, arg_1: string) => Promise<
      LoginResponse
    >,
  'checkPrincipalMain' : () => Promise<bigint>,
  'createDeploymentMain' : (arg_0: string, arg_1: Environment__1) => Promise<
      CreateDeploymentResponse
    >,
  'createIiEnableJob' : (arg_0: string, arg_1: bigint) => Promise<
      CreateIiEnableJobResponse
    >,
  'getCanisterStatus' : () => Promise<CanisterStatusResponse>,
  'getCompleteCanisterMain' : (arg_0: string, arg_1: bigint) => Promise<
      CompleteCanisterResponse
    >,
  'getCompleteDashboardStats' : (arg_0: string) => Promise<
      CompleteDashboardStats
    >,
  'getCompleteDeploymentMain' : (arg_0: string, arg_1: bigint) => Promise<
      CompleteDeploymentResponse
    >,
  'getCompleteEnvironmentMain' : (arg_0: string, arg_1: bigint) => Promise<
      CompleteEnvironmentResponse
    >,
  'getCompleteIdentityMain' : (arg_0: string, arg_1: bigint) => Promise<
      CompleteIdentityResponse
    >,
  'getCompleteJobMain' : (arg_0: string, arg_1: bigint) => Promise<
      CompleteJobResponse
    >,
  'getCompleteProjectMain' : (arg_0: string, arg_1: bigint) => Promise<
      CompleteProjectResponse
    >,
  'getCompleteWorkerMain' : (arg_0: string, arg_1: bigint) => Promise<
      CompleteWorkerResponse
    >,
  'getICPMConfigDownload' : (arg_0: string, arg_1: string) => Promise<
      DownloadAllConfigResponse
    >,
  'getICPMLogDownload' : (arg_0: string, arg_1: string) => Promise<
      DownloadAllLogResponse
    >,
  'getListOfCanisters' : (arg_0: string, arg_1: string) => Promise<
      Array<Canister__1>
    >,
  'getListOfDeployments' : (arg_0: string, arg_1: string) => Promise<
      Array<Deployment__1>
    >,
  'getListOfEnvironments' : (arg_0: string, arg_1: string) => Promise<
      Array<Environment__1>
    >,
  'getListOfEvents' : (arg_0: string, arg_1: string) => Promise<Array<Event>>,
  'getListOfIdentities' : (arg_0: string, arg_1: string) => Promise<
      Array<Identity__1>
    >,
  'getListOfJobs' : (arg_0: string, arg_1: string) => Promise<Array<Job__1>>,
  'getListOfProjects' : (arg_0: string, arg_1: string) => Promise<
      Array<Project>
    >,
  'getListOfUsers' : (arg_0: string, arg_1: string) => Promise<Array<User>>,
  'getListOfWorkers' : (arg_0: string, arg_1: string) => Promise<Array<Worker>>,
  'manageCanisterMain' : (arg_0: string, arg_1: Canister__1) => Promise<
      ManageCanisterResponse
    >,
  'manageDeploymentMain' : (arg_0: string, arg_1: Deployment__1) => Promise<
      string
    >,
  'manageEnvironmentMain' : (arg_0: string, arg_1: Environment__1) => Promise<
      ManageEnvironmentResponse
    >,
  'manageEventMain' : (arg_0: string, arg_1: Event) => Promise<string>,
  'manageIdentityMain' : (arg_0: string, arg_1: Identity__1) => Promise<
      ManageIdentityResponse
    >,
  'manageJobMain' : (arg_0: string, arg_1: Job__1) => Promise<string>,
  'managePrincipalsMain' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
    ) => Promise<ManagePrincipalResponse>,
  'manageProjectMain' : (arg_0: string, arg_1: Project) => Promise<
      CompleteProjectResponse
    >,
  'manageUserMain' : (arg_0: string, arg_1: User) => Promise<string>,
  'manageWorkerMain' : (arg_0: string, arg_1: Worker) => Promise<string>,
  'ttydHttpsEnableDisable' : (arg_0: string, arg_1: bigint) => Promise<
      TtydHttpsEnableDisableResponse
    >,
  'workerUplink' : (arg_0: string, arg_1: Worker) => Promise<UplinkResponse>,
}
