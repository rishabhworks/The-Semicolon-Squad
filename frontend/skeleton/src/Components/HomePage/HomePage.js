import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  // State variables for each field
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  
  // Front-End Configuration
  const [frontEndFramework, setFrontEndFramework] = useState('React');
  const [packageManager, setPackageManager] = useState('npm');
  const [packageManagerVersion, setPackageManagerVersion] = useState('');
  const [stylingLibrary, setStylingLibrary] = useState('None');
  
  // Back-End Configuration
  const [backEndFramework, setBackEndFramework] = useState('Express.js (Node.js)');
  const [projectStructure, setProjectStructure] = useState('Standard MVC');
  
  // Database Configuration
  const [databaseType, setDatabaseType] = useState('SQL (PostgreSQL/MySQL)');
  
  // CI/CD Options
  const [ciCdPlatform, setCiCdPlatform] = useState('GitHub Actions');
  
  // Environment
  const [operatingSystem, setOperatingSystem] = useState('Windows');

  const handleSubmit = (e) => {
    e.preventDefault();
    const configData = {
      projectName,
      projectDescription,
      frontEndFramework,
      packageManager,
      packageManagerVersion,
      stylingLibrary,
      backEndFramework,
      projectStructure,
      databaseType,
      ciCdPlatform,
      operatingSystem,
    };
    console.log("Project Configuration:", configData);
    // Process the configuration as needed
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Project Configuration Wizard</h1>
        <p className="homepage-caption">
          Configure your full-stack project in minutes using a smart tool to get you started & up to speed.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="config-form">
        <div className="form-grid">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-section">
              <h2>Project General Information</h2>
              <label>
                Project Name:
                <input
                  type="text"
                  placeholder="What is the name of your project?"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </label>
              <label>
                Project Description (Optional):
                <textarea
                  placeholder="Provide a short description of your project (optional)."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </label>
            </div>
            <div className="form-section">
              <h2>Front-End Configuration</h2>
              <label>
                Front-End Framework:
                <select
                  value={frontEndFramework}
                  onChange={(e) => setFrontEndFramework(e.target.value)}
                >
                  <option value="React">React (using Create React App)</option>
                  <option value="Vue">Vue</option>
                  <option value="Angular">Angular</option>
                </select>
              </label>
              <label>
                Package Manager:
                <select
                  value={packageManager}
                  onChange={(e) => setPackageManager(e.target.value)}
                >
                  <option value="npm">npm</option>
                  <option value="yarn">yarn</option>
                  <option value="pnpm">pnpm</option>
                </select>
              </label>
              <label>
                Package Manager Version:
                <input
                  type="text"
                  placeholder="Enter installed version (or leave blank if not installed)"
                  value={packageManagerVersion}
                  onChange={(e) => setPackageManagerVersion(e.target.value)}
                />
              </label>
              <label>
                Styling Libraries:
                <select
                  value={stylingLibrary}
                  onChange={(e) => setStylingLibrary(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="TailwindCSS">TailwindCSS</option>
                  <option value="Material-UI">Material-UI</option>
                  <option value="Bootstrap">Bootstrap</option>
                </select>
              </label>
            </div>
          </div>
          {/* Right Column */}
          <div className="form-column">
            <div className="form-section">
              <h2>Back-End Configuration</h2>
              <label>
                Back-End Framework/Language:
                <select
                  value={backEndFramework}
                  onChange={(e) => setBackEndFramework(e.target.value)}
                >
                  <option value="Express.js (Node.js)">Express.js (Node.js)</option>
                  <option value="Django (Python)">Django (Python)</option>
                  <option value="Spring Boot (Java)">Spring Boot (Java)</option>
                </select>
              </label>
              <label>
                Project Structure:
                <select
                  value={projectStructure}
                  onChange={(e) => setProjectStructure(e.target.value)}
                >
                  <option value="Standard MVC">Standard MVC</option>
                  <option value="REST API Template">REST API Template</option>
                </select>
              </label>
            </div>
            <div className="form-section-DB-CI-OS">
              <h2>Database & CI/CD & OS Options</h2>
              <label>
                Database Type:
                <select
                  value={databaseType}
                  onChange={(e) => setDatabaseType(e.target.value)}
                >
                  <option value="SQL (PostgreSQL/MySQL)">SQL (PostgreSQL/MySQL)</option>
                  <option value="NoSQL (MongoDB)">NoSQL (MongoDB)</option>
                  <option value="None">None</option>
                </select>
              </label>
              <label>
                CI/CD Platform:
                <select
                  value={ciCdPlatform}
                  onChange={(e) => setCiCdPlatform(e.target.value)}
                >
                  <option value="GitHub Actions">GitHub Actions</option>
                  <option value="GitLab CI">GitLab CI</option>
                  <option value="Travis CI">Travis CI</option>
                </select>
              </label>
              <label>
                Operating System:
                <select
                  value={operatingSystem}
                  onChange={(e) => setOperatingSystem(e.target.value)}
                >
                  <option value="Windows">Windows</option>
                  <option value="macOS">macOS</option>
                  <option value="Linux">Linux</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;
