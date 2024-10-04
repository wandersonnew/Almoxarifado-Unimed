import Layout from '../Layouts/Layout';
import React, { useState } from 'react';
import { Table } from 'antd';
import Usercreate from './Usercreate';
import ModalComp from '../components/ModalComp';

const User = ({ users }) => {
    
    const hasUsers = users && users.length > 0;
    const dataSource = hasUsers ? users.map(user => ({
        key: user.id,
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        action: <ModalComp 
                    title={'Editar dados de usuário'}
                    tittleButton={'Editar'}
                    content={<Usercreate
                                buttonName={["Editar"]}
                                user={{
                                    'id': user.id,
                                    'name': user.name,
                                    'email': user.email,
                                }}
                            />} 
                />,
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

            <ModalComp 
                title={'Cadastrar dados de usuário'}
                tittleButton={'Cadastrar'}
                content={<Usercreate
                            buttonName={"Cadastrar"}
                            sendrouter={"/user/newuser"}
                        />} 
            />

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