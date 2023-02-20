import React, {useState} from 'react'
import {Modal, Table} from 'antd';
import {validator} from "./data/validator";
import {reportConfig} from "./data/report-config";
import {data} from "./data/data";
import styles from './Report.module.css';

export const Report = () => {
    const [columnsData, setColumnsData] = useState(reportConfig)
    // const [dataSource, setDataSource] = useState(validator(columnsData, data)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeRecord, setActiveRecord] = useState(null);

    const [tableData, setTableData] = useState(validator(reportConfig, data))
    const dataSource = [...tableData.columns]
    const columnsKeys = Object.keys(tableData.columns[0])
    let columns = []

    columnsKeys.forEach((item, index) => {
        columns.push({
            title: <input
                    value={item}
                    placeholder={item}
                    onInput={e => {
                        let m = Object.assign(
                            [...tableData.columns],
                            Object.keys(tableData.columns).map(key => {
                                let keyValues = Object.entries({...tableData.columns[key]});
                                let index = Object.keys(tableData.columns[key]).indexOf(e.target.placeholder)
                                keyValues.splice(index,1, [e.target.value, tableData.columns[key][e.target.placeholder]]);
                                return Object.fromEntries(keyValues)
                            })
                        )
                        setTableData(prevState => ({
                            ...prevState,
                            columns : m
                        }))
                    }}
                />
            ,
            dataIndex: item,
            key: item,
            hidden: false,
        })
    })

    columns = columns.filter(item => !item.hidden);

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <section className={styles.table}>
            <h4>{tableData.name}</h4>
            <h5>{tableData.code}</h5>
            <Table
                dataSource={dataSource}
                columns={columnsData}
                pagination={{defaultPageSize: 10, showSizeChanger: true}}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            setActiveRecord(record);
                            setIsModalVisible(true);
                        },
                    };
                }}
                onHeaderRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            console.log(record)
                            // record.visible = false
                        }
                    }
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
        </section>)
}