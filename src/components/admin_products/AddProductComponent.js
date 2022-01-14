import react, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Input, Modal, Select,Checkbox,InputNumber,Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import { getBrands } from '../../redux/actions/brandsActions'

const {Option} = Select;
function AddProductComponent(props) {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        brandId: 1,
        otherBrand: "",
        quantity: 0,
        price: 0.0,
        costPrice: 0.0,
        isDiscount: false,
        discountPrice: 0.0,
        imageName: "",
        imagePath: "",
        code: "",
        lengthWithoutPackaging: 0.0,
        widthWithoutPackaging: 0.0,
        heightWithoutPackaging: 0.0,
        lengthWithPackaging: 0.0,
        widthWithPackaging: 0.0,
        heightWithPackaging: 0.0,
        weightGross: 0,
        weightNetto: 0,
        packagingBoxCode: ""
    })
    const brandsReducer = useSelector((state) => state.brandsReducer)

    const onBack = () => {
        props.onClose()
    }
    const onCancel = () => {
        props.onClose()
    }
    const onDataChange = (value, inputName) => {
        //update product state value based on provided inputname and value
        setProduct(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(product))
        const postObj = clone;
        props.saveChanges(postObj)
    }
    useEffect(() => {
        dispatch(getBrands())
    }, [])
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują produktą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button id='cancelButton' name='cancelButton' onClick={onCancel}>Atšaukti</Button>
                        <Button id='saveButton' name='saveButton' onClick={saveChanges}>Pridėti</Button>
                    </div>
                }>
                <Form layout={'vertical'} id='myform' name='myform'>
                    <p>Prekės ženklas</p>
                    <Select
                        showSearch
                        placeholder="Pasirinkite prekės ženklą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "brandId")}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={product.brandId}
                        style={{width: '100%'}}
                    >
                        {brandsReducer.brands.map((element, index) => (
                            <Option key={element.id} value={element.id}>{element.title}</Option>
                        ))}
                    </Select>
                    <Form.Item key={"title"} name={'title'} label="Pavadinimas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite pavadinimą' value={product.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                    </Form.Item>
                    <Form.Item key={"description"} name={'description'} label="Aprašas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite aprašą' value={product.description} onChange={(e) => onDataChange(e.target.value, "description")} />
                    </Form.Item>
                    <Form.Item key={"quantity"} name={'quantity'} label="Kiekis">
                        <InputNumber style={{ width: "100%" }} placeholder='Įveskite kiekį' value={product.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    </Form.Item>
                    <Form.Item key={"price"} name={'price'} label="Kaina">
                        <Input style={{ width: "100%" }} placeholder='Įveskite kainą' value={product.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    </Form.Item>
                    <Form.Item key={"costPrice"} name={'costPrice'} label="Savikaina">
                        <Input style={{ width: "100%" }} placeholder='Įveskite savikainą' value={product.costPrice} onChange={(e) => onDataChange(e.target.value, "costPrice")} />
                    </Form.Item>
                    <Form.Item key={"isDiscount"} name={'isDiscount'} label="Nuolaida galioja?">
                        <Input  type={'checkbox'} value={product.isDiscount} onChange={(e) => onDataChange(e.target.checked, "isDiscount")} />
                    </Form.Item>
                    <Form.Item key={"discountPrice"} name={'discountPrice'} label="Kaina su nuolaida">
                        <Input style={{ width: "100%" }} placeholder='Įveskite kainą' value={product.discountPrice} onChange={(e) => onDataChange(e.target.value, "discountPrice")} />
                    </Form.Item>
                    <Form.Item key={"imagePath"} name={'imagePath'} label="Nuotraukos url">
                        <Input style={{ width: "100%" }} placeholder='Įveskite url' value={product.imagePath} onChange={(e) => onDataChange(e.target.value, "imagePath")} />
                    </Form.Item>
                    <Form.Item key={"code"} name={'code'} label="Produkto kodas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite kodą' value={product.code} onChange={(e) => onDataChange(e.target.value, "code")} />
                    </Form.Item>
                    <Form.Item key={"lengthWithoutPackaging"} name={'lengthWithoutPackaging'} label="Ilgis be pakuotės(cm)">
                        <Input style={{ width: "100%" }} placeholder='Įveskite ilgį' value={product.lengthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key={"widthWithoutPackaging"} name={'widthWithoutPackaging'} label="Plotis be pakuotės(cm)">
                        <Input style={{ width: "100%" }} placeholder='Įveskite plotį' value={product.widthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key={"heightWithoutPackaging"} name={'heightWithoutPackaging'} label="Aukštis be pakuotės(cm)">
                        <Input style={{ width: "100%" }} placeholder='Įveskite aukštį' value={product.heightWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key={"lengthWithPackaging"} name={'lengthWithPackaging'} label="Ilgis su pakuotės(cm)">
                        <Input style={{ width: "100%" }} placeholder='Įveskite ilgį' value={product.lengthWithPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithPackaging")} />
                    </Form.Item>
                    <Form.Item key={"widthWithPackaging"} name={'widthWithPackaging'} label="Plotis su pakuotės(cm)">
                        <Input style={{ width: "100%" }} placeholder='Įveskite plotį' value={product.widthWithPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithPackaging")} />
                    </Form.Item>
                    <Form.Item key={"heightWithPackaging"} name={'heightWithPackaging'} label="Aukštis su pakuotės(cm)">
                        <Input style={{ width: "100%" }} placeholder='Įveskite aukštį' value={product.heightWithPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithPackaging")} />
                    </Form.Item>
                    <Form.Item key={"weightGross"} name={'weightGross'} label="Svoris brutto(kg)">
                        <InputNumber style={{ width: "100%" }} placeholder='Įveskite svorį' value={product.weightGross} onChange={(e) => onDataChange(e, "weightGross")} />
                    </Form.Item>
                    <Form.Item key={"weightNetto"} name={'weightNetto'} label="Svoris netto(kg)">
                        <InputNumber style={{ width: "100%" }} placeholder='Įveskite svorį' value={product.weightNetto} onChange={(e) => onDataChange(e, "weightNetto")} />
                    </Form.Item>
                    <Form.Item key={"packagingBoxCode"} name={'packagingBoxCode'} label="Supakavimo dėžės kodas">
                        <Input style={{ width: "100%" }} placeholder='Įveskite kodą' value={product.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddProductComponent