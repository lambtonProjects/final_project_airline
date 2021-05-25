import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';

export class searchFlight {
  public source?: string;
  public destination?: string;
  public departure_time?: string;
  public arrival_time?: string;
}

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {

  model = new searchFlight();
  flights: any;
  submitted = false;
  

  citiesFrom: string[] = [
    'Barcelona',
    'Madrid'
  ];

  citiesTo: string[] = [
    'Toronto',
    'Paris'
  ];
  constructor(private flightService: FlightsService) { 
  }

  ngOnInit(): void {
    
  }

  onSubmit(SearchForm: any) {
    this.submitted = true; 
   
    var param1 = SearchForm.value.source;
    var param2 = SearchForm.value.destination;
    var param3 = SearchForm.value.departure_time;
    var param4 = SearchForm.value.arrival_time;

    console.log(SearchForm.value);
    
    if((param1) && (param2) && (param3) && (param4)){
      this.flightService.getFlightsByFilter(param1, param2, param3, param4).subscribe(
        res => { 
          console.log(res);
          this.flights = res;
         },
        err => console.log(err)
      )
    }else{
      this.flightService.getFlights().subscribe(

        res => { 
          console.log(res);
          this.flights = res;
         },
        err => console.log(err)
      )
    }
  }
}


