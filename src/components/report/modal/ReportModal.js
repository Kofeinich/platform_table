import styles from "./ReportModal.module.css";
import {Modal} from "antd";
import React from "react";


export const ReportModal = ({activeRecord, onOpen, onClose}) => {
    return <Modal
        title="Current Row Info"
        open={onOpen}
        onCancel={onClose}
        footer={null}
    >
        {
            (activeRecord) ?
                Object.keys(activeRecord).map((item, index) => {
                    return <div className={styles.row} key={index}>
                        <p>{item}</p>
                        <p>{activeRecord[item]}</p>
                    </div>
                }) : null
        }

    </Modal>
}