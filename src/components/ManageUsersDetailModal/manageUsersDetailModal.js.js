import { message, Button, Col, Form, Image, Input, Row, Statistic, Upload, Modal } from "antd"
import { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getUsers, postAvatar, updateUser } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { doUpdateUser } from "../../redux/AuthenReducer/authenReducer";
import LoadingTheme from "../LoadingTheme/loadingTheme";
import TextArea from "antd/es/input/TextArea";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
const ManageUsersDetailModal = (props) => {
    const sortBy = useSelector(state => state.manage.sortBy)
    const sortOrder = useSelector(state => state.manage.sortOrder)
    const { isModalOpen, setIsModalOpen, data, handleSort } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => {
                reject(error)
            };
        });
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => { setFileList(newFileList) };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
                cursor: "pointer"
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const onFinish = async (values) => {
        try {
            setLoading(true)
            let newValues = null
            if (fileList[0]) {
                if (fileList[0].originFileObj) {
                    const file = (fileList[0].originFileObj)
                    const storageRef = ref(storage, `files/${file.name}-${v4()}`);
                    const uploadTask = await uploadBytesResumable(storageRef, file);

                    if (uploadTask) {
                        // console.log('Upload task:', uploadTask);

                        // Ensure that snapshot is defined
                        if (uploadTask.task.snapshot && uploadTask.task.snapshot.ref) {
                            const imgUrl = await getDownloadURL(uploadTask.task.snapshot.ref);
                            console.log('Image URL:', imgUrl);

                            newValues = {
                                ...values,
                                avatar: imgUrl
                            }
                        } else {
                            console.error('Snapshot or snapshot.ref is undefined', uploadTask.task.snapshot);
                        }
                    } else {
                        console.error('Upload task is undefined');
                    }
                }
                else {
                    newValues = {
                        ...values,
                        avatar: previewImage
                    }
                }
            }
            else {
                newValues = {
                    ...values,
                    avatar: ""
                }
            }
            const response = await updateUser(data._id, newValues)
            if (data.role == "ADMIN") {
                const newUser = await getUsers(`_id=${data._id}`)

                dispatch(doUpdateUser({
                    avatar: newUser.data.data[0].avatar,
                    userName: newUser.data.data[0].username,
                    phone: newUser.data.data[0].phone,
                    password: newUser.data.data[0].password,
                    description: newUser.data.data[0].description
                }))
            }

            if (response.status == 200) {

                handleSort({ sortBy: sortBy, sortOrder: sortOrder })
                message.info("Cập nhật thông tin thành công!")
            }
            else {

                message.info("Vui lòng thử lại sau.")
            }
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            message.info("Vui lòng thử lại sau.")
            console.error('Error data:', err);
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // Custom formatter to strip non-numeric characters and apply CountUp

    const [infoForm] = Form.useForm()
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        const fetchUser = async (data) => {
            if (data.avatar != "") {
                setPreviewImage(data.avatar)

            }
            else {
                setPreviewImage(null)

            }
            infoForm.setFieldsValue(data)
        }
        if (data) {
            fetchUser(data)
        }

    }, [data, isModalOpen])
    if (!data) {
        return <LoadingTheme />
    }
    else
        return (
            <div>
                <Modal
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <div className="profile-page">
                        <div className="profile-form-section" style={{ marginTop: "0px" }}>
                            <Form
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                layout="vertical"
                                form={infoForm}
                            >
                                <div className="medium-title" style={{ marginBottom: " 16px" }}>
                                    <span>Thông tin tài khoản</span>
                                </div>
                                <div className="form-content">
                                    <div className="upload-section" style={{ marginBottom: "16px" }}>
                                        <div className="tiny-title" style={{ marginBottom: "10px" }}>Avatar:</div>
                                        <Upload
                                            action="https://book-ecommerce-backend.onrender.com/v1/api/user/avatar"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                            beforeUpload={() => false}

                                        >
                                            {data.avatar != "" ? <img
                                                src={data.avatar}
                                                alt="avatar"
                                                style={{
                                                    maxWidth: "90px",
                                                    maxHeight: "90px",
                                                }}
                                            /> : uploadButton}
                                        </Upload>
                                        {previewImage && (
                                            <Image style={{ padding: "0 12px !important" }}
                                                wrapperStyle={{
                                                    display: 'none',
                                                }}
                                                preview={{
                                                    visible: previewOpen,
                                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                                }}
                                                src={previewImage}
                                            />
                                        )}
                                    </div>
                                    <div style={{ flex: "1" }}>
                                        <div>
                                            <Row gutter={[12, 12]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Số lượng đơn hàng"
                                                        name="receiptsQuantity"

                                                        className="tiny-title"
                                                    >
                                                        <Input disabled />
                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Tổng thanh toán"
                                                        name="totalPay"
                                                        className="tiny-title"

                                                    >
                                                        <Input disabled />
                                                    </Form.Item></Col>
                                            </Row>
                                            <Row gutter={[12, 12]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                        className="tiny-title"

                                                    >
                                                        <Input disabled placeholder="Email..." />
                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Số điện thoại"
                                                        name="phone"
                                                        // rules={[
                                                        //     {
                                                        //         required: true,
                                                        //         message: 'Vui lòng nhập số điện thoại!',
                                                        //     },
                                                        // ]}
                                                        className="tiny-title"
                                                    >
                                                        <Input placeholder="Số điện thoại..." />
                                                    </Form.Item></Col>
                                            </Row>
                                            <Row gutter={[12, 12]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Tên người dùng"
                                                        name="username"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Vui lòng nhập tên người dùng!',
                                                            },
                                                        ]}
                                                        className="tiny-title"
                                                    >
                                                        <Input placeholder="Tên người dùng..." />
                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Mật khẩu"
                                                        name="password"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Vui lòng nhập mật khẩu!',
                                                            },
                                                        ]}
                                                        className="tiny-title"
                                                    >
                                                        <Input.Password placeholder="Mật khẩu..." />
                                                    </Form.Item></Col>
                                            </Row>




                                            <Form.Item
                                                label="Mô tả"
                                                name="description"
                                                // rules={[
                                                //     {
                                                //         required: true,
                                                //         message: 'Vui lòng nhập số điện thoại!',
                                                //     },
                                                // ]}
                                                className="tiny-title"
                                            >
                                                <TextArea />
                                            </Form.Item>

                                        </div>

                                        <Form.Item className="mb-0">
                                            <Button style={{
                                                width: "100%",
                                                marginTop: "6px"
                                            }} type="primary" htmlType="submit" loading={loading}>
                                                Xác nhận
                                            </Button>
                                        </Form.Item>

                                    </div>
                                </div>


                            </Form>
                        </div>
                    </div>
                </Modal>

            </div>
        )
}
export default ManageUsersDetailModal