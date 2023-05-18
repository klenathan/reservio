import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    'Stay',
    'Vehicles',
    'Flights',
    'Sports',
    'Restaurants',
    'Hospitals',
    'Others',
  ],
  datasets: [
    {
      label: '# of reservations',
      data: [12, 19, 3, 5, 2, 3, 5],
      backgroundColor: [
        'hsla(214, 60%, 80%, 1)',
        'hsla(100, 60%, 80%, 1)',
        'hsla(40, 60%, 80%, 1)',
        ,
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(235, 39, 14, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(235, 39, 14, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart(props: { data?: any }) {
  return (
    <div className='h-80 flex flex-col items-center justify-center rounded-xl bg-zinc-50'>
      <h1 className='w-full text-center text-xl text-oliveGreen font-bold uppercase'>
        {props.data.name}
      </h1>
      <div className='grid place-items-center h-[80%]  w-full'>
        <Pie data={props.data || data} />
      </div>
    </div>
  );
}
