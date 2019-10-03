/* import { IapiAudax } from "../AudaxService";
import { Login } from "../../models/login";
import { rideResults } from "../../models/rideResults";
import { enteredRides } from "../../models/enteredRides";
import { CalendarEvent } from "../../models/calendarEvents";
import { eventsFilter } from "../../models/eventsFilter";


class apiAudaxMock implements IapiAudax {
    isRiderLoggedIn(): boolean {
        throw new Error("Method not implemented.");
    }
    login(login: Login): Promise<boolean> {
        return new Promise(resolve => {return true});
    }    
    logoff(): Promise<boolean> {
        return new Promise(resolve => {return true});
    }
    myResults(): rideResults[] {
        throw new Error("Method not implemented.");
    }
    myRides(): Promise<enteredRides[]> {
        throw new Error("Method not implemented.");
    }
    allEvents(): CalendarEvent[] {
        throw new Error("Method not implemented.");
    }
    filteredEvents(filter: eventsFilter): CalendarEvent[] {
        throw new Error("Method not implemented.");
    }
}

export const MockAudaxService = new apiAudaxMock(); */