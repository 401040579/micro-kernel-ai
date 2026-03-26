/**
 * POST /api/projects
 *
 * Save (create or update) a project in DynamoDB.
 */

import { randomUUID } from 'node:crypto';
import { putItem } from '../shared/dynamo.mjs';
import { created, badRequest, serverError } from '../shared/response.mjs';

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    const { userId, name, description, structure, status } = body;

    if (!userId) {
      return badRequest('Missing required field: userId');
    }
    if (!name) {
      return badRequest('Missing required field: name');
    }

    const projectId = body.projectId || randomUUID();
    const now = new Date().toISOString();

    const item = {
      userId,
      projectId,
      name,
      description: description || '',
      structure: structure || null,
      status: status || 'draft',
      createdAt: body.createdAt || now,
      updatedAt: now,
    };

    await putItem(process.env.PROJECTS_TABLE, item);

    return created({
      message: 'Project saved',
      project: item,
    });
  } catch (err) {
    console.error('saveProject error:', err);
    return serverError(err.message || 'Failed to save project');
  }
}
