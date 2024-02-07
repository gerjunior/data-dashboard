import { createContext, FC, ReactNode, useContext } from 'react'
import useSWR from 'swr';

const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily'

type WeatherbitResponse = {
  data: {
    valid_date: string;
    max_temp: number;
    min_temp: number;
    moon_phase_lunation: number;
    weather: {
      icon: string;
      description: string;
    }
  }[];
  city_name: string;
  country_code: string;
  state_code: string;
}

type ForecastContextType = {
  data?: {
    forecast: {
      valid_date: string;
      max_temp: string;
      min_temp: string;
      moon_phase_description: string;
      moon_phase_icon: string;
      weather: string;
    }[]
    city_name: string;
    country_code: string;
    state_code: string;
  };
  error?: Error;
  isLoading?: boolean;
}

type ForecastProviderProps = {
  children: ReactNode | undefined
}

const ForecastContext = createContext({} as ForecastContextType)

const fetcher = async ({ city, state }: { city: string; state: string }) => {
  return fetch(`${ BASE_URL }?city=${ city },${ state }&key=${ import.meta.env.VITE_WEATHERBIT_API_KEY }`).then(res => res.json())
}

export const ForecastProvider: FC<ForecastProviderProps> = ({ children }) => {
  const { data, error, isLoading } = useSWR<WeatherbitResponse>(BASE_URL, () => fetcher({
    city: 'New York',
    state: 'NY',
  }))

  const forecast = data?.data.map(item => ({
    valid_date: new Date(item.valid_date).toLocaleDateString(),
    weather: item.weather.description,
    max_temp: `${ item.max_temp }° C`,
    min_temp: `${ item.min_temp }° C`,
    ...(() => {
      if (item.moon_phase_lunation < 0.25) {
        return {
          moon_phase_description: 'New Moon',
          moon_phase_icon: '🌑',
        }
      } else if (item.moon_phase_lunation < 0.5) {
        return {
          moon_phase_description: 'First Quarter',
          moon_phase_icon: '🌓',
        }
      } else if (item.moon_phase_lunation < 0.75) {
        return {
          moon_phase_description: 'Full Moon',
          moon_phase_icon: '🌕',
        }
      } else {
        return {
          moon_phase_description: 'Last Quarter',
          moon_phase_icon: '🌗',
        }
      }
    })(),
  })) || []

  const parsedData: ForecastContextType['data'] = data ? {
    ...data,
    forecast,
  } : undefined;

  return (
    <ForecastContext.Provider value={ { data: parsedData, error, isLoading } }>
      { children }
    </ForecastContext.Provider>
  )
}

export const useForecast = () => {
  const context = useContext(ForecastContext)
  if (!context) {
    throw new Error('useForecast must be used within a ForecastProvider')
  }
  return context
}