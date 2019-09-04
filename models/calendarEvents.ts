    export interface CalendarEvent {
        EventDate: Date;
        EventDateFormatted: string;
        IsPermanent: boolean;
        Category: string;
        Area: string;
        Time: string;
        Climb: number;
        Body: string;
        Info: string;
        AudaxPoints: number;
        AcpBrevetNumber?: any;
        Id: number;
        EventNo: string;
        Title: string;
        Aaa: number;
        ActualDistance: number;
        AwardDistance: number;
        StartCondition: string;
        StartAddressDescription: string;
        StartLatitude: number;
        StartLongitude: number;
        OrganiserForename: string;
        OrganiserSurname: string;
        OrganiserFullName: string;
        OrganiserMembershipNo: number;
        Created: Date;
        SearchDistance?: any;
        Fee: string;
        IsPaypalEntryFee: boolean;
        IsPostalEntry: boolean;
        UpdateReasonCode?: any;
    }

    export interface CalendarEvents {
        TotalCount: number;
        Items: CalendarEvent[];
    }

