export interface IeventsFilter {
    minDistance: number;
    maxDistance: number;
    fromDate: Date;
    postcode: string;
    radius: number;
    textSearch: string;
    categoryBP: boolean;
    categoryBR: boolean;
    categoryBRM: boolean;
    AaaEvents: number;
    dayTypeSaturday: boolean;
    dayTypeSunday: boolean;
    dayTypeWeekday: boolean;
    paymentPayPal: boolean;
    paymentPost: boolean;
    pageSize: number;
    page: number;
    orderBy: string; //distance
    sortDirection: string; //DESC
}

export class eventsFilter implements IeventsFilter {
    minDistance: number;    
    maxDistance: number;
    fromDate: Date;
    postcode: string;
    radius: number;
    textSearch: string;
    categoryBP: boolean;
    categoryBR: boolean;
    categoryBRM: boolean;
    AaaEvents: number;
    dayTypeSaturday: boolean;
    dayTypeSunday: boolean;
    dayTypeWeekday: boolean;
    paymentPayPal: boolean;
    paymentPost: boolean;
    pageSize: number;
    page: number;
    orderBy: string;
    sortDirection: string;
}

