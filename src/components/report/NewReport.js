import {useEffect, useState} from "react";
import {validator} from "./data/validator";
import styles from "./Report.module.css";
import {Table} from "antd";
import {CloseOutlined, CloudDownloadOutlined} from '@ant-design/icons';
import {ReportInput} from "./input/ReportInput";
import {ReportModal} from "./modal/ReportModal";

export const NewReport = ({reportConfigJSON, reportData}) => {
    const [columnConfig, setColumnConfig] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [additionalData, setAdditionalData] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeRecord, setActiveRecord] = useState(null);

    const validData = validator(reportConfigJSON, reportData)
    const validRows = validData.columns
    const validAdditionalData = {name: validData.name, code: validData.code}
    const closeModal = () => {
        setIsModalVisible(false)
    }

    const changeDataSource = (oldKey, newKey) => {
        dataSource.map((item) => {
            let keyValues = Object.entries(item);
            let index = Object.keys(item).indexOf(oldKey)
            console.log(oldKey, newKey)
            keyValues.splice(index, 1, [newKey, keyValues[index][1]]);
            console.log(keyValues)
            return Object.fromEntries(keyValues)
        })
        // setDataSource(obj)
        // console.log(obj)
    }

    // console.log(columnConfig)

    const changeColumnConfig = ({oldKey, newKey}) => {

    }


    /** Теперь таблица строиться независимо от даты, дата приходит в компонент как пропс,
     * если она не будет корректна, то компонент просто отрендерит пустые колонки без даты**/

    useEffect(() => {
        setColumnConfig(
            Object.keys(reportConfigJSON.properties.columns.items[0].properties).map((item) => {
                return {
                    title: <ReportInput changeData={changeDataSource} initialValue={item}/>,
                    dataIndex: item,
                    key: item,
                }
            }))
        setDataSource(validRows)
        /** если закоментить отобразятся только колонки**/
        setAdditionalData(validAdditionalData)
    }, [dataSource])

    return <section className={styles.table}>
        <h4>{additionalData.name}</h4>
        <h5>{additionalData.code}</h5>
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
}