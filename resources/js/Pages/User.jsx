import Layout from '../Layouts/Layout';
import React, { useState } from 'react';
import { Button, Modal, Table } from 'antd';
import Usercreate from './Usercreate';

const User = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };
    
    const hasUsers = users && users.length > 0;
    const dataSource = hasUsers ? users.map(user => ({
        key: user.id,
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        action: <Button>Delete</Button>,
    })) : [];

    const columns = hasUsers ? [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
        }
    ] : [];

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

            {hasUsers ? (
                <Table dataSource={dataSource} columns={columns} />
            ) : (
                <div className="text-center">
                    <p>Nenhum usuário cadastrado.</p>
                </div>
            )}
        </>
    );
}

User.layout = page => <Layout children={page} />;
export default User;