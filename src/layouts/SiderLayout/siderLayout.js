import { useEffect, useState } from 'react';

import { Button, Dropdown, Layout, Menu, Space, message } from 'antd';
import Footer from '../../components/Footer/footer';
import { Outlet } from 'react-router-dom';
import Headerr from '../../components/Header/header';
import SiderMenu from '../../components/SiderMenu/siderMenu';
const { Sider, Content } = Layout;


const SiderLayout = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [isOverlay, setIsOverlay] = useState(true)

    const contentStyle = {
        backgroundColor: '#fff',
        width: "100%",
        height: "100%",
    };
    const contentStyle2 = {
        backgroundColor: '#fff',
        width: "100%",
        height: "100%",
        paddingLeft: "200px"
    }
    const siderStyle = {
        backgroundColor: '#fff',
        position: "fixed",
        zIndex: "998",
        top: "64px",
        bottom: "-52px",
    };


    const layoutStyle = {
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        position: "relative"
    };
    const overLay = document.querySelector("[data-overlay]")
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
                <Headerr isOverlay={isOverlay} collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout style={{ position: "relative" }}>
                    <Sider style={siderStyle} trigger={null}
                        collapsible
                        collapsed={collapsed}
                        collapsedWidth={0}
                    >
                        <SiderMenu isOverlay={isOverlay} setCollapsed={setCollapsed} />
                    </Sider>
                    <Content style={isOverlay ? (contentStyle) : (contentStyle2)}>
                        <Outlet />
                    </Content>
                </Layout>

                <Footer isOverlay={isOverlay} />
                {collapsed ? (<></>) : (<>
                    {
                        isOverlay ? (<>
                            <div className='overlay' data-overlay onClick={() => {
                                setCollapsed(true)
                            }}></div></>) : (<></>)
                    }
                </>)}

            </Layout >

        </>
    )
}
export default SiderLayout