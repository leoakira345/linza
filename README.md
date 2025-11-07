# 💕 Johan - Your Romantic AI Companion

A beautiful, romantic AI chat application powered by Groq API and MongoDB.

## 📁 Folder Structure

```
johan-chat-app/
│
├── public/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Styling
│   └── script.js       # Frontend logic
│
├── .env                # Environment variables (DO NOT COMMIT)
├── .gitignore          # Git ignore file
├── server.js           # Backend server
├── package.json        # Dependencies
└── README.md           # This file
```

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### 2. Install MongoDB

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Edit the `.env` file:

```env
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_random_secret_key
```

**Get Groq API Key:**
- Visit: https://console.groq.com/keys
- Create a new API key
- Replace in `.env`

**MongoDB Connection Strings:**
- Local: `mongodb://localhost:27017/johan_chat`
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/johan_chat`

### 5. Run the Application

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 6. Open in Browser

Navigate to: `http://localhost:3000`

## ✨ Features

- 💕 Special first message for Marvee
- 🌹 Romantic and flirty AI personality
- 💬 Real-time typing animation
- 💾 Chat history saved in MongoDB
- 📱 Responsive design
- 🎨 Beautiful gradient UI

## 🔒 Security Notes

- **Never commit `.env` file to Git!**
- Always use `.gitignore` to exclude sensitive files
- Regenerate API keys if accidentally exposed
- Use strong, random SESSION_SECRET

## 📝 API Endpoints

- `GET /` - Main chat interface
- `POST /api/chat` - Send message and get AI response
- `GET /api/history?userId=xxx` - Get chat history
- `DELETE /api/history?userId=xxx` - Clear chat history

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **AI:** Groq API (Mixtral model)

## 📦 Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Multiple chat sessions
- [ ] Voice messages
- [ ] Image sharing
- [ ] Export chat history

## 💖 Enjoy chatting with Johan!

---

Made with 💕 for Marvee