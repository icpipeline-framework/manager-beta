import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Int = "mo:base/Int";
import Time = "mo:base/Time";
import Types "types";

module {

  type Event = Types.Event;

  // general handler function for adding and editing Events in PipelineManager
  
  public func manageEventUtil(theEvents : [Event], thisEvent : Event, nextEventId: Int ) : [Event] {
    let now = Time.now();
    var foundEvent = false;
    let theEventsNew: [Event] = Array.map<Event, Event>(
      theEvents,
      func (origEvent : Event) : Event {
        if (origEvent.id == thisEvent.id ) {
          foundEvent := true;
          // TODO - create a backup object and array so that the original object can be stored for history
          return {
            id = thisEvent.id;
            eventType = thisEvent.eventType;
            mainRefType = thisEvent.mainRefType;
            environmentId = thisEvent.environmentId;
            projectId = thisEvent.projectId;
            deploymentId = thisEvent.deploymentId;
            workerId = thisEvent.workerId;
            jobId = thisEvent.jobId;
            eventText = thisEvent.eventText;
            localTime = thisEvent.localTime;
            creatorId = origEvent.creatorId;
            dateCreated = origEvent.dateCreated;
            lastUpdated = now;
          }; // end return
        }; // end if this is the same id as what was passed to us
        // otherwise we return the same object
        origEvent
      } // end generic subfunction
    ); // end theEventsNew declaration

    // inspect results of array.map interation
    if (thisEvent.id  > 0 and foundEvent == true ) {
      // found a Event and updated it
      // return updated array to frontend calling function
      return theEventsNew
    } else if (thisEvent.id  > 0 and foundEvent == false ) {
      // TODO
      // then I need to error out somehow that I meant to update a Event with ID but could not find it which is bad
      return theEventsNew
    } else if (thisEvent.id  == 0 and foundEvent == false) {
      // TODO - check if there was a duplicate while going through the map based on name
      // use the nextEventId
      let newEvent: Event = {
        id = nextEventId ;
        eventType = thisEvent.eventType;
        mainRefType = thisEvent.mainRefType;
        environmentId = thisEvent.environmentId;
        projectId = thisEvent.projectId;
        deploymentId = thisEvent.deploymentId;
        workerId = thisEvent.workerId;
        jobId = thisEvent.jobId;
        eventText = thisEvent.eventText;
        localTime = thisEvent.localTime;
        creatorId = thisEvent.creatorId;
        dateCreated = now;
        lastUpdated = now;
      }; // end newEvent declaration

      // then I add a new one to the array

      // going to convert to Buffer and back as append is deprecated

      let theEventsBuffer : Buffer.Buffer<Event> = Buffer.Buffer(theEvents.size());
        
      for (x in theEvents.vals()) {
        
          theEventsBuffer.add(x);
        
      };
    
      theEventsBuffer.add(newEvent);

      return theEventsBuffer.toArray();

      
    } else {
      // TODO
      // then I thought there was something to do and there is nothing and found nothing ... bad
      return theEventsNew;
    }; // end of if for insert/update or errors
  }; // end function manageEventUtil

  public func getEventsByDeploymentId (theEvents : [Event], theDeploymentId: Int ) : [Event]  {
    // now we map through the array for a events with that deployment


      var foundEvents = false;
      
      var theseEvents : Buffer.Buffer<Event> = Buffer.Buffer(0);

      
      let theEventsNew: [Event] = Array.map<Event, Event>(
        theEvents,
        func (origEvent : Event) : Event {
          // so since this is based on deployment we want to check for deployment
          
          if (origEvent.deploymentId == theDeploymentId ) {
            foundEvents := true;
            theseEvents.add (origEvent);

          }; // end if this is the same id as what was passed to us
          origEvent
        } // end generic subfunction
      ); // end Array Map



    return theseEvents.toArray();
    
  };// end getEventsByDeploymentId

  public func eventsCountLast30 (theEvents : [Event]) : Nat  {
    // now we map through the array for a events that have happened in the last 30 min

      let now = Time.now();
      var foundEvents = false;
      var thisCount : Nat = 0 ;
      // 30 min times 60 sec per min times 1000 milli seconds per second * 1,000,000 nano seconds per milli second
      var thirtyMinAgo : Int = now - (30 * 60 * 1000 * 1000000) ;


      
      let theEventsNew: [Event] = Array.map<Event, Event>(
        theEvents,
        func (origEvent : Event) : Event {
          // so since this is based on deployment we want to check for deployment
          
          if (origEvent.dateCreated > thirtyMinAgo ) {
            foundEvents := true;
            thisCount += 1;
          }; // end if this is the same id as what was passed to us
          origEvent
        } // end generic subfunction
      ); // end Array Map

    //thisCount := Int.abs(thirtyMinAgo) ;


    return thisCount;
    
  };// end getEventsByDeploymentId

  public func getEventsRecent (theEvents : [Event], thisHowMany: Int) : [Event]  {
    // now we map through the array for a events that have happened in the last 30 min

      let now = Time.now();
      var foundEvents = false;
      var thisCount : Int = 0 ;
      // 30 min times 60 sec per min times 1000 milli seconds per second * 1,000,000 nano seconds per milli second
      var thirtyMinAgo : Int = now - (30 * 60 * 1000 * 1000000) ;


      
      var theseEvents : Buffer.Buffer<Event> = Buffer.Buffer(0);

      var thisEventsCount : Int = theEvents.size() ;

      let theEventsNew: [Event] = Array.map<Event, Event>(
        theEvents,
        func (origEvent : Event) : Event {
          // so since this is based on deployment we want to check for deployment
          thisCount += 1;
          if (thisCount >  (thisEventsCount - thisHowMany)  ) {
            
              foundEvents := true;
              
            
              theseEvents.add (origEvent);
          }; // end if this count is < 30
            origEvent
        } // end generic subfunction
      ); // end Array Map

    return theseEvents.toArray();
    
  };// end getEventsByDeploymentId



} // end module