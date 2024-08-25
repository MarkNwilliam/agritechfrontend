import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

export default function FeedbackAnalysis() {
  const [csvData, setCsvData] = useState(null);
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [prompt, setPrompt] = useState('');

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
      title: 'Generating Report',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/feedback_ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: csvData,
          prompt: prompt
        }),
      });

      const result = await response.json();
      console.log('API Response:', result);
      setGeneratedResponse(result.response);
      Swal.close();
    } catch (error) {
      console.log(error)
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

  return (
    <div className="relative p-6">
      <Link href="/" className="absolute top-0 left-0 mt-2 ml-2">
        <ArrowLeftIcon className="text-blue-500" style={{ height: '20px', width: '20px' }} />
      </Link>
      <h1 className="text-3xl font-bold mb-6">Feedback Analysis</h1>
      
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
    </div>
  );
}