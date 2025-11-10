import { useState, useEffect } from 'react'
import { githubApi } from '../lib/githubApi'
import type { DashboardStats, GitHubUser } from '../types/github'

export function useGitHubData(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchData = async () => {
    if (!username) {
      setError('No username provided')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const dashboardStats = await githubApi.getDashboardStats(username)
      const userData = await githubApi.getUser(username)

      setStats(dashboardStats)
      setUser(userData)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data')
      console.error('Error fetching GitHub data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [username])

  return {
    user,
    stats,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
  }
}
