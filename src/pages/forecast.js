import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

import Chart from 'chart.js/auto';

export default function Forecast() {
  const [csvData, setCsvData] = useState(null);
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [prompt, setPrompt] = useState('');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = event.target.result;
      let csvData;

      if (file.type === "text/csv") {
        csvData = data;
      } else if (file.type.includes("sheet")) {
        const workbook = XLSX.read(data, { type: "binary" });
        csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
      } else {
        alert("Unsupported file format!");
        return;
      }

      setCsvData(csvData);
      console.log(csvData);
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const handleSendData = async () => {
    if (!csvData) {
      alert("Please select a file first!");
      return;
    }
  
    Swal.fire({
      title: 'Generating Forecast',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
  
    try {
      const response = await fetch("https://agritechbackend-c2cpd4gwbvg4cha7.eastus-01.azurewebsites.net/forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: csvData,
          period: 14,
          prompt: prompt
        }),
      });
  
      const result = await response.json();
      console.log('API Response:', result);
      
      // Handle the forecast data here
      if (result.forecast) {
        setGeneratedResponse(result.ai_explanation);
        renderChart(result.forecast);
      } else if (result.error) {
        throw new Error(result.error);
      }
  
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later. ' + error,
      });
    }
  };

  const handleDownloadReport = () => {
    if (!generatedResponse) {
      alert("Please generate a report first!");
      return;
    }

    Swal.fire({
      title: 'Enter Document Name',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Download',
      showLoaderOnConfirm: true,
      preConfirm: (docName) => {
        return new Promise((resolve) => {
          const file = new Blob([generatedResponse], { type: 'text/plain' });
          saveAs(file, `${docName}.doc`);
          resolve();
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  };

  const renderChart = (data) => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const labels = data.map(item => new Date(item.ds).toLocaleDateString());
    const forecastValues = data.map(item => item.yhat);
    const lowerBound = data.map(item => item.yhat_lower);
    const upperBound = data.map(item => item.yhat_upper);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Forecast',
            data: forecastValues,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
          {
            label: 'Lower Bound',
            data: lowerBound,
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            fill: '+1',
          },
          {
            label: 'Upper Bound',
            data: upperBound,
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            fill: '-1',
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Forecast Chart'
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  };


  return (
    <div className="relative p-6">
      <Link href="/" className="absolute top-0 left-0 mt-2 ml-2">
        <ArrowLeftIcon className="text-blue-500" style={{ height: '20px', width: '20px' }} />
      </Link>
      <div>
  <h1 className="text-3xl font-bold mb-6">Forecast</h1>
  <p className="text-xl mb-4">
    To use the forecast feature, your data needs to be structured in a specific way. It should be a DataFrame with two columns:
  </p>
  <ul className="list-disc ml-5 mb-4">
    <li className="mb-2">
      <code>ds</code>: This column should contain the timestamps for your data. It should be of type datetime.
    </li>
    <li>
      <code>y</code>: This column should contain the values you want to forecast.
    </li>
  </ul>
  <p className="text-xl">
    Once your data is structured correctly, you can upload it to start the forecast.
  </p>
</div>
      
      <div className="mb-4">
        <label htmlFor="csvInput" className="block text-sm font-medium text-gray-700 mb-2">
          Upload CSV or Excel file
        </label>
        <input
          id="csvInput"
          type="file"
          onChange={handleFileChange}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
  <label htmlFor="prompt" style={{ display: 'block', fontSize: '16px', fontWeight: 'bold', color: '#4a4a4a', marginBottom: '8px' }}>
    Prompt
  </label>
  <textarea
    id="prompt"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    style={{ width: '100%', padding: '12px', fontSize: '14px', color: '#4a4a4a', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px' }}
    rows="4"
  ></textarea>
</div>

<button
  onClick={handleSendData}
  style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
>
  Generate Report
</button>

<div style={{ marginBottom: '24px' }}>
  <label htmlFor="generatedResponse" style={{ display: 'block', fontSize: '16px', fontWeight: 'bold', color: '#4a4a4a', marginBottom: '8px' }}>
    Generated Response:
  </label>
  <textarea
    id="generatedResponse"
    value={generatedResponse}
    onChange={(e) => setGeneratedResponse(e.target.value)}
    style={{ width: '100%', padding: '12px', fontSize: '14px', color: '#4a4a4a', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px' }}
    rows="10"
    readOnly
  ></textarea>
</div>

<button
  onClick={handleDownloadReport}
  style={{ backgroundColor: '#28a745', color: '#fff', fontWeight: 'bold', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
>
  Download Report
</button>

<div className="mb-6">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}