#!/usr/bin/env node

/**
 * Ollama Skills Bridge - MCP Server
 * Connects 424 skills to Ollama via Model Context Protocol
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const SkillsBridge = require('./skills-bridge');

// Initialize skills bridge
const bridge = new SkillsBridge();

// Create MCP server
const server = new Server(
  {
    name: 'ollama-skills-bridge',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Handle initialization
server.setRequestHandler('initialize', async () => {
  console.error('Initializing Ollama Skills Bridge...');
  await bridge.loadSkills();
  return {
    capabilities: server.capabilities,
  };
});

// List all available tools (skills)
server.setRequestHandler('tools/list', async () => {
  const skills = bridge.listSkills();
  
  return {
    tools: skills.map(skill => ({
      name: skill.name,
      description: skill.description,
      inputSchema: {
        type: 'object',
        properties: skill.parameters || {},
        required: Object.keys(skill.parameters || {}).filter(k => skill.parameters[k].required),
      },
    })),
  };
});

// Execute a skill
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  console.error(`Executing skill: ${name}`);
  
  try {
    const result = await bridge.executeSkill(name, args);
    
    return {
      content: [
        {
          type: 'text',
          text: typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result),
        },
      ],
    };
  } catch (error) {
    console.error(`Error executing skill ${name}:`, error);
    return {
      content: [
        {
          type: 'text',
          text: `Error executing skill ${name}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// List available resources
server.setRequestHandler('resources/list', async () => {
  return {
    resources: [
      {
        uri: 'ollama://skills',
        name: 'Available Skills',
        description: 'List of all available skills',
        mimeType: 'application/json',
      },
      {
        uri: 'ollama://models',
        name: 'Ollama Models',
        description: 'List of available Ollama models',
        mimeType: 'application/json',
      },
    ],
  };
});

// Read a resource
server.setRequestHandler('resources/read', async (request) => {
  const { uri } = request.params;
  
  if (uri === 'ollama://skills') {
    const skills = bridge.listSkills();
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(skills, null, 2),
        },
      ],
    };
  }
  
  if (uri === 'ollama://models') {
    const models = await bridge.ollama.list();
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(models.models, null, 2),
        },
      ],
    };
  }
  
  throw new Error(`Unknown resource: ${uri}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Ollama Skills Bridge MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
