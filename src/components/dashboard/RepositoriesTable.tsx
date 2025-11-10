import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { GitHubRepository } from '../../types/github'
import { Star, GitFork, ExternalLink } from 'lucide-react'
import { formatDate, formatNumber } from '../../lib/utils'

interface RepositoriesTableProps {
  repositories: GitHubRepository[]
}

export function RepositoriesTable({ repositories }: RepositoriesTableProps) {
  if (!repositories || repositories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No repositories found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Stars</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Forks</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Language</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Updated</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Link</th>
              </tr>
            </thead>
            <tbody>
              {repositories.map((repo) => (
                <tr key={repo.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-foreground">{repo.name}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {repo.description || 'No description'}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{formatNumber(repo.stargazers_count)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <GitFork className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{formatNumber(repo.forks_count)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {repo.language ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {repo.language}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(repo.updated_at)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
