import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Usercreate from './Usercreate';

const User = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <h1>Usuários</h1>

            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Cadastro de usuário"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered  // Centraliza o modal na tela (propriedade do Ant Design)
            >
            <div className="flex flex-col items-center justify-center h-full">
                <Usercreate />
            </div>
            </Modal>
        </>
    )
}

export default User