import express, { Router } from 'express';
import flightsController from '../controllers/flightsController';

class FlightsByFilterRoutes {

    public router : Router =  Router();

    constructor () {
        this.config();
    }
    config(): void { 
        //this.router.get('/:source/:destination/:departure_time/:arrival_time', flightsController.getFlightByFilter);
    }

}

const flightsByFilterRoutes = new FlightsByFilterRoutes();
export default flightsByFilterRoutes.router;