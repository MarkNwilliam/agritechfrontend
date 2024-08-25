import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%', borderRight: '1px solid #ddd', padding: '1em', backgroundColor: '#f8f9fa' }}>
        <h2 style={{ color: '#343a40', marginBottom: '1em' }}>Dashboard</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li style={{ marginBottom: '1em' }}>
            <Link href="/myfarm">
              <p style={{ color: '#007bff', textDecoration: 'none' }}>My Farm</p>
            </Link>
          </li>
          <li style={{ marginBottom: '1em' }}>
            <Link href="/financialanalysis">
              <p style={{ color: '#007bff', textDecoration: 'none' }}>Financial Analysis</p>
            </Link>
          </li>
          <li style={{ marginBottom: '1em' }}>
            <Link href="/feedbackanalysis">
              <p style={{ color: '#007bff', textDecoration: 'none' }}>Feedback Analysis</p>
            </Link>
          </li>
          <li style={{ marginBottom: '1em' }}>
            <Link href="/customer">
              <p style={{ color: '#007bff', textDecoration: 'none' }}>Customer Analysis</p>
            </Link>
          </li>
          <li style={{ marginBottom: '1em' }}>
            <Link href="/diseases">
              <p style={{ color: '#007bff', textDecoration: 'none' }}>Disease Analysis</p>
            </Link>
          </li>
          <li style={{ marginBottom: '1em' }}>
            <Link href="/twitter">
              <p style={{ color: '#007bff', textDecoration: 'none' }}>Twitter</p>
            </Link>
          </li>
          <li style={{ marginBottom: '1em' }}>
            <Link href="/linkedin">
              <p style={{ color: '#007bff', textDecoration: 'none' }}>LinkedIn</p>
            </Link>
          </li>
        </ul>
      </div>
      <main style={{ flex: 1, padding: '1em', textAlign: 'center' }} className="flex min-h-screen flex-col items-center justify-center p-24">
  <h1 style={{ color: '#343a40', fontSize: '2.5em', marginBottom: '0.5em' }}>Welcome to Our Platform</h1>
  <p style={{ color: '#6c757d', fontSize: '1.2em', maxWidth: '800px' }}>
    We provide a comprehensive suite of tools to help you manage your farm, analyze your finances, 
    understand your customers, and much more. Select an option from the sidebar to get started.
  </p>
  <img src="/agritech_home_image.jpg" alt="Welcome image" style={{ marginTop: '2em', maxWidth: '100%', height: 'auto' }} />
</main>
    </div>
  );
}