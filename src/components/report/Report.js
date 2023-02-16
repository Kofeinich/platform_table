import React, {useState} from 'react'
import {Modal, Table} from 'antd';
import {validator} from "./data/validator";
import {reportConfig} from "./data/report-config";
import {data} from "./data/data";
import styles from './Report.module.css';

export const Report = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeRecord, setActiveRecord] = useState(null);
    const [tableData, setTableData] = useState(validator(reportConfig, data))

    console.log(tableData)

    const dataSource = [...tableData.columns]
    const columnsKeys = Object.keys(tableData.columns[0])
    const columns = []
    columnsKeys.forEach((item, index) => {
        columns.push({
            title: item,
            dataIndex: item,
            key: item,
        })
    })

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <h4>{tableData.name}</h4>
            <h5>{tableData.code}</h5>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{defaultPageSize: 10, showSizeChanger: true}}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: () => {
                            setActiveRecord(record);
                            setIsModalVisible(true);
                        },
                    };
                }}
            />
            <Modal
                title="Current Row Info"
                open={isModalVisible}
                onCancel={closeModal}
                footer={null}
            >
                {
                    (activeRecord) ?
                    Object.keys(activeRecord).map((item, index) => {
                        return <div className={styles.mrow} key={index}>
                            <p>{item}</p>
                            <p>{activeRecord[item]}</p>
                        </div>
                    }) : null
                }

            </Modal>
        </div>)
}