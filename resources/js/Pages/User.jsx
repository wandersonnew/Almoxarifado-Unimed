import Layout from '../Layouts/Layout';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'antd';
import Usercreate from './Usercreate';
import ModalComp from '../components/ModalComp';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2'

const User = ({ users }) => {

    var deleteData = (id) => {
        Swal.fire({
            title: "Deseja deletar?",
            text: "Se não deseja, cancele!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get("/users/delete/"+id)
                .then(response => {
                    Swal.fire({
                        title: "Deletado!",
                        text: "Registro deletado.",
                        icon: "success"
                    });
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Problema ao deletar!",
                    });
                })
            }
        });
    }
    
    const hasUsers = users && users.length > 0;
    const dataSource = hasUsers ? users.map(user => ({
        key: user.id,
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        action: ( <>
                <ModalComp 
                    title={'Editar dados de usuário'}
                    tittleButton={<EditOutlined />}
                    content={<Usercreate
                                buttonName={["Editar"]}
                                user={{
                                    'id': user.id,
                                    'name': user.name,
                                    'email': user.email,
                                }}
                                sendrouter={"/users/update"}
                                passRequired={false}
                            />} 
                />
                <Button
                    type="primary"
                    danger
                    onClick={() => deleteData(user.id)}
                >
                    {<DeleteOutlined />}
                </Button>
                </>),
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