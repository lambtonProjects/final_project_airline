import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../models/Flight';
import { Passenger } from '../models/Passenger';
import { Observable } from 'rxjs';
import { Booking } from '../models/Booking';
@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { 

  }
  getFlights(){
      return this.http.get(`${this.API_URI}/flights`);
  }
  getFlightsByFilter(source: string, destination: string, departure_time: any, arrival_time: any){
    return this.http.get(`${this.API_URI}/flights/${source}/${destination}/${departure_time}/${arrival_time}`);
  }

  getFlight(id: string){
    return this.http.get(`${this.API_URI}/flights/${id}`);
  }

  deleteFlight(id: string){
    return this.http.delete(`${this.API_URI}/flights/${id}`);
  }

  saveFlight(flight: Flight){
      return this.http.post(`${this.API_URI}/flights`, flight);
  }
//
  savePassenger(passenger: Passenger){
    return this.http.post(`${this.API_URI}/flights/passenger`, passenger);
  }

  saveBooking(booking: Booking){
    return this.http.post(`${this.API_URI}/flights/booking`, booking);
  }

  getBooking(passenger_passport: string, flight_number: string){
    return this.http.get(`${this.API_URI}/flights/booking/${passenger_passport}/${flight_number}`);
  }

  getBookings(passenger_passport: string){
    return this.http.get(`${this.API_URI}/flights/booking/${passenger_passport}`);
  }

  updateFlight(id: string, updatedFlight: Flight): Observable<any>{
    return this.http.put(`${this.API_URI}/flights/${id}`, updatedFlight);
  }

}
