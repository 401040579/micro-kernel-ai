/**
 * Backend API configuration.
 *
 * The API base URL is read from the VITE_API_BASE_URL environment variable.
 * During local development you can set it in a `.env.local` file:
 *
 *   VITE_API_BASE_URL=http://localhost:3000
 *
 * For production (GitHub Pages), set it in the repository's GitHub Actions
 * secrets / variables, or create a `.env.production` file:
 *
 *   VITE_API_BASE_URL=https://xxxxxxx.execute-api.us-east-1.amazonaws.com
 */

export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || '';

/**
 * Returns true when a real backend is configured.
 * The frontend can fall back to demo/simulation mode when false.
 */
export function isBackendConfigured(): boolean {
  return API_BASE_URL.length > 0;
}
