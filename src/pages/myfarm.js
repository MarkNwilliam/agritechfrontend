import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Page() {
  return (
    <main style={{ flex: 1, padding: '1em', textAlign: 'center' }} className="flex min-h-screen flex-col items-center justify-center p-24">
           <Link href="/" style={{ position: 'absolute', top: '8px', left: '8px' }}>
        <ArrowLeftIcon style={{ color: '#007bff', height: '20px', width: '20px' }} />
      </Link>
  <h1 style={{ color: '#343a40', fontSize: '2.5em', marginBottom: '0.5em' }}>Welcome to Our Platform</h1>
  <p style={{ color: '#6c757d', fontSize: '1.2em', maxWidth: '800px' }}>
    We provide a comprehensive suite of tools to help you manage your farm, analyze your finances, 
    understand your customers, and much more. Select an option from the sidebar to get started.
  </p>
  <img src="/agritech_home_image.jpg" alt="Welcome image" style={{ marginTop: '2em', maxWidth: '100%', height: 'auto' }} />
</main>
  )
}