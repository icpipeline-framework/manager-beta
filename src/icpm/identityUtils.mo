import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";


/// ****** CUSTOM IMPORTS 
import Types "types";


module {

  type Identity = Types.Identity;
  

  // general handler function for adding and editing Identitys in PipelineManager
  
  public func manageIdentityUtil(theIdentitys : [Identity], thisIdentity : Identity, nextIdentityId: Int ) : [Identity] {
    let now = Time.now();
    var foundIdentity = false;
    let theIdentitysNew: [Identity] = Array.map<Identity, Identity>(
      theIdentitys,
      func (origIdentity : Identity) : Identity {
        if (origIdentity.id == thisIdentity.id ) {
          foundIdentity := true;
          // TODO - create a backup object and array so that the original object can be stored for history

          return {
            id = thisIdentity.id;
            name = thisIdentity.name;
            category = thisIdentity.category;
            description = thisIdentity.description;
            principal = thisIdentity.principal;
            identityPem = thisIdentity.identityPem;
            profileWalletId = thisIdentity.profileWalletId;
            creatorId = origIdentity.creatorId;
            dateCreated = origIdentity.dateCreated;
            lastUpdated = now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origIdentity
      } // end generic subfunction
    ); // end theIdentitysNew declaration

    // inspect results of array.map interation
    if (thisIdentity.id  > 0 and foundIdentity == true ) {
      // found a Identity and updated it
      // return updated array to frontend calling function
      return theIdentitysNew
    } else if (thisIdentity.id  > 0 and foundIdentity == false ) {
      // TODO
      // then I need to error out somehow that I meant to update a Identity with ID but could not find it which is bad
      return theIdentitysNew
    } else if (thisIdentity.id  == 0 and foundIdentity == false) {
      // TODO - check if there was a duplicate while going through the map based on name
      // I use the nextIdentityId
      let newIdentity: Identity = {
        id = nextIdentityId;
        name = thisIdentity.name;
        category = thisIdentity.category;
        description = thisIdentity.description;
        principal = thisIdentity.principal;
        identityPem = thisIdentity.identityPem;
        profileWalletId = thisIdentity.profileWalletId;
        creatorId = thisIdentity.creatorId;
        dateCreated =  now;
        lastUpdated = now;
      }; // end newIdentity declaration

      // then I add a new one to the array
      return Array.append<Identity>(theIdentitys, [newIdentity]);
    } else {
      // TODO
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theIdentitysNew;
    } // end of if for insert/update or errors
  }; // end function manageIdentityUtil

  public func getIdentityByIdUtil (theIdentitys : [Identity], thisIdentityId: Int ) : Identity  {
    // now we map through the array for a worker with that Id

      var foundIdentity = false;
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

  
      
      let theIdentitysNew: [Identity] = Array.map<Identity, Identity>(
        theIdentitys,
        func (origIdentity : Identity) : Identity {
          if (origIdentity.id == thisIdentityId) {
            foundIdentity := true;
            thisIdentity := origIdentity;
          }; // end if this is the same id as what was passed to us
          origIdentity
        } // end generic subfunction
      ); // end Array Map



    return thisIdentity;
    
  };// end getIdentityById



} // end module