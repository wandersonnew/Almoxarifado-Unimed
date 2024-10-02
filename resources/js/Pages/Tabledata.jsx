import React from 'react';
import { Table } from "antd";

const Tabledata = ({dataSource, columns}) => {
    
    return (
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 2}} />
    )
}

export default Tabledata;