
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useApi from '../hocks/useApi'

const getRowId = (reports) => reports._id;


export default function DashboardAdmin() {
  const { data, loading, error, get, post, put, remove } = useApi();

  const [reports, setReports] = React.useState(data)
  React.useEffect(() => {

    get('http://localhost:3000/report/')

    setReports(data)
    console.log("ee", reports)
  }, [loading]);
  
const columns = [
  // { field: 'date', headerName: 'ID', width: 90 },
 
  {
    field: 'user.firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'content',
    headerName: 'Content',
    type: 'number',
    width: 110,
    editable: true,
  },

];
  if (reports)
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={reports}
          columns={columns}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={getRowId}
        />
        {(reports) ? (
          <p>{reports.map((a) => a.content)}</p>
        ):
        (<></>)
}
      </Box>
    );
}

