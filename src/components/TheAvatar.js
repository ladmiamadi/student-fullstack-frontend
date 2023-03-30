import React from 'react';
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

const TheAvatar = ({ firstName , lastName}) => {
    let trim = firstName.trim();

    if(trim.length === 0) {
        return <Avatar icon={<UserOutlined />}/>
    }

    return <Avatar>
        {`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
    </Avatar>
};

export default TheAvatar;