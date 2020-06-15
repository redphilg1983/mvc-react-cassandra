import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>Vote for Films, TV, and Games</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Home
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/counter'}>
                            <NavItem>
                                <Glyphicon glyph='education' /> Counter
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/fetchdata'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Fetch data
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/films'}>
                            <NavItem>
                                <Glyphicon glyph='film' /> Films
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/tv'}>
                            <NavItem>
                                <Glyphicon glyph='facetime-video' /> TV Shows
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/games'}>
                            <NavItem>
                                <Glyphicon glyph='triangle-right' /> Games
              </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
