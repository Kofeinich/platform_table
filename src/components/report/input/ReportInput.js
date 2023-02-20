import {useEffect, useRef, useState} from "react";
import styles from "./ReportInput.module.css";

export const ReportInput = ({initialValue, changeData}) => {
    const [inputValue, setInputValue] = useState({
        oldValue: initialValue,
        newValue: initialValue,
    })

    const callbacksList = useRef([changeData]);
    const handleInput = (e) => {
        setInputValue({
            oldValue: inputValue.newValue,
            newValue: e.currentTarget.value,
        })
    }

    useEffect(() => {
        callbacksList.current.forEach((callback) => callback(inputValue.oldValue, inputValue.newValue))
    }, [inputValue])




    return <input
        className={styles.input}
        onInput={(event) => {
            handleInput(event)
        }}
        placeholder={initialValue}
        value={inputValue.newValue}
    />
}