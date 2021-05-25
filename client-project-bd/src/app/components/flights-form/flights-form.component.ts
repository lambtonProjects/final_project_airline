import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Passenger } from '../../models/Passenger';
import { Booking } from '../../models/Booking';
import { FlightsService } from '../../services/flights.service';
import { Observable } from 'rxjs';

export class savePassenger {
  public passenger_passport?: string;
  public first_name?: string;
  public last_name?: string;
}

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.css']
})
export class FlightsFormComponent implements OnInit {
  model = new savePassenger();
  flight_number:string = "";
  flights: any;
  bookings: any;
  succes = false;
  
  booking: Booking = {
    //ticket_number: '',
    passenger_passport: '',
    flight_number: ''
  };
  constructor(private flightService: FlightsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;    
    console.log(params.id);

    this.flight_number = params.id;
    if (params.id) {
      this.flightService.getFlight(params.id).subscribe(
          res => {
            console.log(res);
            this.flights = res;
            //this.game = res;
            //this.edit = true;
          },
          err => console.log(err)
        )
    }
  }
  async onSubmit(passForm: any) {
    var param1 = passForm.value.passenger_passport;
    var param2 = passForm.value.first_name;
    var param3 = passForm.value.last_name;
    
    if((param1) && (param2) && (param3)){
      this.booking.flight_number = this.flight_number;
      this.booking.passenger_passport = param1;

      //guardar pasajero
      await this.saveNewPassenger(passForm.value);
      //guardar reserva
      await this.saveBooking(this.booking);
      //update flights
      await this.updateflights(this.flight_number, this.flights, param1);
    }else{
      console.log("Campos en blanco");
    }
  }
  
  async getBooking(param1: any, flight_number: string): Promise<void> {
    this.flightService.getBooking(param1, flight_number).subscribe(
      res => { 
        console.log(res);
        this.succes = true;
        this.bookings= res;
       },
      err => console.log(err)
    )
  }

  async saveNewPassenger(passForm: Passenger): Promise<void> {
    
    this.flightService.savePassenger(passForm)
      .subscribe(
        res => {
          console.log(res);
          //this.router.navigate(['/games']);
        },
        err => console.log(err)
      )
  }

  async saveBooking(booking: Booking): Promise<void> {
    
    this.flightService.saveBooking(booking)
      .subscribe(
        res => {
          console.log(res);
          //this.router.navigate(['/games']);
        },
        err => console.log(err)
      )
  }


  async updateflights(flight_number: string, flights: any, param1: any): Promise<void> {
    this.flightService.updateFlight(flight_number, flights)
      .subscribe(
        res => {
          console.log(res);
          
          this.getBooking(param1, this.flight_number);
        },
        err => console.log(err)
      )
  }
    
}
