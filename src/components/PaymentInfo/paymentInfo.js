
import { Button, Form, Input, Radio, Result, Space, Steps, Table, message } from 'antd';
import "./styles.css"
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../../redux/CartReducer/cartReducer';
import { resetBuyNow } from '../../redux/BuyNowReducer/buyNowReducer';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { createReceipt } from '../../services/receiptServices';
import { getUsers, updateUser } from '../../services/userServices';
import { updateProduct } from '../../services/productServices';
const PaymentInfo = (props) => {
    const { type, data, shipment, setStep } = props
    const [payType, setPayType] = useState(0);
    const user = useSelector(state => state.authen.user)
    // console.log(user)
    console.log(data)
    // console.log(type)
    const [form] = useForm()

    const dispatch = useDispatch()

    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setPayType(e.target.value);
    };

    const onFinish = async (e) => {
        if (!e.note) {
            e.note = "Không có ghi chú"
        }
        e.payType = payType
        const bill = {
            products: data,
            receiveInfo: e,
            userId: user.id,
            discount: [],
            totalPay: data.reduce((preSum, curItem) => {
                return preSum + curItem.price * curItem.quantity
            }, 0) + shipment,
            shipPay: shipment,
            status: "Chờ duyệt",
            quantity: data.length
        }
        const response = await createReceipt(bill)

        if (response) {
            if (response.data.data) {
                console.log(response.data.data)
                const userResponse = await getUsers(`_id=${user.id}`)
                if (userResponse) {
                    let currentTotalPay = userResponse.data.data[0].totalPay
                    let currentReceiptsQuantity = userResponse.data.data[0].receiptsQuantity


                    try {
                        let success = 0
                        for (let i = 0; i < data.length; i++) {
                            let updateProductResponse = await updateProduct(data[i]._id, {
                                sold: data[i].sold + data[i].quantity
                            })
                            if (updateProductResponse) {
                                console.log(updateProductResponse)
                                success = success + 1
                            }
                        }
                        if (success == data.length) {
                            const updateUserResponse = await updateUser(user.id, {
                                totalPay: currentTotalPay + bill.totalPay,
                                receiptsQuantity: currentReceiptsQuantity + 1
                            })
                            if (updateUserResponse) {
                                message.info("Đặt hàng thành công!")
                                if (type == 1) {
                                    dispatch(resetCart())
                                }
                                else if (type == 2) {
                                    dispatch(resetBuyNow())
                                }
                                setStep(2)
                            }
                        }
                        else {
                            message.info("Có lỗi xảy ra, xin vui lòng thử lại sau")
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        }



        window.scroll(0, 0)
    }
    const onFinishFailed = () => {

    }
    useEffect(() => {
        form.setFieldsValue({
            name: user.userName,
            phone: user.phone,
        })
    }, [user, form])
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
                                    <Input />
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
                                    <Input />
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
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Ghi chú"
                                    name="note"
                                    className='tiny-title'
                                    initialValue={""}
                                >
                                    <Input.TextArea rows={6} />
                                </Form.Item>
                                <div className='pay-type'>
                                    <div className='medium-title' style={{ marginBottom: "16px" }}>Hình thức thanh toán:</div>
                                    <Radio.Group onChange={onChangeRadio} value={payType}>
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
                            {type == 1 ? (
                                <div className='cart-info-btns' style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <Button style={{ width: "100%" }}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setStep(0)
                                        }}>
                                        Quay lại
                                    </Button>
                                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                        Xác nhận
                                    </Button>
                                </div>
                            ) : (
                                <div className='cart-info-btns' style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <Button style={{ width: "100%" }}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setStep(0)
                                        }}>
                                        Quay lại
                                    </Button>
                                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                        Xác nhận
                                    </Button>
                                </div>)}
                        </div>
                    </Form>
                </div >
                <div className='pay-type-ge992 common-wrapper'>
                    <div className='medium-title' style={{ marginBottom: "16px" }}>Hình thức thanh toán:</div>
                    <Radio.Group onChange={onChangeRadio} value={payType}>
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

export default PaymentInfo