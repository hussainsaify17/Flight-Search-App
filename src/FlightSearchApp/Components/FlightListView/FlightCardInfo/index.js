import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { getTimeDifference, formatUnit } from "../../../HelperMethods/commonUtilities";

export default (props) => {
    const { flight: { arrivalTime, departureTime, destination, flightNo, name, origin, price }, pax, type, hideBookbtn } = props;

    function renderColumns(val1, val2, style = {}) {
        return (<React.Fragment>
            <b style={style}>{val1}</b><br />
            {val2}
        </React.Fragment>)
    }
    const timeString = getTimeDifference(arrivalTime, departureTime);
    

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        {renderColumns(name, flightNo)}
                    </Col>
                    <Col>
                        {renderColumns(origin, departureTime)}
                    </Col>
                    <Col>
                        {renderColumns(destination, arrivalTime)}
                    </Col>
                    <Col>
                        {renderColumns(`${formatUnit(timeString.hours)}H:${formatUnit(timeString.minutes)}M`, type)}
                    </Col>
                    <Col>
                        {renderColumns(price * pax, null, { color: 'red' })}
                    </Col>
                    {
                        !hideBookbtn &&
                        <Col>
                            <Button variant="danger">Book</Button>
                        </Col>
                    }
                </Row>
            </Card.Body>
        </Card>
    )
}