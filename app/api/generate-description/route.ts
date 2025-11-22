import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()

    const description = `Welcome to our comprehensive guide on ${topic}!

In this video, we'll dive deep into ${topic} and show you everything you need to know to get started. Whether you're a complete beginner or looking to improve your skills, this tutorial has something for everyone.

🎯 What You'll Learn:
• Understanding the basics of ${topic}
• Advanced techniques and best practices
• Common mistakes to avoid
• Real-world examples and applications
• Tips from industry experts

⏱️ Timestamps:
0:00 - Introduction
1:30 - Getting Started with ${topic}
4:15 - Core Concepts Explained
7:45 - Advanced Techniques
11:20 - Common Mistakes to Avoid
14:10 - Conclusion & Next Steps

🔔 Don't forget to subscribe and hit the bell icon to get notified when we post new videos!

💬 Have questions? Drop them in the comments below and I'll do my best to answer them.

👍 If you found this helpful, please give it a thumbs up!

📱 Connect With Us:
• Website: yourwebsite.com
• Twitter: @youraccount
• Instagram: @youraccount

#${topic.replace(/\s+/g, '')} #Tutorial #HowTo #Education #Learning

---
🎬 Related Videos:
Check out our other tutorials in the playlist!

⚠️ Disclaimer: This content is for educational purposes only.`

    return NextResponse.json({ description })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    )
  }
}
