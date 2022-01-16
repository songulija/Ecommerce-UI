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
            <section class="banner-section">

            </section>
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
