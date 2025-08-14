# Notes Sync

----

**Automatically sync your markdown notes to Git while you work, enhanced with AI-powered daily insights.**

This tool runs quietly in the background, watching your notes folder. Every time you save a note, it automatically commits and pushes to GitHub - no manual git commands needed. Plus, AI integration provides personalized daily quotes and intelligent content enhancement.

## What it does

- **Auto-sync** - Saves and pushes your notes to Git automatically
- **Daily sections** - Creates new date sections in your notes each day with AI-generated quotes
- **Terminal commands** - Add notes and check status from anywhere in your terminal
- **AI Enhancement** - Contextual daily quotes and intelligent content generation
- **Simple setup** - One markdown file, automatic organization

## Perfect for

- Daily work journals and task tracking
- Meeting notes that sync across devices
- Code snippets and quick references
- Any markdown notes you want automatically backed up

## ✨ Features

- 📝 **Automated Daily Templates** - Structured daily notes with Focus/Notes/Done/Tomorrow sections
- 🔄 **Auto-sync to GitHub** - Intelligent debounced commits with meaningful messages
- ✅ **Interactive Todo Management** - Add, complete, delete, and archive todos with intuitive selection menus
- 🔍 **Smart Search** - Search through notes with context across multiple days
- 📊 **Productivity Insights** - Track incomplete todos and review patterns
- 🎯 **Unified CLI** - Single `add` command with `-n` (notes) and `-t` (todos) flags for lightning-fast input
- 🛡️ **Git Safety** - Robust conflict resolution with rebase and autostash
- 🎨 **Document Formatting** - Automatic cleanup of whitespace, spacing, and markdown consistency
- 🌅 **Auto-Daily Creation** - Automatically creates today's section on wake-up and startup
- 🤖 **AI Integration** - Context-aware daily quotes and intelligent content generation with Gemini API

## 📁 Structure

- `packages/shared/` - Shared TypeScript types and API client
- `packages/service/` - Background HTTP server + file watcher daemon  
- `packages/cli/` - Global CLI tool for note management

## 🚀 Quick Start

### Installation

```bash
# Install dependencies for all packages
npm install

# Build all packages
npm run build

# Install CLI globally
npm run install:cli
```

### Setup Service

```bash
# Install service as system daemon
notes-sync install

# Check service status
notes-sync status
```

## 📖 CLI Commands

### Service Management

```bash
# Check if service is running
notes-sync status

# Install service as daemon
notes-sync install

# Trigger manual sync
notes-sync sync

# Force sync even without changes
notes-sync sync --force

# View service logs
notes-sync logs
```

### Content Management

```bash
# Add content using the unified command (auto-creates daily section with AI quote if needed)
notes-sync add -n "Met with John about the project timeline"
notes-sync add -t "Review quarterly budget"

# Multiple words work naturally
notes-sync add -n This is a longer note about something important
notes-sync add -t Call client about proposal
```

### Todo Management

```bash
# Interactive todo completion (select from list)
notes-sync mark-complete

# Interactive todo deletion (select from list) 
notes-sync delete

# See all incomplete todos from last 7 days
notes-sync incomplete-todos

# See incomplete todos from last 2 weeks
notes-sync incomplete-todos --days 14

# Archive completed todos to Done section
notes-sync archive
```

### Search & Discovery

```bash
# Search for content in notes (last 30 days)
notes-sync search "budget meeting"

# Search with custom timeframe
notes-sync search "project alpha" --days 60
notes-sync search "standup notes" --days 7
```

### Document Formatting

```bash
# Format and clean up the entire document
notes-sync format

# Format specific sections only
notes-sync format --section todos
notes-sync format --section notes

# Check for formatting issues without making changes
notes-sync format --validate
```

### Daily Section Management

```bash
# Check daily section status
notes-sync daily --status

# Create today's daily section manually (with AI-generated quote)
notes-sync daily --create

# Force create today's section (even if exists, with fresh AI quote)
notes-sync daily --create --force
```

## 🎨 Document Formatting

The `format` command intelligently cleans up your notes with these improvements:

