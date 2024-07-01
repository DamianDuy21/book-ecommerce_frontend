import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doAdjustQuantityProduct } from '../../redux/CartReducer/cartReducer';

const CartPaymentProductDetailModal = (props) => {
    const { isModalOpen, setIsModalOpen, data } = props;
    const [form] = Form.useForm();
    const [currentQuantityCart, setCurrentQuantityCart] = useState(data?.quantity ?? 1)
    const dispatch = useDispatch()
    useEffect(() => {
        form.setFieldsValue({
            _id: data?._id,
            name: data?.name,
            author: data?.author,
            price: data?.price,
            quantity: data?.quantity,
        });
        setCurrentQuantityCart(data?.quantity)

    }, [data, form])
    const handleCancelCart = () => {
        setIsModalOpen(false);
        setCurrentQuantityCart(data?.quantity)
    };
    const onFinishFailedCart = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishCart = (event) => {
        setIsModalOpen(false)
        dispatch(doAdjustQuantityProduct({
            _id: data?._id,
            quantity: currentQuantityCart,
            status: ""
        }))
    };
    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancelCart}
            footer={null}
        >
            <Form
                form={form}
                name="cartDetailForm"
                onFinishFailed={onFinishFailedCart}
                autoComplete="off"
                className="form"
                layout="vertical"
            >
                <Row gutter={[12, 0]}>
                    <Col span={8} style={{ margin: "auto 0" }}>
                        <Form.Item name="image">
                            <div className='img-wrapper' style={{ marginBottom: "0px" }}>
                                <img className='img-cover' src={data.thumbnail} />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            className="tiny-title"
                        >
                            <Input value={data?.name} disabled />
                        </Form.Item>
                        <Form.Item
                            label="Tác giả"
                            name="author"
                            className="tiny-title"
                        >
                            <Input value={data?.author} disabled />
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="price"
                            className="tiny-title"
                        >
                            <Input value={data?.price} disabled />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[12, 12]}>
                    <Col span={8}></Col>
                    <Col span={16}>
                        <Form.Item
                            label="Số lượng:"
                            name="quantity"
                            className="tiny-title"
                        >
                            <div className='product-quantity'>
                                <div className="quantity-section">
                                    <div className="quantity">
                                        <Button
                                            disabled={currentQuantityCart == 1}
                                            onClick={() => {
                                                setCurrentQuantityCart(currentQuantityCart - 1)
                                            }}
                                        >
                                            -
                                        </Button>
                                        <input
                                            disabled
                                            type="number"
                                            value={currentQuantityCart}
                                            style={{ width: "80px" }}
                                        />
                                        <Button
                                            disabled={data?.quantity == 100}
                                            onClick={() => {
                                                setCurrentQuantityCart(currentQuantityCart + 1)
                                            }}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item className="mb-0">
                    <Button style={{ width: "100%" }} type="primary" onClick={onFinishCart}>
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CartPaymentProductDetailModal;
