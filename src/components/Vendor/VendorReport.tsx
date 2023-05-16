import useFetch from '@/Helper/ClientFetch/useFetch';
import { NotFound } from 'next/dist/client/components/error';
import PieChart from '../Admin/pie';
import { useAuth } from '../Auth/Context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';
import { LineChart } from './LineChart';
import { VerticlaBar } from './VeriticalBar';

const handleRevenueByDay = (data: any) => {
  let result: any = {
    name: 'Average Revenue By Day',
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };
  data.forEach((day: any, i: number) => {
    result.labels.push(new Date(day.day).toDateString());
    result.datasets[0].label = '# Average Revenue by Day';
    result.datasets[0].data.push(day.avg);
    result.datasets[0].backgroundColor.push(
      `hsla(${(330 / data.length) * i}, 60%, 80%, 1)`
    );
  });
  return result;
};

const handleRevenueByCategory = (data: any) => {
  let result: any = {
    name: 'Average Revenue By Category',
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };
  data.forEach((category: any, i: number) => {
    result.labels.push(category.category);
    result.datasets[0].label = '# Average Revenue by Category';
    result.datasets[0].data.push(category.avg);
    result.datasets[0].backgroundColor.push(
      `hsla(${(330 / data.length) * i}, 60%, 80%, 1)`
    );
  });
  return result;
};
const handleRevenueByProduct = (data: any) => {
  let result: any = {
    name: 'Average Revenue By Product',
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };
  data.forEach((product: any, i: number) => {
    result.labels.push(product.name);
    result.datasets[0].label = '# Average Revenue by Day';
    result.datasets[0].data.push(product.avg);
    result.datasets[0].backgroundColor.push(
      `hsla(${(330 / data.length) * i}, 60%, 80%, 1)`
    );
  });
  return result;
};

export default function VendorReport() {
  const { user } = useAuth();

  const { data, error, isLoading } = useFetch<any>(
    `/vendor/${user?.username}/report`
  );
  if (isLoading) {
    return (
      <div className='relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10'>
        <LoadingSpinner text='Loading product data, please wait...' />
      </div>
    );
  }

  if (error && !data) {
    return <NotFound />;
  }
  return (
    <div className={`flex flex-col items-center gap-8 h-screen overflow-auto`}>
      {data.revenueByCategory && (
        <LineChart data={handleRevenueByDay(data.revenueByDay)} />
      )}
      {data.revenueByCategory && (
        <VerticlaBar data={handleRevenueByCategory(data.revenueByCategory)} />
      )}
      {data.revenueByProduct && (
        <PieChart data={handleRevenueByProduct(data.revenueByProduct)} />
      )}
    </div>
  );
}