- **Whitespace Cleanup**: Removes trailing spaces and normalizes blank lines
- **Header Spacing**: Ensures consistent spacing around date headers (protects against breaking dates)
- **Todo Formatting**: Standardizes checkbox formatting (`- [ ]` vs `- []`)  
- **Bullet Points**: Consistent spacing for all bullet points
- **Section Spacing**: Proper spacing between Today's Focus, Notes, Done, Tomorrow
- **Quote Formatting**: Clean spacing around daily quotes (preserves quote integrity)
- **Empty Item Removal**: Removes empty todo items and orphaned formatting
- **File Ending**: Ensures proper single newline at end of file
- **Content Protection**: Smart detection and repair of accidentally broken quotes/dates
- **Quote Integrity**: Fixes malformed quotes like `_ text_` to `_text_`
- **Validation Mode**: Check for issues without making changes (`--validate`)

Perfect for cleaning up after manual edits or copy-paste operations! The formatter is designed to preserve content integrity while fixing formatting issues.

## 🌅 Auto-Daily Creation

The service automatically creates today's daily section when needed, ensuring you always have a fresh workspace ready:

### 🚀 **When It Triggers:**
- **Service Startup**: Checks if today's section exists when the service starts
- **Wake Detection**: Automatically creates today's section when your computer wakes from sleep
- **Adding Notes/Todos**: Creates today's section before adding content if it doesn't exist

### 📋 **What It Creates:**
- **Today Only**: Only creates today's date section - never backfills missing days
- **Clean Slate**: Fresh daily template with Today's Focus, Notes, Done, and Tomorrow sections  
- **Smart Detection**: Only creates when truly needed - won't duplicate existing sections

### ⚙️ **Configuration:**
```json
{
  "autoCreateDaily": true,          // Enable/disable auto-creation (default: true)
  "wakeDetection": {
    "enabled": true,                // Enable wake detection (default: true)
    "intervalMs": 20000,            // Check interval (default: 20s)
    "thresholdMs": 20000            // Sleep threshold (default: 20s)
  }
}
```

### 🎯 **Philosophy: Today-Focused Workflow**
- **No Backfilling**: Deliberately doesn't create sections for missed days
- **Fresh Start**: Each day gets a clean slate when you're ready to work
- **Intentional Gaps**: Missing days indicate intentional breaks (weekends, vacations, etc.)
- **Wake & Work**: Open your laptop, and today's section is ready to capture your thoughts

### 💡 **Example Workflow:**
1. **Friday**: Last entry in notes
2. **Monday Morning**: Wake laptop → today's section auto-created  
3. **Gap Preserved**: No sections for Sat/Sun (intentional weekend break)
4. **Ready to Go**: Fresh Monday template with Today's Focus ready for planning

## 🤖 AI Integration

Transform your daily note-taking with intelligent, context-aware enhancements powered by Google's Gemini API.

### ✨ **Smart Daily Quotes**
Every time a new daily section is created, the AI analyzes your recent notes and generates personalized, motivational quotes:

```markdown
# 1/15/2025

_Focus on progress over perfection in your current projects_ - AI Generated

**Today's Focus**
- [ ] Your tasks here
```

### 🧠 **How It Works:**
- **Context Analysis**: Reviews your last 3 days of notes for themes and patterns
- **Personalized Generation**: Creates quotes relevant to your work and mindset
- **Graceful Fallback**: Uses curated quotes if AI is unavailable
- **Privacy Focused**: Only sends note content (not personal data) for context

### ⚙️ **Configuration:**
```json
{
  "ai": {
    "enabled": true,                    // Enable AI features
    "provider": "gemini",               // Currently supports Gemini
    "apiKey": "your-gemini-api-key",    // Get free key from Google AI Studio
    "model": "gemini-1.5-flash",        // Model version
    "features": {
      "dailyQuotes": true               // Enable contextual daily quotes
    },
    "rateLimiting": {
      "requestsPerMinute": 10,          // API rate limiting
      "requestsPerDay": 100
    }
  }
}
```

