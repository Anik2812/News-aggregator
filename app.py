from flask import Flask, jsonify
from flask_cors import CORS
import requests
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF

app = Flask(__name__)
CORS(app)

# Download NLTK data
nltk.download('vader_lexicon')

# Initialize sentiment analyzer
sia = SentimentIntensityAnalyzer()

# News API key (replace with your own)
NEWS_API_KEY = 'c7956fb3575044289a5c7799eab2efce'

@app.route('/')
def home():
    return "Welcome to the AI News Aggregator API"

@app.route('/api/articles')
def get_articles():
    url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={NEWS_API_KEY}'
    response = requests.get(url)
    data = response.json()

    articles = []
    for article in data['articles']:
        sentiment = sia.polarity_scores(article['title'])['compound']
        articles.append({
            'title': article['title'],
            'description': article['description'],
            'url': article['url'],
            'sentiment': sentiment
        })

    return jsonify(articles)

@app.route('/api/trending_topics')
def get_trending_topics():
    url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={NEWS_API_KEY}'
    response = requests.get(url)
    data = response.json()

    # Extract titles and descriptions
    texts = [f"{article['title']} {article['description']}" for article in data['articles']]

    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(texts)

    # Apply Non-negative Matrix Factorization
    nmf_model = NMF(n_components=5, random_state=42)
    nmf_matrix = nmf_model.fit_transform(tfidf_matrix)

    # Get top words for each topic
    feature_names = vectorizer.get_feature_names_out()
    topics = []
    for topic_idx, topic in enumerate(nmf_model.components_):
        top_words = [feature_names[i] for i in topic.argsort()[:-5 - 1:-1]]
        topics.append({
            'id': topic_idx,
            'words': top_words
        })

    return jsonify(topics)

if __name__ == '__main__':
    app.run(debug=True)