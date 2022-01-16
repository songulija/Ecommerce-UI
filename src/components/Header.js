import React, { useState, useEffect } from 'react'
import { logout } from '../redux/actions/usersActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import logo1Svg from '../images/furnitures/Logo-1.svg'
import searchSvg from '../images/furnitures/Icon-search.svg'
import userSvg from '../images/furnitures/Icon-user.svg'
import bagSvg from '../images/furnitures/Bag.svg'
import logoutSvg from '../images/logout-1.svg'
import '../styles/header.css'

function Header(props) {
    const dispatch = useDispatch();
    const [subMenu, setSubMenu] = useState(null)

    const usersReducer = useSelector((state) => state.usersReducer)
    const userInfoReducer = useSelector((state) => state.userInfoReducer)

    const logoutUser = () => {
        dispatch(logout())
    }

    const onMenuMainClick = (e) => {
        if (e.target.closest(".menu-item-has-children")) {
            const hasChildren = e.target.closest(".menu-item-has-children");
            showSubMenu(hasChildren);
        }
    }

    const toggleMenu = () => {
        const menu = document.querySelector(".menu");

        menu.classList.toggle("active");
        document.querySelector(".menu-overlay").classList.toggle("active");
    }
    const showSubMenu = (hasChildren) => {
        let subMenuClone;
        const menu = document.querySelector(".menu");
        subMenuClone = hasChildren.querySelector(".sub-menu");
        subMenuClone.classList.add("active");
        subMenuClone.style.animation = "slideLeft 0.5s ease forwards";
        const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
        menu.querySelector(".current-menu-title").innerHTML = menuTitle;
        menu.querySelector(".mobile-menu-head").classList.add("active");
        setSubMenu(subMenuClone)
    }

    const hideSubMenu = () => {
        let subMenuClone = subMenu;
        const menu = document.querySelector(".menu");

        subMenuClone.style.animation = "slideRight 0.5s ease forwards";
        setTimeout(() => {
            subMenuClone.classList.remove("active");
        }, 300);
        menu.querySelector(".current-menu-title").innerHTML = "";
        menu.querySelector(".mobile-menu-head").classList.remove("active");
        setSubMenu(subMenuClone)
    }


    return (
        <>
            <div className='first-menu'>
                <div className='logo-container'>
                    <Image className='logo' src={logo1Svg} alt="Logo" />
                    {/* <a href='/'><p>ALTURA</p></a> */}
                    <Nav.Link href="/">
                        <p>ALTURA</p>
                    </Nav.Link>
                </div>
                <div className='icons-container'>
                    <Nav.Link href="/search" style={{ fontWeight: '500', fontSize: '18px' }}>
                        <img src={searchSvg} alt="Paieška" />
                    </Nav.Link>
                    {usersReducer.currentUser !== null ?
                        <div className='user-icons'>
                            <Nav.Link href="/profile" style={{ fontWeight: '500', fontSize: '18px' }}>
                                <img src={userSvg} alt="Profilis" />
                            </Nav.Link>
                            <div className='logout-icon-container' onClick={logoutUser}>
                                <img src={logoutSvg} alt="Atsijungti" />
                            </div>

                        </div>
                        : <Nav.Link href="/login" style={{ fontWeight: '500', fontSize: '18px' }}>
                            <img src={userSvg} alt="Profilis" />
                        </Nav.Link>
                    }

                    <Nav.Link href="/cart" style={{ fontWeight: '500', fontSize: '18px' }}>
                        <img src={bagSvg} alt="Krepšelis" />
                    </Nav.Link>
                </div>
            </div>
            {/* <Navbar bg="light" variant={'light'} expand="lg" collapseOnSelect>
                <Container fluid>
                    <Navbar.Brand href="/" style={{ fontWeight: '600', fontSize: '22px' }}>Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className="me-auto my-2 my-lg-0 py-2"
                        >
                            <Nav.Link href="/" style={{ fontWeight: '500', fontSize: '18px' }}>Pagrindinis</Nav.Link>
                            <Nav.Link href="/about-us" style={{ fontWeight: '500', fontSize: '18px' }}>Apie mus</Nav.Link>
                            {usersReducer.currentUser ? (
                                <NavDropdown title="Admin" id="basic-nav-dropdown" style={{ fontWeight: '500', fontSize: '18px' }}>
                                    <NavDropdown.Item href='/admin/brands'>Prekių Ženklai</NavDropdown.Item>
                                    <NavDropdown.Item href='/admin/categories'>Kategorijos</NavDropdown.Item>
                                    <NavDropdown.Item href='/admin/products'>Produktai</NavDropdown.Item>
                                    <NavDropdown.Item href='/admin/users'>Naudotojai</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <p></p>
                            )}
                            {usersReducer.currentUser ? (
                                <NavDropdown title="Naudotojas" id='username' style={{ fontWeight: '500', fontSize: '18px' }}>
                                    <NavDropdown.Item href="/profile">Profilis</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutUser}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link href="/login" style={{ fontWeight: '500', fontSize: '18px' }}>
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                            )}
                            <Nav.Link href='/cart' style={{ fontWeight: '500', fontSize: '18px' }}>
                                <i className='fas fa-shopping-cart'></i> Cart
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            <header class="header">
                <div class="header-container">
                    <div class="container-row v-center">
                        {/* <div class="header-item item-left">
                            <div class="logo">
                                <a href="#">MyStore</a>
                            </div>
                        </div> */}


                        {/* <!-- menu start here --> */}
                        <div class="header-item item-center">
                            <div class="menu-overlay" onClick={toggleMenu}>
                            </div>
                            <nav class="menu">
                                <div class="mobile-menu-head">
                                    <div class="go-back" onClick={hideSubMenu}><i class="fa fa-angle-left"></i></div>
                                    <div class="current-menu-title"></div>
                                    <div class="mobile-menu-close" onClick={toggleMenu}>&times;</div>
                                </div>
                                <ul class="menu-main" onClick={(e) => onMenuMainClick(e)}>
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li class="menu-item-has-children">
                                        <a href="#">New <i class="fa fa-angle-down"></i></a>
                                        <div class="sub-menu mega-menu mega-menu-column-4">
                                            <div class="list-item text-center">
                                                <a href="#">
                                                    <img src={require("../images/p1.jpg")} alt="new Product" />
                                                    <h4 class="title">Product 1</h4>
                                                </a>
                                            </div>
                                            <div class="list-item text-center">
                                                <a href="#">
                                                    <img src={require("../images/p2.jpg")} alt="new Product" />
                                                    <h4 class="title">Product 2</h4>
                                                </a>
                                            </div>
                                            <div class="list-item text-center">
                                                <a href="#">
                                                    <img src={require("../images/p3.jpg")} alt="new Product" />
                                                    <h4 class="title">Product 3</h4>
                                                </a>
                                            </div>
                                            <div class="list-item text-center">
                                                <a href="#">
                                                    <img src={require("../images/p4.jpg")} alt="new Product" />
                                                    <h4 class="title">Product 4</h4>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="menu-item-has-children">
                                        <a href="#">Shop <i class="fa fa-angle-down"></i></a>
                                        <div class="sub-menu mega-menu mega-menu-column-4">
                                            <div class="list-item">
                                                <h4 class="title">Men's Fashion</h4>
                                                <ul>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                </ul>
                                                <h4 class="title">Beauty</h4>
                                                <ul>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                </ul>
                                            </div>
                                            <div class="list-item">
                                                <h4 class="title">Women's Fashion</h4>
                                                <ul>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                </ul>
                                                <h4 class="title">Furniture</h4>
                                                <ul>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                </ul>
                                            </div>
                                            <div class="list-item">
                                                <h4 class="title">Home, Kitchen</h4>
                                                <ul>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                    <li><a href="#">Product List</a></li>
                                                </ul>
                                            </div>
                                            <div class="list-item">
                                                <img src={require("../images/shop1.jpg")} alt="shop" />
                                            </div>
                                        </div>
                                    </li>
                                    <li class="menu-item-has-children">
                                        <a href="#">Blog <i class="fas fa-angle-down"></i></a>
                                        <div class="sub-menu single-column-menu">
                                            <ul>
                                                <li><a href="#">Standard Layout</a></li>
                                                <li><a href="#">Grid Layout</a></li>
                                                <li><a href="#">single Post Layout</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    {userInfoReducer.role === "ADMINISTRATOR" ?
                                        <li class="menu-item-has-children">
                                            <a href="#">Admin <i class="fas fa-angle-down"></i></a>
                                            <div class="sub-menu single-column-menu">
                                                <ul>
                                                    <li><a href="/admin/brands">Prekių ženklai</a></li>
                                                    <li><a href="/admin/categories">Kategorijos</a></li>
                                                    <li><a href="/admin/products">Produktai</a></li>
                                                    <li><a href="/admin/users">Naudotojai</a></li>
                                                </ul>
                                            </div>
                                        </li> : null}

                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* <!-- menu end here --> */}
                        {/* <Button onClick={logoutUser}>Atsijungti</Button> */}
                        <div class="header-item item-right">
                            {/* {usersReducer.currentUser !== null ?
                                <a href='#'><i onClick={logoutUser} class="fas fa-sign-out-alt"></i></a>
                                : <div>
                                    <a href='/login'>Prisijungti</a>
                                    <a href='/register'>Registruotis</a>
                                </div>
                            } */}

                            {/* <a href="#"><i class="fas fa-search"></i></a> */}
                            {/* <a href="#"><i class="far fa-heart"></i></a> */}
                            {/* <a href="#"><i class="fas fa-shopping-cart"></i></a> */}

                            {/* <!-- mobile menu trigger --> */}
                            <div class="mobile-menu-trigger" onClick={toggleMenu}>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header