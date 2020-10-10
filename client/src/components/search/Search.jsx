import React, { useState } from 'react';
import Axios from 'axios';
import {
  Col, Container, Form, Row, Button,
} from 'react-bootstrap';

const Search = () => {
  const [band, setBand] = useState('Nickelback');
  const [date, setDate] = useState('2020-10-10');
  const [venue, setVenue] = useState('The Willow, Willow Street, New Orleans, LA, USA ');
  const [genre, setGenre] = useState('Alternative');

  const getShows = (query, type) => {
    Axios.get('/api/shows/', {
      params: {
        query,
        type,
      },
    });
  };

  return (
    <div className="container-fluid" style={{ margin: 'auto' }}>
      <Container>
        <Row style={{ marginRight: '0px', marginLeft: '0px' }}>
          <Col lg={2}>
            <Row style={{ padding: '10px' }}>
              <div className="add-page-form">
                <Form>
                  <Form.Group as={Row} controlId="formBand">
                    <Col sm={11}>
                      <Form.Control
                        type="text"
                        placeholder="band name"
                        value={band}
                        onChange={(e) => setBand(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formDate">
                    <Col sm={11}>
                      <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formVenue">
                    <Col sm={11}>
                      <Form.Control
                        type="text"
                        placeholder="Venue name"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formGenre">
                    <Col sm={11}>
                      <Form.Control
                        type="text"
                        placeholder="Genre name"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Button
                    as={Row}
                    type="reset"
                    onClick={() => getShows(band, 'band')}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Row>
            <Row>
              <div style={{ border: 'solid 1px green', padding: '10px' }}>
                List of Shows goes here
              </div>
            </Row>
          </Col>
          <Col style={{ padding: '5px' }} lg={10}>
            <div style={{ display: 'block', height: '90vh', width: '50vw' }}>
              <iframe
                style={{ height: '90vh', width: '40vw' }}
                src=""
                allowFullScreen
                title="map"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Search;
