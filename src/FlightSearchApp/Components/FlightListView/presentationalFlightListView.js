import React from 'react';
import { Accordion, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import FlightCardInfo from './FlightCardInfo';
import { formatUnit } from '../../HelperMethods/commonUtilities';

export default (props) => {
    const { SearchCriteria, ToResults, SearchCompleted, FroResults } = props;
    const showReturnWindow = SearchCriteria.CurrentTab === 'return';

    function renderFlightInfo(flightList, origin, destination) {
        return (
            <React.Fragment>
                <b>{`Results For ${origin} - ${destination}`}</b><br />
                {(flightList.directFlights.length > 0 || flightList.inDirectFlights.length > 0) ?
                    <React.Fragment>
                        <h3>Direct Flights</h3>
                        {
                            // For displaying Direct Flights 
                            flightList.directFlights.map(flight =>
                                <FlightCardInfo
                                    key={flight.flightNo}
                                    flight={flight}
                                    type={'Non-Stop'}
                                    pax={SearchCriteria.NumberOfPax} />)}
                        <br />
                        <h3>Multiple Flights</h3>
                        {
                            // For displaying Indirect/Multiple Flights
                            flightList.inDirectFlights.map((flight, _) =>
                                <Accordion key={_}>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                            <FlightCardInfo
                                                type={''}
                                                pax={SearchCriteria.NumberOfPax}
                                                flight={{
                                                    arrivalTime: flight.connectingFlight.arrivalTime,
                                                    departureTime: flight.mainFlight.departureTime,
                                                    destination: flight.connectingFlight.destination,
                                                    flightNo: 'Hide details',
                                                    name: 'Multiple',
                                                    origin: flight.mainFlight.origin,
                                                    price: flight.mainFlight.price + flight.connectingFlight.price,
                                                }} />
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <FlightCardInfo
                                                    type={''}
                                                    pax={SearchCriteria.NumberOfPax}
                                                    hideBookbtn={true}
                                                    flight={flight.mainFlight} />
                                                <Alert variant={'secondary'}>
                                                    {`Layover Time ${formatUnit(flight.layoverTime.hours)}H:${formatUnit(flight.layoverTime.minutes)}M`}
                                                </Alert>
                                                <FlightCardInfo
                                                    type={''}
                                                    hideBookbtn={true}
                                                    pax={SearchCriteria.NumberOfPax}
                                                    flight={flight.connectingFlight} />
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>)
                        }
                    </React.Fragment>
                    :
                    <h3>No flights available for selected dates..</h3>}
            </React.Fragment>)
    }

    return (
        <Container>
            {SearchCompleted ? (
                <React.Fragment>
                    <Row>
                        <Col>{renderFlightInfo(ToResults, SearchCriteria.Origin, SearchCriteria.Destination)}</Col>
                        {
                            showReturnWindow && <Col>{renderFlightInfo(FroResults, SearchCriteria.Destination, SearchCriteria.Origin)}</Col>
                        }
                    </Row>
                </React.Fragment>) :
                <h3>Please enter input and hit search..!!</h3>
            }
        </Container>
    )
}