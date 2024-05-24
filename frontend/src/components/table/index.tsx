import React, { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";

// Define props for the ServerSideDataTable component
interface ServerSideDataTableProps {
  columns: MUIDataTableColumn[]; // Columns configuration for the table
  options: any; // Options for customizing the table behavior
  data: any; // Data to be displayed in the table
}

// Define the ServerSideDataTable component
const ServerSideDataTable: React.FC<ServerSideDataTableProps> = ({
  columns,
  options,
  data,
}) => {

  return (
    // Render the MUIDataTable component
    <MUIDataTable
      title={options.title || ""} // Set the title of the table
      data={data} // Pass the data to be displayed in the table
      columns={columns} // Define the columns for the table
      options={{        
        filter: false,
        search: true,
        print: false,
        download: false,
        // pagination: true,
        // page: page,
        rowsPerPage: 10,
        selectableRows: "none",
        // onChangePage: handleChangePage,
        // onChangeRowsPerPage: handleChangeRowsPerPage,
        // onSearchChange: handleSearchChange,
        ...options, // Spread any additional options passed to the component
      }}
    />
  );
};

export default ServerSideDataTable; // Export the ServerSideDataTable component
