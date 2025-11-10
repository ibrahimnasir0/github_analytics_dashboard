import { Card, CardContent } from '../ui/card'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  className?: string
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <h2 className="text-3xl font-bold text-foreground">{value}</h2>
              {trend && (
                <span
                  className={cn(
                    'text-sm font-medium',
                    trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {trend}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
