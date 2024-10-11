import {React, useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Head, router, usePage } from '@inertiajs/react';


const Login = ({children}) => {
    const page = usePage()
    const onFinish = (values) => {
        console.log('Success:', values);
        router.post('/auth', {
            _token: page.props.csrf_token,
            email: values.email,
            password: values.password,
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };  
    return (
        <main>

            {/* { flashMssg && <div>{ flashMssg }</div> } */}

            <Head title='Login - ' />
            <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Por favor insira seu usuário!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Por favor insira sua senha!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>

                {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>

        </main>
    )
}

export default Login;