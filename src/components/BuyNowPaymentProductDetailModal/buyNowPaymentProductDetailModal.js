import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doAdjustQuantityProduct } from '../../redux/CartReducer/cartReducer';
import { doAdjustQuantityProductBuyNow } from '../../redux/BuyNowReducer/buyNowReducer';

const BuyNowPaymentProductDetailModal = (props) => {
    const { isModalOpen, setIsModalOpen, data } = props;
    const [form] = Form.useForm();
    const [currentQuantityBuyNow, setCurrentQuantityBuyNow] = useState(data?.quantity ?? 1)
    const dispatch = useDispatch()
    useEffect(() => {
        form.setFieldsValue({
            _id: data?._id,
            name: data?.name,
            author: data?.author,
            price: data?.price,
            quantity: data?.quantity,
        });
        setCurrentQuantityBuyNow(data?.quantity)

    }, [data, form])
    const handleCancelBuyNow = () => {
        setIsModalOpen(false);
        setCurrentQuantityBuyNow(data?.quantity)
    };
    const onFinishFailedBuyNow = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishBuyNow = (event) => {
        setIsModalOpen(false)
        dispatch(doAdjustQuantityProductBuyNow({
            quantity: currentQuantityBuyNow,
            status: ""
        }))
    };
    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancelBuyNow}
            footer={null}
        >
            <Form
                form={form}
                name="buyNowDetailForm"
                onFinishFailed={onFinishFailedBuyNow}
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
                                            disabled={currentQuantityBuyNow == 1}
                                            onClick={() => {
                                                setCurrentQuantityBuyNow(currentQuantityBuyNow - 1)
                                            }}
                                        >
                                            -
                                        </Button>
                                        <input
                                            disabled
                                            type="number"
                                            value={currentQuantityBuyNow}
                                            style={{ width: "80px" }}
                                        />
                                        <Button
                                            disabled={currentQuantityBuyNow == 100}
                                            onClick={() => {
                                                setCurrentQuantityBuyNow(currentQuantityBuyNow + 1)
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
                    <Button style={{ width: "100%" }} type="primary" onClick={onFinishBuyNow}>
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BuyNowPaymentProductDetailModal;
