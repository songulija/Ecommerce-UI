import react, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Space, Table, Row, Col, Card, Typography, Popconfirm, Tag } from 'antd';
// import {Button} from 'react-bootstrap'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles';
import { PlusOutlined } from '@ant-design/icons';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../redux/actions/productsActions'
import { useNavigate } from 'react-router-dom'
import AddProductComponent from '../../components/admin_products/AddProductComponent';
import UpdateProductComponent from '../../components/admin_products/UpdateProductComponent';


function AdminProductScreen(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addVisibility, setAddVisibility] = useState(false)
    const [updatedRecord, setUpdatedRecord] = useState({
        visibility: false,
        record: null
    })

    const usersReducer = useSelector((state) => state.usersReducer)
    const userInfoReducer = useSelector((state) => state.userInfoReducer)
    const productsReducer = useSelector((state) => state.productsReducer)

    //for AddProductComponent
    const showAddComponent = () => {
        setAddVisibility(true)
    }
    const unshowAddComponent = () => {
        setAddVisibility(false)
    }
    const saveAddProduct = (postObj) => {
        dispatch(createProduct(postObj))
        unshowAddComponent()
    }
    //for UpdateProductComponent
    const showUpdateComponent = (record) => {
        //setting updatedRecord component values 
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
    const saveUpdateProduct = (postObj, reducerObj) => {
        dispatch(updateProduct(postObj, reducerObj))
        unshowUpdateComponent()
    }
    const recordDelete = (id) => {
        dispatch(deleteProduct(id))
    }
    //if currentUser or role values change it retriggers useeffect
    useEffect(() => {
        if (usersReducer.currentUser !== null && userInfoReducer.role !== null) {
            dispatch(getProducts())
        } else {
            navigate('/')
        }
    }, [usersReducer.currentUser, userInfoReducer.role])

    const columns = [
        {
            title: 'Atnaujinti',
            width: '5%',
            render: (text, record, index) => (
                <Button onClick={(e) => showUpdateComponent(record)}>Atnaujinti</Button>
            )
        },
        {
            title: 'Ištrinti',
            dataIndex: 'id',
            width: '5%',
            render: (text, record, index) => (
                <Popconfirm title="Tikrai ištrinti?" onConfirm={() => recordDelete(text)}>
                    <Button type="primary" danger >Ištrinti</Button>
                </Popconfirm>
            )
        },
        {
            title: 'Pavadinimas',
            dataIndex: 'title',
            width: '5%'
        },
        {
            title: 'Prekės ženklas',
            dataIndex: 'brand',
            width: '5%',
            render: (text, record, index) => (
                <Typography.Text>{text.title}</Typography.Text>
            )
        },
        {
            title: 'Kitas prekės ženklas',
            dataIndex: 'otherBrand',
            width: '5%'
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '5%'
        },
        {
            title: 'Kaina',
            dataIndex: 'price',
            width: '5%'
        },
        {
            title: 'Savikaina',
            dataIndex: 'costPrice',
            width: '5%'
        },
        {
            title: 'Nuolaida',
            dataIndex: 'isDiscount',
            width: '5%',
            render: (text, record, index) => (
                <Tag color={text === false ? 'volcano' : 'green'} key={text}>
                    {text === false ? 'NĖRA' : 'YRA'}
                </Tag>
            )
        },
        {
            title: 'Kaina su nuolaida',
            dataIndex: 'discountPrice',
            width: '5%',
            render: (text, record, index) => (
                <Tag color={record.isDiscount === false ? 'volcano' : 'green'} key={text}>
                    {text}
                </Tag>
            )
        },
        {
            title: 'Nuotrauka',
            dataIndex: 'imagePath',
            width: '5%'
        },
        {
            title: 'Produkto kodas',
            dataIndex: 'code',
            width: '5%'
        },
        {
            title: 'Ilgis be pakuotės(cm)',
            dataIndex: 'lengthWithoutPackaging',
            width: '5%'
        },
        {
            title: 'Plotis be pakuotės(cm)',
            dataIndex: 'widthWithoutPackaging',
            width: '5%'
        },
        {
            title: 'Aukštis be pakuotės(cm)',
            dataIndex: 'heightWithoutPackaging',
            width: '5%'
        },
        {
            title: 'Ilgis su pakuotę(cm)',
            dataIndex: 'lengthWithPackaging',
            width: '5%'
        },
        {
            title: 'Plotis su pakuotę(cm)',
            dataIndex: 'widthWithPackaging',
            width: '5%'
        },
        {
            title: 'Aukštis su pakuotę(cm)',
            dataIndex: 'heightWithPackaging',
            width: '5%'
        },
        {
            title: 'Svoris brutto',
            dataIndex: 'weightGross',
            width: '5%'
        },
        {
            title: 'Svoris netto',
            dataIndex: 'weightNetto',
            width: '5%'
        },
        {
            title: 'Supakavimo dėžės kodas',
            dataIndex: 'packagingBoxCode',
            width: '5%'
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
                                    dataSource={productsReducer.products}
                                    pagination={{ pageSize: 15 }}
                                    bordered
                                    scroll={{ x: 'calc(700px + 50%)' }}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={showAddComponent}><PlusOutlined />Pridėti produktą</Button></Space>)}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </div>
            {addVisibility === true ?
                <AddProductComponent visible={addVisibility} onClose={unshowAddComponent}
                    saveChanges={saveAddProduct} />
                : null}
            {updatedRecord.visibility === true ?
                <UpdateProductComponent record={updatedRecord.record} visible={updatedRecord.visibility}
                    onClose={unshowUpdateComponent} saveChanges={saveUpdateProduct} />
                : null}
        </>
    )

}

export default AdminProductScreen