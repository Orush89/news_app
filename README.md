# News App
As the name suggests - it will show news, fake news, to be exact

## Features

- Display feed of 10 news from today. Original and Fake titles

## Project Structure

```
.
├── ui/              # React UI application
├── server/          # NestJS server application
├── dev.sh          # Development script
└── README.md
```

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (see .env file)
- newsapi.org api, api key (see .env file)

### Environment Variables

`.env` file in the server directory


### Installation (also runs when starting the app)
1. Install server dependencies:
```bash
cd server
npm install
```

2. Install UI dependencies:
```bash
cd ui
npm install
```

### Running the Application
You can start both the server and UI with a single command:

```bash
./dev.sh
```

Alternatively, you can start them separately:

1. Start the server:
```bash
cd server
npm run start:dev
```

2. Start the UI:
```bash
cd ui
npm start
```

DEBUG:
```base
cd server
npm run start:dev --watch
```# news_app
# news_app
# news_app
# news_app
