import React from 'react';
import './InstructionResultPage.css';

const InstructionResultPage = ({ steps = {} }) => {
  return (
    <div className="instruction-container">
      <h1 className="instruction-title">Command Line Instructions</h1>

      {/* Initial Setup Section */}
      <div className="step-section">
        <h2 className="step-section-title">Initial Setup</h2>
        <ol className="step-list">
          {steps.initialSetup?.length ? (
            steps.initialSetup.map((step, index) => (
              <li key={index} className="step-item">{step}</li>
            ))
          ) : (
            <li className="step-item">No instructions available.</li>
          )}
        </ol>
      </div>

      {/* Frontend Setup Section */}
      <div className="step-section">
        <h2 className="step-section-title">Frontend Setup</h2>
        <ol className="step-list">
          {steps.frontendSetup?.length ? (
            steps.frontendSetup.map((step, index) => (
              <li key={index} className="step-item">{step}</li>
            ))
          ) : (
            <li className="step-item">No instructions available.</li>
          )}
        </ol>
      </div>

      {/* Backend Setup Section */}
      <div className="step-section">
        <h2 className="step-section-title">Backend Setup</h2>
        <ol className="step-list">
          {steps.backendSetup?.length ? (
            steps.backendSetup.map((step, index) => (
              <li key={index} className="step-item">{step}</li>
            ))
          ) : (
            <li className="step-item">No instructions available.</li>
          )}
        </ol>
      </div>

      {/* Database Setup Section */}
      <div className="step-section">
        <h2 className="step-section-title">Database Setup</h2>
        <ol className="step-list">
          {steps.databaseSetup?.length ? (
            steps.databaseSetup.map((step, index) => (
              <li key={index} className="step-item">{step}</li>
            ))
          ) : (
            <li className="step-item">No instructions available.</li>
          )}
        </ol>
      </div>

      {/* CI/CD Setup Section */}
      <div className="step-section">
        <h2 className="step-section-title">CI/CD Setup</h2>
        <ol className="step-list">
          {steps.ciCdSetup?.length ? (
            steps.ciCdSetup.map((step, index) => (
              <li key={index} className="step-item">{step}</li>
            ))
          ) : (
            <li className="step-item">No instructions available.</li>
          )}
        </ol>
      </div>

      {/* Bash Script Section */}
      <h2 className="script-title">Your Setup Bash Script</h2>
      <pre className="bash-script">
        {steps.bashScript || "No bash script available."}
      </pre>

      <a 
        className="download-link" 
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(steps.bashScript || '')}`}
        download="setup.sh"
      >
        Download Bash Script
      </a>
    </div>
  );
};

export default InstructionResultPage;
