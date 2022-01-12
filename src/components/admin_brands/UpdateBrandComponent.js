import react, { useState,useEffect } from 'react'
import { Modal, Button, Form, Space, Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

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

function UpdateBrandComponent(props) {
    const [brand, setBrand] = useState({})
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        setBrand(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(brand))
        const postObj = {
            title: clone.title
        }
        const reducerObj = clone;
        props.saveChanges(postObj, reducerObj)
    }
    useEffect(() =>{
        setBrand(props.record)
        console.log(JSON.stringify(props.record))
    },[props.record.id])

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Prekės ženklo atnaujinimas</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }>
                    <Form layout="vertical" id="myForm" name="myForm">
                        <p style={{...textStyle}}>Prekės ženklas</p>
                        <Input  style={{ width: '100%' }} type={'text'} placeholder='Įveskite pavadinimą' value={brand.title} onChange={(e)=> onDataChange(e.target.value, "title")}/>
                    </Form>
                </Modal>
        </>
    )
}

export default UpdateBrandComponent;