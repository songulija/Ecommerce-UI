import React, { useState, useEffect } from 'react';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { getProduct } from '../redux/actions/productsActions'
import { addToCart } from '../redux/actions/cartActions'
import { useParams } from 'react-router-dom';
import '../styles/productScreenStyle.css'


function ProductScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [userData, setUserData] = useState({});

    //check if user is logged in. getting  userLogin state. getting user state from redux
    const usersReducer = useSelector((state) => state.usersReducer);
    const productDetailsReducer = useSelector((state) => state.productDetailsReducer)
    const { product } = productDetailsReducer;
    const addToWhishlist = (id, qty) => {
        dispatch(addToCart(id, Number(qty)))
        console.log('added')
    }


    useEffect(() => {
        dispatch(getProduct(id, () => { }))
        // dispatch(getProduct(id,() =>{
        //     console.log('je')
        // }))
    }, [dispatch, id, getProduct])

    return (
        <div className='container'>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                {product !== null ?
                    <>
                        <Col lg={6} md={12}>
                            <Image className='product-img' src={product.imagePath} alt={product.title} />
                        </Col>
                        <Col lg={6} md={12}>
                            <Row>
                                <Col md={12} sm={12}>
                                    <ListGroup variant='fluid'>
                                        <ListGroup.Item>
                                            <h3>{product.title}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Description: ${product.description}
                                        </ListGroup.Item>
                                    </ListGroup>

                                </Col>
                                {/* <div style={{ padding: 4 }}></div> */}
                                <Col md={12} sm={12}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Price:
                                                    </Col>
                                                    <Col>
                                                        <strong>{product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status</Col>
                                                    <Col>
                                                        {product.quantity > 0 ? 'In Stock' : 'Out Of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {product.quantity > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col>
                                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {[...Array(product.quantity).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                ))}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item>
                                                <Button onClick={(e) => { addToWhishlist(e) }} className='btn-block' type='button' disabled={product.countInStock === 0}>
                                                    Add To Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>

                                </Col>
                            </Row>
                        </Col>
                    </> : null
                }


            </Row>
        </div>
    )
}

export default ProductScreen