import { FileTextOutlined, SmileOutlined, CheckCircleOutlined, SearchOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Result, Space, Steps, Table } from 'antd';
import { useEffect, useState } from 'react';
import "./styles.css"
import { useNavigate, useParams } from 'react-router-dom';
import PaymentInfo from '../../components/PaymentInfo/paymentInfo';
import PaymentReceipt from '../../components/PaymentReceipt/paymentReceipt';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByRequest } from '../../services/productServices';
import LoadingTheme from '../../components/LoadingTheme/loadingTheme';
import { doAddToBuyNow } from '../../redux/BuyNowReducer/buyNowReducer';
const BuyNowPage = () => {
    const [step, setStep] = useState(0)
    const nav = useNavigate()
    const dispatch = useDispatch()
    const product = useSelector(state => state.buyNow.product)
    const shipment = useSelector(state => state.buyNow.shipment)

    const params = useParams()
    const productId = params.id

    const handleAddToBuyNow = (product) => {
        const productt = {
            _id: product._id,
            thumbnail: product.thumbnail,
            name: product.name,
            price: (product.price - product.price / 100 * product.discount),
            quantity: 1,
            postedBy: product.postedBy,
            discount: product.discount,
            author: product.author,
            sold: product.sold
        }
        dispatch(doAddToBuyNow(productt))
    }
    useEffect(() => {
        const fetchProductById = async () => {
            if (product.length == 0) {
                setStep(2)
            }
            else {
                try {
                    const response = await getProductByRequest(`_id=${productId}`);
                    if (response && Array.isArray(response.data.data)) {
                        handleAddToBuyNow(response.data.data[0])
                    } else {
                        console.error('Unexpected response format', response);
                    }
                } catch (error) {
                    console.error('Error fetching product by ID:', error);
                }
            }

        }
        fetchProductById()
        window.scrollTo(0, 0);
    }, [params.id])
    if (!product) {
        return <LoadingTheme />
    }
    else
        return (

            <>
                <div className='container cart-container'>
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
                    {step == 0 ? (<>
                        {/* type=2 la mua ngay */}
                        <PaymentReceipt type={2} data={product} shipment={shipment} setStep={setStep} />
                    </>) : (<>
                        {step == 1 ? (<>
                            <PaymentInfo type={2} data={product} shipment={shipment} setStep={setStep}
                            />


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
export default BuyNowPage