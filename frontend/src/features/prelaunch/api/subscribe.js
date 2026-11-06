// Calls Vercel serverless function on same domain — no cold starts, always fast

export async function subscribeEmail(email) {
  let response

  try {
    response = await fetch(`/api/subscribe`, {
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
