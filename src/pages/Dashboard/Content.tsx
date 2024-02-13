import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { redirect } from 'react-router-dom';
import { useForecast } from './useForecast/useForecast.ts';
import { DataCard } from './DataCard.tsx';
import { Chart } from './Chart.tsx';

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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Max Temp</TableCell>
                    <TableCell>Min Temp</TableCell>
                    <TableCell>Moon Phase</TableCell>
                    <TableCell>Weather</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.forecast.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => redirect(`/details/${row.id}`)}
                    >
                      <TableCell>{row.valid_date}</TableCell>
                      <TableCell>{row.max_temp}</TableCell>
                      <TableCell>{row.min_temp}</TableCell>
                      <TableCell>{row.moon_phase_icon}</TableCell>
                      <TableCell>{row.weather}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <Chart />
        </Box>
      </Box>
    </Box>
  );
};
