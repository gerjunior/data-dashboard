import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
];

export const Header = () => {
  return (
    <Box
      component={'header'}
      sx={{
        textAlign: 'center',
        border: '1px dashed grey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '99vh',
        width: '15vw',
      }}
    >
      <Stack>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '2vw',
            padding: '20px 0',
          }}
        >
          CloudIA
        </Typography>
        {menus.map((menu) => {
          return (
            <Link
              to={menu.path}
              key={menu.name}
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                key={menu.name}
                sx={{
                  minWidth: 100,
                  fontWeight: 'bold',
                  fontSize: '1.5em',
                  padding: '20px 0',
                }}
              >
                {menu.name}
              </Typography>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};
