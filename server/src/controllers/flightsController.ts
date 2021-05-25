import { Request, Response } from 'express';

import pool from '../database';

class FlightsController{

    public async list (req: Request, res: Response): Promise<void>{
        // For pool initialization, see above.
        pool.query('SELECT *, SEC_TO_TIME(TIMESTAMPDIFF(HOUR, departure_time, arrival_time)) as total_time '+
        'FROM FLIGHTS LEFT JOIN AIRCRAFTS ON AIRCRAFTS.AIRCRAFT_NUMBER = FLIGHTS.AIRCRAFT_NUMBER', 
            function (error, results, fields) {
                if (error) {
                    console.error(error);
                    res.status(500).send(error);
                }
                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.json(results);  
        });
    }

    public async listBooking(req: Request, res: Response): Promise<void>{
        try {
            const { passenger_passport } =  req.params; 
            const { flight_number } =  req.params; 
            
            console.log(passenger_passport);
            console.log(flight_number);
            //For pool initialization, see above.
            pool.query('select * from RESERVATIONS WHERE passenger_passport = ? AND flight_number = ? ORDER BY ticket_number DESC LIMIT 1', 
                [passenger_passport, flight_number], 
                function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).send(error);
                    }
                    res.status(200);
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.json(results);
            });        
        } catch (err) {
            res.status(304);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.json(err); 
            
        }
    }

    public async listBookings(req: Request, res: Response): Promise<void>{
        try {
            const { passenger_passport } =  req.params; 
            console.log(passenger_passport);
            //For pool initialization, see above.
            pool.query('SELECT * FROM PASSENGERS '+
            'INNER JOIN RESERVATIONS ON PASSENGERS.passenger_passport = RESERVATIONS.passenger_passport '+
            'INNER JOIN FLIGHTS ON RESERVATIONS.flight_number = FLIGHTS.flight_number '+
            'WHERE PASSENGERS.passenger_passport = ?', 
                [passenger_passport], 
                function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).send(error);
                    }
                    res.status(200);
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.json(results);
            });        
        } catch (err) {
            res.status(304);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.json(err); 
            
        }
    }

    public async getOne(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        pool.query('SELECT *,  SEC_TO_TIME(TIMESTAMPDIFF(HOUR, departure_time, departure_time_to)) as total_time FROM FLIGHTS WHERE flight_number = ?',
            [id],
            function(error, results, fields) {
                if (error) {
                    console.error(error);
                    res.status(500).send(error);
                }
                
                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.json(results);                
            });
        
            //res.json({message: 'flights listed '});
    }

    public async getFlightByFilter (req: Request, res: Response): Promise<void>{
        try {
            const { source } =  req.params; 
            const { destination } =  req.params; 
            const { departure_time } =  req.params; 
            const { arrival_time } =  req.params; 

    
            pool.query('SELECT *, SEC_TO_TIME(TIMESTAMPDIFF(HOUR, departure_time, departure_time_to)) as total_time '+
            'from FLIGHTS LEFT JOIN AIRCRAFTS ON AIRCRAFTS.AIRCRAFT_NUMBER = FLIGHTS.AIRCRAFT_NUMBER '+
            'where source = ? AND destination = ? AND departure_time = ? AND arrival_time = ?',
                [source, destination, departure_time, arrival_time], 
                function(error, results, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).send(error);
                    }
                    
                    res.status(200);
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.json(results); 
    
                });
        } catch (err) {
            //console.log(req.params);
            res.status(304);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.json(err);             
        }
    }

    public async create (req: Request, res: Response): Promise<void>{
        //console.log(req.body)
        pool.query('INSERT INTO FLIGHTS set ?', [req.body], function (error, results) {
            res.status(200);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, AcceptAccept");
            if (error) {
                res.json({status: false, message: error});
            } else {
                res.json({status: true, message: 'flight saved'});
            }
        });
    }


    public async createPassanger (req: Request, res: Response): Promise<void>{
        console.log(req.body)
        pool.query('INSERT INTO PASSENGERS set ?', [req.body], function (error, results) {
            res.status(200);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, AcceptAccept");
            if (error) {
                res.json({status: false, message: error});
            } else {
                res.json({status: true, message: 'Passanger saved'});
            }
        });
    }

    public async createBooking (req: Request, res: Response): Promise<void>{
        console.log(req.body)
        pool.query('INSERT INTO RESERVATIONS set ?', [req.body], function (error, results) {
            res.status(200);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, AcceptAccept");
            if (error) {
                res.json({status: false, message: error});
            } else {
                res.json({status: true, message: 'Reservation saved'});
            }
        });
    }

    
    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        pool.query('DELETE FROM FLIGHTS WHERE flight_number = ?',
            [id], 
            function(error, results, fields) {
                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, AcceptAccept");
                if (error) {
                    res.json({status: false, message: error});
                } else {
                    res.json({status: true, message: 'the flight was deleted'});
                }              
            });

    }
    
    public async update (req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        pool.query('UPDATE FLIGHTS SET seat = (seat)-1 WHERE flight_number = ?',
            [id], 
            function(error, results, fields) {
                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, AcceptAccept");
                if (error) {
                    res.json({status: false, message: error});
                } else {
                    res.json({status: true, message: 'the flight was updated'});
                    console.log('resultados'+ results);
                }              
            });

    }
    
}

const flightsController = new FlightsController();
export default flightsController;