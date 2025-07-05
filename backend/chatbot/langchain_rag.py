import os
from dotenv import load_dotenv
from langchain_community.chat_models import ChatOpenAI

# Load variables from .env
# This line attempts to load environment variables from a .env file in the same directory
# where the script is run (or its parent directories).
load_dotenv()

# --- TEMPORARY DEBUG PRINT: Check if API key is loaded ---
# This print statement is crucial for debugging the 401 error.
# When your Django server starts, this line will execute and print the value
# of the OPENROUTER_API_KEY environment variable.
# If it prints 'None' or an empty string, your .env file is not being loaded correctly,
# or the key is not set properly within it.
print("🔑 Loaded OPENROUTER_API_KEY:", os.getenv("OPENROUTER_API_KEY"))
# --- END TEMPORARY DEBUG PRINT ---

# Use OpenRouter with LangChain-compatible ChatOpenAI
# The openai_api_key parameter is where your OpenRouter API key is passed.
# If os.getenv("OPENROUTER_API_KEY") returns None or an invalid key,
# OpenRouter will return a 401 Unauthorized error.
llm = ChatOpenAI(
    model="google/gemma-3n-e4b-it:free", # Ensure this model is available and correct on OpenRouter
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1"
)

def get_answer(question):
    # These print statements help trace the flow of the question and response
    print("🟡 Incoming question:", question)
    # llm.invoke sends the question to the configured LLM (Llama 3.3 via OpenRouter)
    answer = llm.invoke(question)
    print("🟢 Response:", answer)
    return answer
