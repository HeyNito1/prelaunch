// Sends the visitor's email to the backend (prelaunch-backend).
//
// - In development, "/api/..." is forwarded to http://localhost:5000 by the proxy in vite.config.js.
// - In production, set VITE_API_URL (for example VITE_API_URL=https://api.yoursite.com)
//   in a `.env.production` file BEFORE running `npm run build`.
const API_URL = import.meta.env.VITE_API_URL ?? "";

export async function subscribeEmail(email) {
  let response;

  try {
    response = await fetch(`${API_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  } catch {
    // Network problem or server not running
    throw new Error("Could not reach the server. Please try again.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data; // { message: "..." }
}