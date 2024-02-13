import { Box, Card } from '@mui/material';
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useForecast } from './useForecast/useForecast.ts';
import { DataCard } from './DataCard.tsx';
import { Chart } from './Chart.tsx';

const columns: GridColDef[] = [
  {
    field: 'valid_date',
    headerName: 'Date',
    width: 150,
    editable: true,
  },
  {
    field: 'max_temp',
    headerName: 'Max Temp',
    width: 150,
    editable: true,
  },
  {
    field: 'min_temp',
    headerName: 'Min Temp',
    width: 150,
    editable: true,
  },
  {
    field: 'moon_phase_icon',
    headerName: 'Moon Phase',
    width: 150,
    editable: true,
  },
  {
    field: 'weather',
    headerName: 'Weather',
    width: 150,
    editable: true,
  },
];

export const Content = () => {
  const { data } = useForecast();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          border: '1px dashed grey',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '99vh',
          width: '85vw',
          paddingTop: '50px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <DataCard card={data?.city_name} />
          <DataCard card={data?.country_code} />
          <DataCard card={data?.state_code} />
        </Box>

        <Box
          sx={{
            height: '75vh',
            width: '80vw',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Card
            sx={{
              width: '50vw',
              borderRadius: '20px',
              padding: '10px',
            }}
          >
            <DataGrid
              initialState={{
                filter: {
                  filterModel: {
                    items: [],
                  },
                },
              }}
              onRowClick={(row) => {
                console.log(row);
              }}
              rows={data?.forecast || []}
              columns={columns}
              disableColumnSelector
              disableRowSelectionOnClick
              isCellEditable={() => false}
              pageSizeOptions={[20]}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </Card>
          <Chart />
        </Box>
      </Box>
    </Box>
  );
};
