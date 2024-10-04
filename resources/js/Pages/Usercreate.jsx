import {React, useState, useEffect} from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2'

// const onFinish = (values) => {
//     router.post('/user/newuser', values)
// };
// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

export default function Usercreate({buttonName, sendrouter, user}) {
    const { flash, errors } = usePage().props;

    console.log(flash)

    const onFinish = (values) => {
        router.post(sendrouter, values)
        .then(response => {

        })
        .catch(error => {
            
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (flash.message) {
            Swal.fire({
                title: 'Mensagem!',
                text: flash.message,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    }, [flash.message]);

    return (
        <>
            <Form
                // name="basic"
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
                label="Nome"
                name="name"
                initialValue={user?.name ?? ""}
                rules={[
                    {
                    required: true,
                    message: 'Por favor insira seu nome!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                {errors.name && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {errors.name}
                    </div>}

                <Form.Item
                label="Email"
                name="email"
                initialValue={user?.email ?? ""}
                rules={[
                    {
                    required: true,
                    message: 'Por favor insira seu e-mail!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
                {errors.email && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {errors.email}
                    </div>}

                <Form.Item
                label="Senha"
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
                {errors.password && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {errors.password}
                    </div>}

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    {buttonName}
                </Button>
                </Form.Item>
            </Form>
        </>
    )
}
