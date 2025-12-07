"""
Gemini API client for the Christmas Market Travel Agent.
"""
import google.generativeai as genai
from config import GEMINI_API_KEY
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class GeminiClient:
    """Client for interacting with Google's Gemini API."""
    
    def __init__(self, api_key: str = None):
        """Initialize the Gemini client."""
        self.api_key = api_key or GEMINI_API_KEY
        if not self.api_key:
            raise ValueError("Gemini API key is required. Set GEMINI_API_KEY in .env file or pass it directly.")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')
        logger.info("Gemini client initialized successfully")
    
    def generate_response(self, prompt: str, temperature: float = 0.7) -> str:
        """
        Generate a response using Gemini API.
        
        Args:
            prompt: The input prompt for the AI
            temperature: Controls randomness (0.0 to 1.0)
        
        Returns:
            Generated response text
        """
        try:
            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=temperature,
                )
            )
            return response.text
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            raise
    
    def generate_structured_response(self, prompt: str, context: dict = None) -> str:
        """
        Generate a structured response with context.
        
        Args:
            prompt: The input prompt
            context: Additional context dictionary
        
        Returns:
            Generated response text
        """
        full_prompt = prompt
        if context:
            context_str = "\n".join([f"{k}: {v}" for k, v in context.items()])
            full_prompt = f"{prompt}\n\nContext:\n{context_str}"
        
        return self.generate_response(full_prompt)

