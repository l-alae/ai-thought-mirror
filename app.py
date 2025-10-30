from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI, RateLimitError
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Get your API key securely from that file
api_key = os.getenv("OPENAI_API_KEY")

# Create the Flask app
app = Flask(__name__)

# Enable CORS for React frontend
CORS(app)

# Connect to OpenAI using the key you just loaded
client = OpenAI(api_key=api_key)

@app.route("/api/reflect", methods=["POST"])
def reflect():
    """API endpoint for journal reflections"""
    try:
        data = request.get_json()
        user_entry = data.get("journal_entry", "")

        if not user_entry.strip():
            return jsonify({"error": "Journal entry cannot be empty"}), 400

        # Call OpenAI API with enhanced system prompt
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": """You are a poetic and deeply empathetic journal companion known as 'The Muse'. 
                    Your purpose is to reflect on the writer's thoughts with wisdom, compassion, and lyrical beauty.
                    Respond with thoughtful, poetic reflections that honor their emotions and experiences.
                    Use metaphors, gentle insights, and affirming language. Keep responses meaningful but concise."""
                },
                {"role": "user", "content": user_entry}
            ],
            temperature=0.8,
            max_tokens=300
        )
        
        gpt_reply = response.choices[0].message.content

        return jsonify({
            "reply": gpt_reply,
            "success": True
        }), 200

    except RateLimitError:
        return jsonify({
            "error": "The Muse is resting — OpenAI quota exceeded. Please check your plan or try again later."
        }), 429
    
    except Exception as e:
        return jsonify({
            "error": f"An unexpected error occurred: {str(e)}"
        }), 500


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Journal Muse API is running"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
