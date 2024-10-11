import { React, useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Usercreateoredit = ({buttonName, title, sendrouter, user, passRequired, buttonForm}) => {
    const { flash, errors } = usePage().props;
    const page = usePage();

    // Begin Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    // End modal

    const onFinish = (values) => {
        router.post(sendrouter, {
            _token: page.props.csrf_token,
            name: values.name,
            email: values.email,
            password: values.password,
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Ações após a inserção: exibir modal resposta e fechar o formulário
    useEffect(() => {
        if (flash.message) {
            if (flash.status === 'success') {
                handleClose();
                Swal.fire({
                    title: 'Mensagem!',
                    text: flash.message,
                    icon: flash.status,
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Mensagem!',
                    text: flash.message,
                    icon: flash.status,
                    confirmButtonText: 'OK'
                });
            }
        }
    }, [flash.status, flash.message]);

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {buttonName}
            </Button>
            <Modal
                title={title}
                open={isModalOpen}
                onCancel={handleClose}
                centered
                footer={null}
                onOk={handleOk}
            >
            <div className="flex flex-col items-center justify-center h-full">
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
                            required: passRequired ?? true,
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
                            {buttonForm}
                        </Button>
                    </Form.Item>
                    
                </Form>
            </div>
            </Modal>
        </>
    )
}

export default Usercreateoredit;