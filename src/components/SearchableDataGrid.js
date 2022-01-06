import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import QuickSearchToolbar from "./QuickSearchToolbar";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function SearchableDataGrid({data, columns, selectedUsers, setSelectedUsers, type }) {
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([...data]);
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };


  useEffect(() => {
    setRows(data);
  }, [data]);


  return (
    <div>
      <Box sx={{ height: 350, width: 1 }}>
        <DataGrid
          components={{ Toolbar: QuickSearchToolbar }}
          rows={rows}
          columns={columns}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
            },
          }}
          onSelectionModelChange={(ids) => {
            const selectedIds = new Set(ids);
            const users = data.filter((row) =>
              selectedIds.has(row.id),
            );
            const newData = {}
            newData[type] = users;
            setSelectedUsers(...[newData]);
          }}
        />
      </Box>
    </div>
  );
}

export default SearchableDataGrid;