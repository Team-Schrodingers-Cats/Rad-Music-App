import Axios from 'axios';
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import {
  Container, Row, Col, Nav, Navbar,
} from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Map from './Add/TestMap';
import Gallery from './Gallery/Gallery';
import Landing from './Landing/Landing';
import SetupProfile from './ProfileSetup/Setup';
import Search from './search/Search';
import Splash from './splash/Splash';

const App = () => {
  const [view, setView] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [genre, setGenre] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['testCookie']);

  useEffect(() => {
    if (cookies.testCookie) {
      setUser(cookies.testCookie.userName);
      if (cookies.testCookie.genreId.length > 0) {
        console.log(genre);
        setGenre(cookies.testCookie.genreId);
      }
      if (!cookies.testCookie.profilePrompt) {
        console.log('false Cookie!');
        setView('Setup');
      }
      setIsLoggedIn(cookies.testCookie.loggedIn);
    }
  }, []);

  const loginRedir = () => {
    // TODO: fix this with react router
    window.location = 'http://localhost:3000/api/oauth/google';
  };

  const renderView = () => {
    if (view === 'Home') {
      return <Landing user={user} genre={genre} />;
    } if (view === 'Add') {
      return <Map />;
    } if (view === 'Search') {
      return <Search />;
    } if (view === 'Gallery') {
      return <Gallery />;
    } if (view === 'Map') {
      return <Map />;
    } if (view === 'Setup') {
      return <SetupProfile setView={setView} setUser={setUser} user={user} setGenre={setGenre} />;
    }
    return <Splash />;
  };

  if (!user) {
    return (
      <div>
        <Splash loginRedir={loginRedir} />
      </div>
    );
  }

  return (
    <div className="Page-JSX-View-Container">
      <div
        as={Container}
        style={{
          // border: 'solid red 2px',
        }}
      >
        <Row>
          <Col xs={10}>
            {/* This is view */}
            <div
              as={Container}
              style={{
                // border: 'solid blue 2px',
                margin: '0 0 auto',
                height: '100%',
              }}
            >
              {renderView()}
            </div>
          </Col>
          <Col xs={2}>
            {/* This is the nav */}
            <div
              as={Container}
              style={{
                // border: 'solid blue 2px',
                height: '90vh',
                backgroundColor: '#313840',
              }}
            >
              <Navbar variant="dark">
                <Nav defaultActiveKey="/home" className="flex-column">
                  {view !== 'Setup' && <Nav.Item style={{ color: '#d2d2d2' }}>{user}</Nav.Item>}
                  <Nav.Link onClick={() => { setView('Add'); }}>Add</Nav.Link>
                  <Nav.Link onClick={() => { setView('Search'); }}>Search</Nav.Link>
                  <Nav.Link onClick={() => { setView('Gallery'); }}>Gallery</Nav.Link>
                  <Nav.Link>Logout</Nav.Link>
                </Nav>
              </Navbar>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default App;
