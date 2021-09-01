import { Drawer, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React from 'react';

const MenuComp = (props) => {
    return (
        <Drawer placement='left'
            closable={false}
            onClose={props.toggleMenu}
            visible={props.visible}
            mask={true}
            width={200}
        >
            <Menu mode='vertical' defaultSelectedKeys={['1']}
                style={{ height: '100%' }} theme='dark'>
                <Menu.Item key="1" icon={<UserOutlined />} onClick={props.handleMenuItemClick}>
                    Report 1
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={props.handleMenuItemClick}>
                    Report 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />} onClick={props.handleMenuItemClick}>
                    Report 3
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />} onClick={props.handleMenuItemClick}>
                    Report 4
                </Menu.Item>
            </Menu>
        </Drawer>
    )
}
export default MenuComp;