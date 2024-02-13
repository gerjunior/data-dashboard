import { Box } from '@mui/material';
import { ForecastProvider } from './useForecast/ForecastProvider.tsx';
import { Header } from '../../views/Header.tsx';
import { Content } from './Content.tsx';

export const Dashboard = () => {
  return (
    <ForecastProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Header />
        <Content />
      </Box>
    </ForecastProvider>
  );
};
