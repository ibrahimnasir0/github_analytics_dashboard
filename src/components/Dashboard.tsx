import { useGitHubData } from '../hooks/useGitHubData'
import { MetricCard } from './dashboard/MetricCard'
import { LanguageChart } from './dashboard/LanguageChart'
import { ActivityChart } from './dashboard/ActivityChart'
import { RepositoriesTable } from './dashboard/RepositoriesTable'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  GitBranch,
  Star,
  GitFork,
  GitCommit,
  RefreshCw,
  Settings,
  Github,
  Users,
  MapPin,
  Link as LinkIcon,
} from 'lucide-react'
import { useState } from 'react'
import { formatNumber } from '../lib/utils'

interface DashboardProps {
  initialUsername?: string
}

export function Dashboard({ initialUsername = 'ibrahimnasir0' }: DashboardProps) {
  const [username, setUsername] = useState(initialUsername)
  const [inputValue, setInputValue] = useState(initialUsername)
  const [showSettings, setShowSettings] = useState(false)

  const { user, stats, loading, error, lastUpdated, refetch } = useGitHubData(username)

  const handleUsernameChange = () => {
    if (inputValue.trim()) {
      setUsername(inputValue.trim())
      setShowSettings(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">GitHub Analytics</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="text-sm font-medium mb-3">Change GitHub Username</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter GitHub username"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUsernameChange()}
                  className="max-w-sm"
                />
                <Button onClick={handleUsernameChange}>Apply</Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error loading GitHub data</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* User Profile */}
        {user && (
          <div className="bg-card rounded-xl border p-6 mb-6">
            <div className="flex items-start gap-4">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-20 h-20 rounded-full border-2 border-primary"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground">@{user.login}</p>
                {user.bio && <p className="mt-2 text-foreground">{user.bio}</p>}
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  {user.company && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {user.company}
                    </span>
                  )}
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </span>
                  )}
                  {user.blog && (
                    <a
                      href={user.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      {user.blog}
                    </a>
                  )}
                </div>
                <div className="flex gap-4 mt-3">
                  <span className="text-sm">
                    <strong>{formatNumber(user.followers)}</strong> followers
                  </span>
                  <span className="text-sm">
                    <strong>{formatNumber(user.following)}</strong> following
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !stats && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Dashboard Stats */}
        {stats && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Total Repositories"
                value={stats.totalRepos}
                icon={GitBranch}
              />
              <MetricCard
                title="Total Stars"
                value={formatNumber(stats.totalStars)}
                icon={Star}
              />
              <MetricCard
                title="Total Forks"
                value={formatNumber(stats.totalForks)}
                icon={GitFork}
              />
              <MetricCard
                title="Recent Commits"
                value={formatNumber(stats.totalCommits)}
                icon={GitCommit}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <LanguageChart data={stats.languageDistribution} />
              <ActivityChart data={stats.commitActivity} />
            </div>

            {/* Repositories Table */}
            <RepositoriesTable repositories={stats.topRepositories} />
          </>
        )}
      </main>
    </div>
  )
}
