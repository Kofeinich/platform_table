import {Checkbox, Dropdown, Menu} from "antd";
import styles from "./ReportFilter.module.css";
import React, {useEffect, useState} from "react";


export const ReportFilter = ({columns}) => {
    let status = columns?.map((item) => ({[item.key]: true}))
    const [selectedKeys, setSelectedKeys] = useState({status})



    const filterMenu = (
        <Menu>
            {
                columns.map((item, index) => {
                    return <Menu.Item key={index}>
                        <div className={styles.item}>
                            <Checkbox
                                onChange={(ch) => {
                                    console.log([...selectedKeys.status])
                                }}
                                defaultChecked={true}
                            />
                            {item.key}
                        </div>
                    </Menu.Item>
                })
            }
        </Menu>
    );

    return (<Dropdown
            overlay={filterMenu}
            trigger={['click']}>
            <button
                className={styles.btn}
                onClick={e => e.preventDefault()}
            >
                Add filter
            </button>
        </Dropdown>
    )
}