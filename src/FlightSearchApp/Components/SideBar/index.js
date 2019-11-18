import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchFlight } from '../../Actions';
import PresentationalSideBar from './presentationalSideBar';

function SideBar(props) {

    const [SearchCriteria, updateSearchCriteria] = useState({
        'Origin': '',
        'Destination': '',
        'DepartureDate': '',
        'ReturnDate': '',
        'NumberOfPax': 1,
        'Price': 0
    });
    const [CurrentTab, updateCurrentTab] = useState('oneWay');
    const [Price, updatePrice] = useState(0);

    function handleSearch(e) {
        e.preventDefault();
        props.searchFlight({ ...SearchCriteria, CurrentTab, Price });
    }

    function handleChange(e) {
        updateSearchCriteria({
            ...SearchCriteria,
            [e.target.name]: e.target.value
        })
    }

    function handlePriceSlider(newPrice) {
        updatePrice(newPrice)
    }

    function handleTab(tab) {
        updateCurrentTab(tab)
    }

    return (
        <React.Fragment>
            <h3>Search</h3>
            <PresentationalSideBar
                handleSearch={handleSearch}
                handleChange={handleChange}
                SearchCriteria={SearchCriteria}
                Price={Price}
                handlePriceSlider={handlePriceSlider}
                CurrentTab={CurrentTab}
                handleTab={handleTab} />
        </React.Fragment>
    )
}

export default connect(null, { searchFlight })(SideBar)