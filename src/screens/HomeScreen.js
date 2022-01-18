import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap';
import { getProducts } from '../redux/actions/productsActions'
import Product from '../components/Product'
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
// import ProductCarousel from '../components/ProductCarousel.js';
import Meta from '../components/Meta.js';
import '../styles/home.css'
import women1 from '../images/home/women-1.jpg'
import women2 from '../images/home/women-2.jpg'
import males from '../images/home/males.jpg'
import acessoriesImg from '../images/home/acessories.jpg'

function HomeScreen({ match }) {
    //Getting keyword(param) from url. /search/:keyword. we go to HomeScreen so we can get it

    const dispatch = useDispatch();//dispatch function will allow to dispatch actions
    const productsReducer = useSelector((state) => state.productsReducer)
    // const { loading, error, products } = productsReducer;

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <>
            {/* <!-- banner start --> */}
            {/* <section className="banner-section"> */}
            <div className='photos-holder'>
                <img src={women1} alt="Pagrindinė nuotrauka" />
                <div className='categories-container'>
                    {/* <img src={males} alt='Vyru kategorija' />
                    <img src={women2} alt='Moterų kategorija' /> */}
                    <div className="top-categories">
                        <div className='males'>
                            <img src={males} alt='Vyru kategorija' />
                        </div>
                        <div className='females'>
                            <img src={women2} alt='Moterų kategorija' />
                        </div>
                    </div>
                    <div className='accesories-categories'>
                        <img src={acessoriesImg} alt="Aksesuarai"/>
                    </div>


                </div>

            </div>
            {/* </section> */}
            {/* <!-- banner end --> */}
            <Meta />
            {/* {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back </Link>} */}
            <>
                <Row>
                    {productsReducer.products.map((product) =>
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                            {/* <p>hello</p> */}
                        </Col>
                    )}
                </Row>
                {/* <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} /> */}
            </>

        </>
    )
}

export default HomeScreen
