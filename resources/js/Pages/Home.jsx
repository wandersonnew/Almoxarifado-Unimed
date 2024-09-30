import Layout from '../Layouts/Layout';

import React from 'react';
import { Button } from 'antd';

const Home = ({name}) => {
  return (
    <>
        <div className='title'>Home</div>
        <p>Hello { name }</p>
        <Button type="primary">Button</Button>
    </>
  )
}

Home.layout = page => <Layout children={page} />
export default Home;