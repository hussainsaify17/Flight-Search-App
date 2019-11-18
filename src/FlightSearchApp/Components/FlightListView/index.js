import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GetFlightData } from '../../HelperMethods/AjaxHelper';
import PresentationalFlightListView from './presentationalFlightListView';
import { getTimeDifference } from "../../HelperMethods/commonUtilities";

function FlightListView(props) {

    const { SearchCriteria } = props;
    const [JsonData, updateJsonData] = useState([]);
    const [ToResults, updateToResults] = useState({});
    const [FroResults, updateFroResults] = useState({});
    const [SearchCompleted, updateSearchCompleted] = useState(false);
    const getDateString = (date) => new Date(date).toDateString();

    useEffect(() => {
        GetFlightData().then(res => {
            updateJsonData(res);
        }).catch(er => console.log(er))
    }, [])



    useEffect(() => {
        function filterDirectFlights(origin, destination, date) {
            let fiteredFlightData = [];

            let directFlights = JsonData.reduce((acc, flight) => {
                if (
                    (flight.origin === origin) &&
                    (flight.destination === destination) &&
                    (getDateString(flight.date) === getDateString(date)) &&
                    (SearchCriteria.Price <= flight.price)) {
                    acc.push(flight)
                }
                else {
                    fiteredFlightData.push(flight);
                }
                return acc;
            }, [])


            let flightsWithSameOriginAndDate = fiteredFlightData.filter(flight =>
                ((flight.origin === origin) && (getDateString(flight.date) === getDateString(date))));

            let flightWithSameDestinationAndDate = fiteredFlightData.filter(flight =>
                ((flight.destination === destination) && (getDateString(flight.date) === getDateString(date))));

            let inDirectFlights = [];

            flightsWithSameOriginAndDate.forEach(originFlight => {
                flightWithSameDestinationAndDate.forEach(destinationFlight => {
                    let timeDiff = getTimeDifference(destinationFlight.departureTime, originFlight.arrivalTime);
                    if ((originFlight.destination === destinationFlight.origin) &&
                        (timeDiff.hours > 0 || (timeDiff.hours >= 0 && timeDiff.minutes > 29)) &&
                        (SearchCriteria.Price <= (originFlight.price + destinationFlight.price))) {
                        inDirectFlights.push({
                            mainFlight: originFlight,
                            connectingFlight: destinationFlight,
                            layoverTime: timeDiff
                        })
                    }
                })
            })

            console.log(inDirectFlights);

            return {
                directFlights,
                inDirectFlights
            }
        }

        if (SearchCriteria.Origin !== "") {
            updateSearchCompleted(true);
        }

        updateToResults(filterDirectFlights(SearchCriteria.Origin, SearchCriteria.Destination, SearchCriteria.DepartureDate));
        updateFroResults(
            (SearchCriteria.CurrentTab === 'return')
                ? filterDirectFlights(SearchCriteria.Destination, SearchCriteria.Origin, SearchCriteria.ReturnDate)
                : { directFlights: [], inDirectFlights: [] });
    }, [JsonData, SearchCriteria]);

    return (<PresentationalFlightListView
        SearchCriteria={SearchCriteria}
        SearchCompleted={SearchCompleted}
        ToResults={ToResults}
        FroResults={FroResults} />)
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(FlightListView)