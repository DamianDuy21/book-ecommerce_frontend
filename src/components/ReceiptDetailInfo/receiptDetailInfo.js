
import { Button, Form, Input, Radio, Result, Space, Steps, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { createReceipt } from '../../services/receiptServices';
import LoadingTheme from '../LoadingTheme/loadingTheme';
const ReceiptDetailInfo = (props) => {
    const { type, data, shipment, setStep } = props
    const [currentWidth, setCurrentWidth] = useState(window.currentWidth)
    console.log(data)
    const [form] = useForm()
    const onFinish = async (e) => {

    }
    const onFinishFailed = () => {

    }
    useEffect(() => {
        form.setFieldsValue({
            name: data.receiveInfo.name,
            phone: data.receiveInfo.phone,
            address: data.receiveInfo.address,
            note: data.receiveInfo.note
        })

        const handleResize = () => {
            setCurrentWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [currentWidth, form])
    if (!data) {
        return <LoadingTheme />
    }
    else
        return (
            <>
                <div className='cart-info'>
                    <div className='cart-form common-wrapper'>
                        <div className='medium-title' style={{ marginBottom: "8px" }}>Thông tin người nhận</div>
                        <Form
                            layout='vertical'
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                        >
                            <div className='cart-form-section'>
                                <div className='cart-form-info'>
                                    <Form.Item
                                        label="Tên người nhận"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền tên người nhận!',
                                            },
                                        ]}
                                        className='tiny-title cart-form-top-info-item'
                                    >
                                        <Input disabled />
                                    </Form.Item>

                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền số điện thoại!',
                                            },
                                        ]}
                                        className='tiny-title cart-form-top-info-item'
                                    >
                                        <Input disabled />
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ"
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền địa chỉ!',
                                            },
                                        ]}
                                        className='tiny-title'
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ghi chú"
                                        name="note"
                                        className='tiny-title'
                                        initialValue={""}
                                    >
                                        <Input.TextArea disabled rows={6} />
                                    </Form.Item>
                                    <div className='pay-type'>
                                        <div className='medium-title' style={{ marginBottom: "16px" }}>Hình thức thanh toán:</div>
                                        <Radio.Group disabled value={parseInt(data.receiveInfo.payType, 10)}>
                                            <Space direction="vertical">
                                                <Radio value={0}>Thanh toán khi nhận hàng</Radio>
                                                <Radio value={1}>Thanh toán bằng ví Viettel Money</Radio>
                                                <Radio value={2}>Thanh toán bằng ví MoMo</Radio>
                                                <Radio value={3}>Thanh toán bằng ví ZaloPay</Radio>
                                                {/* <Radio value={5}>
                                                More...
                                                {payType === 5 ? (
                                                    <Input
                                                        value={morePayType}
                                                        name='morePayType'
                                                        style={{
                                                            width: 100,
                                                            marginLeft: 10,
                                                        }}
                                                        onChange={onChangeMorePaymentType}
                                                    />
                                                ) : null}
                                            </Radio> */}
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                </div>

                                <div className='cart-info-btns' style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <Button type='primary' style={{ width: "100%", marginTop: window.innerWidth >= 992 || currentWidth >= 992 ? "48px" : "0px" }}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setStep(0)
                                        }}>
                                        Quay lại
                                    </Button>
                                    {/* <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                        Xác nhận
                                    </Button> */}
                                </div>

                            </div>
                        </Form>
                    </div >
                    <div className='pay-type-ge992 common-wrapper'>
                        <div className='medium-title' style={{ marginBottom: "16px" }}>Hình thức thanh toán:</div>
                        <Radio.Group disabled value={parseInt(data.receiveInfo.payType, 10)}>
                            <Space direction="vertical">
                                <Radio value={0}>Thanh toán khi nhận hàng</Radio>
                                <Radio value={1}>Thanh toán bằng ví Viettel Money</Radio>
                                <Radio value={2}>Thanh toán bằng ví MoMo</Radio>
                                <Radio value={3}>Thanh toán bằng ví ZaloPay</Radio>
                                {/* <Radio value={5}>
                                More...
                                {payType === 5 ? (
                                    <Input
                                        value={morePayType}
                                        name='morePayType'
                                        style={{
                                            width: 100,
                                            marginLeft: 10,
                                        }}
                                        onChange={onChangeMorePaymentType}
                                    />
                                ) : null}
                            </Radio> */}
                            </Space>
                        </Radio.Group>
                    </div>
                </div >
            </>
        )
}

export default ReceiptDetailInfo