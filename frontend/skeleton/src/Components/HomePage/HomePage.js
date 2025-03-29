import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [selectedOS, setSelectedOS] = useState('Windows');

  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    frontEnd: {
      framework: 'React',
      version: '',
      packageManager: 'npm',
      additionalTools: [],
    },
    backEnd: {
      language: 'Node.js',
      version: '',
      framework: 'Express',
      additionalTools: [],
    },
    database: {
      type: 'PostgreSQL',
      version: '',
      orm: '',
    },
    cloudPlatform: '',
    ciCdPlatform: '',
    dockerSupport: false,
  });

  const handleOSToggle = (os) => setSelectedOS(os);

  const handleChange = (e, section, field) => {
    const { value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: newValue,
      },
    }));
  };

  const handleMultiSelectChange = (e, section, field) => {
    const options = e.target.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: selectedOptions,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Configuration:', formData);
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Project Configuration Wizard</h1>
        <p>Configure your full-stack project by selecting your preferred technologies and tools.</p>
        <div className="os-toggle">
          <button
            className={`os-button ${selectedOS === 'Windows' ? 'active' : ''}`}
            onClick={() => handleOSToggle('Windows')}
          >
            🪟 Windows
          </button>
          <button
            className={`os-button ${selectedOS === 'macOS' ? 'active' : ''}`}
            onClick={() => handleOSToggle('macOS')}
          >
            🍎 macOS
          </button>
        </div>
      </header>

      <form className="config-form" onSubmit={handleSubmit}>
        <h2>Project General Information</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={formData.projectName}
          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          required
        />
        <textarea
          placeholder="Project Description (optional)"
          value={formData.projectDescription}
          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
        />

        <h2>Front-End Configuration</h2>
        <select
          value={formData.frontEnd.framework}
          onChange={(e) => handleChange(e, 'frontEnd', 'framework')}
        >
          <option value="React">React</option>
          <option value="Vue.js">Vue.js</option>
          <option value="Angular">Angular</option>
          <option value="Svelte">Svelte</option>
        </select>
        <input
          type="text"
          placeholder="Front-End Framework Version (default: latest)"
          value={formData.frontEnd.version}
          onChange={(e) => handleChange(e, 'frontEnd', 'version')}
        />
        <select
          value={formData.frontEnd.packageManager}
          onChange={(e) => handleChange(e, 'frontEnd', 'packageManager')}
        >
          <option value="npm">npm</option>
          <option value="yarn">yarn</option>
          <option value="pnpm">pnpm</option>
        </select>
        <label>Additional Front-End Tools</label>
        <select
          multiple
          value={formData.frontEnd.additionalTools}
          onChange={(e) => handleMultiSelectChange(e, 'frontEnd', 'additionalTools')}
        >
          <option value="Redux">Redux</option>
          <option value="Tailwind CSS">Tailwind CSS</option>
          <option value="Material-UI">Material-UI</option>
          <option value="Bootstrap">Bootstrap</option>
          <option value="Sass">Sass</option>
        </select>

        <h2>Back-End Configuration</h2>
        <select
          value={formData.backEnd.language}
          onChange={(e) => handleChange(e, 'backEnd', 'language')}
        >
          <option value="Node.js">Node.js</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="Ruby">Ruby</option>
          <option value="Go">Go</option>
        </select>
        <input
          type="text"
          placeholder="Back-End Language Version (default: latest)"
          value={formData.backEnd.version}
          onChange={(e) => handleChange(e, 'backEnd', 'version')}
        />
        <select
          value={formData.backEnd.framework}
          onChange={(e) => handleChange(e, 'backEnd', 'framework')}
        >
          <option value="Express">Express (Node.js)</option>
          <option value="Django">Django (Python)</option>
          <option value="Spring Boot">Spring Boot (Java)</option>
          <option value="Ruby on Rails">Ruby on Rails (Ruby)</option>
          <option value="Gin">Gin (Go)</option>
        </select>
        <label>Additional Back-End Tools</label>
        <select
          multiple
          value={formData.backEnd.additionalTools}
          onChange={(e) => handleMultiSelectChange(e, 'backEnd', 'additionalTools')}
        >
          <option value="JWT">JWT for Authentication</option>
          <option value="Sequelize">Sequelize ORM</option>
          <option value="Mongoose">Mongoose ORM</option>
          <option value="TypeORM">TypeORM</option>
          <option value="Logger">Logger</option>
        </select>

        <h2>Database Configuration</h2>
        <select
          value={formData.database.type}
          onChange={(e) => handleChange(e, 'database', 'type')}
        >
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="MongoDB">MongoDB</option>
          <option value="SQLite">SQLite</option>
        </select>
        <input
          type="text"
          placeholder="Database Version"
          value={formData.database.version}
          onChange={(e) => handleChange(e, 'database', 'version')}
        />
        <input
          type="text"
          placeholder="ORM Library (e.g. Sequelize, Mongoose)"
          value={formData.database.orm}
          onChange={(e) => handleChange(e, 'database', 'orm')}
        />

        <h2>CI/CD & Deployment</h2>
        <select
          value={formData.ciCdPlatform}
          onChange={(e) => setFormData({ ...formData, ciCdPlatform: e.target.value })}
        >
          <option value="GitHub Actions">GitHub Actions</option>
          <option value="GitLab CI">GitLab CI</option>
          <option value="Travis CI">Travis CI</option>
          <option value="Jenkins">Jenkins</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={formData.dockerSupport}
            onChange={(e) => setFormData({ ...formData, dockerSupport: e.target.checked })}
          /> Include Docker Support
        </label>
        <select
          value={formData.cloudPlatform}
          onChange={(e) => setFormData({ ...formData, cloudPlatform: e.target.value })}
        >
          <option value="">Select Cloud Platform</option>
          <option value="AWS">AWS</option>
          <option value="GCP">GCP</option>
          <option value="Azure">Azure</option>
          <option value="Vercel">Vercel</option>
          <option value="Netlify">Netlify</option>
        </select>

        <button type="submit" className="submit-button">Generate Project Skeleton</button>
      </form>
    </div>
  );
};

export default HomePage;