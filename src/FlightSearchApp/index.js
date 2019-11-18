import React from 'react';
import '../styles/App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import FlightListView from './Components/FlightListView';

export default function () {
  return <Container fluid>
    <Row>
      <Header />
    </Row>
    <Row>
      <Col sm={3}>
        <SideBar />
      </Col>
      <Col  sm={9}>
        <FlightListView />
      </Col>
    </Row>
  </Container>
}