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
                columns: state.columns.map((item) => {
                    if (action.payload.key === item.key) {
                        item.visible = action.payload.visible
                        console.log('Good')
                    } else {
                        console.log('Bad')
                    }
                })
            })
        },
        changeRowData(state, action) {
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    columns: state.data.columns.map((item) => {
                        let newValue = action.payload.inputValue.newValue
                        let oldValue = action.payload.inputValue.oldValue
                        if ((oldValue in item) && (newValue !== oldValue)) {
                            let entryValue = item[oldValue]
                            let newObj = Object.assign({},  item)
                            newObj[newValue] = entryValue
                            delete newObj[oldValue]
                            return newObj
                        } else {
                            return item
                        }
                    })
                })
            })
        },
        changeColumnsData(state, action) {
            return Object.assign({}, state, {
                columns: state.columns.map((item) => {
                    if ((item.dataIndex === action.payload.inputValue.oldValue) && !(action.payload.inputValue.newValue === action.payload.inputValue.oldValue)) {
                        return Object.assign({item}, {dataIndex: action.payload.inputValue.newValue, key: action.payload.inputValue.newValue })
                    } else {
                        return item
                    }
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