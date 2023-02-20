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
        }).filter((value) => value.visible),
        data: {}
    },
    reducers: {
        loadData(state, action) {
            state.data = action.payload
        },
        changeVisibility(state, action) {
            state.columns?.forEach((item) => {
                if (action.payload.key === item.key) {
                    item.visible = action.payload.visible
                } else {
                    console.log('Bad')
                }
            })
        },
        changeRowData(state, action) {
            state.data.columns?.forEach((item) => {

                console.log(state.data.columns.item.key)
                if (action.payload.inputValue.oldValue in item) {
                    item[action.payload.inputValue.newValue] = item.key
                    delete item[action.payload.inputValue.oldValue]
                } else {
                    console.log('Bad')
                }
            })
        },
        changeColumnsData(state, action) {
            state.columns?.forEach((item) => {
                if (action.payload.inputValue.oldValue in item) {
                    item[action.payload.inputValue.newValue] = item.key
                    delete item[action.payload.inputValue.oldValue]
                } else {
                    console.log('Bad')
                }
            })
        },
    }
})

export const {loadData} = tableSlice.actions;
export const {changeVisibility} = tableSlice.actions;
export const {changeRowData} = tableSlice.actions;

export const {changeColumnsData} = tableSlice.actions

export default tableSlice.reducer;