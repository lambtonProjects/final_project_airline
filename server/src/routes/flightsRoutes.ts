import express, { Router } from 'express';
import flightsController from '../controllers/flightsController';

class FlightsRoutes {

    public router : Router =  Router();

    constructor () {
        this.config();
    }
    config(): void { 
        this.router.get('/', flightsController.list);
        this.router.get('/:source/:destination/:departure_time/:arrival_time', flightsController.getFlightByFilter);
        this.router.get('/booking/:passenger_passport/:flight_number', flightsController.listBooking);
        this.router.get('/booking/:passenger_passport', flightsController.listBookings);
        this.router.get('/:id', flightsController.getOne); 
        this.router.post('/', flightsController.create);
        this.router.post('/passenger', flightsController.createPassanger);
        this.router.post('/booking', flightsController.createBooking);
        this.router.delete('/:id', flightsController.delete);
        this.router.put('/:id', flightsController.update);
    }

}

const flightsRoutes = new FlightsRoutes();
export default flightsRoutes.router;