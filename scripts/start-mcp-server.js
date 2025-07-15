#!/usr/bin/env node

import { spawn } from 'child_process';

// Start the Playwright MCP server
function startPlaywrightMCPServer() {
  console.log('Starting Playwright MCP Server...');

  // Use npx to run the MCP server
  const mcpProcess = spawn('npx', ['@playwright/mcp'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: process.cwd(),
  });

  mcpProcess.stdout.on('data', (data) => {
    console.log(`MCP Server: ${data.toString()}`);
  });

  mcpProcess.stderr.on('data', (data) => {
    console.error(`MCP Server Error: ${data.toString()}`);
  });

  mcpProcess.on('close', (code) => {
    console.log(`MCP Server process exited with code ${code}`);
  });

  mcpProcess.on('error', (error) => {
    console.error('Failed to start MCP server:', error);
  });

  return mcpProcess;
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down MCP server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down MCP server...');
  process.exit(0);
});

// Start the server
startPlaywrightMCPServer();

// Keep the process alive
process.stdin.resume();
