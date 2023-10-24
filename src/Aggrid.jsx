import React, { useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Aggrid = () => {
    // const rowData = [
    //     { name: "A", age: 23, birthDate: "2010",phonenumber:9524374564 },
    //     { name: "S", age: 18, birthDate: "2011",phonenumber:9524374564 },
    //     { name: "V", age: 22, birthDate: "2012",phonenumber:9524374564 },
    //     { name: "O", age: 29, birthDate: "2013",phonenumber:9524374564 },
    //     { name: "P", age:27, birthDate:"2015",phonenumber:9524374564}
    // ];

    const columnDefs = [
        { headerName: "Id", field: 'id',  floatingFilter: true,checkboxSelection:true,headerCheckboxSelection:true },
        { headerName: "Name", field: 'name',tooltipField:"name" },
        { headerName: "Email", field: 'email' },
        { headerName: "Body", field: "body",tooltipField:"name" }
    ];

    const defaultColDef = {
        sortable: true,
        editable: true,
        filter: true
    };


    const onGridReady=(params)=>{
        fetch('https://jsonplaceholder.typicode.com/comments')
      .then(resp => resp.json())
      .then(resp => { params.api.applyTransaction({add:resp})
      console.log("resp",resp)
    })
      
      
    }
    const rowSelectionType="multiple"
    
    const onSelectionChanged=(events)=>{
        console.log("events",events.api.getSelectedRows())
    }
   

    return (
        <div className="ag-theme-alpine" style={{ height: '100vh', width: '100vw',  }}>
          
            <div style={{ height: '100%', width: '100%',  }}>
                <AgGridReact
                    // rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection={rowSelectionType}
                    onGridReady={onGridReady}
                    onSelectionChanged={onSelectionChanged}
                    rowMultiSelectWithClick={true}
                    // isRowSelectable={isRowSelectable}
                    pagination={true}
                    // paginationPageSize={10}
                />
            </div>
        </div>
    );
};

export default Aggrid;
