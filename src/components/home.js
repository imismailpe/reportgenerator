import React, { useState } from 'react';
import { Layout } from 'antd';
import HeaderComp from './Header';
const { Header, Content, Footer } = Layout;
const Home = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const handleMenuItemClick = (e) => {
        setIsMenuVisible(false);
    }
    const toggleMenu = () => {
        console.log("inside toggleMenu")
        setIsMenuVisible(!isMenuVisible);
    }
    return (
        <>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                <HeaderComp isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} handleMenuItemClick={handleMenuItemClick} />
            </Header>
            <Content style={{ margin: '24px 16px 0', height: '100%' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    content
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>ismail</Footer>
        </>
    )
}
export default Home;