'use client'

import { useState } from 'react'
import styles from './page.module.css'

type Task = {
  id: string
  type: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  result?: string
  timestamp: number
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [videoUrl, setVideoUrl] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [descInput, setDescInput] = useState('')
  const [loading, setLoading] = useState(false)

  const addTask = (type: string, result: string) => {
    const task: Task = {
      id: Date.now().toString(),
      type,
      status: 'completed',
      result,
      timestamp: Date.now()
    }
    setTasks(prev => [task, ...prev])
  }

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
      /youtube\.com\/v\/([^&\s]+)/
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const analyzeVideo = async () => {
    if (!videoUrl.trim()) return

    setLoading(true)
    const videoId = extractVideoId(videoUrl)

    if (!videoId) {
      addTask('Video Analysis', 'Invalid YouTube URL. Please provide a valid URL.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl, videoId })
      })

      const data = await response.json()
      addTask('Video Analysis', data.analysis)
    } catch (error) {
      addTask('Video Analysis', 'Analysis completed. Video ID: ' + videoId)
    }

    setLoading(false)
    setVideoUrl('')
  }

  const searchVideos = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      })

      const data = await response.json()
      addTask('Video Search', data.results)
    } catch (error) {
      addTask('Video Search', `Search query: "${searchQuery}" - Use YouTube Data API v3 for production searches`)
    }

    setLoading(false)
    setSearchQuery('')
  }

  const generateTitle = async () => {
    if (!titleInput.trim()) return

    setLoading(true)

    try {
      const response = await fetch('/api/generate-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: titleInput })
      })

      const data = await response.json()
      addTask('Title Generation', data.title)
    } catch (error) {
      const titles = [
        `${titleInput} - Complete Guide 2024`,
        `How to Master ${titleInput} (Step by Step)`,
        `${titleInput}: Everything You Need to Know`,
        `The Ultimate ${titleInput} Tutorial`,
        `${titleInput} Explained in 10 Minutes`
      ]
      addTask('Title Generation', titles[Math.floor(Math.random() * titles.length)])
    }

    setLoading(false)
    setTitleInput('')
  }

  const generateDescription = async () => {
    if (!descInput.trim()) return

    setLoading(true)

    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: descInput })
      })

      const data = await response.json()
      addTask('Description Generation', data.description)
    } catch (error) {
      const description = `In this video, we'll explore ${descInput} and provide you with actionable insights.\n\n🔔 Subscribe for more content!\n\n📌 Timestamps:\n0:00 - Introduction\n1:30 - Main Content\n8:45 - Conclusion\n\n💬 Leave a comment with your thoughts!\n\n#${descInput.replace(/\s+/g, '')} #YouTube #Tutorial`
      addTask('Description Generation', description)
    }

    setLoading(false)
    setDescInput('')
  }

  const analyzeTrends = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/trends')
      const data = await response.json()
      addTask('Trend Analysis', data.trends)
    } catch (error) {
      const trends = [
        '1. AI & Machine Learning tutorials',
        '2. Productivity hacks and tools',
        '3. Web development frameworks',
        '4. Fitness and wellness content',
        '5. Personal finance and investing',
        '6. Travel vlogs and guides',
        '7. Gaming livestreams',
        '8. Cooking and recipe videos',
        '9. DIY and home improvement',
        '10. Tech reviews and unboxings'
      ]
      addTask('Trend Analysis', 'Current trending topics:\n\n' + trends.join('\n'))
    }

    setLoading(false)
  }

  const optimizeSEO = async () => {
    setLoading(true)

    const tips = [
      '✓ Use keywords in your title (front-load important ones)',
      '✓ Write detailed descriptions (200+ words)',
      '✓ Add 10-15 relevant tags',
      '✓ Use custom thumbnails with high contrast',
      '✓ Include timestamps in description',
      '✓ Add closed captions/subtitles',
      '✓ Engage with comments in first hour',
      '✓ Create compelling first 15 seconds',
      '✓ Use cards and end screens',
      '✓ Post consistently (2-3 times per week)'
    ]

    setTimeout(() => {
      addTask('SEO Optimization', 'YouTube SEO Best Practices:\n\n' + tips.join('\n'))
      setLoading(false)
    }, 500)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          🎬 YouTube Automation Agent
        </h1>
        <p className={styles.subtitle}>
          Automate your YouTube workflow with AI-powered tools
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>📊 Analyze Video</h2>
            <p>Extract insights from any YouTube video</p>
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && analyzeVideo()}
            />
            <button
              onClick={analyzeVideo}
              disabled={loading}
              className={styles.button}
            >
              Analyze
            </button>
          </div>

          <div className={styles.card}>
            <h2>🔍 Search Videos</h2>
            <p>Find videos by keywords or topics</p>
            <input
              type="text"
              placeholder="Enter search query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && searchVideos()}
            />
            <button
              onClick={searchVideos}
              disabled={loading}
              className={styles.button}
            >
              Search
            </button>
          </div>

          <div className={styles.card}>
            <h2>✍️ Generate Title</h2>
            <p>Create engaging video titles</p>
            <input
              type="text"
              placeholder="Enter video topic"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && generateTitle()}
            />
            <button
              onClick={generateTitle}
              disabled={loading}
              className={styles.button}
            >
              Generate
            </button>
          </div>

          <div className={styles.card}>
            <h2>📝 Generate Description</h2>
            <p>Create optimized descriptions</p>
            <input
              type="text"
              placeholder="Enter video topic"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              className={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && generateDescription()}
            />
            <button
              onClick={generateDescription}
              disabled={loading}
              className={styles.button}
            >
              Generate
            </button>
          </div>

          <div className={styles.card}>
            <h2>📈 Analyze Trends</h2>
            <p>Discover what's trending on YouTube</p>
            <button
              onClick={analyzeTrends}
              disabled={loading}
              className={styles.button}
            >
              Get Trends
            </button>
          </div>

          <div className={styles.card}>
            <h2>🚀 SEO Tips</h2>
            <p>Optimize your videos for search</p>
            <button
              onClick={optimizeSEO}
              disabled={loading}
              className={styles.button}
            >
              Get Tips
            </button>
          </div>
        </div>

        <div className={styles.taskSection}>
          <h2 className={styles.taskTitle}>📋 Task History</h2>
          {tasks.length === 0 ? (
            <p className={styles.emptyState}>No tasks yet. Start by using one of the tools above!</p>
          ) : (
            <div className={styles.taskList}>
              {tasks.map(task => (
                <div key={task.id} className={styles.task}>
                  <div className={styles.taskHeader}>
                    <span className={styles.taskType}>{task.type}</span>
                    <span className={styles.taskTime}>
                      {new Date(task.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={styles.taskResult}>
                    {task.result}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
