/**
 * API client for the MicroKernel AI backend.
 *
 * Every public function returns a typed result and throws on network /
 * server errors so callers can handle them in a single catch block.
 */

import { API_BASE_URL, isBackendConfigured } from './config';

// ---- Types ----------------------------------------------------------------

export interface GenerateRequest {
  prompt: string;
  userId?: string;
}

export interface GenerateResponse {
  result: Record<string, unknown>;
  userId: string;
  generatedAt: string;
}

export interface IterateRequest {
  projectId?: string;
  userId?: string;
  prompt: string;
  currentStructure?: Record<string, unknown>;
}

export interface IterateResponse {
  result: Record<string, unknown>;
  projectId: string | null;
  iteratedAt: string;
}

export interface SaveProjectRequest {
  userId: string;
  projectId?: string;
  name: string;
  description?: string;
  structure?: Record<string, unknown>;
  status?: 'draft' | 'published';
}

export interface ProjectItem {
  userId: string;
  projectId: string;
  name: string;
  description: string;
  structure: Record<string, unknown> | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Internal helpers -----------------------------------------------------

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!isBackendConfigured()) {
    throw new Error('Backend API is not configured. Set VITE_API_BASE_URL.');
  }

  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(errorBody.error || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ---- Public API -----------------------------------------------------------

/**
 * Generate a new app from a natural-language prompt.
 */
export function generateApp(data: GenerateRequest): Promise<GenerateResponse> {
  return request<GenerateResponse>('/api/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Iterate on an existing app structure.
 */
export function iterateApp(data: IterateRequest): Promise<IterateResponse> {
  return request<IterateResponse>('/api/iterate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Save (create or update) a project.
 */
export function saveProject(data: SaveProjectRequest): Promise<{ message: string; project: ProjectItem }> {
  return request('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get all projects for a user.
 */
export function getProjects(userId: string): Promise<{ projects: ProjectItem[] }> {
  return request(`/api/projects?userId=${encodeURIComponent(userId)}`);
}

/**
 * Get a single project by ID.
 */
export function getProject(projectId: string, userId: string): Promise<{ project: ProjectItem }> {
  return request(`/api/projects/${encodeURIComponent(projectId)}?userId=${encodeURIComponent(userId)}`);
}
