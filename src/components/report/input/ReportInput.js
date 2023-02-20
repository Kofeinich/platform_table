import {useEffect, useRef, useState} from "react";
import styles from "./ReportInput.module.css";

export const ReportInput = ({initialValue}) => {
    const [inputValue, setInputValue] = useState({
        oldValue: initialValue,
        newValue: initialValue,
    })


    // const callbacksList = useRef([changeDataSource]);
    const handleInput = (e) => {
        setInputValue((prevState) => ({
            oldValue: prevState.newValue,
            newValue: e.target.value
        }))
    }
    //
    // useEffect(() => {
    //     callbacksList.current.forEach((callback) => callback(inputValue.oldValue, inputValue.newValue))
    // }, [inputValue])


    return <input
        className={styles.input}
        onChange={(event) => {
            handleInput(event)
        }}
        placeholder={initialValue}
        value={inputValue.newValue}
    />
}