import { Box, Card, CardContent, Typography } from '@mui/material';

import { Header } from '../../views/Header';
import { useDetails } from './useDetails';

export const Details = () => {
  const { data } = useDetails();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Header />
      <Box
        sx={{
          width: '85vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '400px',
            width: '400px',
            margin: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Typography variant='h4' component='div'>
              {data?.valid_date}
            </Typography>
            <Typography variant='h5' color='text.primary'>
              Location: {data?.city_name}, {data?.state_code},{' '}
              {data?.country_code}
            </Typography>
            <Typography variant='body1' color='text.primary'>
              Minimum Temperature: {data?.min_temp}
            </Typography>
            <Typography variant='body1' color='text.primary'>
              Maximum Temperature: {data?.max_temp}
            </Typography>
            <Typography variant='body1' color='text.primary'>
              Weather: {data?.weather}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
