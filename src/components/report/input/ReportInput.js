import {useEffect, useRef, useState} from "react";
import styles from "./ReportInput.module.css";
import {useDispatch} from "react-redux";
import {changeColumnsData, changeRowData} from "../../../store/slices/tableSlice";
import {logDOM} from "@testing-library/react";

export const ReportInput = ({initialValue}) => {
    const dispatchColumnValue = useDispatch()
    const dispatchRowValue = useDispatch()

    const [canUpdate, setCanUpdate] =  useState(false)


    const [inputValue, setInputValue] = useState({
        oldValue: initialValue,
        newValue: initialValue,
    })

    const submitChanges = () => {
        if (canUpdate) {
            dispatchColumnValue(changeColumnsData({inputValue}))
            dispatchRowValue(changeRowData({inputValue}))
            setCanUpdate(false)
        }
        console.log(inputValue)
    }


    return <input
        className={styles.input}
        onChange={(event) => {
            setInputValue((prevState) => ({
                oldValue: inputValue.newValue,
                newValue: event.target.value
            }))
        }}
        onFocus={() => {setCanUpdate(false)}}
        onBlur={(event) => {
            setCanUpdate(true)
            submitChanges()
        }}

        placeholder={initialValue}
        value={inputValue.newValue}
    />
}