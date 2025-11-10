import type {
  GitHubUser,
  GitHubRepository,
  GitHubLanguageStats,
  GitHubEvent,
  DashboardStats,
} from '../types/github'

const GITHUB_API_BASE = 'https://api.github.com'

// Language colors from GitHub
const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Other: '#858585',
}

export class GitHubAPI {
  private baseUrl: string = GITHUB_API_BASE
  private headers: HeadersInit

  constructor(token?: string) {
    this.headers = {
      Accept: 'application/vnd.github.v3+json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async fetchFromGitHub<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.fetchFromGitHub<GitHubUser>(`/users/${username}`)
  }

  async getUserRepositories(username: string, page = 1, per_page = 100): Promise<GitHubRepository[]> {
    return this.fetchFromGitHub<GitHubRepository[]>(
      `/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`
    )
  }

  async getRepositoryLanguages(owner: string, repo: string): Promise<GitHubLanguageStats> {
    return this.fetchFromGitHub<GitHubLanguageStats>(`/repos/${owner}/${repo}/languages`)
  }

  async getUserEvents(username: string, page = 1, per_page = 30): Promise<GitHubEvent[]> {
    return this.fetchFromGitHub<GitHubEvent[]>(
      `/users/${username}/events/public?page=${page}&per_page=${per_page}`
    )
  }

  async getDashboardStats(username: string): Promise<DashboardStats> {
    try {
      // Fetch user data and repositories in parallel
      const [user, repos, events] = await Promise.all([
        this.getUser(username),
        this.getUserRepositories(username),
        this.getUserEvents(username),
      ])

      // Calculate total stars and forks
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)

      // Get language distribution
      const languageStats: { [key: string]: number } = {}

      // Collect languages from all repos (using repo metadata, not API call for each)
      repos.forEach((repo) => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
        }
      })

      // Convert to array format for charts
      const languageDistribution = Object.entries(languageStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, value]) => ({
          name,
          value,
          color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.Other,
        }))

      // Get top repositories by stars
      const topRepositories = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)

      // Calculate commit activity from events
      const commitActivity = this.calculateCommitActivity(events)

      // Estimate total commits (from recent push events)
      const pushEvents = events.filter((e) => e.type === 'PushEvent')
      const totalCommits = pushEvents.reduce((sum, event) => {
        return sum + (event.payload?.commits?.length || 0)
      }, 0)

      return {
        totalRepos: user.public_repos,
        totalStars,
        totalForks,
        totalCommits: totalCommits || 0, // This is just recent commits
        languageDistribution,
        topRepositories,
        recentActivity: events.slice(0, 10),
        commitActivity,
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  }

  private calculateCommitActivity(events: GitHubEvent[]): { date: string; count: number }[] {
    const activityMap: { [date: string]: number } = {}

    events.forEach((event) => {
      const date = new Date(event.created_at).toISOString().split('T')[0]

      if (event.type === 'PushEvent') {
        const commitCount = event.payload?.commits?.length || 0
        activityMap[date] = (activityMap[date] || 0) + commitCount
      } else {
        activityMap[date] = (activityMap[date] || 0) + 1
      }
    })

    // Get last 30 days
    const last30Days = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      last30Days.push({
        date: dateStr,
        count: activityMap[dateStr] || 0,
      })
    }

    return last30Days
  }

  getEventTypeLabel(eventType: string): string {
    const typeMap: { [key: string]: string } = {
      PushEvent: 'Pushed commits',
      CreateEvent: 'Created repository',
      WatchEvent: 'Starred repository',
      ForkEvent: 'Forked repository',
      IssuesEvent: 'Created issue',
      PullRequestEvent: 'Created pull request',
      IssueCommentEvent: 'Commented on issue',
      PullRequestReviewEvent: 'Reviewed pull request',
      PullRequestReviewCommentEvent: 'Commented on pull request',
      DeleteEvent: 'Deleted',
      ReleaseEvent: 'Published release',
    }

    return typeMap[eventType] || eventType
  }
}

// Export a default instance
export const githubApi = new GitHubAPI()
