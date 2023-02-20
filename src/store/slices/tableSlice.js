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
        data: {

        }
    },
    reducers: {
        loadData(state, action) {
            state.data = action.payload
        },
        // changeVisibility(state, action){
        //     state[action.payload.blockId].enabled = action.payload.nowEnabled
        // },
        // changeRowData(state, action){
        //     state[action.payload.blockId].fields[action.payload.fieldId].fieldReadonly = action.payload.readonly
        // },
        // changeColumnsData(state, action){
        //     state[action.payload.blockId].fields[action.payload.fieldId].fieldReadonly = action.payload.readonly
        // }
    }
})

export const {loadData} = tableSlice.actions;
export const {changeVisibility} = tableSlice.actions;
export const {changeRowData} = tableSlice.actions;

export const {changeColumnsData} = tableSlice.actions

export default tableSlice.reducer;