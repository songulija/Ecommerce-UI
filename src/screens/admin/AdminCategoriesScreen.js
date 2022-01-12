import react, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Row, Col, Card, Typography, Popconfirm } from 'antd';
// import {Button} from 'react-bootstrap'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles';
import { PlusOutlined } from '@ant-design/icons';
import { getBrands, createBrand, updateBrand, deleteBrand } from '../../redux/actions/brandsActions'
import { useNavigate } from 'react-router-dom'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../redux/actions/categoriesActions'

function AdminCategoriesScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addVisibility, setAddVisibility] = useState(false)
    const [updatedRecord, setUpdatedRecord] = useState({
        visibility: false,
        record: null
    })

    const usersReducer = useSelector((state) => state.usersReducer)
    const userInfoReducer = useSelector((state) => state.userInfoReducer)
    const categoriesReducer = useSelector((state) => state.categoriesReducer)
    //for AddCategoryComponent
    const showAddComponent = () => {
        setAddVisibility(true)
    }
    const unshowAddComponent = () => {
        setAddVisibility(false)
    }
    const saveAddCategory = (postObj) => {
        dispatch(createCategory(postObj))
        unshowAddComponent()
    }
    //for UpdateCategoryComponent
    const showUpdateComponent = (record) => {
        // updating updateRecord state values
        setUpdatedRecord(prevState => ({
            ...prevState,
            visibility: true,
            record: record
        }))
    }
    const unshowUpdateComponent = () => {
        // updating updateRecord state values
        setUpdatedRecord(prevState => ({
            visibility: false,
            record: null
        }))
    }
    const saveUpdateCategory = (postObj, reducerObj) => {
        dispatch(updateCategory(postObj, reducerObj))
        unshowUpdateComponent()
    }

    const categoryDelete = (id) => {
        dispatch(deleteCategory(id))
    }
    // if currentUser or role changes it will trigger useEffect again
    useEffect(()=>{
        if(usersReducer.currentUser !== null && userInfoReducer.role !== null){
            dispatch(getCategories())
        }else{
            navigate('/')
        }
    },[usersReducer.currentUser,userInfoReducer.role])

    const columns = [
        {
            title: "Update",
            width: '20%',
            render: (text, record, index) => (
                <Button onClick={(e) => showUpdateComponent(record)}>Atnaujinti</Button>
            )
        },
        {
            title: 'Ištrinti',
            witdh: '20%',
            render: (text, record, index) => (
                <Popconfirm title="Tikrai ištrinti?" onConfirm={() => categoryDelete(record.id)}>
                    <Button type="primary" danger >Ištrinti</Button>
                </Popconfirm>
            )
        },
        {
            title: 'Pavadinimas',
            dataIndex: 'title',
            width: '20%',
        },
        {
            title: 'Meta pavadinimas',
            dataIndex: 'metaTitle',
            width: '20%'
        },
        {
            title: 'Tėvo id',
            dataIndex: 'parentId',
            width: 'č0%'
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
                                    dataSource={categoriesReducer.categories}
                                    pagination={{ pageSize: 15 }}
                                    bordered
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={showAddComponent}><PlusOutlined />Pridėti kategoriją</Button></Space>)}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </div>
        </>
    )
}

export default AdminCategoriesScreen