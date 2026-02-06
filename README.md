# sahanarajashekara
Portofolio with AI-powered chat. Built with React, TypeScript, FastAPI, and Claude AI using Model Context Protocol (MCP).

## ✨ Features

- AI chat assistant powered by Claude (Sonnet 4)
- Smooth navigation and animations
- Project showcase, experience timeline, certificates
- Adventures gallery
- Meet Jackie (my dog!)

## 🛠️ Tech Stack

**Frontend:** React 19 • TypeScript • Vite • Tailwind CSS  
**Backend:** FastAPI • Python • Anthropic Claude API  
**Architecture:** MCP Server for data management

## 📁 Project Structure

```
sahanarajashekara/
├── backend/          # FastAPI server + Claude integration
├── mcp-server/       # MCP data server
├── ui/               # React frontend
└── data/json/        # Portfolio data (JSON)
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Python 3.13+
- [uv](https://astral.sh/uv) (Python package manager)
- Anthropic API Key ([Get one](https://console.anthropic.com/))

### Setup

2. **Backend Setup**
   ```bash
   cd backend
   uv venv && source .venv/bin/activate
   uv pip install -e .
   echo "ANTHROPIC_API_KEY=your_key_here" > .env
   ```

3. **MCP Server Setup**
   ```bash
   cd ../mcp-server
   uv venv && source .venv/bin/activate
   uv pip install -e .
   ```

4. **Frontend Setup**
   ```bash
   cd ../ui
   npm install
   ```

### Run

**Terminal 1 - Backend:**
```bash
cd backend
source .venv/bin/activate
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd ui
npm run dev
```

Open: **http://localhost:5173**

## 💬 Chat Feature

Try asking:
- "Tell me about Sahana's experience"
- "What projects has she worked on?"
- "Tell me about Jackie"

*Note: 5 messages/day rate limit*

Built with ❤️ by Sahana Rajashekara