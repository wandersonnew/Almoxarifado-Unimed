import Layout from '../Layouts/Layout';
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Usercreate from './Usercreate';

const User = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <h1 className='text-center'>Usuários</h1>

            <Button type="primary" onClick={showModal}>
                Cadastrar
            </Button>
            <Modal
                title="Cadastro de usuário"
                open={isModalOpen}
                onCancel={handleClose}
                centered
                footer={null}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    <Usercreate />
                </div>
            </Modal>
        </>
    );
}

User.layout = page => <Layout children={page} />
export default User;