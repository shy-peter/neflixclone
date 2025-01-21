import { Chart, ArcElement, Tooltip, Legend, DoughnutController, defaults } from 'chart.js';
import React, { useEffect, useRef } from 'react';

// Register necessary components for Chart.js
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const DoughnutChart = ({rating= 0}) => {
  const chartRef = useRef(null); // Ref for the canvas
  const chartInstanceRef = useRef(null); // Ref to store the chart instance
  const rat = 50

  useEffect(() => {
    const customDoughnutController = {
      id: 'custom-doughnut',
      afterDraw(chart) {
        const { width, height, ctx } = chart;
        const dataset = chart.data.datasets[0];
        const completed = dataset.data[0];
        const text = `${completed}% completed`;

        // Set font size and style
        const fontSize = (height / 350).toFixed(2);
        ctx.font = `${fontSize}em Lato, sans-serif`;
        ctx.textBaseline = 'middle';

        // Calculate position
        const x = width / 2;
        const y = height / 2;

        // Set text color and draw text
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
      },
    };

    // Register the custom plugin
    Chart.register(customDoughnutController);

    const context = chartRef.current.getContext('2d');

    // Destroy any existing chart instance before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(context, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            // label: 'Progress',
            data: [rating, 50], // Example data: 3% completed
            backgroundColor: ['green', ''],
            borderWidth: 1, // Decrease border width for thinner circles
          },
        ],
      },
      options: {
        plugins: {
          customDoughnut: true,
        },
        maintainAspectRatio: false,
        cutout: '60%', // Adjust to make the doughnut circle thinner
      },
    });

    // Cleanup function to destroy the chart instance on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center" style={{ width: '40px', height: '40px' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default DoughnutChart;
