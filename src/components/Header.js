import { Button } from 'antd';
import React from 'react';
import MenuComp from './MenuComp';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

const HeaderComp = (props) => {
    return (
        <div className='headerContainer'>
            <MenuComp visible={props.isMenuVisible} toggleMenu={props.toggleMenu}
                handleMenuItemClick={props.handleMenuItemClick} />
            <div className='absoluteL'>
                <Button className='menuButton' onClick={props.toggleMenu}
                    icon={<MenuOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}></Button>
            </div>
            <div className='absoluteR'>
                <UserOutlined className='userIconContainer'/>
            </div>
            <div className='headerTitle'>Report Generator</div>

        </div>
    )
}
export default HeaderComp;