import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  passaport_number:string = "";
  bookings: any;

  constructor(private flightService: FlightsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    {
      const params = this.activatedRoute.snapshot.params;    
      console.log(params.id);
  
      this.passaport_number = params.id;
      if (params.id) {
        this.flightService.getBookings(params.id).subscribe(
            res => {
              console.log(res);
              this.bookings = res;
              //this.game = res;
              //this.edit = true;
            },
            err => console.log(err)
          )
      }
    }
  }

}
