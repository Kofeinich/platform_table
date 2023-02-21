import {useLayoutEffect, useRef, useState} from "react";
import styles from "./ReportInput.module.css";
import {useDispatch} from "react-redux";
import {changeColumnsData, changeRowData} from "../../../store/slices/tableSlice";

export const ReportInput = ({initialValue}) => {
    const dispatchColumnValue = useDispatch()
    const dispatchRowValue = useDispatch()


    const [inputValue, setInputValue] = useState({
        oldValue: initialValue,
        newValue: initialValue,
    })

    const cancelUpdate = useRef(false);
    const handleInput = (e) => {
        setInputValue((prevState) => ({
            oldValue: prevState.newValue,
            newValue: e.target.value
        }))
    }

    const d = () => {
        if (cancelUpdate.current) {
            cancelUpdate.current = false
            dispatchColumnValue(changeColumnsData({inputValue}))
            dispatchRowValue(changeRowData({inputValue}))
        }
    }


    return <input
        className={styles.input}
        onChange={(event) => {
            cancelUpdate.current = true
            handleInput(event)
            d()
        }}
        // onBlur={() => {
        //     cancelUpdate.current = true
        //     d()
        // }}

        placeholder={initialValue}
        value={inputValue.newValue}
    />
}