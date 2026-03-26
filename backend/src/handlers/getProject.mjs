/**
 * GET /api/projects/{projectId}?userId=xxx
 *
 * Get a single project by its ID.
 */

import { getItem } from '../shared/dynamo.mjs';
import { success, badRequest, notFound, serverError } from '../shared/response.mjs';

export async function handler(event) {
  try {
    const projectId = event.pathParameters?.projectId;
    const userId =
      event.queryStringParameters?.userId ||
      event.headers?.['x-user-id'];

    if (!projectId) {
      return badRequest('Missing path parameter: projectId');
    }
    if (!userId) {
      return badRequest('Missing required parameter: userId (query param or x-user-id header)');
    }

    const project = await getItem(process.env.PROJECTS_TABLE, {
      userId,
      projectId,
    });

    if (!project) {
      return notFound('Project not found');
    }

    return success({ project });
  } catch (err) {
    console.error('getProject error:', err);
    return serverError(err.message || 'Failed to get project');
  }
}
