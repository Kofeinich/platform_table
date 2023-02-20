import React from "react";
import {Layout} from "./layout/Layout";
import {NewReport} from "./components/report/NewReport";
import {data} from "./components/report/data/data";
import {reportConfig} from "./components/report/data/report-config";

function App() {
  return (
   <Layout>
       <NewReport reportConfigJSON={reportConfig} reportData={data}/>
   </Layout>
  );
}

export default App;
