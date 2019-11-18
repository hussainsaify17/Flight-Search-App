import React from 'react';
import { Form, Button, Tabs, Tab } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Nouislider from "nouislider-react";


import "nouislider/distribute/nouislider.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';


export default (props) => {
    const { handleSearch, handleChange, SearchCriteria, CurrentTab, handleTab, handlePriceSlider, Price } = props;
    const cities = ["Pune (PNQ)", "Mumbai (BOM)", "Bengaluru (BLR)", "Delhi (DEL)"];

    function getForm(type){
        return (
            <Form onSubmit={handleSearch}>
                <Form.Group>
                    <Form.Label>Origin City</Form.Label>
                    <Typeahead
                        id='Origin'
                        selected={SearchCriteria.Origin !== '' ? [SearchCriteria.Origin] : []}
                        onChange={(selected) => { handleChange({ target: { name: 'Origin', value: selected.length > 0 ? selected[0] : '' } }) }}
                        placeholder="Origin City"
                        options={cities.filter(city => city !== SearchCriteria.Destination)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Destination City</Form.Label>
                    <Typeahead
                        id='Destination'
                        selected={SearchCriteria.Destination !== '' ? [SearchCriteria.Destination] : []}
                        onChange={(selected) => handleChange({ target: { name: 'Destination', value: selected.length > 0 ? selected[0] : '' } })}
                        placeholder="Destination City"
                        options={cities.filter(city => city !== SearchCriteria.Origin)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Departure Date</Form.Label>
                    <Form.Control
                        value={SearchCriteria.DepartureDate}
                        required
                        onChange={handleChange}
                        type="date"
                        name="DepartureDate"
                        placeholder="Departure Date" />
                </Form.Group>
                {type === "return" && (<Form.Group>
                    <Form.Label>Return Date</Form.Label>
                    <Form.Control
                        value={SearchCriteria.ReturnDate}
                        disabled={SearchCriteria.DepartureDate === ''}
                        required
                        min={SearchCriteria.DepartureDate}
                        onChange={handleChange}
                        type="date"
                        name="ReturnDate"
                        placeholder="Return Date" />
                </Form.Group>)}
                <Form.Group>
                    <Form.Label>Number of Passengers</Form.Label>
                    <Form.Control 
                            as="select"
                            value={SearchCriteria.NumberOfPax}
                            onChange={handleChange}
                            name="NumberOfPax"
                            required>
                            {Array.from(Array(10),(_,i) => <option key={i}>{i+1}</option>)}
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Price</Form.Label>
                    <Nouislider
                        connect
                        onChange={(selected) => handlePriceSlider(selected)}
                        step={100}
                        tooltips
                        start={Price}
                        range={{
                            min: 0,
                            max: 10000
                        }}/>
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary">
                    Search
                    </Button>
            </Form>)
    }

    return (
        <Tabs activeKey={CurrentTab} onSelect={handleTab}>
            <Tab eventKey="oneWay" title="One Way">
                {getForm(CurrentTab)}
            </Tab>
            <Tab eventKey="return" title="Return">
                {getForm(CurrentTab)}
            </Tab>
        </Tabs>
    )
}