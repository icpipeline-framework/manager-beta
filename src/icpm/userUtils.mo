import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";
import Types "types";

module {

  type User = Types.User;


  // general handler function for adding and editing Users in PipelineManager
  
  public func manageUserUtil(theUsers : [User], thisUser : User, nextUserId: Int ) : [User] {
    let now = Time.now();
    var foundUser = false;
    let theUsersNew: [User] = Array.map<User, User>(
      theUsers,
      func (origUser : User) : User {
        if (origUser.id == thisUser.id ) {
          foundUser := true;
          // TODO - create a backup object and array so that the original object can be stored for history
          return {
            id = thisUser.id;
            name = thisUser.name;
            email = thisUser.email;
            cellPhone = thisUser.cellPhone;
            hashPass = thisUser.hashPass;
            internetId = thisUser.internetId;
            apiToken = thisUser.apiToken;
            active = thisUser.active ;
            creatorId = origUser.creatorId;
            dateCreated = origUser.dateCreated;
            lastUpdated = now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origUser
      } // end generic subfunction
    ); // end theUsersNew declaration

    // inspect results of array.map interation
    if (thisUser.id  > 0 and foundUser == true ) {
      // found a User and updated it
      // return updated array to frontend calling function
      return theUsersNew
    } else if (thisUser.id  > 0 and foundUser == false ) {
      // TODO
      // then I need to error out somehow that I meant to update a User with ID but could not find it which is bad
      return theUsersNew
    } else if (thisUser.id  == 0 and foundUser == false) {
      // TODO - check if there was a duplicate while going through the map based on name
      //  use the nextUserId
      let newUser: User = {
            id = nextUserId;
            name = thisUser.name;
            email = thisUser.email;
            cellPhone = thisUser.cellPhone;
            hashPass = thisUser.hashPass;
            internetId = thisUser.internetId;
            apiToken = thisUser.apiToken;
            active = thisUser.active ;
            creatorId = thisUser.creatorId;
            dateCreated = now;
            lastUpdated = now;
      }; // end newUser declaration

      // then I add a new one to the array
      return Array.append<User>(theUsers, [newUser]);
    } else {
      // TODO
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theUsersNew;
    }; // end of if for insert/update or errors
  }; // end function manageUserUtil


  public func getUserByIdUtil (theUsers : [User], thisUserId: Int ) : User  {
    // now we map through the array for a worker with that Id

      var foundUser = false;
      var thisUser: User = {
            id = 0;
            name = "";
            email = "";
            cellPhone = "";
            hashPass = "";
            internetId = "";
            apiToken = "";
            active = true;
            creatorId = 0;
            dateCreated = 0;
            lastUpdated = 0;
          };

  
      
      let theUsersNew: [User] = Array.map<User, User>(
        theUsers,
        func (origUser : User) : User {
          if (origUser.id == thisUserId) {
            foundUser := true;
            thisUser := origUser;
          }; // end if this is the same id as what was passed to us
          origUser
        } // end generic subfunction
      ); // end Array Map



    return thisUser;
    
  };// end getUserById

} // end module