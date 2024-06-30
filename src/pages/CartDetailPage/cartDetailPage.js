import { FileTextOutlined, SmileOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Result, Space, Steps, Table } from 'antd';
import { useEffect, useState } from 'react';
import "./styles.css"
import { useNavigate } from 'react-router-dom';
import PaymentInfo from '../../components/PaymentInfo/paymentInfo';
import { useSelector } from 'react-redux';
import PaymentReceipt from '../../components/PaymentReceipt/paymentReceipt';
const CartDetailPage = () => {
    const [step, setStep] = useState(0)

    const nav = useNavigate()
    const productList = useSelector(state => state.cart.productList)
    const shipment = useSelector(state => state.cart.shipment)


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (

        <>
            <div className='container cart-container'>
                <div className='steps-2'>
                    <Steps
                        direction='vertical'
                        size='small'
                        current={step}
                        items={[
                            {
                                title: 'Check',
                                icon: <div onClick={() => {
                                    // window.scrollTo(0, 0);
                                    // setStep(0)
                                }}><FileSearchOutlined /></div>,
                            },
                            {
                                title: 'Info',
                                icon: <div onClick={() => {
                                    // window.scrollTo(0, 0);
                                    // setStep(1)
                                }}><FileTextOutlined /></div>,
                            },
                            {
                                title: 'Done',
                                icon: <SmileOutlined />,
                            },
                        ]}
                    />
                </div>
                <div className='steps-1'>
                    <Steps
                        current={step}
                        items={[
                            {
                                title: 'Check',
                                icon: <div onClick={() => {
                                    // window.scrollTo(0, 0);
                                    // setStep(0)
                                }}><FileSearchOutlined /></div>,
                            },
                            {
                                title: 'Info',
                                icon: <div onClick={() => {
                                    // window.scrollTo(0, 0);
                                    // setStep(1)
                                }}><FileTextOutlined /></div>,
                            },
                            {
                                title: 'Done',
                                icon: <SmileOutlined />,
                            },
                        ]}
                    />
                </div>

                {step == 0 ? (<>
                    <PaymentReceipt type={1} data={productList} shipment={shipment} setStep={setStep} />
                </>) : (<>
                    {step == 1 ? (<>
                        <PaymentInfo type={1} data={productList} shipment={shipment} setStep={setStep} />
                    </>) : (<>
                        <div className='cart-info common-wrapper cart-done'>
                            <Result
                                icon={<SmileOutlined />}
                                title="Đơn hàng của bạn đã được tiếp nhận!"
                                extra={<Button onClick={() => {
                                    nav("/")
                                }} type="primary">Tiếp tục mua hàng</Button>}
                            /></div>
                    </>)}

                </>)}



            </div>
        </>
    )
}
export default CartDetailPage