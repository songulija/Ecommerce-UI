import react, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Input, Modal, Select, Checkbox, InputNumber, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import { getUserTypes } from '../../redux/actions/userTypesActions'

const { Option } = Select;
function AddUserComponent(props) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        typeId: 2,
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        phoneNumber: ""
    })

    const userTypesReducer = useSelector((state) => state.userTypesReducer)
    const onBack = () => {
        props.onClose()
    }
    const onCancel = () => {
        props.onClose()
    }
    const onDataChange = (value, inputName) => {
        // changing user values depending on provided inputName & value
        setUser(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const postObj = JSON.parse(JSON.stringify(user));
        props.saveChanges(postObj)
    }
    useEffect(() => {
        dispatch(getUserTypes())
    }, [])
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują naudotoją</Space>}
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
                    <Form.Item key={"username"} name={'username'} label="Vartotojo vardas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite vartotojo vardą' value={user.username} onChange={(e) => onDataChange(e.target.value, "username")} />
                    </Form.Item>
                    <Form.Item key={'password'} name={'password'} label="Slaptažodis">
                        <Input type={'password'} style={{ width: "100%" }} placeholder='Įveskite slaptažodį' value={user.password} onChange={(e) => onDataChange(e.target.value, "password")} />
                    </Form.Item>
                    <Form.Item key={"firstName"} name={'firstName'} label="Vardas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite naudotojo vardą' value={user.firstName} onChange={(e) => onDataChange(e.target.value, "firstName")} />
                    </Form.Item>
                    <Form.Item key={"lastName"} name={'lastName'} label="Pavardė">
                        <Input style={{ width: "100%" }} placeholder='Įveskite naudotojo pavardę' value={user.lastName} onChange={(e) => onDataChange(e.target.value, "lastName")} />
                    </Form.Item>
                    <Form.Item key={"phoneNumber"} name={'phoneNumber'} label="Telefono numeris">
                        <Input style={{ width: "100%" }} placeholder='Įveskite numerį' value={user.phoneNumber} onChange={(e) => onDataChange(e.target.value, "phoneNumber")} />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )

}

export default AddUserComponent