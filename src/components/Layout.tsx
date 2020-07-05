import React from 'react';
import { ToastContainer } from 'react-toastify';

import globalStyles from '../styles/global';

export default function Layout({ children, title, description }) {
  return (
    <div className="page-layout">
      <div className="container">
        <main>
          <ToastContainer />

          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>

          {children}
        </main>

        <footer>
          <a
            href="https://github.com/jpedroschmitz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by João Pedro
          </a>
        </footer>
      </div>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}
