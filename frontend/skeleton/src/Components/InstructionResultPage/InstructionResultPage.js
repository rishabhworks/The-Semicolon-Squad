import React from 'react';
import { useLocation } from 'react-router-dom';  // ADDED: To get navigation state
import './InstructionResultPage.css';

const InstructionResultPage = ({ steps = {} }) => {
  const { state } = useLocation();  // ADDED: Get data from HomePage
  const [isLoading, setIsLoading] = React.useState(true);  // ADDED: Loading state
  const apiSteps = state?.steps || {};  // ADDED: API-provided steps

  // ADDED: Simulate loading until API data is ready
  React.useEffect(() => {
    if (state?.steps) {
      setIsLoading(false);
    }
  }, [state]);

  // ADDED: Helper function to render steps with instruction and command
  const renderSteps = (stepsArray) => (
    <ol className="step-list">
      {stepsArray && stepsArray.length > 0 ? (
        stepsArray.map((step, index) => (
          <li key={index} className="step-item">
            <span className="instruction-text">{step.instruction}</span>
            <br />
            <code className="cli-command">{step.command}</code>
          </li>
        ))
      ) : (
        <li className="step-item">No instructions available.</li>
      )}
    </ol>
  );

  return (
    <div className="instruction-container">
      <h1 className="instruction-title">Command Line Instructions</h1>

      {/* ADDED: Loading state */}
      {isLoading && <div className="loading">Loading...</div>}

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
        {/* ADDED: Render API-provided initial setup */}
        {!isLoading && apiSteps.initialSetup && renderSteps(apiSteps.initialSetup)}
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
        {/* ADDED: Render API-provided frontend setup */}
        {!isLoading && apiSteps.frontendSetup && renderSteps(apiSteps.frontendSetup)}
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
        {/* ADDED: Render API-provided backend setup */}
        {!isLoading && apiSteps.backendSetup && renderSteps(apiSteps.backendSetup)}
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
        {/* ADDED: Render API-provided database setup */}
        {!isLoading && apiSteps.databaseSetup && renderSteps(apiSteps.databaseSetup)}
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
        {/* ADDED: Render API-provided CI/CD setup */}
        {!isLoading && apiSteps.ciCdSetup && renderSteps(apiSteps.ciCdSetup)}
      </div>

      {/* Bash Script Section */}
      <h2 className="script-title">Your Setup Bash Script</h2>
      <pre className="bash-script">
        {steps.bashScript || "No bash script available."}
      </pre>
      {/* ADDED: Render API-provided bash script */}
      {!isLoading && apiSteps.bashScript && (
        <pre className="bash-script">{apiSteps.bashScript}</pre>
      )}

      <a 
        className="download-link" 
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(steps.bashScript || '')}`}
        download="setup.sh"
      >
        Download Bash Script
      </a>
      {/* ADDED: Download link for API-provided script */}
      {!isLoading && apiSteps.bashScript && (
        <a 
          className="download-link" 
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(apiSteps.bashScript)}`}
          download={state?.config?.OS === 'Windows' ? `${state?.config?.Project}_setup.bat` : `${state?.config?.Project}_setup.sh`}
        >
          Download {state?.config?.OS === 'Windows' ? `${state?.config?.Project}_setup.bat` : `${state?.config?.Project}_setup.sh`}
        </a>
      )}
    </div>
  );
};

export default InstructionResultPage;