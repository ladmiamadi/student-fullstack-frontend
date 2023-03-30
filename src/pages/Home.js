import React, {useEffect, useState} from 'react';
import {deleteStudent, fetchAllStudents} from "../services/client";
import {Badge, Button, Empty, Input, Popconfirm, Space, Spin, Table, Tag, Radio} from "antd";
import {LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import StudentDrawerForm from "../components/StudentDrawerForm";
import TheAvatar from "../components/TheAvatar";
import {errorNotification, successNotification} from "../components/Notification";

const { Search } = Input;
const Home = () => {
    const [students, setStudents] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer ] = useState(false);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const removeStudent = (studentId, callBack) => {
        deleteStudent(studentId)
            .then(() => {
                successNotification("Student deleted", `Student with id ${studentId} was successfully deleted`);
                callBack();
            })
            .catch(err => {
                console.log(err.response)
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification("There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomLeft")
                });
            });
    }
    const columns = fetchStudents => [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '7%',
            render: (text, student) => <TheAvatar
                                            firstName = {student.firstName}
                                            lastName = {student.lastName}/>
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '10%'
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'firstName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, student) =>
                <Radio.Group>
                    <Popconfirm
                        placement='topRight'
                        title={`Are you sure to delete ${student.firstName}`}
                        onConfirm={() => removeStudent(student.id, fetchStudents)}
                        okText='Yes'
                        cancelText='No'>
                        <Radio.Button value="small">Delete</Radio.Button>
                    </Popconfirm>
                    <Radio.Button value="small">Edit</Radio.Button>
                </Radio.Group>
        }
    ];
    const fetchStudents = () =>
        fetchAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => setFetching(false));

    useEffect(() => {
        console.log("component mounted");
        fetchStudents().then(r => console.log("success"));
    }, []);

    const filterData = (value) => {
        console.log(value)
        setStudents(students.filter((el) => {
            if (value === "") {
                return el;
            }

            else {
                return el.firstName.toLowerCase().includes(value) || el.lastName.toLowerCase().includes(value)
            }
        }));
    }

    if(fetching) {
        return <Spin indicator={antIcon} />
    }

    if(students.length <=0 ) {
        return (
            <>
                <StudentDrawerForm
                    setShowDrawer={setShowDrawer}
                    showDrawer={showDrawer}
                    fetchStudents={fetchStudents}
                />
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="medium" onClick={() => setShowDrawer(!showDrawer)}>
                        New Student
                    </Button>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Space>
            </>

        );
    }

    return (
        <>
            <StudentDrawerForm
                setShowDrawer={setShowDrawer}
                showDrawer={showDrawer}
                fetchStudents={fetchStudents}
            />
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Space
                    direction="horizontal"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="medium" onClick={() => setShowDrawer(!showDrawer)}>
                        New Student
                    </Button>
                    <Tag>Number of students</Tag>
                    <Badge count={students.length} className="site-badge-count-4"/>
                </Space>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={filterData}
                />
                <Table dataSource={students}
                       columns={columns(fetchStudents)}
                       bordered
                       title={() => 'Students List'}
                       pagination={{ pageSize: 50}}
                       scroll={{ y: 240 }}
                       rowKey={ (student) => student.id}
                />
            </Space>
        </>
    );
}

export default Home;