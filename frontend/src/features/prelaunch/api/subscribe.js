const API_URL = "https://heynito-prelaunch-backend.onrender.com"

export async function subscribeEmail(email) {
  let response

  try {
    response = await fetch(`${API_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
  } catch {
    throw new Error("Could not reach the server. Please try again.")
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.")
  }

  return data
}
