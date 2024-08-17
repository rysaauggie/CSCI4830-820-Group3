import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';

function FlightCard(props) {
    const flight = props.flight;

    const[ editing, setEditing ] = useState(false);
    const [ startloc, setStartloc ] = useState(flight.startloc);
    const [ endloc, setEndloc] = useState(flight.endloc);
    const [ passengers, setPassengers ] = useState(flight.passengers);
    const [ value, setValue ] = useState("");
    const [ startdate, setStartDate ] = useState();
    const [ enddate, setEndDate ] = useState();
    const options = [
        {label: "One Way", value: "One Way"},
        {label: "Round Trip", value: "Round Trip"}
      ]

    async function updateFlight(){
        try{
            const { data, error } = await supabase
              .from("flights")
              // "flights" is name of table in Supabase
              .update({
                // Content to the left of the : is the name of colum in DB
                // Content to the right of the : is the name of the const variable above
                startloc: startloc,
                endloc: endloc,
                passengers: passengers,
                type: value,
                startday: startdate,
                endday: enddate
              })
              .eq("id", flight.id)
      
            if (error) throw error;
            window.location.reload();
          }catch (error){
            alert(error.message);
          }
    }

    async function deleteFlight(){
        try{
            const {data, error } = await supabase
              .from("flights")
              // "flights" is name of table in Supabase
              .delete()
              // delete row from Table "flights"
              .eq("id", flight.id)
              // .eq is testing equivalence of the "id" for the "id" idenifier in the table flight called flight.id
      
            if (error) throw error;
            window.location.reload();
          }catch (error){
            alert(error.message);
          }
    }

    return (
        <Card style={{width:"18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                    <Card.Text>Start Location: {flight.startloc}</Card.Text>
                    <Card.Text>End Location: {flight.endloc}</Card.Text>
                    <Card.Text># Passengers: {flight.passengers}</Card.Text>
                    <Card.Text>{flight.type}</Card.Text>
                    <Card.Text>{flight.startday}</Card.Text>
                    <Card.Text>{flight.endday}</Card.Text>
                    <Button variant="danger" onClick={() => deleteFlight()}> Delete Flight</Button>
                    <Button onClick={() => setEditing(true)}>Edit Flight</Button>
                    </>
                :
                    <>
                        <h4>Editing Flight</h4>
                        <Button size="sm" onClick={() => setEditing(false)}> Cancel Edting</Button>
                        <br></br>
                        <Form.Label></Form.Label>
                        <Form.Label>Start Location</Form.Label>
                        <Form.Control
                            type="text"
                            id="startloc"
                            defaultValue={flight.startloc}
                            onChange={(e)=> setStartloc(e.target.value)}
                        />
                        <Form.Label>End Location</Form.Label>
                        <Form.Control
                            type="text"
                            id="endloc"
                            defaultValue={flight.endloc}
                            onChange={(e)=> setEndloc(e.target.value)}
                        />
                        <Form.Label># of Passengers</Form.Label>
                        <Form.Control
                            type="int"
                            id="passengers"
                            defaultValue={flight.passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                        />
                        <Form.Label>Flight Type</Form.Label>
                        <select className="form-select" id="type" onChange={(e) => setValue(e.target.value)}>
                            {options.map(option => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            id="startdate"
                            defaultValue={flight.startday}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            id="enddate"
                            defaultValue={flight.endday}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => updateFlight()}>Update Flight Information</Button>
                    </>
                }
            </Card.Body>
        </Card>
    )
}

export default FlightCard;