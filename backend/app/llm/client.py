import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

# Initialize the Groq client 
# It automatically picks up GROQ_API_KEY from os.environ by default
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# Call the standard Groq chat completion format
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile", 
    messages=[
        {
            "role": "user",
            "content": "Say hello in one sentence."
        }
    ]
)

# Print the response text
print(response.choices[0].message.content)
