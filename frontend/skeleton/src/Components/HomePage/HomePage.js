import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ADDED: For navigation
import './HomePage.css';
import { sendToAI } from "../../Services/aiapi";

const techStacks = {
  Windows: {
    frontEnd: ['React', 'Angular', 'Vue.js', 'Ember.js', 'Backbone.js'],
    backEnd: ['Node.js', '.NET', 'Java', 'Python', 'Ruby'],
    databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'SQL Server'],
    packageManagers: ['npm', 'yarn', 'NuGet', 'pip', 'gem'],
  },
  macOS: {
    frontEnd: ['React', 'Vue.js', 'Angular', 'Ember.js', 'Backbone.js'],
    backEnd: ['Node.js', 'Python', 'Ruby', 'Java', 'PHP'],
    databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'MariaDB'],
    packageManagers: ['npm', 'yarn', 'Homebrew', 'pip', 'gem'],
  },
};

const versions = {
  'Node.js': ['18.x', '16.x', '14.x'],
  '.NET': ['7.0', '6.0', '5.0'],
  Java: ['21', '17', '11', '8'],
  Python: ['3.12', '3.11', '3.10', '3.9'],
  Ruby: ['3.3', '3.2', '3.1'],
  PHP: ['8.1', '8.0', '7.4'],
  React: ['18.x', '17.x', '16.x'],
  Angular: ['17', '16', '15'],
  'Vue.js': ['3.x', '2.x'],
  'Ember.js': ['4.x', '3.x'],
  'Backbone.js': ['1.4', '1.3'],
  MySQL: ['8.0', '5.7'],
  PostgreSQL: ['14', '13', '12'],
  MongoDB: ['5.0', '4.4', '4.2'],
  SQLite: ['3.35', '3.34'],
  'SQL Server': ['2019', '2017'],
  MariaDB: ['10.6', '10.5'],
};

