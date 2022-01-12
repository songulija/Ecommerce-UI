import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/usersActions'
import { useNavigate, Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, Dropdown, Row, Col } from 'react-bootstrap'
import '../styles/header.css'
function Header(props) {
    const dispatch = useDispatch();
    const [subMenu,setSubMenu] = useState(null)


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
            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
            </Navbar> */}
            {/* header start   */}
            {/* <!-- header start --> */}
            {/* <div className='main'> */}
            {/* <!-- header start --> */}
            <header class="header">
                <div class="container">
                    <div class="container-row v-center">
                        <div class="header-item item-left">
                            <div class="logo">
                                <a href="#">MyStore</a>
                            </div>
                        </div>
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
                                        <a href="#">Home</a>
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
                                    <li class="menu-item-has-children">
                                        <a href="#">Pages <i class="fas fa-angle-down"></i></a>
                                        <div class="sub-menu single-column-menu">
                                            <ul>
                                                <li><a href="#">Login</a></li>
                                                <li><a href="#">Register</a></li>
                                                <li><a href="#">Faq</a></li>
                                                <li><a href="#">404 Page</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* <!-- menu end here --> */}
                        <div class="header-item item-right">
                            <a href="#"><i class="fas fa-search"></i></a>
                            <a href="#"><i class="far fa-heart"></i></a>
                            <a href="#"><i class="fas fa-shopping-cart"></i></a>
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