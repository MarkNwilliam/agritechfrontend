import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Page() {
  const [farmerName, setFarmerName] = useState('');
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
    const [targetMarket, setTargetMarket] = useState('');   
  const [post, setPost] = useState('');

  const generatePost = () => {
    const newPost = `Farmer: ${farmerName}, Product: ${productName}, Type: ${productType}, Description: ${description}, Target Market: ${targetMarket}`; 
    setPost(newPost);

    Swal.fire({
      title: 'Generating post...',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    axios.post('https://agritechbackend-c2cpd4gwbvg4cha7.eastus-01.azurewebsites.net/twitter_ai', { prompt: newPost })
      .then((response) => {
        setPost(response.data.response);
        Swal.fire({
          icon: 'success',
          title: 'Post generated successfully',
          text: response.data.response
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'An error occurred',
          text: error.toString()
        });
      });
  };

  return(
    <div style={{ padding: '24px', position: 'relative' }}>
      <Link href="/" style={{ position: 'absolute', top: '8px', left: '8px' }}>
        <ArrowLeftIcon style={{ color: '#007bff', height: '20px', width: '20px' }} />
      </Link>
      <h1>Twitter</h1>

      <input type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} placeholder="Farmer Name" style={{ display: 'block', marginBottom: '16px' }} />
      <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" style={{ display: 'block', marginBottom: '16px' }} />
      <input type="text" value={productType} onChange={(e) => setProductType(e.target.value)} placeholder="Product Type" style={{ display: 'block', marginBottom: '16px' }} />
      <input type="text" value={targetMarket} onChange={(e) => setTargetMarket(e.target.value)} placeholder="Target Market" style={{ display: 'block', marginBottom: '16px' }} /> 
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ display: 'block', marginBottom: '16px', width: '100%', minHeight: '60px' }} />

      <button onClick={generatePost} style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '16px' }}>
        Generate Post
      </button>

      <textarea value={post} readOnly style={{ width: '100%', minHeight: '100px' }} />
    </div>
  );
}