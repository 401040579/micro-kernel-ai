/**
 * POST /api/iterate
 *
 * Receives a project ID and modification requirements, calls Claude API
 * to incrementally modify the existing application structure.
 */

import { askClaude } from '../shared/claude.mjs';
import { getItem } from '../shared/dynamo.mjs';
import { success, badRequest, notFound, serverError } from '../shared/response.mjs';

const SYSTEM_PROMPT = `你是一个资深全栈工程师。用户已经有一个应用，现在需要在现有基础上进行增量修改。

你会收到：
1. 现有应用的完整结构（JSON）
2. 用户的修改需求

你的任务是：
1. 理解现有应用结构
2. 根据用户需求进行最小化修改，保留不需要改动的部分
3. 返回修改后的完整应用结构

请严格以 JSON 格式返回修改后的完整应用结构，与原结构保持相同的格式。
额外添加一个 "changes" 字段，列出本次修改的摘要：
{
  ...原有应用结构（修改后）,
  "changes": ["修改点1", "修改点2", ...]
}

只返回 JSON，不要包含其他文字或 markdown 代码块标记。`;

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    const { projectId, userId, prompt, currentStructure } = body;

    if (!prompt || typeof prompt !== 'string') {
      return badRequest('Missing required field: prompt');
    }

    // If projectId is provided, load the existing project from DynamoDB
    let existingStructure = currentStructure;
    if (projectId && userId && !existingStructure) {
      const project = await getItem(process.env.PROJECTS_TABLE, {
        userId,
        projectId,
      });
      if (!project) {
        return notFound('Project not found');
      }
      existingStructure = project.structure;
    }

    if (!existingStructure) {
      return badRequest('Missing project structure: provide currentStructure or valid projectId + userId');
    }

    const userPrompt = `现有应用结构：
${JSON.stringify(existingStructure, null, 2)}

用户修改需求：${prompt}`;

    const rawResponse = await askClaude(SYSTEM_PROMPT, userPrompt);

    let parsedResult;
    try {
      parsedResult = JSON.parse(rawResponse);
    } catch {
      parsedResult = { raw: rawResponse };
    }

    return success({
      result: parsedResult,
      projectId: projectId || null,
      iteratedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('iterateApp error:', err);
    return serverError(err.message || 'Failed to iterate app');
  }
}
