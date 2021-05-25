
export interface Flight{
        flight_number?: string,
        aircraft_number?: number, 
        source?: string,
        destination?: string, 
        airline?: string, 
        departure_time?: Date, 
        arrival_time?: Date, 
        flight_duration?: number
}

const flights: Flight[] = [];


