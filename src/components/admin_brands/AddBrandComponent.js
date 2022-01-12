import react, { useState } from 'react'
import { Modal, Button, Form, Space, Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

function AddBrandComponent(props) {
    const [brand, setBrand] = useState({
        title: ""
    })
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
        const postObj = JSON.parse(JSON.stringify(brand))
        props.saveChanges(postObj);
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
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }>
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key={'name'} name="name" label="Prekės ženklas">
                        <Input style={{ width: '100%' }} placeholder='Įveskite pavadinimą' value={brand.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                    </Form.Item>
                </Form>
            </Modal>

        </>

    )
}

export default AddBrandComponent;