import react, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Input, Modal, Select, Checkbox, InputNumber, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import { getUserTypes } from '../../redux/actions/userTypesActions'

const { Option } = Select;
const textStyle = {
    fontSize: '18px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
    marginBottom: '4px',
    marginTop: '10px',
    paddingBottom: '5px'
}

function UpdateUserComponent(props) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({})

    const userTypesReducer = useSelector((state) => state.userTypesReducer)
    const onBack = () => {
        props.onClose()
    }
    const onCancel = () => {
        props.onClose()
    }
    const onDataChange = (value, inputName) => {
        //setting values of user depending on provided inputName & value
        setUser(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(user))
        const postObj = {
            typeId: clone.typeId,
            username: clone.username,
            firstName: clone.firstName,
            lastName: clone.lastName,
            phoneNumber: clone.phoneNumber,
            // password: clone.password
        }
        const reducerObj = clone;
        props.saveChanges(postObj, reducerObj)
    }
    //if record id changes it retriggers useEffect
    useEffect(() => {
        setUser(props.record)
        dispatch(getUserTypes())
    },[props.record.id])

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti naudotoją</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button id='cancelButton' name='cancelButton' onClick={onCancel}>Atšaukti</Button>
                        <Button id='saveButton' name='saveButton' onClick={saveChanges}>Pridėti</Button>
                    </div>
                }>
                <Form layout={'vertical'} id='myform' name='myform'>
                    <p>Naudotojo tipas</p>
                    <Select
                        showSearch
                        placeholder="Pasirinkite tipą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "typeId")}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={user.typeId}
                        style={{ width: '100%' }}
                    >
                        {userTypesReducer.userTypes.map((element, index) => (
                            <Option key={element.id} value={element.id}>{element.title}</Option>
                        ))}
                    </Select>
                    <p style={{...textStyle}}>Vartotojo vardas</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite vartotojo vardą' value={user.username} onChange={(e) => onDataChange(e.target.value, "username")} />
                    {/* <p style={{...textStyle}}>Slaptažodis</p>
                    <Input type={'password'} style={{ width: "100%" }} placeholder='Įveskite slaptažodį' value={user.password} onChange={(e) => onDataChange(e.target.value, "password")} /> */}
                    <p style={{...textStyle}}>Vardas</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite naudotojo vardą' value={user.firstName} onChange={(e) => onDataChange(e.target.value, "firstName")} />
                    <p style={{...textStyle}}>Pavardė</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite naudotojo pavardę' value={user.lastName} onChange={(e) => onDataChange(e.target.value, "lastName")} />
                    <p style={{...textStyle}}>Telefono numeris</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite numerį' value={user.phoneNumber} onChange={(e) => onDataChange(e.target.value, "phoneNumber")} />
                </Form>
            </Modal>
        </>
    )
}

export default UpdateUserComponent;