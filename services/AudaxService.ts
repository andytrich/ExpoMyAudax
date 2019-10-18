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
    CalendarEvent, CalendarEvents
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
    allEvents(): Promise <CalendarEvents> ;
    filteredEvents(filter: eventsFilter): Promise <CalendarEvents>;
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
            if (!this.isLoggedIn) {
                let response = await Axios.post('https://www.aukweb.net/members/?action=logout', 'memno=' + login.membershipNumber + '&password=' + login.password + '&login=Login');
                this.setLoggedIn(response);
            }
            return this.isLoggedIn;

        } catch (error) {
            this.isLoggedIn = false;
            return this.isLoggedIn;
        }
    }

    async logoff(): Promise < boolean > {
        try {
            let data = new FormData();
            data.append("logout", "Logout");
            let response = await Axios.post('https://www.aukweb.net/members/?action=logout', data);
            this.setLoggedIn(response);
            return !this.isLoggedIn;
        } catch (error) {
            this.isLoggedIn = false;
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
           // console.log(error);
        }
        return null;


    }
    async allEvents(): Promise<CalendarEvents> {
        try{
            let response = await Axios.get('https://www.audax.uk/umbraco/surface/Events/Search?pageSize=300&page=1&orderBy=eventdate');
            return response.data;
        }catch(error)
        {
            //console.log(error);
        }
        return null;
    }
    
    async filteredEvents(filter: eventsFilter): Promise<CalendarEvents> {
        filter.page=1;
        filter.pageSize=300
        filter.orderBy='eventdate'
        
        filter.fromDate = new Date();
        filter.toDate = new Date();  
        filter.toDate.setFullYear(filter.fromDate.getFullYear() + 1)
        try{
            let response = await Axios.get('https://www.audax.uk/umbraco/surface/Events/Search'
            ,{
                params : filter
            }
            );
            return response.data;
        }catch(error)
        {
            //console.log(error);
        }
        return null;
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
            //ride id
            //<a href="/events/detail/
            pos = html.indexOf('<a href="/events/detail/', pos) + 27;
            endPos = html.indexOf('"', pos) - 1;
            currentRide.id = +html.substr(pos, endPos - pos);

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
            endPos = html.indexOf('</span>', pos) - 2;
            currentRide.distance = +html.substr(pos, endPos - pos);


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
