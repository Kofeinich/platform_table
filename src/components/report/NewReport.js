import {useEffect, useRef, useState} from "react";
import {validator} from "./data/validator";
import styles from "./Report.module.css";
import {Table} from "antd";
import {ReportInput} from "./input/ReportInput";
import {ReportModal} from "./modal/ReportModal";
import {ReportFilter} from "./filter/ReportFilter";

export const NewReport = ({reportConfigJSON, reportData}) => {
    const validData = validator(reportConfigJSON, reportData)
    const validRows = validData.columns
    const validAdditionalData = {name: validData.name, code: validData.code}

    const [columnConfig, setColumnConfig] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [additionalData, setAdditionalData] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeRecord, setActiveRecord] = useState(null);

    const closeModal = () => {
        setIsModalVisible(false)
    }


    /** Теперь таблица строиться независимо от даты, дата приходит в компонент как пропс,
     * если она не будет корректна, то компонент просто отрендерит пустые колонки без даты**/


    useEffect(() => {

        setDataSource(validRows)
        /** если закоментить отобразятся только колонки**/
        setAdditionalData(validAdditionalData)

    }, [reportData, reportConfigJSON])


    const changeSource = ({oldKey, newKey}) => {
        if (Array.isArray(dataSource) && dataSource.length) {
            setDataSource(() => {
                dataSource.map((item) => {
                    let keyValues = Object.entries(item);
                    let index = Object.keys(item).indexOf(oldKey)
                    keyValues.splice(index, 1, [newKey, keyValues[index][1]]);
                    return Object.fromEntries(keyValues)
                })
            })

        }
    }


    useEffect(() => {
        setColumnConfig(
            Object.keys(reportConfigJSON.properties.columns.items[0].properties).map((item) => {
                return {
                    title: <ReportInput changeDataSource={changeSource}
                                        initialValue={item}/>,
                    dataIndex: item,
                    key: item,
                }
            }))

    }, [])



    return (
        <section className={styles.table}>
            <header className={styles.header}>
                <div className={styles.text}>
                    <h4>{additionalData.name}</h4>
                    <h5>{additionalData.code}</h5>
                </div>
                <ReportFilter columns={columnConfig} updateTable={setColumnConfig}/>
            </header>
            <Table
                dataSource={dataSource}
                columns={columnConfig}
                pagination={{defaultPageSize: 10, showSizeChanger: true}}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            setActiveRecord(record)
                            setIsModalVisible(true)
                            console.log('event')
                        }
                    }
                }}
            />
            <ReportModal activeRecord={activeRecord} onOpen={isModalVisible} onClose={closeModal}/>
        </section>
    )
}
