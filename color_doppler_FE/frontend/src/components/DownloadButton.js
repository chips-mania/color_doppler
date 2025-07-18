// frontend/src/components/DownloadButton.js

import React from 'react';

const DownloadButton = ({ url }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <a
        href={url}
        download
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px'
        }}
      >
        Download Extracted Image
      </a>
    </div>
  );
};

export default DownloadButton;
