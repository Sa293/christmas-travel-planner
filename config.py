"""
Configuration file for the Christmas Market Travel Agent.
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Gemini API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# Default settings
DEFAULT_LANGUAGE = "en"
SUPPORTED_LANGUAGES = ["en", "de", "fr"]

# Christmas Market Data (can be expanded)
CHRISTMAS_MARKETS = {
    "germany": [
        "Nuremberg", "Munich", "Dresden", "Cologne", "Frankfurt", 
        "Berlin", "Stuttgart", "Hamburg", "Rothenburg ob der Tauber"
    ],
    "austria": [
        "Vienna", "Salzburg", "Innsbruck", "Graz", "Linz"
    ],
    "france": [
        "Strasbourg", "Colmar", "Paris", "Lyon"
    ],
    "czech_republic": [
        "Prague", "Brno", "Český Krumlov"
    ],
    "switzerland": [
        "Zurich", "Basel", "Lucerne"
    ],
    "belgium": [
        "Brussels", "Bruges", "Ghent"
    ]
}

# Logging configuration
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

