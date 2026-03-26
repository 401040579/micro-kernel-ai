/**
 * POST /api/generate
 *
 * Receives user requirements in natural language, calls Claude API
 * to analyze and generate an application structure (pages, components,
 * data models) returned as JSON.
 */

import { askClaude } from '../shared/claude.mjs';
import { success, badRequest, serverError } from '../shared/response.mjs';

const SYSTEM_PROMPT = `你是一个资深全栈工程师和产品架构师。用户会用自然语言描述他们想要的应用。

你的任务是：
1. 分析用户需求，提取核心功能点
2. 设计应用架构，包括页面结构、组件树、数据模型
3. 生成可运行的应用代码

请严格以 JSON 格式返回，结构如下：
{
  "appName": "应用名称",
  "description": "一句话描述",
  "features": ["功能1", "功能2", ...],
  "pages": [
    {
      "name": "页面名称",
      "route": "/path",
      "description": "页面描述",
      "components": [
        {
          "name": "组件名称",
          "type": "form|list|chart|card|nav|modal",
          "props": {},
          "description": "组件描述"
        }
      ]
    }
  ],
  "dataModels": [
    {
      "name": "模型名称",
      "fields": [
        { "name": "字段名", "type": "string|number|boolean|date|array|object", "required": true }
      ]
    }
  ],
  "techStack": {
    "frontend": "React + TypeScript + Tailwind CSS",
    "stateManagement": "Zustand",
    "styling": "Tailwind CSS"
  }
}

只返回 JSON，不要包含其他文字或 markdown 代码块标记。`;

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    const { prompt, userId } = body;

    if (!prompt || typeof prompt !== 'string') {
      return badRequest('Missing required field: prompt');
    }

    const rawResponse = await askClaude(SYSTEM_PROMPT, prompt);

    // Try to parse the response as JSON; return raw text if parsing fails
    let parsedResult;
    try {
      parsedResult = JSON.parse(rawResponse);
    } catch {
      parsedResult = { raw: rawResponse };
    }

    return success({
      result: parsedResult,
      userId: userId || 'anonymous',
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('generateApp error:', err);
    return serverError(err.message || 'Failed to generate app');
  }
}
