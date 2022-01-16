import react, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Form,Row,Col } from 'react-bootstrap'
import { Spin } from 'antd';
import "../styles/login.css";
import { login, getUserData } from '../redux/actions/usersActions'
import { useNavigate,Link } from 'react-router-dom'


function LoginScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const usersReducer = useSelector((state) => state.usersReducer)
    const dataChange = (inputName, value) => {
        //set user to what was in previous state, and change only needed value
        setUser(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();//prevemnt default behaviour when submit button is clicked. preved refresh of page
        //DISPATCH LOGIN action. pass email and password that user typed
        console.log(JSON.stringify(user))
        dispatch(login(user.username, user.password, () =>{
            dispatch(getUserData());
            navigate('/')
        }))
    }
    //we want to redirect if we already logged in
    useEffect(() => {
        if (usersReducer.currentUser !== null) {//if user info exist than means we already are logged in
            navigate('/')//redirect to whatever is in redirect
        } else {
            navigate('/login')
        }
    }, [usersReducer.currentUser, ])

    return (
        <>
            {usersReducer.loading !== false && usersReducer.loading !== undefined ?
                <div style={{ textAlign: 'center' }}>
                    <Spin size="large" />
                </div> : null}
            <div className="login my-auto container-fluid vh-100 vw-100">
                <Form onSubmit={(e)=>submitHandler(e)}>
                    {usersReducer.error ?
                        <Alert key={1} variant={'danger'}>
                            <Alert.Heading>Prisijungimas buvo nesėkmnigas</Alert.Heading>
                            <p>
                                Vartotojo vardas arba slaptažodis buvo įvesti neteisingai.
                                Pabandykite dar kartą.
                            </p>
                        </Alert> : null}
                    <h1 className="h3 mb-3 fw-normal">Prašom prisijungti</h1>
                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Vartotojo vardas</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={user.username}
                            onChange={(e) => dataChange("username",e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Slaptažodis</Form.Label>
                        <Form.Control
                            type="password"
                            value={user.password}
                            onChange={(e) => dataChange("password",e.target.value)}
                        />
                    </Form.Group>
                    <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Prisijungti</button>

                    <Row className='py-3'>
                            <Col>
                                Naujas naudotojas? <Link to={'/register'}>Registracija</Link>
                            </Col>
                        </Row>
                </Form>
            </div>
        </>
    )
}
// get redux states
export default LoginScreen