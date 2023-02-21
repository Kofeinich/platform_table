import {Checkbox, Dropdown, Menu} from "antd";
import styles from "./ReportFilter.module.css";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeVisibility} from "../../../store/slices/tableSlice";


export const ReportFilter = () => {

    const columns= useSelector((state) => state.table.columns);

    const dispatchStatus = useDispatch()

    const filterMenu = (
        <Menu>
            {
                columns.map((item, index) => {
                    return <Menu.Item key={index}>
                        <div className={styles.item}>
                            <Checkbox
                                onChange={(ch) => {
                                    dispatchStatus(changeVisibility({key: item.key, visible: ch.target.checked}))
                                }}

                                defaultChecked={item.visible}
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