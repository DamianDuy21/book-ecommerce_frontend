import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { doAdjustQuantityProduct } from "../../redux/CartReducer/cartReducer";
import { updateProduct } from "../../services/productServices";

const ReceiptDetailProductDetailModal = (props) => {
  const { isModalOpen, setIsModalOpen, data, type } = props;

  const [form] = Form.useForm();
  const [currentQuantityCart, setCurrentQuantityCart] = useState(
    data?.quantity ?? 1
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue({
      _id: data?._id,
      name: data?.name,
      price: data?.price,
      quantity: data?.quantity,
      author: data?.author,
      sold: data?.sold,
      discount: data?.discount,
    });
    setCurrentQuantityCart(data?.quantity);
  }, [data, form]);
  const handleCancelCart = () => {
    setIsModalOpen(false);
    setCurrentQuantityCart(data?.quantity);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (e) => {
    console.log(e);
    setLoading(true);
    const newProduct = {
      name: e.name,
      author: e.author,
      price: e.price,
      discount: e.discount,
    };
    const response = await updateProduct(data?._id, newProduct);
    if (response.data) {
      console.log(response.data);
      message.info("Cập nhật sản phẩm thành công");
    } else {
      message.info("Có lỗi xảy ra, xin thử lại sau");
    }
    setLoading(false);
  };
  if (data)
    return (
      <Modal open={isModalOpen} onCancel={handleCancelCart} footer={null}>
        {type == "manageModal" ? (
          <Form
            form={form}
            name="cartDetailForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="form"
            layout="vertical"
          >
            <Row gutter={[12, 0]}>
              <Col span={8} style={{ margin: "auto 0" }}>
                <Form.Item name="image">
                  <div className="img-wrapper" style={{ marginBottom: "0px" }}>
                    <img className="img-cover" src={data.thumbnail} />
                  </div>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="Tên sản phẩm"
                  name="name"
                  className="tiny-title"
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Tác giả" name="author" className="tiny-title">
                  <Input />
                </Form.Item>
                <Form.Item label="Giá" name="price" className="tiny-title">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Giảm giá (%)"
                  name="discount"
                  className="tiny-title"
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Đã bán" name="sold" className="tiny-title">
                  <Input disabled />
                </Form.Item>
                <Form.Item className="mb-0">
                  <Button
                    style={{
                      width: "100%",
                      marginTop: "6px",
                    }}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Xác nhận
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form
            form={form}
            name="cartDetailForm"
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="form"
            layout="vertical"
          >
            <Row gutter={[12, 0]}>
              <Col span={8} style={{ margin: "auto 0" }}>
                <Form.Item name="image">
                  <div className="img-wrapper" style={{ marginBottom: "0px" }}>
                    <img className="img-cover" src={data.thumbnail} />
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
                <Form.Item label="Tác giả" name="author" className="tiny-title">
                  <Input value={data?.author} disabled />
                </Form.Item>
                <Form.Item label="Giá" name="price" className="tiny-title">
                  <Input value={data?.price} disabled />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12, 12]}>
              <Col span={8}></Col>
              <Col span={16}>
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>
                  Số lượng
                </div>
                <div className="product-quantity">
                  <div className="quantity-section">
                    <div className="quantity">
                      <input
                        disabled
                        type="number"
                        value={currentQuantityCart}
                        style={{ width: "80px", height: "32px" }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    );
};

export default ReceiptDetailProductDetailModal;
