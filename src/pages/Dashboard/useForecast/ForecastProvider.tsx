import { createContext, FC, ReactNode } from 'react';
import useSWR from 'swr';
import { v4 as uuidV4 } from 'uuid';
import { mockData } from './mockData';

const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';

type WeatherbitResponse = {
  data: {
    valid_date: string;
    max_temp: number;
    min_temp: number;
    moon_phase_lunation: number;
    weather: {
      icon: string;
      description: string;
    };
  }[];
  city_name: string;
  country_code: string;
  state_code: string;
};

type ForecastContextType = {
  data?: {
    forecast: {
      id: string;
      valid_date: string;
      u_date: string;
      u_max_temp: number;
      u_min_temp: number;
      max_temp: string;
      min_temp: string;
      moon_phase_description: string;
      moon_phase_icon: string;
      weather: string;
    }[];
    city_name: string;
    country_code: string;
    state_code: string;
  };
  error?: Error;
  isLoading?: boolean;
};

type ForecastProviderProps = {
  children: ReactNode | undefined;
};

export const ForecastContext = createContext({} as ForecastContextType);

const fetcher = async ({ city, state }: { city: string; state: string }) => {
  return fetch(
    `${BASE_URL}?city=${city},${state}&key=${
      import.meta.env.VITE_WEATHERBIT_API_KEY
    }`,
  ).then((res) => res.json());
};

export const ForecastProvider: FC<ForecastProviderProps> = ({ children }) => {
  const { data, error, isLoading } = useSWR<WeatherbitResponse>(
    BASE_URL,
    () =>
      fetcher({
        city: 'New York',
        state: 'NY',
      }),
    {
      revalidateIfStale: false,
    },
  );

  const forecast =
    data?.data.map((item) => ({
      id: uuidV4(),
      valid_date: new Date(item.valid_date).toLocaleDateString(),
      weather: item.weather.description,
      u_date: Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(new Date(item.valid_date)),
      u_max_temp: item.max_temp,
      u_min_temp: item.min_temp,
      max_temp: `${item.max_temp}° C`,
      min_temp: `${item.min_temp}° C`,
      ...(() => {
        if (item.moon_phase_lunation < 0.25) {
          return {
            moon_phase_description: 'New Moon',
            moon_phase_icon: '🌑',
          };
        } else if (item.moon_phase_lunation < 0.5) {
          return {
            moon_phase_description: 'First Quarter',
            moon_phase_icon: '🌓',
          };
        } else if (item.moon_phase_lunation < 0.75) {
          return {
            moon_phase_description: 'Full Moon',
            moon_phase_icon: '🌕',
          };
        } else {
          return {
            moon_phase_description: 'Last Quarter',
            moon_phase_icon: '🌗',
          };
        }
      })(),
    })) || [];

  const parsedData: ForecastContextType['data'] = data
    ? {
        ...data,
        forecast,
      }
    : undefined;

  const value = {
    data: parsedData,
    error,
    isLoading,
  };

  if (error?.message.includes('Unexpected end of JSON input')) {
    value.data = mockData;
    value.error = undefined;
  }

  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
};
