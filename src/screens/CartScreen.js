import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { removeFromCart } from '../redux/actions/cartActions'
import { getProducts, getProduct } from '../redux/actions/productsActions'
// import { withRouter } from 'react-router';

class CartScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartItems: [],
            qty: 0
        }
    }

    getCartItems = () => {
        const cartItemClone = JSON.parse(JSON.stringify(this.props.cart.cartItems))
        const array = [];
        cartItemClone.map((element, index) => {
            // const obj = productsClone.find(p => p.id === element.product)
            this.props.getProduct(element.product, () => {
                if (this.props.productDetailsReducer.product !== null) {
                    const obj = JSON.parse(JSON.stringify(this.props.productDetailsReducer.product))
                    const obj1 = {
                        id: obj.id,
                        title: obj.title,
                        description: obj.description,
                        brandId: obj.brandId,
                        otherBrand: obj.otherBrand,
                        quantity: obj.quantity,
                        price: obj.price,
                        imagePath: obj.imagePath,
                        code: obj.code,
                        lengthWithoutPackaging: obj.lengthWithoutPackaging,
                        widthWithoutPackaging: obj.widthWithoutPackaging,
                        heightWithoutPackaging: obj.heightWithoutPackaging,
                        lengthWithPackaging: obj.lengthWithPackaging,
                        widthWithPackaging: obj.widthWithPackaging,
                        heightWithPackaging: obj.heightWithPackaging,
                        weightGross: obj.weightGross,
                        weightNetto: obj.weightNetto,
                        packagingBoxCode: obj.packagingBoxCode,
                        qty: element.qty
                    }
                    
                    this.setState({
                        cartItems: [...this.state.cartItems,{...obj1}]
                    })
                }

            })
        })
    }

    onDataChange = (id, value) => {
        this.setState({cartItems: this.state.cartItems.map(x => x.id===id?{...x, qty: value}:x)})

    }

    removeFromCartHandler = (id) => {
        this.props.removeFromCart(id)
    }

    componentDidMount() {
        this.getCartItems()
    }
    render() {
        return (
            <>
                <Row>
                    <Col md={8}>
                        <h1>Shopping Cart</h1>
                        {this.state.cartItems.length === 0 ? <h2>You cart is empty<Link to='/'>Go Back</Link></h2> : (
                            <ListGroup variant='flush'>
                                {this.state.cartItems.map(item => (//for each item in cartItems add ListGroup.Item. and we add key=item.product(id) which is id
                                    <ListGroup.Item key={item.id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.imagePath} alt={item.title} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/products/${item.id}`}>{item.title}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ${item.price}
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control as='select' value={item.qty} onChange={(e) => this.onDataChange(item.id, e.target.value)}>
                                                    {[...Array(item.quantity).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))}
                                                </Form.Control>

                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={() =>
                                                    this.removeFromCartHandler(item.id)}>
                                                    X
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Subtotal ({this.state.cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                        items</h2>
                                    ${this.state.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                </Row>
                {/* <p>{JSON.stringify(this.props.productsReducer.products)}</p> */}
                {/* <p>Hello</p> */}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productsReducer: state.productsReducer,
        cart: state.cart,
        productDetailsReducer: state.productDetailsReducer
    }
}


export default connect(mapStateToProps, { getProduct, removeFromCart })(CartScreen)