import { useParams } from 'react-router-dom';
import { ForecastContextType } from '../Dashboard/useForecast/ForecastProvider';

export const useDetails = () => {
  const { id } = useParams();

  const forecastData = sessionStorage.getItem('forecastData');
  if (!forecastData) {
    return {
      data: undefined,
    };
  }

  const data = JSON.parse(forecastData) as ForecastContextType['data'];
  const forecastItem = {
    city_name: data?.city_name,
    country_code: data?.country_code,
    state_code: data?.state_code,
    ...data?.forecast.find((item: { id: string }) => item.id === id),
  };

  return {
    data: forecastItem,
  };
};
