import react, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Form, Button, Input, Select,Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

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
const {Option} = Select;

function UpdateCategoryComponent(props) {
    const [category, setCategory] = useState({})
    const categoriesReducer = useSelector((state) => state.categoriesReducer)

    const onBack = () => {
        props.onClose()
    }
    const onCancel = () => {
        props.onClose()
    }
    const onDataChange = (value, inputName) => {
        // update category state value based on provided inputName and value. keep what was in prevState
        setCategory(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(category))
        const postObj = {
            parentId: clone.parentId,
            title: clone.title,
            metaTitle: clone.metaTitle,
            content: clone.content
        }
        const reducerObj = clone
        props.saveChanges(postObj, reducerObj)
    }
    //if record id changes it will trigger useEffect
    useEffect(()=>{
       setCategory(props.record) 
    },[props.record.id])

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                visible={props.visible}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti kategoriją</Space>}
                footer={
                    <div>
                        <Button key={"cancelButton"} onClick={onCancel}>Atšaukti</Button>
                        <Button key={'saveButton'} onClick={saveChanges}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout='vertical' id="myform" name='myform'>
                    <p style={{...textStyle}}>Tėvinė kategorija</p>
                    <Select
                        showSearch
                        placeholder="Pasirinkite tėvinę kategoriją"
                        optionFilterProp='children'
                        onChange={(e) => onDataChange(e, "parentId")}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={category.parentId}
                    >
                        {categoriesReducer.categories.map((element, index) => (
                            <Option key={element.id} value={element.id}>{element.title}</Option>
                        ))}
                    </Select>
                    <p style={{...textStyle}}>Pavadinimas</p>
                    <Input style={{width: '100%'}} placeholder='Įveskite pavadinimą' value={category.title} onChange={(e)=>onDataChange(e.target.value,"title")}/>
                    <p style={{...textStyle}}>Meta pavadinimas</p>
                    <Input style={{width: '100%'}} placeholder='Įveskite meta pavadinimą' value={category.metaTitle} onChange={(e)=>onDataChange(e.target.value,"metaTitle")}/>
                    <p style={{...textStyle}}>Aprašas</p>
                    <Input style={{width: '100%'}} placeholder='Įveskite aprašą' value={category.content} onChange={(e)=>onDataChange(e.target.value,"content")}/>
                </Form>

            </Modal>
        </>
    )
}

export default UpdateCategoryComponent