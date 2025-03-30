import React from 'react';
import { useLocation } from 'react-router-dom';
import './InstructionResultPage.css';

const InstructionResultPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);

  const steps = state?.steps || {};
  const config = state?.config || {};

  React.useEffect(() => {
    if (steps && Object.keys(steps).length > 0) {
      setIsLoading(false);
    }
  }, [steps]);

  const renderSteps = (stepsArray) => (
    <ol className="step-list">
      {stepsArray.map((step, index) => (
        <li key={index} className="step-item">
          <strong>{step.instruction}</strong>
          <br />
          <code className="cli-command">{step.command}</code>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="instruction-container">
      <h1 className="instruction-title">🧩 Step-by-Step Project Setup</h1>

      {isLoading && <div className="loading">Loading instructions...</div>}

      {!isLoading && (
        <>
          {['initialSetup', 'frontendSetup', 'backendSetup', 'databaseSetup', 'ciCdSetup'].map((section) => (
            <div key={section} className="step-section">
              <h2 className="step-section-title">
                {section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h2>
              {steps[section]?.length ? renderSteps(steps[section]) : <p>No steps provided.</p>}
            </div>
          ))}

          <h2 className="script-title">🖥️ Full Bash Script</h2>
          <pre className="bash-script">
            {steps.bashScript || "No bash script available."}
          </pre>

          <a
            className="download-link"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(steps.bashScript || '')}`}
            download={
              config?.OS === 'Windows'
                ? `${config?.Project || 'project'}_setup.bat`
                : `${config?.Project || 'project'}_setup.sh`
            }
          >
            ⬇️ Download {config?.OS === 'Windows' ? 'Batch File' : 'Bash Script'}
          </a>
        </>
      )}
    </div>
  );
};

export default InstructionResultPage;
