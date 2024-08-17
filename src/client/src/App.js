import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import FlightCard from './flightCard';
import { supabase } from './supabaseClient';
import InputGroup from 'react-bootstrap/InputGroup';

//YbuNRL9dMSQzMed1

// Create the user interface (Navbar, Form to create products, product card)
// Setup, create table for our products
// Implement the CRUD logic for products

// Resume video https://www.youtube.com/watch?v=4yVSwHO5QHU @ 14:22

function App() {
  const [ startloc, setStartloc ] = useState("");
  const [ endloc, setEndloc] = useState("");
  const [ passengers, setPassengers] = useState("");
  const [ flights, setFlights ] = useState([]);
  const [ value, setValue ] = useState("");
  const [ startdate, setStartDate ] = useState();
  const [ enddate, setEndDate ] = useState();
  const options = [
    {label: "One Way", value: "One Way"},
    {label: "Round Trip", value: "Round Trip"}
  ]

  console.log(startloc);
  console.log(endloc);
  console.log(passengers);
  {/* Use Effect hook ensures the code runs automatically, this code displays ALL flights in the database
  useEffect(() => {
    getFlights();
  }, [])
  */}

  useEffect(() => {
    showRandomFlight();
  }, [])
  
  
  async function getFlights(){
    try{
      const {data, error } = await supabase
        .from("flights")
        .select("*")
        //.limit(10)
      if (error) throw error;
      if (data != null){
        setFlights(data);
      }
    }catch (error){
      alert(error.message);
    }
  }

  async function getFlightCount(){
    try{
      const { count, error } = await supabase
      .from("flights")
      .select("*", {count: "exact", head: true});

      if (error) throw error;

      return count;
    }catch (error){
      alert(error.message);
      return 0;
    }
  }

  async function showRandomFlight(){
    const count = await getFlightCount();

    if (count === 0){
      alert("No Flight Available");
      return;
    }

    const randomId = Math.floor(Math.random() * count) + 1;
    await getFlightsById(randomId);
  }

  async function getFlightsById(id){
    try{
      const {data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("id", id)
      .single(); // ensures a single result
      if (error) throw error;
      if (data != null){
        setFlights([data]);
      }
    }catch (error){
      alert(error.message);
    }
  }

  async function createFlight() {
    try{
      const { data, error } = await supabase
        .from("flights")
        .insert({
          // Content to the left of the : is the name of colum in DB
          // Content to the right of the : is the name of the const variable above
          startloc: startloc,
          endloc: endloc,
          passengers: passengers,
          type: value,
          startday: startdate,
          endday: enddate
        })
        .single()

      if (error) throw error;
      window.location.reload();
    }catch (error){
      alert(error.message);
    }
  }

  console.log(flights);

  return (
    <>
      
      <Navbar>
        <Container>
          <Navbar.Brand>Flight Tracker</Navbar.Brand>
          <Nav>
            <Nav.Item>Created by James</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      
      <Container>
        {/*<Row>
          <Col xs={12} md={8}>
            <h3>Create Flight</h3>
            <Form.Label>Start Location</Form.Label>
            <Form.Control
              type="text"
              id="startloc"
              onChange={(e)=> setStartloc(e.target.value)}
            />
            <Form.Label>End Location</Form.Label>
            <Form.Control
              type="text"
              id="endloc"
              onChange={(e)=> setEndloc(e.target.value)}
            />
            <Form.Label># of Passengers</Form.Label>
            <Form.Control
              type="int"
              id="passengers"
              onChange={(e) => setPassengers(e.target.value)}
            />
            <Form.Label>Flight Type</Form.Label>
            <Form.Select className="form-select" id="type" onChange={(e) => setValue(e.target.value)}>
              {options.map(option => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Form.Select>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              id="startdate"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              id="enddate"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <br></br>
            <Button onClick={() => createFlight()}>Create Flight Information</Button>

          </Col>
        </Row>*/}
        
        <h3>Your Flight</h3>
        <Row xs={1} lg={3} className="g-4">
          {flights.map((flight) => (
            <Col key={flight.id}>
              <FlightCard flight={flight} />
            </Col>
          ))}
        </Row>
      </Container>  
    </>
  );
}

export default App;
