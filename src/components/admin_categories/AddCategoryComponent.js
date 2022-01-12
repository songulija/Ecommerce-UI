import react, { useState } from 'react'
import {useSelector} from 'react-redux'
import { Form, Modal, Button, Space, Input, Select } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'

const { Option } = Select;
function AddCategoryComponent(props) {
    const [category, setCategory] = useState({
        parentId: 1,
        title: "",
        metaTitle: "",
        content: ""
    })
    const categoriesReducer = useSelector((state) => state.categoriesReducer)

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        // change category state only one of values based on provided inputName and value
        setCategory(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const postObj = JSON.parse(JSON.stringify(category))
        props.saveChanges(postObj)
    }
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" onClick={saveChanges}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout={'vertical'} id='myform' name='myform'>
                    <p>Tėvinė kategorija</p>
                    <Select
                        showSearch
                        placeholder="Pasirinkite kategoriją"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e,"parentId")}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={category.parentId}
                    >
                        {categoriesReducer.categories.map((element,index)=>(
                            <Option key={element.id} value={element.id}>{element.title}</Option>
                        ))}
                    </Select>

                    <Form.Item key={"title"} name={'title'} label="Pavadinimas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite pavadinimą' value={category.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                    </Form.Item>
                    <Form.Item key={"metatitle"} name={'metatitle'} label="Meta pavadinimas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite pavadinimą' value={category.metaTitle} onChange={(e) => onDataChange(e.target.value, "metaTitle")} />
                    </Form.Item>
                    <Form.Item key={"content"} name={'content'} label="Aprašas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite aprašą' value={category.content} onChange={(e) => onDataChange(e.target.value, "content")} />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default AddCategoryComponent