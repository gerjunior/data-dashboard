import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useForecast } from './useForecast/useForecast';

export const Chart = () => {
  const { data } = useForecast();

  return (
    <LineChart width={600} height={400} data={data?.forecast}>
      <XAxis dataKey='u_date' />
      <YAxis />
      <CartesianGrid stroke='#eee' />
      <Line
        type='monotone'
        dataKey='u_min_temp'
        name='Min. temp.'
        stroke='#8884d8'
      />
      <Line
        type='monotone'
        dataKey='u_max_temp'
        name='Max. temp.'
        stroke='#82ca9d'
      />
      <Tooltip />
    </LineChart>
  );
};
