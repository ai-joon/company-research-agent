"""Backend package for tavily-company-research."""

import os
import sys
from pathlib import Path
import logging
from dotenv import load_dotenv

# Set up logging
logger = logging.getLogger(__name__)

# Load environment variables from .env file
env_path = Path(__file__).parent.parent / '.env'
if env_path.exists():
    logger.info(f"Loading environment variables from {env_path}")
    load_dotenv(dotenv_path=env_path, override=True)
else:
    logger.warning(f".env file not found at {env_path}. Using system environment variables.")

# Check for critical environment variables
if not os.getenv("TAVILY_API_KEY"):
    logger.warning("TAVILY_API_KEY environment variable is not set.")

if not os.getenv("OPENAI_API_KEY"):
    logger.warning("OPENAI_API_KEY environment variable is not set.")

if not os.getenv("GEMINI_API_KEY"):
    logger.warning("GEMINI_API_KEY environment variable is not set.")

from .graph import Graph

__all__ = ["Graph"]
