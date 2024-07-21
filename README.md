<div align="center">
  <img src="https://github.com/user-attachments/assets/ae871cd3-4a18-452f-9434-6c9cf361ab79" alt="AI News Aggregator Logo" width="200"/>

  # AI News Aggregator

  [![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)](https://www.python.org/downloads/)
  [![React Version](https://img.shields.io/badge/react-18.0%2B-61DAFB)](https://reactjs.org/)

  *Revolutionizing news consumption with AI-powered insights*

  [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Usage](#-usage) • [API](#-api) 
</div>

---

## 🌟 Features

- 📰 **AI-Driven News Aggregation**: Curate top headlines using advanced algorithms
- 🧠 **Sentiment Analysis**: Understand the emotional tone of articles at a glance
- 🔥 **Trending Topics**: Stay ahead with AI-identified hot topics
- 🌓 **Dark Mode**: Seamlessly switch between light and dark themes
- 📱 **Responsive Design**: Enjoy a seamless experience across all devices

---

## 🛠 Tech Stack

<div align="center">

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![NLTK](https://img.shields.io/badge/NLTK-154F5B?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

</div>

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js and npm
- [News API Key](https://newsapi.org/)

### Installation

1. **Clone the repository**
   ```bash
     git clone https://github.com/yourusername/News-aggregator.git
      cd news-aggregator
   ```

2. Set up the backend:
```
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use venv\Scripts\activate
    pip install -r requirements.txt
```

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory and add your News API key:
   ```
     NEWS_API_KEY=your_api_key_here
   ```

## Usage

1. Start the backend server:
   `cd backend
    python app.py`

2. In a new terminal, start the frontend development server:
   `cd frontend
    npm start`

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Endpoints

- `GET /api/articles`: Fetches top news articles with sentiment analysis.
- `GET /api/trending_topics`: Retrieves current trending topics.

For detailed API documentation, refer to the [API Documentation](docs/api.md) file.

## Frontend

The frontend is built using React and styled-components, providing a responsive and intuitive user interface. Key components include:

- `NewsFeed`: Displays the latest news articles with sentiment indicators.
- `TrendingTopics`: Shows current trending topics based on AI analysis.
- `ThemeToggle`: Allows users to switch between light and dark modes.

For more information on the frontend architecture, check out the [Frontend Documentation](docs/frontend.md).

---
<div align="center">
  Made by Anik
</div>
