import React from 'react';
import { useLocation } from 'react-router-dom';  // ADDED: To get navigation state
import './InstructionResultPage.css';

const InstructionResultPage = ({ steps = {} }) => {
  const { state } = useLocation();  // ADDED: Get data from HomePage
  const { aiResponse = '', config = {} } = state || {};  // ADDED: Extract aiResponse and config
  const commands = typeof aiResponse === 'string' ? aiResponse.split('\n').filter(cmd => cmd.trim()) : [];  // ADDED: Split string response into array

  // ADDED: Categorize commands based on keywords and config
  const categorizedSteps = {
    initialSetup: commands.filter(cmd => cmd.includes('mkdir') || cmd.includes('md') || cmd.includes('cd')),
    frontendSetup: commands.filter(cmd => cmd.toLowerCase().includes(config.FrontEnd?.Framework.toLowerCase() || '')),
    backendSetup: commands.filter(cmd => cmd.toLowerCase().includes(config.BackEnd?.Framework.toLowerCase() || '')),
    databaseSetup: commands.filter(cmd => cmd.toLowerCase().includes(config.Database?.Name.toLowerCase() || '')),
    ciCdSetup: commands.filter(cmd => cmd.toLowerCase().includes(config.PackageManager?.toLowerCase() || '') || cmd.toLowerCase().includes('cloud')),
  };

  // ADDED: Generate bash script from all commands
  const generatedBashScript = commands.length ? (config.OS === 'Windows' ? '@echo off\n' : '#!/bin/bash\n') + commands.join('\n') : '';

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
        {/* ADDED: Display categorized initial setup */}
        {categorizedSteps.initialSetup.length > 0 && (
          <ol className="step-list">
            {categorizedSteps.initialSetup.map((step, index) => (
              <li key={`initial-${index}`} className="step-item">{step}</li>
            ))}
          </ol>
        )}
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
        {/* ADDED: Display categorized frontend setup */}
        {categorizedSteps.frontendSetup.length > 0 && (
          <ol className="step-list">
            {categorizedSteps.frontendSetup.map((step, index) => (
              <li key={`frontend-${index}`} className="step-item">{step}</li>
            ))}
          </ol>
        )}
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
        {/* ADDED: Display categorized backend setup */}
        {categorizedSteps.backendSetup.length > 0 && (
          <ol className="step-list">
            {categorizedSteps.backendSetup.map((step, index) => (
              <li key={`backend-${index}`} className="step-item">{step}</li>
            ))}
          </ol>
        )}
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
        {/* ADDED: Display categorized database setup */}
        {categorizedSteps.databaseSetup.length > 0 && (
          <ol className="step-list">
            {categorizedSteps.databaseSetup.map((step, index) => (
              <li key={`database-${index}`} className="step-item">{step}</li>
            ))}
          </ol>
        )}
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
        {/* ADDED: Display categorized CI/CD setup */}
        {categorizedSteps.ciCdSetup.length > 0 && (
          <ol className="step-list">
            {categorizedSteps.ciCdSetup.map((step, index) => (
              <li key={`cicd-${index}`} className="step-item">{step}</li>
            ))}
          </ol>
        )}
      </div>

      {/* Bash Script Section */}
      <h2 className="script-title">Your Setup Bash Script</h2>
      <pre className="bash-script">
        {steps.bashScript || "No bash script available."}
      </pre>
      {/* ADDED: Display generated bash script */}
      {generatedBashScript && (
        <pre className="bash-script">
          {generatedBashScript}
        </pre>
      )}

      <a 
        className="download-link" 
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(steps.bashScript || '')}`}
        download="setup.sh"
      >
        Download Bash Script
      </a>
      {/* ADDED: Download link for generated script */}
      {generatedBashScript && (
        <a 
          className="download-link" 
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(generatedBashScript)}`}
          download={config.OS === 'Windows' ? `${config.Project}_setup.bat` : `${config.Project}_setup.sh`}
        >
          Download {config.OS === 'Windows' ? `${config.Project}_setup.bat` : `${config.Project}_setup.sh`}
        </a>
      )}
    </div>
  );
};

export default InstructionResultPage;