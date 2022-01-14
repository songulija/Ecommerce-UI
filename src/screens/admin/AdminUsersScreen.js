import react,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Button, Space, Table, Row, Col, Card, Typography, Popconfirm, Tag } from 'antd';
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import {getUsers,createUser,updateUser,deleteUser} from '../../redux/actions/usersActions'

function AdminUsersScreen(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addVisibility,setAddVisibility] = useState(false)
    const [updatedRecord,setUpdatedRecord] = useState({
        visibility: false,
        record: null
    })

    const usersReducer = useSelector((state) => state.usersReducer)
    const userInfoReducer = useSelector((state) => state.userInfoReducer)
    //for AddUserComponent
    const showAddComponent = () => {
        setAddVisibility(true)
    }
    const unshowAddComponent = () => {
        setAddVisibility(false)
    }
    const saveAddUser = (postObj) => {
        dispatch(createUser(postObj))
        unshowAddComponent()
    }
    //for UpdateUserComponent
    const showUpdateComponent = (record)=>{
        setUpdatedRecord(prevState => ({
            ...prevState,
            visibility: true,
            record: record
        }))
    }
    const unshowUpdateComponent = () => {
        setUpdatedRecord(prevState => ({
            ...prevState,
            visibility: false,
            record: null
        }))
    }
    const saveUpdateUser = (postObj,reducerObj)=>{
        dispatch(updateUser(postObj,reducerObj))
        unshowUpdateComponent()
    }
    
    const deleteUser = (id)=>{
        dispatch(deleteUser(id))
    }
    //if currentUser or role changes it will retrigger useEffect
    useEffect(()=>{
        if(usersReducer.currentUser !== null && userInfoReducer.role !== null){
            dispatch(getUsers())
        }else{
            navigate('/')
        }        
    },[usersReducer.currentUser,userInfoReducer.role])
    const columns = [
        {
            title: 'Vartotojo vardas',
            dataIndex: 'username',
            width: '25%'
        },
        {
            title: 'Vardas',
            dataIndex: 'firstName',
            width: '25%'
        },
        {
            title: 'Pavardė',
            dataIndex: 'lastName',
            width: '25%'
        },
        {
            title: 'Telefono numeris',
            dataIndex: 'phoneNumber',
            width: '25%'
        }
        
        
    ]
    return (
        <>
            <div style={{ marginTop: 45, marginBottom: 45 }}>
                <Col span={24} offset={2}>
                    <Row gutter={16}>
                        <Col span={22}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    rowKey="id"
                                    columns={columns}
                                    dataSource={usersReducer.users}
                                    pagination={{ pageSize: 15 }}
                                    bordered
                                    scroll={{ x: 'calc(700px + 50%)' }}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={showAddComponent}><PlusOutlined />Pridėti naudotoją</Button></Space>)}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </div>
        </>
    )
}

export default AdminUsersScreen