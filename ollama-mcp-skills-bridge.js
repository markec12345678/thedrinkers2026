const { Ollama } = require('ollama');
const fs = require('fs');
const path = require('path');

class SkillsBridge {
  constructor() {
    this.ollama = new Ollama({ host: 'http://localhost:11434' });
    this.skills = [];
    this.skillsDir = path.join(__dirname, 'skills');
  }

  async loadSkills() {
    console.error('Loading skills...');
    
    // Check if skills directory exists
    if (!fs.existsSync(this.skillsDir)) {
      console.error('Skills directory not found, creating it...');
      fs.mkdirSync(this.skillsDir, { recursive: true });
      return this.skills;
    }
    
    const skillFiles = fs.readdirSync(this.skillsDir)
      .filter(f => f.endsWith('.js') && f !== 'index.js' && f !== 'skills-list.json');
    
    for (const file of skillFiles) {
      try {
        const skill = require(path.join(this.skillsDir, file));
        if (skill.name && skill.execute) {
          this.skills.push(skill);
          console.error(`  ✓ Loaded: ${skill.name}`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to load ${file}: ${error.message}`);
      }
    }
    
    console.error(`Total skills loaded: ${this.skills.length}`);
    return this.skills;
  }

  async executeSkill(skillName, params) {
    const skill = this.skills.find(s => s.name === skillName);
    
    if (!skill) {
      throw new Error(`Skill not found: ${skillName}`);
    }
    
    console.error(`Executing skill: ${skillName}`);
    const result = await skill.execute(params);
    
    return result;
  }

  listSkills() {
    return this.skills.map(s => ({
      name: s.name,
      description: s.description || 'No description',
      parameters: s.parameters || {},
    }));
  }
}

module.exports = SkillsBridge;
