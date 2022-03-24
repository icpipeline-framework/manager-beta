let iiProvider;

if(process.env.NODE_ENV !== "production") {
  iiProvider = "https://localhost:8090"
  //dfxIIprovider = "http://localhost:8000/?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai"
  //dfxIIprovider = "http://localhost:8000/?canisterId=cvccv-qqaaq-aaaaa-aaaaa-c"
  

} else {
  iiProvider = "https://identity.ic0.app/"
} // end if production


 export { iiProvider };