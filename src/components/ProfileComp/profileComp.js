import { message, Button, Col, Form, Image, Input, Row, Statistic, Upload, Modal } from "antd"
import { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import "./styles.css"
import { useParams } from "react-router-dom";
import { getUsers, postAvatar, updateUser } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { doUpdateUser } from "../../redux/AuthenReducer/authenReducer";
import LoadingTheme from "../LoadingTheme/loadingTheme";
import TextArea from "antd/es/input/TextArea";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
const ProfileComp = (props) => {
    const [imgUrl, setImgUrl] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [userID, setUserID] = useState("")
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const dispatch = useDispatch()

    const formatter = (value) => <CountUp end={value} separator="," />;
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
            const response = await updateUser(userID, newValues)
            const newUser = await getUsers(`_id=${userID}`)
            dispatch(doUpdateUser({
                avatar: newUser.data.data[0].avatar,
                userName: newUser.data.data[0].username,
                phone: newUser.data.data[0].phone,
                password: newUser.data.data[0].password,
                description: newUser.data.data[0].description
            }))
            if (response.status == 200) {
                setLoading(false)
                message.info("Cập nhật thông tin thành công!")
            }
            else {
                setLoading(false)
                message.info("Vui lòng thử lại sau.")
            }
        }
        catch (err) {
            console.error('Error data:', err);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // Custom formatter to strip non-numeric characters and apply CountUp
    const customFormatter = (value) => {
        return (
            <CountUp
                end={value}
                separator=","
                duration={2}
                formattingFn={(num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num)}
            />
        );
    };

    const [infoForm] = Form.useForm()

    useEffect(() => {
        const fetchUser = async () => {
            setUserID(params.id)
            if (userID) {
                const response = await getUsers(`_id=${userID}`)
                const data = (response.data.data[0])
                setUser(data)
                if (data.avatar) {
                    console.log(data.avatar)
                    setPreviewImage(data.avatar)
                    // setFileList([
                    //     {
                    //         url: user.avatar,
                    //     }
                    // ])
                }
                infoForm.setFieldsValue(data)
            }
        }
        fetchUser()
    }, [userID, imgUrl, fileList])
    if (!user) {
        return <LoadingTheme />
    }
    else
        return (
            <>
                <div className="profile-page">
                    <div className="statistics-section common-wrapper" style={{ marginBottom: "16px" }}>
                        <Statistic className="statistics-item" title="Số lượng đơn hàng"
                            value={user.receiptsQuantity}
                            formatter={formatter} />
                        <Statistic className="statistics-item" title="Tổng thanh toán"
                            value={user.totalPay}
                            formatter={customFormatter}
                        />
                    </div>
                    <div className="profile-form-section common-wrapper">
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

                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        beforeUpload={() => false}
                                        maxCount={1}
                                    >
                                        {user.avatar != "" && fileList.length == 0 ? <img
                                            src={user.avatar}
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
                                <div className="info-section">
                                    <div>
                                        <Form.Item
                                            label="Email"
                                            name="email"

                                            className="tiny-title"

                                        >
                                            <Input disabled placeholder="Email..." />
                                        </Form.Item>
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
                                        </Form.Item>
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
                                        </Form.Item>
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
                                        </Form.Item>
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
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </div>

                                    <Form.Item className="mb-0">
                                        <Button style={{
                                            width: "100%",
                                            // marginTop: "6px"
                                        }} type="primary" htmlType="submit" loading={loading}>
                                            Xác nhận
                                        </Button>
                                    </Form.Item>

                                </div>
                            </div>


                        </Form>
                    </div>
                </div>
            </>
        )
}
export default ProfileComp