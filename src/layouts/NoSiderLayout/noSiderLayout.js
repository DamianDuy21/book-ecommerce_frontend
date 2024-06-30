import { useEffect, useState } from 'react';

import { Button, Dropdown, Layout, Menu, Space, message } from 'antd';
import Footer from '../../components/Footer/footer';
import { Outlet } from 'react-router-dom';
import Headerr from '../../components/Header/header';
import SiderMenu from '../../components/SiderMenu/siderMenu';
const { Sider, Content } = Layout;


const NoSiderLayout = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [isOverlay, setIsOverlay] = useState(true);

    const contentStyle = {
        backgroundColor: '#fff',
        width: "100%",
        height: "100%",
    };

    const layoutStyle = {
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        position: "relative"
    };
    useEffect(() => {
        const currentWidth = window.innerWidth
        if (currentWidth >= 992) {
            setCollapsed(false)
            setIsOverlay(false)
        }
        else {
            setCollapsed(true)
            setIsOverlay(true)
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 992) {
                setCollapsed(false)
                setIsOverlay(false)
            }
            else {

                setCollapsed(true)
                setIsOverlay(true)
            }
        })
    }, [])
    return (
        <>

            <Layout style={layoutStyle}>
                <Headerr isOverlay={isOverlay} collapsed={collapsed} setCollapsed={setCollapsed} noSider={1} />
                <Content style={(contentStyle)}>
                    <Outlet />
                </Content>
                <Footer isOverlay={isOverlay} noSider={1} />

            </Layout >

        </>
    )
}
export default NoSiderLayout