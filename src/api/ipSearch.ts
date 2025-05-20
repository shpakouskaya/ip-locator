import axios from 'axios'

interface IpApiResponse {
  ip: string
  success: boolean
  message?: string
  country: string
  flag: {
    emoji: string
  }
  timezone: {
    id: string
  }
}

export interface IpLocationResult {
  ip: string
  country: string
  countryEmoji: string
  timezone: string
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchIpLocation(ip: string): Promise<IpLocationResult> {
  const QUERIES = 'ip,success,country,flag.emoji,timezone.id'
  const url = `https://ipwho.is/${ip}?fields=${QUERIES}`
  const { data } = await axios.get<IpApiResponse>(url)

  if (!data.success) {
    throw new Error('Invalid IP or not found')
  }

  // Simulation of the delay
  // Add randomized delay between 2000ms and 10000ms
  const randomDelay = Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000
  await delay(randomDelay)

  return {
    ip: data.ip,
    country: data.country,
    countryEmoji: data.flag.emoji,
    timezone: data.timezone.id
  }
}