### 🔑 **Getting Started with AI:**
1. **Get API Key**: Visit [Google AI Studio](https://aistudio.google.com/) (free tier available)
2. **Set Environment Variable**: `export GEMINI_API_KEY="your-key"`
3. **Or Add to Config**: Include in your `config.json` file
4. **Automatic Enhancement**: AI quotes appear in new daily sections

### 💻 **CLI Commands That Trigger AI:**
```bash
# Manual daily creation (with AI quote generation)
notes-sync daily --create
notes-sync daily --create --force

# Adding content (auto-creates daily section with AI quote if needed)
notes-sync add -t "New task"
notes-sync add -n "Meeting notes"
```

**Automatic Triggers:**
- **System wake-up**: AI quotes generated when daily sections auto-create
- **Service startup**: AI quotes generated if missing daily section is created
- **Adding content**: AI quotes generated when daily section is auto-created before adding notes/todos

### 🛡️ **Privacy & Safety:**
- **No Personal Data**: Only note content is analyzed for context
- **Rate Limited**: Respects API limits with built-in cooldowns
- **Failure Safe**: Never breaks daily creation if AI is unavailable
- **Local First**: All your notes stay on your machine, only context sent for quotes

### 🔮 **Future AI Features:**
- **Weekly Summaries**: AI-generated insights from your week's notes
- **Action Item Extraction**: Automatically find tasks in meeting notes
- **Smart Suggestions**: Content recommendations based on your patterns

## 🔄 Daily Workflows

### Morning Planning

```bash
# Check if today's section exists (auto-created on wake-up!)
notes-sync daily --status

# See what's pending from previous days
notes-sync incomplete-todos

# Add today's focus items (auto-creates today's section if needed)
notes-sync add -t "Finish presentation"
notes-sync add -t "Review code changes" 
notes-sync add -t "Call client"
```

### During the Day

```bash
# Quick note capture
notes-sync add -n "Great idea from the standup: implement feature flags"

# Mark tasks complete interactively (select from list)
notes-sync mark-complete

# Delete unwanted todos interactively  
notes-sync delete
```

### Evening Review

```bash
# Clean up completed todos
notes-sync archive

# Review what's still pending
notes-sync incomplete-todos
```

### Weekly Review

```bash
# Check daily status and timing
notes-sync daily --status

# What didn't get done this week?
notes-sync incomplete-todos --days 7

# Search for recurring themes
notes-sync search "blocked" --days 14
notes-sync search "meeting" --days 7

# Check for formatting issues first
notes-sync format --validate

# Clean up formatting after a week of edits
notes-sync format
```

## 📋 Daily Template Structure

Each day gets automatically structured with AI-enhanced quotes:

```markdown
# 12/15/2024

_Progress over perfection leads to consistent growth_ - AI Generated

**Today's Focus**

- [ ] Task 1

**Notes**


**Done**


**Tomorrow**


```

**Quote Sources:**
- **AI-Generated**: Context-aware quotes based on your recent notes (when AI is enabled)
- **Curated Fallbacks**: Hand-selected motivational quotes when AI is unavailable
- **Personalized**: Quotes reflect your work patterns and themes

## 🔧 API Endpoints

The service exposes these HTTP endpoints:

### Service Status
- `GET /status` - Service health and info
- `POST /sync` - Trigger manual sync
- `GET /logs` - Service logs
- `POST /shutdown` - Graceful shutdown

### Content Management  
- `POST /add-note` - Add note to today's Notes section
- `POST /add-todo` - Add todo to Today's Focus
- `POST /mark-todo-complete` - Mark specific todo as done
- `POST /delete-todo` - Delete a specific todo entirely
- `POST /search-notes` - Search through notes with context
- `GET /incomplete-todos?daysBack=7` - Get pending todos
- `POST /archive-completed-todos` - Move completed todos to Done
- `POST /format-document` - Format and clean up entire document
- `POST /format-section` - Format specific section (todos, notes)
- `GET /validate-formatting` - Check document for formatting issues

### Daily Management
- `GET /daily-status` - Check if today's section exists and get timing info
- `POST /create-daily` - Manually create today's section (with force option)

## 🛠️ Development

### Running in Development Mode

```bash
# Run service in development mode
npm run dev:service

# Run CLI in development mode
cd packages/cli && npm run dev -- status

# Test specific commands
cd packages/cli && npm run dev -- add -t "Test todo"
cd packages/cli && npm run dev -- add -n "Test note"
cd packages/cli && npm run dev -- mark-complete
cd packages/cli && npm run dev -- delete
cd packages/cli && npm run dev -- search "test"
```

### System Architecture Overview

The Notes Sync system follows a **distributed architecture** with clear separation of concerns:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│   CLI Package   │───▶│  Shared Package  │◀───│ Service Package │
│                 │    │                  │    │                 │
│  • Commander.js │    │  • TypeScript    │    │  • HTTP Server  │
│  • User Input   │    │    Types         │    │  • File Watcher │
│  • Inquirer UI  │    │  • API Client    │    │  • Git Sync     │
│                 │    │  • HTTP Requests │    │  • NoteInteractor│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│  User Terminal  │    │  Network Layer   │    │ Markdown Files  │
│                 │    │                  │    │                 │
│  • Interactive  │    │  • HTTP/JSON     │    │  • Daily.md     │
│    Selection    │    │  • localhost:3000│    │  • Git History  │
│  • Fast Input   │    │  • Type Safety   │    │  • Auto-sync    │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Core Components:**

#### **1. Background Service** (`packages/service/`)
- **HTTP Server**: Fastify-based REST API on port 3000
- **File Watcher**: Chokidar monitoring for markdown changes  
- **Git Integration**: Smart sync with conflict resolution and meaningful commits
- **NoteInteractor**: Core markdown parsing and manipulation logic
- **Wake Detection**: Auto-creates daily sections on system wake-up

#### **2. CLI Tool** (`packages/cli/`)
- **Commander.js**: Structured command-line interface
- **Inquirer.js**: Interactive selection for todos (mark-complete, delete)
- **API Client**: HTTP requests to background service
- **User Experience**: Fast input, clear feedback, error handling

#### **3. Shared Package** (`packages/shared/`)
- **TypeScript Types**: Full type safety across packages
- **API Client**: Centralized HTTP request logic  
- **Request/Response Interfaces**: Consistent data contracts

### **Data Flow:**

```
User Command → CLI Parser → API Client → HTTP Request 
     ↓              ↓           ↓            ↓
Type Safety → Validation → JSON Payload → Service Endpoint
     ↓              ↓           ↓            ↓
Error Handle ← HTTP Response ← Business Logic ← NoteInteractor
     ↓              ↓           ↓            ↓
User Feedback ← Format Result ← File Operations ← Git Sync
```

### **Key Design Patterns:**

- **Event-Driven**: File changes trigger debounced Git operations
- **Type-Safe**: Full TypeScript coverage prevents runtime errors
- **Stateless**: Each CLI command is independent, service holds state
- **Robust**: Graceful error handling and recovery mechanisms
- **Extensible**: Clear integration pattern for new features

### **Development Philosophy:**

- **Fast Feedback**: CLI commands execute quickly with clear responses
- **Interactive UX**: Inquirer selection menus for complex operations  
- **Git Safety**: Rebase with autostash, conflict resolution, meaningful commits
- **Content Integrity**: Smart formatting that preserves user content
- **Today-Focused**: Auto-creation philosophy that respects intentional gaps

## 📝 Configuration

Service configuration via `packages/service/config.json`:

```json
{
  "notesDir": "/path/to/your/notes",
  "debounceMs": 3000,
  "glob": "**/*.md",
  "ignore": ["node_modules/**", ".git/**"],
  "autoCreateDaily": true,
  "wakeDetection": {
    "enabled": true,
    "intervalMs": 20000,
    "thresholdMs": 20000
  },
  "ai": {
    "enabled": true,
    "provider": "gemini",
    "apiKey": "your-gemini-api-key",
    "model": "gemini-1.5-flash",
    "features": {
      "dailyQuotes": true
    },
    "rateLimiting": {
      "requestsPerMinute": 10,
      "requestsPerDay": 100
    }
  },
  "server": {
    "port": 3000,
    "host": "127.0.0.1"
  }
}
```

## 🤝 Contributing

This system follows a clear integration pattern for adding new functionality:

1. **Add Types** (`packages/shared/src/types.ts`)
2. **Add API Client Method** (`packages/shared/src/api-client.ts`)  
3. **Add Server Endpoint** (`packages/service/src/server.ts`)
4. **Add NoteInteractor Method** (`packages/service/src/note-interactor.ts`)
5. **Add CLI Command** (`packages/cli/src/commands/*.ts` + `cli.ts`)

Perfect for extending with additional note management features!

## 📄 License

MIT License - see LICENSE file for details.

---

*Built for developers who want powerful, automated note-taking with the reliability of Git and the speed of CLI workflows.* 🚀
