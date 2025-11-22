import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Simulated trending topics - in production, use YouTube Data API
    const trendingTopics = [
      'AI & Machine Learning',
      'Web Development',
      'Productivity Tools',
      'Cryptocurrency & Blockchain',
      'Personal Finance',
      'Fitness & Health',
      'Sustainable Living',
      'Gaming',
      'Travel Destinations',
      'Cooking & Recipes'
    ]

    const trends = `🔥 Trending on YouTube Right Now:

${trendingTopics.map((topic, i) => `${i + 1}. ${topic}`).join('\n')}

📈 Content Opportunities:
• Tutorial and How-To videos are performing well
• Short-form content (under 10 minutes) getting high engagement
• Challenge and experiment videos gaining traction
• Behind-the-scenes content resonating with audiences
• Educational content in tech and finance niches growing

💡 Pro Tips:
• Jump on trends early (within 24-48 hours)
• Put your unique spin on trending topics
• Combine multiple trending elements
• Use trending audio/music in shorts
• Monitor Google Trends alongside YouTube trends

Note: For real-time trending data, connect YouTube Data API v3`

    return NextResponse.json({ trends })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: 500 }
    )
  }
}