const HomePage = () => {
  const [selectedOS, setSelectedOS] = useState('Windows');
  const [frontEnd, setFrontEnd] = useState('');
  const [backEnd, setBackEnd] = useState('');
  const [database, setDatabase] = useState('');
  const [frontEndVersion, setFrontEndVersion] = useState('');
  const [backEndVersion, setBackEndVersion] = useState('');
  const [databaseVersion, setDatabaseVersion] = useState('');
  const [packageManager, setPackageManager] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const navigate = useNavigate();  // ADDED: Navigation hook

  useEffect(() => {
    setFrontEnd('');
    setBackEnd('');
    setDatabase('');
    setFrontEndVersion('');
    setBackEndVersion('');
    setDatabaseVersion('');
    setPackageManager('');
  }, [selectedOS]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      OS: selectedOS,
      Project: projectName,
      Description: projectDesc,
      FrontEnd: { Framework: frontEnd, Version: frontEndVersion },
      BackEnd: { Framework: backEnd, Version: backEndVersion },
      Database: { Name: database, Version: databaseVersion },
      PackageManager: packageManager,
    };

    console.log("🧠 Sending to AI:", config);

    const aiResponse = await sendToAI(config);

    if (aiResponse) {
      console.log("📥 AI Response Received:", aiResponse);
      alert("✅ AI setup instructions generated. Check console!");
      
      // ADDED: Categorize the response (assuming it’s a string for now)
      const commands = typeof aiResponse === 'string' ? aiResponse.split('\n').filter(cmd => cmd.trim()) : [];
      const stepsData = {
        initialSetup: commands.filter(cmd => cmd.includes('mkdir') || cmd.includes('md') || cmd.includes('cd')).map(cmd => ({
          instruction: cmd.includes('cd') ? "Navigate to the project folder." : "Create a new project folder.",
          command: cmd
        })),
        frontendSetup: commands.filter(cmd => cmd.toLowerCase().includes(config.FrontEnd.Framework.toLowerCase())).map(cmd => ({
          instruction: `Set up ${config.FrontEnd.Framework} frontend.`,
          command: cmd
        })),
        backendSetup: commands.filter(cmd => cmd.toLowerCase().includes(config.BackEnd.Framework.toLowerCase())).map(cmd => ({
          instruction: `Set up ${config.BackEnd.Framework} backend.`,
          command: cmd
        })),
        databaseSetup: commands.filter(cmd => cmd.toLowerCase().includes(config.Database.Name.toLowerCase())).map(cmd => ({
          instruction: `Set up ${config.Database.Name} database.`,
          command: cmd
        })),
        ciCdSetup: commands.filter(cmd => cmd.toLowerCase().includes(config.PackageManager.toLowerCase())).map(cmd => ({
          instruction: `Configure ${config.PackageManager} for CI/CD.`,
          command: cmd
        })),
        bashScript: commands.length ? (config.OS === 'Windows' ? '@echo off\n' : '#!/bin/bash\n') + commands.join('\n') : ''
      };

      navigate('/Instruction', { state: { steps: stepsData } });  // ADDED: Navigate with categorized steps
    } else {
      alert("❌ Failed to fetch AI instructions.");
    }
  };

  return (
    <div className={`homepage ${selectedOS}`}>
      <header>
        <h1>🚀 Project Configuration Wizard</h1>
        <div className="os-toggle">
          <button
            className={selectedOS === 'Windows' ? 'active' : ''}
            onClick={() => setSelectedOS('Windows')}
          >
            🪟 Windows
          </button>
          <button
            className={selectedOS === 'macOS' ? 'active' : ''}
            onClick={() => setSelectedOS('macOS')}
          >
            🍎 macOS
          </button>
        </div>
      </header>

      <form className="config-form" onSubmit={handleSubmit}>
        <section>
          <label>Project Name</label>
          <input
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My Awesome App"
          />
        </section>

        <section>
          <label>Description (optional)</label>
          <textarea
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            placeholder="Brief description"
          ></textarea>
        </section>

        <section>
          <label>Front-End Framework</label>
          <select
            required
            value={frontEnd}
            onChange={(e) => setFrontEnd(e.target.value)}
          >
            <option value="">Select Front-End</option>
            {techStacks[selectedOS].frontEnd.map((fe) => (
              <option key={fe} value={fe}>{fe}</option>
            ))}
          </select>

          {frontEnd && (
            <>
              <label>{frontEnd} Version</label>
              <select
                required
                value={frontEndVersion}
                onChange={(e) => setFrontEndVersion(e.target.value)}
              >
                <option value="">Select Version</option>
                {versions[frontEnd].map((ver) => (
                  <option key={ver} value={ver}>{ver}</option>
                ))}
              </select>
            </>
          )}
        </section>

        <section>
          <label>Back-End Framework</label>
          <select
            required
            value={backEnd}
            onChange={(e) => setBackEnd(e.target.value)}
          >
            <option value="">Select Back-End</option>
            {techStacks[selectedOS].backEnd.map((be) => (
              <option key={be} value={be}>{be}</option>
            ))}
          </select>

          {backEnd && (
            <>
              <label>{backEnd} Version</label>
              <select
                required
                value={backEndVersion}
                onChange={(e) => setBackEndVersion(e.target.value)}
              >
                <option value="">Select Version</option>
                {versions[backEnd].map((ver) => (
                  <option key={ver} value={ver}>{ver}</option>
                ))}
              </select>
            </>
          )}
        </section>

        <section>
          <label>Database</label>
          <select required value={database} onChange={(e) => setDatabase(e.target.value)}>
            <option value="">Select Database</option>
            {techStacks[selectedOS].databases.map((db) => (
              <option key={db} value={db}>{db}</option>
            ))}
          </select>

          {database && (
            <>
              <label>{database} Version</label>
              <select
                required
                value={databaseVersion}
                onChange={(e) => setDatabaseVersion(e.target.value)}
              >
                <option value="">Select Version</option>
                {versions[database].map((ver) => (
                  <option key={ver} value={ver}>{ver}</option>
                ))}
              </select>
            </>
          )}
        </section>

        <section>
          <label>Package Manager</label>
          <select required value={packageManager} onChange={(e) => setPackageManager(e.target.value)}>
            <option value="">Select Package Manager</option>
            {techStacks[selectedOS].packageManagers.map((pm) => (
              <option key={pm} value={pm}>{pm}</option>
            ))}
          </select>
        </section>

        <button type="submit" className="submit-btn">
          Generate Project 🚀
        </button>
      </form>
    </div>
  );
};

export default HomePage;