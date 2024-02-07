import { Box, Card, Stack, Typography } from '@mui/material'
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid';
import { ForecastProvider, useForecast } from "../../hooks/useForecast.tsx";
import { v4 as uuidV4 } from 'uuid'

const menus = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Search',
    path: '/search',
  },
  {
    name: 'About',
    path: '/about',
  },
]

const Header = () => {
  return (
    <Box
      component={ 'header' }
      sx={ {
        textAlign: 'center',
        border: '1px dashed grey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '99vh',
        width: '15vw',
      } }
    >
      <Stack>
        <Typography
          sx={ {
            fontWeight: 'bold',
            fontSize: '2vw',
            padding: '20px 0',
          } }
        >BookTastic</Typography>
        { menus.map(menu => {
          return (
            <Typography key={ menu.name } sx={ {
              minWidth: 100,
              fontWeight: 'bold',
              fontSize: '1.5em',
              padding: '20px 0',
            } }>{ menu.name }</Typography>
          )
        }) }
      </Stack>
    </Box>
  )
}

type DataCardProps = {
  card?: string;
}

const DataCard = (props: DataCardProps) => {
  return (
    <Card
      sx={ {
        border: '1px solid black',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15vh',
        width: '20vw',
        margin: '10px',
      } }
    >
      <Typography>{ props.card }</Typography>
    </Card>
  )
}

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

const Content = () => {
  const { data } = useForecast()

  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      } }
    >

      <Box sx={ {
        border: '1px dashed grey',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '99vh',
        width: '85vw',
        paddingTop: '50px',
      } }>
        <Box sx={ {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        } }>
          <DataCard card={ data?.city_name }/>
          <DataCard card={ data?.country_code }/>
          <DataCard card={ data?.state_code }/>
        </Box>

        <Card
          sx={ {
            height: '75vh',
            width: '80vw',
            borderRadius: '20px',
            padding: '10px',
          } }
        >
          <DataGrid
            initialState={ {
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: ['weather'],
                },
              },
            } }
            getRowId={ () => uuidV4() }
            rows={ data?.forecast || [] }
            columns={ columns }
            disableColumnSelector
            disableRowSelectionOnClick
            isCellEditable={ () => false }
            pageSizeOptions={ [20] }
            slots={ { toolbar: GridToolbar } }
            slotProps={ {
              toolbar: {
                showQuickFilter: true,
              },
            } }
          />
        </Card>
      </Box>


    </Box>
  )
}

export const Main = () => {
  return (
    <ForecastProvider>
      <Box sx={ {
        display: 'flex',
        flexDirection: 'row',
      } }>
        <Header/>
        <Content/>
      </Box>
    </ForecastProvider>
  )
}