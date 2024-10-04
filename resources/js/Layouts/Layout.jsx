import { Link } from '@inertiajs/react';

import React from 'react';
import { Dropdown, Space, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

export default function Layout({ children }) {
  const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="#">
                Editar
            </a>
        ),
    },
    {
        key: '2',
        danger: true,
        label: (
            <a target="_blank" rel="noopener noreferrer" href="/logout">
                Sair
            </a>
        ),
    },
  ];
  return (
    <main>
      <header>
        <nav>
          <Link href="/" className='nav-link'>Home</Link>
          <Link href="/about"  className='nav-link'>About</Link>
          <Link href="/users"  className='nav-link'>Usuários</Link>

          <Dropdown
                menu={{
                    items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                          <Avatar shape="square" size="large" icon={<UserOutlined />} />
                          <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            
        </nav>
      </header>
      <article>{children}</article>
    </main>
  )
}