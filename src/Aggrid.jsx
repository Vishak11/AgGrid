import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Aggrid = () => {
    const [columnData, setColumnData] = useState();
    const [hideC, setHideC] = useState(true);
    const [columnDefs,setColumnDefs]=useState([])
   
    useEffect(()=>{
        const columnDef=[
               { headerName: "Id", field: 'id',  floatingFilter: true, checkboxSelection: true, headerCheckboxSelection: true },
                { headerName: "Name", field: 'name', tooltipField: "name" },
                { headerName: "Email", field: 'email', hide: hideC },
                 { headerName: "Body", field: "body", tooltipField: "name" }
             ]
             setColumnDefs(columnDef);
    },[hideC])

    const defaultColDef = {
        sortable: true,
        editable: true,
        filter: true
    };

    const onGridReady = (params) => {
        console.log("params", params);
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(resp => resp.json())
            .then(resp => {
                 params.api.applyTransaction({ add: resp });
                 setColumnData(params.api)
                // setColumnData(params.columnApi);
            });
    };

    const rowSelectionType = "multiple";

    const onSelectionChanged = (events) => {
        console.log("events", events.api.getSelectedRows());
    };

    const showData = () => {
        setHideC(!hideC);
        
    };
    const searchData=(e)=>{
        columnData.setQuickFilter(e.target.value)
        console.log("c",columnData)
    }

    return (
        <div className="ag-theme-alpine" style={{ height: '100vh', width: '100vw' }}>
            <button onClick={showData}>ShowData</button>
            <input onChange={searchData} placeholder="Search"></input>
            <div style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    onSelectionChanged={onSelectionChanged}
                    suppressRowClickSelection={true}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
    );
};

export default Aggrid;