import {
    Login
} from "../models/login";
import {
    rideResults
} from "../models/rideResults";
import {
    enteredRides
} from "../models/enteredRides";
import {
    CalendarEvent
} from "../models/calendarEvents";
import {
    eventsFilter
} from "../models/eventsFilter";
import Axios, {
    AxiosResponse
} from 'axios';


export interface IapiAudax {
    isRiderLoggedIn(): boolean;
    login(login: Login): Promise < boolean > ;
    logoff(): Promise < boolean > ;
    myResults(): Array < rideResults > ;
    myRides(): Promise < Array < enteredRides >> ;
    allEvents(): Array < CalendarEvent > ;
    filteredEvents(filter: eventsFilter): Array < CalendarEvent > ;
}


export class apiAudax implements IapiAudax {
    isRiderLoggedIn(): boolean {
        return this.isLoggedIn;
    }
    private isLoggedIn: boolean = false;

    private setLoggedIn(response: AxiosResponse < any > ) {
        let html = response.data as string;
        let testResult = html.indexOf('You need to log in to be able to see this section of the site');
        if (testResult > 0) {
            this.isLoggedIn = false;
        } else {
            return this.isLoggedIn = true
        }
    }

    async login(login: Login): Promise < boolean > {
        try {
            console.log('Logged in state : ' + this.isLoggedIn);
            if (!this.isLoggedIn) {
                let response = await Axios.post('https://www.aukweb.net/members/?action=logout', 'memno=' + login.membershipNumber + '&password=' + login.password + '&login=Login');
                this.setLoggedIn(response);
            }
            console.log('Logged in state2 : ' + this.isLoggedIn);
            return this.isLoggedIn;

        } catch (error) {
            this.isLoggedIn = false;
            console.log('Logged in state3 : ' + this.isLoggedIn);
            return this.isLoggedIn;
        }
    }

    async logoff(): Promise < boolean > {
        console.log('Log off state : ' + this.isLoggedIn);
        try {
            let data = new FormData();
            data.append("logout", "Logout");
            let response = await Axios.post('https://www.aukweb.net/members/?action=logout', data);
            this.setLoggedIn(response);
            console.log('Log off state2 : ' + this.isLoggedIn);
            return !this.isLoggedIn;
        } catch (error) {
            this.isLoggedIn = false;
            console.log('Logged off state3 : ' + this.isLoggedIn);
            return !this.isLoggedIn;
        }
    }
    myResults(): rideResults[] {
        throw new Error("Method not implemented.");
    }
    async myRides(): Promise < enteredRides[] > {

        try {
            let response = await Axios.get('https://www.aukweb.net/members/calendar');
            let htmlBody = response.data;
            return this.extractMyRides(htmlBody);

        } catch (error) {
            console.log(error);
        }
        return null;


    }
    allEvents(): CalendarEvent[] {
        throw new Error("Method not implemented.");
    }
    filteredEvents(filter: eventsFilter): CalendarEvent[] {
        throw new Error("Method not implemented.");
    }

    private extractMyRides(html: string): enteredRides[] {
        let myRides = new Array < enteredRides > ();

        let rideToProcess: boolean;
        let endPos: number;
        //get rides you've enter section
        //Find <h4>The rides you've entered.</h4>
        let pos = html.indexOf('<h4>The rides you\'ve entered.</h4>');
        if (pos == -1) {
            return myRides
        }

        //get the event details
        //Find <div class="event stripe
        pos = html.indexOf('<div class="event stripe', pos);

        do {
            let currentRide = new enteredRides();
            //Get ride details
            //ride type
            //Find <img title="
            pos = html.indexOf('<img title="', pos) + 12;
            endPos = html.indexOf('"', pos);
            currentRide.rideType = html.substr(pos, endPos - pos);

            //ride date
            //Find <span class="detail">
            pos = html.indexOf('<span class="detail">', pos) + 21;
            endPos = html.indexOf('</span>', pos);
            currentRide.eventDate = new Date(html.substr(pos, endPos - pos));

            //ride distance
            //<span class="distance">
            pos = html.indexOf('<span class="distance">', pos) + 23;
            endPos = html.indexOf('</span>', pos);
            currentRide.distance = html.substr(pos, endPos - pos);


            //Ride name
            //Find <span class="detail">
            pos = html.indexOf('<span class="detail">', pos) + 21;
            endPos = html.indexOf('</span>', pos);
            currentRide.title = html.substr(pos, endPos - pos).replace('<b>', '').replace('</b>', '');

            myRides.push(currentRide);

            //Find <div class="event stripe
            pos = html.indexOf('<div class="event stripe', pos);
            if (pos == -1) {
                rideToProcess = false
            }
            else
            {
                rideToProcess = true;
            }
        } while (rideToProcess);

        return myRides;
    }
}

export const AudaxService = new apiAudax();
