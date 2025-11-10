# GitHub Analytics Dashboard

A beautiful, real-time GitHub analytics dashboard built with React, TypeScript, and Tailwind CSS. Track your GitHub activity, repository statistics, language distribution, and more!

![GitHub Analytics Dashboard](https://via.placeholder.com/800x400?text=GitHub+Analytics+Dashboard)

## Features

- **Real-time GitHub Data**: Fetches live data directly from GitHub API
- **User Profile Overview**: Display user info, avatar, bio, followers, and following
- **Repository Statistics**: View total repos, stars, forks, and recent commits
- **Language Distribution**: Visual pie chart showing your most-used programming languages
- **Activity Timeline**: 30-day activity chart tracking your GitHub contributions
- **Top Repositories Table**: Sortable table of your most popular repositories
- **Username Switcher**: Easy-to-use settings panel to view any GitHub user's analytics
- **Responsive Design**: Fully mobile-friendly interface
- **Dark/Light Mode Support**: Built-in theme support with Tailwind CSS
- **Error Handling**: Graceful error states and loading indicators

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Beautiful charts and visualizations
- **Lucide Icons** - Modern icon library
- **GitHub REST API** - Data source

## Getting Started

### Prerequisites

- Node.js 16+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone this repository:
```bash
cd github_analytics_dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and visit: `http://localhost:5173`

## Usage

### Viewing Your Own GitHub Analytics

1. Click the "Settings" button in the top-right corner
2. Enter your GitHub username in the input field
3. Click "Apply" or press Enter
4. The dashboard will refresh with your GitHub data

### Viewing Any GitHub User

You can view analytics for any public GitHub user by entering their username in the settings panel.

### Default User

The dashboard defaults to showing analytics for: **ibrahimnasir0**

## Configuration

### Change Default Username

Edit `src/App.tsx` and modify the `initialUsername` prop:

```typescript
function App() {
  return <Dashboard initialUsername="your-github-username" />
}
```

### Using GitHub Personal Access Token (Optional)

For higher API rate limits (5000 requests/hour instead of 60), you can use a GitHub Personal Access Token:

1. Create a token at: https://github.com/settings/tokens
2. Edit `src/lib/githubApi.ts`:

```typescript
// At the bottom of the file, replace:
export const githubApi = new GitHubAPI()

// With:
export const githubApi = new GitHubAPI('your_github_token_here')
```

**Note**: Never commit your token to version control!

## Project Structure

```
github_analytics_dashboard/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx       # Statistics cards
│   │   │   ├── LanguageChart.tsx    # Language pie chart
│   │   │   ├── ActivityChart.tsx    # Activity timeline
│   │   │   └── RepositoriesTable.tsx # Repos table
│   │   ├── ui/                       # Reusable UI components
│   │   └── Dashboard.tsx             # Main dashboard component
│   ├── hooks/
│   │   └── useGitHubData.ts          # Custom hook for API calls
│   ├── lib/
│   │   ├── githubApi.ts              # GitHub API client
│   │   └── utils.ts                  # Utility functions
│   ├── types/
│   │   └── github.ts                 # TypeScript types
│   ├── App.tsx                       # Root component
│   └── main.tsx                      # Entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## API Rate Limits

GitHub API has rate limits:

- **Without authentication**: 60 requests per hour
- **With authentication**: 5,000 requests per hour

The dashboard caches data and only refreshes when you click the "Refresh" button or change users.

## Building for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

The built files will be in the `dist/` folder, ready to deploy to any static hosting service.

## Deployment

This app can be deployed to:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **Any static host**: Upload the `dist` folder

## Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    }
  }
}
```

### Adding More Metrics

1. Update `src/types/github.ts` with new data types
2. Modify `src/lib/githubApi.ts` to fetch additional data
3. Create new components in `src/components/dashboard/`
4. Add them to `src/components/Dashboard.tsx`

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your portfolio or any purpose!

## Credits

Built by **Ibrahim Nasir** ([@ibrahimnasir0](https://github.com/ibrahimnasir0))

Powered by:
- [GitHub REST API](https://docs.github.com/en/rest)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)

## Support

If you find this project helpful, please give it a star on GitHub!

## Roadmap

Future enhancements:
- [ ] Add commit history heatmap (contribution calendar)
- [ ] Show issue and PR statistics
- [ ] Add organization analytics
- [ ] Export data as PDF/CSV
- [ ] Compare multiple users
- [ ] Add more chart types
- [ ] Implement caching with localStorage
- [ ] Add user authentication
- [ ] Show repository contributors
- [ ] Display trending repositories

---

Made with ❤️ and React
