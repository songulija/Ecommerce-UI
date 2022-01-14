import react, { useState, useEffect, cloneElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Input, Modal, Select, Checkbox, InputNumber, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import { getBrands } from '../../redux/actions/brandsActions'

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
function UpdateProductComponent(props) {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({})
    const brandsReducer = useSelector((state) => state.brandsReducer)

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        //set product values based on provided input name & value
        setProduct(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(product))
        const postObj = {
            title: clone.title,
            description: clone.description,
            brandId: clone.brandId,
            otherBrand: clone.otherBrand,
            quantity: clone.quantity,
            price: clone.price,
            costPrice: clone.costPrice,
            isDiscount: clone.isDiscount,
            discountPrice: clone.discountPrice,
            imageName: clone.imageName,
            imagePath: clone.imagePath,
            code: clone.code,
            lengthWithoutPackaging: clone.lengthWithoutPackaging,
            widthWithoutPackaging: clone.widthWithoutPackaging,
            heightWithoutPackaging: clone.heightWithoutPackaging,
            lengthWithPackaging: clone.lengthWithPackaging,
            widthWithPackaging: clone.widthWithPackaging,
            heightWithPackaging: clone.heightWithPackaging,
            weightGross: clone.weightGross,
            weightNetto: clone.weightNetto,
            packagingBoxCode: clone.packagingBoxCode
        }
        const reducerObj = clone;
        props.saveChanges(postObj, reducerObj)
    }
    //if record id is changed it retriggers useEffect
    useEffect(() => {
        dispatch(getBrands())
        setProduct(props.record)
    },[props.record.id])

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti produktą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button id='cancelButton' name='cancelButton' onClick={onCancel}>Atšaukti</Button>
                        <Button id='saveButton' name='saveButton' onClick={saveChanges}>Atnaujinti</Button>
                    </div>
                }>

                <Form layout={'vertical'} id='myform' name='myform'>
                    <p style={{...textStyle}}>Prekės ženklas</p>
                    <Select
                        showSearch
                        placeholder="Pasirinkite prekės ženklą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "brandId")}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={product.brandId}
                        style={{ width: '100%' }}
                    >
                        {brandsReducer.brands.map((element, index) => (
                            <Option key={element.id} value={element.id}>{element.title}</Option>
                        ))}
                    </Select>
                    <p style={{...textStyle}}>Pavadinimas</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite pavadinimą' value={product.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                    <p style={{...textStyle}}>Aprašas</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite aprašą' value={product.description} onChange={(e) => onDataChange(e.target.value, "description")} />
                    <p style={{...textStyle}}>Kiekis</p>
                    <InputNumber style={{ width: "100%" }} placeholder='Įveskite kiekį' value={product.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    <p style={{...textStyle}}>Kaina</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite kainą' value={product.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    <p style={{...textStyle}}>Savikaina</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite savikainą' value={product.costPrice} onChange={(e) => onDataChange(e.target.value, "costPrice")} />
                    <p style={{...textStyle}}>Nuolaida galioja</p>
                    <Input type={'checkbox'} value={product.isDiscount} onChange={(e) => onDataChange(e.target.checked, "isDiscount")} />
                    <p style={{...textStyle}}>Kaina su nuolaida</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite kainą' value={product.discountPrice} onChange={(e) => onDataChange(e.target.value, "discountPrice")} />
                    <p style={{...textStyle}}>Nuotrauka</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite url' value={product.imagePath} onChange={(e) => onDataChange(e.target.value, "imagePath")} />
                    <p style={{...textStyle}}>Produkto kodas</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite kodą' value={product.code} onChange={(e) => onDataChange(e.target.value, "code")} />
                    <p style={{...textStyle}}>Ilgis be pakavimo</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite ilgį' value={product.lengthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithoutPackaging")} />
                    <p style={{...textStyle}}>Plotis be pakavimo</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite plotį' value={product.widthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithoutPackaging")} />
                    <p style={{...textStyle}}>Aukštis be pakavimo</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite aukštį' value={product.heightWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithoutPackaging")} />
                    <p style={{...textStyle}}>Ilgis su pakavimo</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite ilgį' value={product.lengthWithPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithPackaging")} />
                    <p style={{...textStyle}}>Plotis be pakavimo</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite plotį' value={product.widthWithPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithPackaging")} />
                    <p style={{...textStyle}}>Aukštis be pakavimo</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite aukštį' value={product.heightWithPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithPackaging")} />
                    <p style={{...textStyle}}>Svoris brutto</p>
                    <InputNumber style={{ width: "100%" }} placeholder='Įveskite svorį' value={product.weightGross} onChange={(e) => onDataChange(e, "weightGross")} />
                    <p style={{...textStyle}}>Svoris netto</p>
                    <InputNumber style={{ width: "100%" }} placeholder='Įveskite svorį' value={product.weightNetto} onChange={(e) => onDataChange(e, "weightNetto")} />
                    <p style={{...textStyle}}>Supakavimo dėžės kodas</p>
                    <Input style={{ width: "100%" }} placeholder='Įveskite kodą' value={product.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />

                </Form>
            </Modal>
        </>
    )
}

export default UpdateProductComponent