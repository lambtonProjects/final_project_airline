import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsFormComponent } from './components/flights-form/flights-form.component';
import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/flights',
    pathMatch: 'full'
  },
  {
    path: 'flights', 
    component: FlightsListComponent
  },
  {   
  path: 'addPassanger/:id',
    component: FlightsFormComponent
  },
  {   
    path: 'listBooking/:id',
      component: BookingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
