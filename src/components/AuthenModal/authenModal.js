import { Modal, Button, Checkbox, Divider, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { doSignInAction } from "../../redux/AuthenReducer/authenReducer";
import { authenUserSignIn, authenUserSignUp, createUser, updateUser } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthenModal = (props) => {
    const { isModalOpen, setIsModalOpen, modalStatus, setModalStatus } = props;
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [signInForm] = Form.useForm();
    const [signUpForm] = Form.useForm();
    const [loadingSignIn, setLoadingSignIn] = useState(false);
    const [loadingSignUp, setLoadingSignUp] = useState(false);

    const handleCancel = () => {
        console.log("Modal closed");
        setIsModalOpen(false);
        signUpForm.resetFields();
        signInForm.resetFields();
        setLoadingSignIn(false);
        setLoadingSignUp(false);
    };

    const onFinishSignUp = async (values) => {
        try {
            setLoadingSignUp(true);
            const newValues = {
                phone: "",
                avatar: "",
                status: "offline",
                ...values
            };
            console.log("New values:", newValues);
            const response = await authenUserSignUp(values);
            const data = response.data.data;
            if (data.length > 0) {
                setLoadingSignUp(false);
                message.info("Email này đã được đăng kí");
            } else {
                const res = await createUser(newValues);
                if (res) {
                    message.info("Đăng kí thành công!");
                    signUpForm.resetFields();
                    console.log("Sign-up form fields have been reset.");
                    setLoadingSignUp(false);
                    setModalStatus(1);
                }
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setLoadingSignUp(false);
        }
    };

    const onFinishSignIn = async (values) => {
        try {
            setLoadingSignIn(true);
            const response = await authenUserSignIn(values);
            const newResponse = response.data;
            if (newResponse.data.length > 0) {
                const user = newResponse.data[0];
                const updateResponse = await updateUser(user._id, {
                    status: "online",
                })

                if (updateResponse) {
                    setLoadingSignIn(false);
                    signInForm.resetFields();
                    setIsModalOpen(false);
                    message.info("Đăng nhập thành công!");
                }
                dispatch(doSignInAction({
                    "email": user.email,
                    "phone": user.phone,
                    "userName": user.username,
                    "role": user.role,
                    "avatar": user.avatar,
                    "id": user._id,
                    "status": "online",
                    "description": user.description
                }));


                // nav("/");
            } else {
                setLoadingSignIn(false);
                message.info("Vui lòng kiểm tra lại thông tin!");
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setLoadingSignIn(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {modalStatus === 0 ? (
                <Form
                    name="signUpForm"
                    form={signUpForm}
                    onFinish={onFinishSignUp}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="form"
                    layout="vertical"
                >
                    <div className="form-title">
                        <span>Đăng kí</span>
                    </div>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                        className="tiny-title"
                    >
                        <Input placeholder="Email..." />
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
                    <Form.Item className="mb-0">
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={loadingSignUp}>
                            Đăng kí
                        </Button>
                    </Form.Item>
                    <Divider>or</Divider>
                    <Button style={{ width: "100%", marginBottom: "6px" }} onClick={() => { setModalStatus(1); }}>
                        Bạn đã có tài khoản?
                    </Button>
                </Form>
            ) : (
                <Form
                    name="signInForm"
                    form={signInForm}
                    onFinish={onFinishSignIn}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="form"
                    layout="vertical"
                >
                    <div className="form-title">
                        <span>Đăng nhập</span>
                    </div>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                        className="tiny-title"
                    >
                        <Input placeholder="Email..." />
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
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Ghi nhớ</Checkbox>
                    </Form.Item>
                    <Form.Item className="mb-0">
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={loadingSignIn}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <Divider>or</Divider>
                    <Button style={{ width: "100%", marginBottom: "6px" }} onClick={() => { setModalStatus(0); }}>
                        Bạn chưa có tài khoản?
                    </Button>
                </Form>
            )}
        </Modal>
    );
};

export default AuthenModal;
