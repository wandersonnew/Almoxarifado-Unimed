import Layout from '../Layouts/Layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2'

import Usercreateoredit from '../components/Usercreateoredit';

const User = ({ users }) => {
    var [usersList, setUsersList] = useState(users);

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
                    setUsersList(users.filter(user => user.id != id));
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
    
    const hasUsers = usersList && usersList.length > 0;
    const dataSource = hasUsers ? usersList.map(user => ({
        key: user.id,
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        action: ( <>
                <Button
                    type="primary"
                    danger
                    onClick={() => deleteData(user.id)}
                >
                    {<DeleteOutlined />}
                </Button>

                <Usercreateoredit 
                    buttonName={<EditOutlined />}
                    title={"Edição de usuário"}
                    sendrouter={"/users/"+user.id}
                    user={{
                        'id': user.id,
                        'name': user.name,
                        'email': user.email,
                    }}
                    passRequired={false}
                    buttonForm={'Editar'}
                />

                </>),
    })) : [];

    // atualiza os dados na tabela
    useEffect(() => {
        setUsersList(users);
    }, [users]);

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

            <Usercreateoredit 
                buttonName={"Cadastrar"}
                title={"Cadastro de usuário"}
                sendrouter={"/user/newuser"}
                buttonForm={"Cadastrar"}
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