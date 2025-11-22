import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()

    const templates = [
      `${topic} - The Ultimate Guide for 2024`,
      `How to ${topic}: Step-by-Step Tutorial`,
      `${topic} Explained in 10 Minutes (Beginner Friendly)`,
      `Master ${topic} With These Simple Tips`,
      `The Truth About ${topic} (What They Don't Tell You)`,
      `${topic}: Everything You Need to Know`,
      `I Tried ${topic} for 30 Days - Here's What Happened`,
      `${topic} vs [Alternative] - Which Is Better?`,
      `5 ${topic} Mistakes You're Probably Making`,
      `${topic} Tutorial - From Zero to Hero`
    ]

    const title = templates[Math.floor(Math.random() * templates.length)]

    return NextResponse.json({ title })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate title' },
      { status: 500 }
    )
  }
}
