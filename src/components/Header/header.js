import { useState, useEffect, useRef } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Button, message } from 'antd';
import { Header } from 'antd/es/layout/layout';
import "./styles.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import AuthenModal from '../AuthenModal/authenModal';
import { useDispatch, useSelector } from 'react-redux';
import { doSignOutAction } from '../../redux/AuthenReducer/authenReducer';
import { doSearchName } from '../../redux/SearchNameReducer/searchNameReducer';
import { updateUser } from '../../services/userServices';

const Headerr = (props) => {
    const { isOverlay, collapsed, setCollapsed, noSider } = props;
    const user = useSelector(state => state.authen.user);
    const productList = useSelector(state => state.cart.productList);
    const isAuthen = useSelector(state => state.authen.isAuthenticated);
    const searchNameReducer = useSelector(state => state.searchName.searchName)
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState(0);
    const [avatar, setAvatar] = useState('');
    const [userOptionsActive, setUserOptionsActive] = useState(false);
    const path = useLocation();
    const pathname = path.pathname;

    const userOptionsRef = useRef(null);
    const userSettingRef = useRef(null);

    const handleSignOut = async () => {
        const updateResponse = await updateUser(user.id, {
            status: "offline",
        })
        if (updateResponse) {
            console.log(updateResponse)
            message.info("Đăng xuất thành công!");
            dispatch(doSignOutAction());
        }
        if (pathname.includes("cart-detail") || pathname.includes("buy-now") || pathname.includes("history")
            || pathname.includes("manage") || pathname.includes("profile")) {
            nav('/');
        }
    }
    useEffect(() => {
        setAvatar(user.avatar);

        const handleClickOutside = (event) => {
            if (
                userOptionsRef.current &&
                !userOptionsRef.current.contains(event.target) &&
                userSettingRef.current &&
                !userSettingRef.current.contains(event.target)
            ) {
                setUserOptionsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [user]);

    const handleUserSettingClick = () => {
        setUserOptionsActive(prevState => !prevState);
    };

    const onSearch = (value, _e, info) => {
        dispatch(doSearchName({
            searchName: ''
        }))
        if (!value) {
            value = "all"
        }
        nav(`searched-products?name=${value}`)
    }
    const onChange = async (e) => {
        const searchName = (e.target.value)
        dispatch(doSearchName({
            searchName: searchName
        }))
    }


    return (
        <>
            <AuthenModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalStatus={modalStatus} setModalStatus={setModalStatus} />
            <Header className="headerStyle">
                <div className='header'>
                    <div className="logo-wrapper">
                        <div className={collapsed ? 'inner-logo' : 'inner-logo1'} onClick={() => {
                            if (pathname !== "/") {
                                nav("/");
                            }
                        }}>Logo</div>
                    </div>
                    <div className='user'>
                        {!isOverlay && !noSider && (
                            <div className='search-bar' data-search-bar>
                                <Search
                                    placeholder="Tên sản phẩm..."
                                    enterButton
                                    onSearch={onSearch}
                                    value={searchNameReducer}
                                    onChange={onChange}
                                />
                            </div>
                        )}
                        {isAuthen && (
                            <>
                                {user.avatar !== "" ? (
                                    <div className='avatar'>
                                        <img className='img-cover' src={`https://book-ecommerce-backend.onrender.com/images/avatar/${avatar}`} />
                                    </div>
                                ) : (
                                    <Avatar className='' shape="square" size={32} icon={<UserOutlined />} />
                                )}
                            </>
                        )}
                        <div className='cart grow-button header-button' onClick={() => {
                            nav("/cart-detail");
                        }}>
                            {productList.length > 0 ?
                                (<Badge size='medium' count={productList.length}>
                                    <ShoppingCartOutlined />
                                </Badge>)
                                : (<ShoppingCartOutlined />)}
                        </div>
                        {!noSider && (
                            <>
                                {isOverlay && (
                                    <Button className='grow-button header-button'
                                        type="text"
                                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                        onClick={() => setCollapsed(!collapsed)}
                                        style={{ backgroundColor: "#fff" }}
                                    />
                                )}
                            </>
                        )}
                        <div ref={userSettingRef} data-user-setting className='user-setting rotate-button' onClick={handleUserSettingClick}>
                            <SettingOutlined style={{ color: "#000" }} />
                            <div className={`user-options ${userOptionsActive ? 'active' : ''}`} data-user-options ref={userOptionsRef}>
                                {isAuthen ? (
                                    user.role == "ADMIN" ? (
                                        <>
                                            <div className='user-option' onClick={() => {
                                                nav(`/profile/${user.id}`);
                                            }}>Hồ sơ</div>
                                            <div className='user-option' onClick={() => {
                                                nav(`/manage`);
                                            }}>Quản lí</div>
                                            <div className='user-option' onClick={() => {
                                                nav(`/history/${user.id}`);
                                            }}>Lịch sử đơn hàng</div>
                                            <div className='user-option' onClick={handleSignOut}>Đăng xuất</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='user-option' onClick={() => {
                                                nav(`/profile/${user.id}`);
                                            }}>Hồ sơ</div>
                                            <div className='user-option' onClick={() => {
                                                nav(`/history/${user.id}`);
                                            }}>Lịch sử đơn hàng</div>
                                            <div className='user-option' onClick={handleSignOut}>Đăng xuất</div>
                                        </>
                                    )

                                ) : (
                                    <>
                                        <div className='user-option' onClick={() => {
                                            setModalStatus(0);
                                            setIsModalOpen(true);
                                        }}>Đăng kí</div>
                                        <div className='user-option' onClick={() => {
                                            setModalStatus(1);
                                            setIsModalOpen(true);
                                        }}>Đăng nhập</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Header>
        </>
    );
};

export default Headerr;
