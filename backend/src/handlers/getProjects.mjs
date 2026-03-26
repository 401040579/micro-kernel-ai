/**
 * GET /api/projects?userId=xxx
 *
 * Get all projects for a given user.
 */

import { queryItems } from '../shared/dynamo.mjs';
import { success, badRequest, serverError } from '../shared/response.mjs';

export async function handler(event) {
  try {
    const userId =
      event.queryStringParameters?.userId ||
      event.headers?.['x-user-id'];

    if (!userId) {
      return badRequest('Missing required parameter: userId (query param or x-user-id header)');
    }

    const projects = await queryItems(process.env.PROJECTS_TABLE, 'userId', userId);

    // Sort by updatedAt descending
    projects.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));

    return success({ projects });
  } catch (err) {
    console.error('getProjects error:', err);
    return serverError(err.message || 'Failed to get projects');
  }
}
