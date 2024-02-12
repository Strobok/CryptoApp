
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const LineChart = ({ coinHistory }) => {
 
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
    elements: {
      point: {
        pointStyle: false,
      },
    }
  };

  return ( 
    <Line data={data} options={options} />
  );
};
  
export default LineChart;
