/**
 * Claude API client wrapper.
 *
 * The Anthropic API key is loaded from AWS SSM Parameter Store on cold start
 * and cached for the lifetime of the Lambda execution environment.
 *
 * Uses the native fetch available in Node.js 20.x runtime.
 */

import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const ANTHROPIC_VERSION = '2023-06-01';

// Cached API key (resolved once per cold start)
let cachedApiKey = null;

async function getApiKey() {
  if (cachedApiKey) return cachedApiKey;

  const ssmPath = process.env.ANTHROPIC_API_KEY_SSM_PATH;
  if (!ssmPath) {
    throw new Error('ANTHROPIC_API_KEY_SSM_PATH environment variable is not set');
  }

  const ssm = new SSMClient({});
  const result = await ssm.send(
    new GetParameterCommand({ Name: ssmPath, WithDecryption: true })
  );

  cachedApiKey = result.Parameter?.Value;
  if (!cachedApiKey) {
    throw new Error(`SSM parameter ${ssmPath} has no value`);
  }

  return cachedApiKey;
}

/**
 * Send a prompt to Claude and return the parsed response.
 *
 * @param {string} systemPrompt - System-level instructions
 * @param {string} userPrompt   - User message content
 * @param {object} [options]    - Optional overrides
 * @param {number} [options.maxTokens=4096]
 * @returns {Promise<string>} The assistant's text reply
 */
export async function askClaude(systemPrompt, userPrompt, options = {}) {
  const apiKey = await getApiKey();
  const maxTokens = options.maxTokens || 4096;

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();

  // Extract the text content from the response
  const textBlock = data.content?.find((block) => block.type === 'text');
  if (!textBlock) {
    throw new Error('No text content in Claude response');
  }

  return textBlock.text;
}
