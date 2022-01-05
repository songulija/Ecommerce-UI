import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/usersActions'
import { useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

function Header(props) {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const usersReducer = useSelector((state) => state.usersReducer)
    const userInfoReducer = useSelector((state) => state.userInfoReducer)

    const logoutUser = () => {
        dispatch(logout())
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            
                            {usersReducer.currentUser !== null ?
                                <Button onClick={logoutUser}>Logout</Button> :
                                <Nav.Link href="/login">Login</Nav.Link>}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header