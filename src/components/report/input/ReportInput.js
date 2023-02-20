import {useEffect, useRef, useState} from "react";
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

    const firstUpdate = useRef(true);
    const dis = () => {
        dispatchColumnValue(changeColumnsData({inputValue}))
        dispatchRowValue(changeRowData({inputValue}))
    }
    const handleInput = (e) => {
        // if (firstUpdate.current) {
        //     firstUpdate.current = false;
        // } else {
        //     console.log(inputValue)
        //     dispatchColumnValue(changeColumnsData({inputValue}))
        //     dispatchRowValue(changeRowData({inputValue}))
        // }
        setInputValue((prevState) => ({
            oldValue: prevState.newValue,
            newValue: e.target.value
        }))
    }

    useEffect(() => {
        dis()
    }, [inputValue])

    return <input
        className={styles.input}
        onChange={(event) => {
            handleInput(event)
            dis()
        }}

        placeholder={initialValue}
        value={inputValue.newValue}
    />
}