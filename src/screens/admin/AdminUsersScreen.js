import react, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Row, Col, Card, Typography, Popconfirm, Tag } from 'antd';
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { getUsers, createUser, updateUser, deleteUser } from '../../redux/actions/usersActions'
import AddUserComponent from '../../components/admin_users/AddUserComponent';
import UpdateUserComponent from '../../components/admin_users/UpdateUserComponent';

function AdminUsersScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addVisibility, setAddVisibility] = useState(false)
    const [updatedRecord, setUpdatedRecord] = useState({
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
    const showUpdateComponent = (record) => {
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
    const saveUpdateUser = (postObj, reducerObj) => {
        dispatch(updateUser(postObj, reducerObj))
        unshowUpdateComponent()
        console.log(JSON.stringify(postObj))
        console.log(JSON.stringify(reducerObj))
    }

    const userDelete = (id) => {
        dispatch(deleteUser(id))
    }
    //if currentUser or role changes it will retrigger useEffect
    useEffect(() => {
        if (usersReducer.currentUser !== null && userInfoReducer.role !== null) {
            dispatch(getUsers())
        } else {
            navigate('/')
        }
    }, [usersReducer.currentUser, userInfoReducer.role])
    const columns = [
        {
            title: 'Atnaujinti',
            width: '10%',
            render: (text, record, index) => (
                <Button onClick={(e) => showUpdateComponent(record)}>Atnaujinti</Button>
            )
        },
        {
            title: 'I??trinti',
            width: '10%',
            render: (text, record, index) => (
                <Popconfirm title="Tikrai i??trinti?" onConfirm={() => userDelete(record.id)}>
                    <Button type={'primary'} danger>I??trinti</Button>
                </Popconfirm>
            )
        },
        {
            title: 'Vartotojo vardas',
            dataIndex: 'username',
            width: '20%'
        },
        {
            title: 'Vardas',
            dataIndex: 'firstName',
            width: '20%'
        },
        {
            title: 'Pavard??',
            dataIndex: 'lastName',
            width: '20%'
        },
        {
            title: 'Telefono numeris',
            dataIndex: 'phoneNumber',
            width: '20%'
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
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={showAddComponent}><PlusOutlined />Prid??ti naudotoj??</Button></Space>)}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </div>
            {addVisibility === true ?
                <AddUserComponent visible={addVisibility} onClose={unshowAddComponent}
                    saveChanges={saveAddUser} />
                : null}
            {updatedRecord.visibility === true ?
                <UpdateUserComponent visible={updatedRecord.visibility} record={updatedRecord.record}
                    onClose={unshowUpdateComponent} saveChanges={saveUpdateUser} />
                : null}
        </>
    )
}

export default AdminUsersScreen