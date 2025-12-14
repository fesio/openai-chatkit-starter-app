# Trading Strategy Assistant - Perplexity Integration

This application is a trading strategy assistant powered by Perplexity AI, focused on TradingView strategies with multiple small profitable trades.

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Copy the example file and fill in your Perplexity API key:

```bash
cp .env.example .env.local
```

### 3. Get your Perplexity API key

1. Visit [Perplexity API Settings](https://www.perplexity.ai/settings/api)
2. Generate a new API key
3. **IMPORTANT**: Never share your API key publicly. Always keep it in `.env.local` which is gitignored

### 4. Configure environment variables

Update `.env.local`:

```
PERPLEXITY_API_KEY=pplx-your-api-key-here
PERPLEXITY_MODEL=llama-3.1-sonar-small-128k-online
```

Available models:
- `llama-3.1-sonar-small-128k-online` (default, fast and cost-effective)
- `llama-3.1-sonar-large-128k-online` (more capable)
- `llama-3.1-sonar-huge-128k-online` (most capable)

### 5. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` and start developing trading strategies!

### 6. Deploy your app

```bash
npm run build
npm start
```

Or deploy to Vercel/Railway/AWS with your environment variables configured in the platform settings.

## Features

- ✅ Custom chat interface (no vendor lock-in)
- ✅ Perplexity AI integration
- ✅ Trading strategy focused prompts
- ✅ Dark/light theme support
- ✅ Conversation history
- ✅ Real-time responses
- ✅ Mobile-responsive design

## Security Best Practices

⚠️ **NEVER commit API keys to Git**
- Always use `.env.local` for secrets
- Never share API keys in comments, issues, or PRs
- Rotate your API key immediately if exposed
- Use environment variables in deployment platforms

## Customization

Edit `/lib/config.ts` to customize:
- Starter prompts
- Greeting message
- Placeholder text
- Trading strategy focus

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **AI**: Perplexity AI API
- **Hosting**: Works on Vercel, Railway, AWS, or any Node.js host
