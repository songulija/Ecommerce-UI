import react, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Row, Col, Card, Typography, Popconfirm } from 'antd';
// import {Button} from 'react-bootstrap'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles';
import { PlusOutlined } from '@ant-design/icons';
import { getBrands, createBrand, updateBrand, deleteBrand } from '../../redux/actions/brandsActions'
import { useNavigate } from 'react-router-dom'
import AddBrandComponent from '../../components/admin_brands/AddBrandComponent';
import UpdateBrandComponent from '../../components/admin_brands/UpdateBrandComponent';

const textStyle = {
    fontSize: '14px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
}
const { Text } = Typography;


function AdminBrandsScreen(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addVisibility, setAddVisibility] = useState(false)
    const [updatedRecord, setUpdatedRecord] = useState({
        visibility: false,
        record: null
    })

    const usersReducer = useSelector((state) => state.usersReducer)
    const userInfoReducer = useSelector((state) => state.userInfoReducer)
    const brandsReducer = useSelector((state) => state.brandsReducer)
    //for AddBrandComponent
    const showAddComponent = () => {
        setAddVisibility(true)
        console.log(addVisibility)
    }
    const unshowAddComponent = () => {
        setAddVisibility(false)
    }
    const saveAddedBrand = (postObj) => {
        dispatch(createBrand(postObj))
        unshowAddComponent();
    }
    //for UpdateBrandComponent
    const showUpdateComponent = (record) => {
        // update updatedRecord values.
        setUpdatedRecord(prevState =>({
            ...prevState,
            visibility: true,
            record: record
        }))
        
        console.log('hello' + JSON.stringify(record))

    }
    const unshowUpdateComponent = () => {
        // update only specified updatedRecord obj values.
        setUpdatedRecord(prevState => ({
            ...prevState,
            visibility: false,
            record: null
        }))
    }
    const saveUpdatedBrand = (postObj, reducerObj) => {
        dispatch(updateBrand(postObj, reducerObj))
        unshowUpdateComponent();
    }

    const brandDelete = (id) => {
        dispatch(deleteBrand(id))
    }

    // called on load. if currentUser or role will change 
    //useEffect will be called again
    useEffect(() => {
        if (usersReducer.currentUser !== null && userInfoReducer.role !== null) {
            dispatch(getBrands())
        } else {
            navigate('/')
        }
    }, [usersReducer.currentUser, userInfoReducer.role])

    const columns = [
        {
            title: 'Update',
            width: '25%',
            render: (text, record, index) => {
                return (
                    <Button onClick={(e) => showUpdateComponent(record)}>Atnaujinti</Button>
                )
            }
        },
        {
            title: 'Ištrinti',
            width: '25%',
            render: (text, record, index) => (
                <Popconfirm title="Tikrai ištrinti?" onConfirm={() => brandDelete(record.id)}>
                    <Button type="primary" danger >Ištrinti</Button>
                </Popconfirm>
            )
        },
        {
            title: 'Pavadnimas',
            dataIndex: 'title',
            width: '25%'
        },
        {
            title: 'Meta pavadinimas',
            dataIndex: 'metaTitle',
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
                                    dataSource={brandsReducer.brands}
                                    pagination={{ pageSize: 15 }}
                                    bordered
                                    // scroll={{ x: 'calc(700px + 50%)' }}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={showAddComponent}><PlusOutlined />Pridėti prekės ženklą</Button></Space>)}
                                />
                                {/* <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddWagonModel}><PlusOutlined />Pridėti vagoną</Button></Space> */}
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </div>
            {addVisibility === true ?
                <AddBrandComponent saveChanges={saveAddedBrand} onClose={unshowAddComponent}
                    visible={addVisibility} />
                : null}
            {updatedRecord.visibility === true?
            <UpdateBrandComponent visible={updatedRecord.visibility} record={updatedRecord.record}
            onClose={unshowUpdateComponent} saveChanges={saveUpdatedBrand} />
            :null}
            {/* {updatedRecord.visibility === true ?
                <UpdateBrandComponent visible={updatedRecord.visibility} record={updatedRecord.record}
                    onClose={unshowUpdateComponent} saveChanges={saveUpdatedBrand} />
                : null} */}
        </>
    )
}

export default AdminBrandsScreen;

