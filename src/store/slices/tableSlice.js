import {createSlice} from "@reduxjs/toolkit"
import {ReportInput} from "../../components/report/input/ReportInput";
import {reportConfig} from "../../components/report/data/report-config";


const tableSlice = createSlice({
    name: 'Table Data',
    initialState: {
        columns: Object.keys(reportConfig.properties.columns.items[0].properties).map((item) => {
            return {
                title: <ReportInput
                    initialValue={item}/>,
                dataIndex: item,
                key: item,
                visible: true,
            }
        }),
        data: {}
    },
    reducers: {
        loadData(state, action) {
            return Object.assign({}, state, {
                data: action.payload
            })
        },
        changeVisibility(state, action) {
            return Object.assign({}, state, {
                columns: Object.keys(() => {
                    let items ={}
                    state.columns.forEach((item) => {
                        if (action.payload.key === item.key) {
                            item.visible = action.payload.visible
                        } else {
                            console.log('Bad')
                        }
                        items = {...items, item}
                    })
                    return items
                })
            })
        },
        changeRowData(state, action) {
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    columns: Object.keys(() => {
                        let items ={}
                        state.data.columns.forEach((item) => {
                            if (typeof item[action.payload.inputValue.oldValue] !== "undefined") {
                                item[action.payload.inputValue.newValue] = action.payload.inputValue.oldValue
                                delete item[action.payload.inputValue.oldValue]
                            } else {
                                console.log('Bad')
                            }
                            items = {...items, item}
                        })
                        return items
                    })
                })
            })
        },
        changeColumnsData(state, action) {
            return Object.assign({}, state, {
                columns: Object.keys(() => {
                    let items ={}
                    state.columns.forEach((item) => {
                        if (typeof item[action.payload.inputValue.oldValue] !== "undefined") {
                            item[action.payload.inputValue.newValue] = action.payload.inputValue.oldValue
                            delete item[action.payload.inputValue.oldValue]
                        } else {
                            console.log('Bad')
                        }
                        items = {...items, item}
                    })
                    return items
                })
            })
        },
    }
})

export const {loadData} = tableSlice.actions;
export const {changeVisibility} = tableSlice.actions;
export const {changeRowData} = tableSlice.actions;

export const {changeColumnsData} = tableSlice.actions

export default tableSlice.reducer;