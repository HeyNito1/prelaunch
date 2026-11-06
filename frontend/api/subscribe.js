const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  try {
    const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
    const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
      throw new Error('Redis not configured')
    }

    // Check if already exists
    const checkRes = await fetch(`${UPSTASH_URL}/sismember/subscribers/${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    })
    const checkData = await checkRes.json()

    if (checkData.result === 1) {
      return res.status(200).json({ message: "You're already on the list!" })
    }

    // Add to set
    await fetch(`${UPSTASH_URL}/sadd/subscribers/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    })

    // Also store with timestamp
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    await fetch(`${UPSTASH_URL}/lpush/subscriber_list/${encodeURIComponent(JSON.stringify({ email, at: timestamp }))}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    })

    return res.status(201).json({ message: "You're on the list! We'll notify you at launch." })

  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}
