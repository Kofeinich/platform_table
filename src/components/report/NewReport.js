import {useState} from "react";
import {validator} from "./data/validator";
import styles from "./Report.module.css";
import {Table} from "antd";
import {ReportModal} from "./modal/ReportModal";
import {ReportFilter} from "./filter/ReportFilter";
import {useDispatch, useSelector} from "react-redux";
import {loadData} from "../../store/slices/tableSlice";


/** Теперь таблица строиться независимо от даты, дата приходит в компонент как пропс,
 * если она не будет корректна, то компонент просто отрендерит пустые колонки без даты**/

export const NewReport = ({reportConfigJSON, reportData}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeRecord, setActiveRecord] = useState(null);
    const columnConfig= useSelector((state) => state.table.columns);
    const dispatchData= useDispatch()
    try {
        dispatchData(loadData(validator(reportConfigJSON, reportData)))
    } catch (err) {
        console.error(err)
    }

    const rowConfig = useSelector((state) => state.table.data?.columns)
    const additionalData = useSelector((state) => ({name: state.table.data?.name, code: state.table.data?.code}))


    const closeModal = () => {
        setIsModalVisible(false)
    }

    return (
        <section className={styles.table}>
            <header className={styles.header}>
                <div className={styles.text}>
                    <h4>{additionalData.name}</h4>
                    <h5>{additionalData.code}</h5>
                </div>
                <ReportFilter columns={columnConfig} />
            </header>
            <Table
                dataSource={rowConfig}
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
