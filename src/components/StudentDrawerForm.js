import React, {useState} from 'react';
import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {addNewStudent} from "../services/client";
import {LoadingOutlined} from "@ant-design/icons";
import {errorNotification, successNotification} from "./Notification";

const {Option} = Select;

function StudentDrawerForm({ showDrawer, setShowDrawer, fetchStudents }) {
    const onCLose = () => setShowDrawer(false);

    const [submitting, setSubmitting] = useState(false);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const onFinish = student => {
        setSubmitting(true);

        addNewStudent(student)
           .then(() => {
               console.log("student successfully added");
               onCLose();
               successNotification(
                   "student successfully added",
                   `The student ${student.firstName} ${student.lastName} was added to database`
               );
               fetchStudents();
           })
            .catch(err => {
                console.log(err.response)
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification("There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomLeft")
                });
            }).finally(() => fetchStudents(false));
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onCLose}
        open={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student first name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{required: true, message: 'Please enter student last name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;