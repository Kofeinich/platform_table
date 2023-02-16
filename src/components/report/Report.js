import React, {useState} from 'react'
import {Table} from 'antd';
import {validator} from "./data/validator";
import {reportConfig} from "./data/report-config";
import {data} from "./data/data";

export const Report = () => {

    const[tableData, setTableData] = useState(validator(reportConfig, data))

    console.log(tableData)

    const dataSource = [...tableData.columns]
    const columnsKeys = Object.keys(tableData.columns[0])
    const columns = []
    columnsKeys.forEach((item, index) => {
        columns.push({
            title: item,
            dataIndex: item,
            key: index,
        })
    })

    return (
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <h4>{tableData.name}</h4>
            <h5>{tableData.code}</h5>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ defaultPageSize: 10, showSizeChanger: true}}
            />
        </div>)
}