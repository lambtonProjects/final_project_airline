import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FlightsFormComponent } from './components/flights-form/flights-form.component';
import { FlightsListComponent } from './components/flights-list/flights-list.component';

import { FlightsService } from './services/flights.service';
import { BookingListComponent } from './components/booking-list/booking-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FlightsFormComponent,
    FlightsListComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    FlightsService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
