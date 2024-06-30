import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import "./styles.css";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doAdjustQuantityProduct, doRemoveFormCart } from '../../redux/CartReducer/cartReducer';
import CartPaymentProductDetailModal from '../CartPaymentProductDetailModal/cartPaymentProductDetailModal';
import BuyNowPaymentProductDetailModal from '../BuyNowPaymentProductDetailModal/buyNowPaymentProductDetailModal';
import { doAdjustQuantityProductBuyNow } from '../../redux/BuyNowReducer/buyNowReducer';
import { useNavigate } from 'react-router-dom';

const PaymentReceipt = (props) => {
    let { type, data, shipment, setStep } = props;
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const nav = useNavigate()
    const handleViewDetails = (record) => {
        setModalData(record);
        setIsModalOpen(true);
    };

    const handleTotalPay = (data, shipment) => {
        const totalPay = data.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);
        return totalPay + shipment;
    };

    const columnsCart1 = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            render: (text, record, index) => (
                <div className='cart-product-info' onClick={() => { nav(`/product-detail/${record._id}`) }}>
                    <div className='product-name' >
                        <div className='img-wrapper' style={{ width: "40px", marginBottom: "0px" }}>
                            <img className='img-cover' src={record.thumbnail} alt="product" />
                        </div>
                        <div className='small-title'> {record.name}</div>
                    </div>
                    <div className='product-price tiny-title'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price ?? 0)}
                    </div>
                    <div className='product-quantity'>
                        x {record.quantity}
                    </div>
                </div>
            )
        },
        {
            title: '',
            render: (text, record, index) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <Button className='button-1' onClick={() => dispatch(doRemoveFormCart(record))}>
                        <CloseOutlined />
                    </Button>
                    <Button className='button-1' onClick={() => handleViewDetails(record)}>
                        <EyeOutlined />
                    </Button>
                </div>
            )
        }
    ];

    const columnsCart2 = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            render: (text, record, index) => (
                <div className='cart-product-info' onClick={() => { nav(`/product-detail/${record._id}`) }}>
                    <div className='product-name' >
                        <div className='img-wrapper' style={{ width: "40px", marginBottom: "0px" }}>
                            <img className='img-cover' src={record.thumbnail} alt="product" />
                        </div>
                        <div className='small-title'> {record.name}</div>
                    </div>
                    <div className='product-price tiny-title'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price ?? 0)}
                    </div>
                </div>
            )
        },
        {
            title: <div style={{ display: "flex", justifyContent: "center", width: "156px" }}>Số lượng</div>,
            dataIndex: 'quantity',
            render: (text, record, index) => (
                <div className='product-quantity'>
                    <div className="quantity-section">
                        <div className="quantity">
                            <Button
                                disabled={record.quantity === 1}
                                onClick={() => dispatch(doAdjustQuantityProduct({ _id: record._id, quantity: 1, status: "minus" }))}
                            >
                                -
                            </Button>
                            <input
                                disabled
                                type="number"
                                value={record.quantity}
                                style={{ width: "80px" }}
                            />
                            <Button
                                disabled={record.quantity === 100}
                                onClick={() => dispatch(doAdjustQuantityProduct({ _id: record._id, quantity: 1, status: "plus" }))}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '',
            render: (text, record, index) => (
                <Button className='button-1' onClick={() => dispatch(doRemoveFormCart({ _id: record._id }))}>
                    <CloseOutlined />
                </Button>
            )
        }
    ];

    const columnsBuyNow1 = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            render: (text, record, index) => (
                <div className='cart-product-info' onClick={() => { nav(`/product-detail/${record._id}`) }}>
                    <div className='product-name'>
                        <div className='img-wrapper' style={{ width: "40px", marginBottom: "0px" }}>
                            <img className='img-cover' src={record.thumbnail} alt="product" />
                        </div>
                        <div className='small-title'> {record.name}</div>
                    </div>
                    <div className='product-price tiny-title'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price ?? 0)}
                    </div>
                    <div className='product-quantity'>
                        x {record.quantity}
                    </div>
                </div>
            )
        },
        {
            title: '',
            render: (text, record, index) => (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Button className='button-1' onClick={() => handleViewDetails(record)}>
                        <EyeOutlined />
                    </Button>
                </div>
            )
        }
    ];

    const columnsBuyNow2 = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            render: (text, record, index) => (
                <div className='cart-product-info' onClick={() => { nav(`/product-detail/${record._id}`) }}>
                    <div className='product-name'>
                        <div className='img-wrapper' style={{ width: "40px", marginBottom: "0px" }}>
                            <img className='img-cover' src={record.thumbnail} alt="product" />
                        </div>
                        <div className='small-title'> {record.name}</div>
                    </div>
                    <div className='product-price tiny-title'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price ?? 0)}
                    </div>
                </div>
            )
        },
        {
            title: <div style={{ display: "flex", justifyContent: "center", width: "156px" }}>Số lượng</div>,
            dataIndex: 'quantity',
            render: (text, record, index) => (
                <div className='product-quantity'>
                    <div className="quantity-section">
                        <div className="quantity">
                            <Button
                                disabled={record.quantity === 1}
                                onClick={() => dispatch(doAdjustQuantityProductBuyNow({ quantity: 1, status: "minus" }))}
                            >
                                -
                            </Button>
                            <input
                                disabled
                                type="number"
                                value={record.quantity}
                                style={{ width: "80px" }}
                            />
                            <Button
                                disabled={record.quantity === 100}
                                onClick={() => dispatch(doAdjustQuantityProductBuyNow({ quantity: 1, status: "plus" }))}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const columnsEmpty = [];

    useEffect(() => {
        const handleResize = () => {
            setCurrentWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className='cart-info'>
                {modalData && (
                    type === 1 ? (
                        <CartPaymentProductDetailModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            data={modalData}
                        />
                    ) : (
                        <BuyNowPaymentProductDetailModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            data={modalData}
                        />
                    )
                )}
                <div className='cart-form common-wrapper'>
                    <div className='title medium-title' style={{ marginBottom: "8px" }}>Phiếu mua hàng</div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "4px", flexWrap: "wrap", gap: "6px" }}>
                        <div className='tiny-title'>Danh sách sản phẩm</div>
                        <div className='tiny-title'>Số lượng: <span className='medium-title'>{data.length}</span></div>
                    </div>
                    <div className='table'>
                        {type === 1 ? (
                            <Table
                                columns={data.length > 0 ? (currentWidth >= 992 ? columnsCart2 : columnsCart1) : columnsEmpty}
                                dataSource={data}
                                bordered
                                pagination={{
                                    pageSize: 3
                                }}
                            />
                        ) : (
                            <Table
                                columns={data.length > 0 ? (currentWidth >= 992 ? columnsBuyNow2 : columnsBuyNow1) : columnsEmpty}
                                dataSource={data}
                                bordered
                                pagination={{
                                    pageSize: 3
                                }}
                            />
                        )}
                    </div>
                    <div className='tiny-title'>Phiếu giảm giá:</div>
                    <div className='option-buttons'>
                        {/* {[...Array(6)].map((_, index) => (
                            <Button key={index} className='option-button'>-20% (tối đa 80k)</Button>
                        ))} */}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "6px" }}>
                        <div className='ship tiny-title'>Phí vận chuyển: <span className='medium-title'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.length > 0 ? shipment : 0)}
                        </span></div>
                        <div className='total tiny-title'>Tổng hóa đơn: <span className='medium-title'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.length > 0 ? handleTotalPay(data, shipment) : 0)}
                        </span></div>
                    </div>
                    <Button type='primary' disabled={data.length > 0 ? false : true} style={{ width: "100% !important" }} onClick={() => {
                        window.scrollTo(0, 0);
                        setStep(1);
                    }}>Tiếp tục</Button>
                </div>
            </div>
        </>
    );
};

export default PaymentReceipt;
