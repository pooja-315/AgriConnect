from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Flask app
app = Flask(__name__)

# CORS setup
CORS(app, supports_credentials=True, resources={r"/*": {
    "origins": ["http://localhost:5173", "https://farmsmart-2025.web.app"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

# Gemini setup with v1 API
api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key loaded: {'Yes' if api_key else 'No'}")

# Configure with v1 API instead of v1beta
genai.configure(api_key=api_key)

# First, let's see what models are actually available
def list_available_models():
    try:
        models = genai.list_models()
        available = []
        for m in models:
            if 'generateContent' in m.supported_generation_methods:
                available.append(m.name)
        return available
    except Exception as e:
        print(f"Error listing models: {e}")
        return []

available_models = list_available_models()
print(f"Available models: {available_models}")

# Use the actual model names from the list
model_options = []
if available_models:
    # Try specific models that are known to work well
    priority_models = [
        'models/gemini-1.5-flash-8b',  # Smaller, more quota-friendly
        'models/gemini-1.5-flash',     # Standard flash model
        'models/gemini-2.0-flash-lite',  # Lite version
        'models/gemini-1.5-flash-8b-latest',
    ]
    
    # Add priority models that exist in available list
    for priority in priority_models:
        if priority in available_models:
            model_options.append(priority)
    
    # Add remaining flash models
    flash_models = [m for m in available_models if 'flash' in m.lower() and m not in model_options]
    model_options.extend(flash_models[:3])  # Limit to 3 to avoid too many attempts
else:
    model_options = ['models/gemini-1.5-flash']

print(f"Trying models in order: {model_options}")

model = None
model_name = None

for model_option in model_options:
    try:
        print(f"Trying model: {model_option}")
        test_model = genai.GenerativeModel(model_option)
        
        # Test with minimal generation to verify it works
        try:
            test_response = test_model.generate_content(
                "Hi", 
                generation_config=genai.GenerationConfig(max_output_tokens=1)
            )
            print(f"Test generation successful for {model_option}")
            model = test_model
            model_name = model_option
            print(f"Successfully initialized and tested model: {model_name}")
            break
        except Exception as gen_error:
            print(f"Generation test failed for {model_option}: {gen_error}")
            continue
            
    except Exception as init_error:
        print(f"Initialization failed for {model_option}: {init_error}")
        continue

if not model:
    print("No working model found!")
    model_name = "No model available"

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return '', 200

    if not model:
        return jsonify({"response": "AI service is temporarily unavailable. Please try again later."})

    try:
        data = request.json
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"response": "Please ask me something about farming!"}), 400

        print(f"Processing message: {user_message[:50]}...")

        # Create farming-focused prompt for Gemini
        farming_prompt = f"""You are Agriconnect AI, a helpful farming assistant. 

User Question: {user_message}

Please provide a well-structured response with:
- Use simple bullet points with dashes (-) instead of asterisks
- Put important terms in **bold** (like **crop rotation** or **organic fertilizer**)
- Use short paragraphs with line breaks
- Give 3-4 practical tips maximum
- End with one key recommendation

Format example:
- **Tip 1**: Short explanation
- **Tip 2**: Another point

**Key Recommendation**: Final advice

Keep it under 120 words and focus on actionable advice."""

        # Generate response using Gemini with updated configuration
        response = model.generate_content(
            farming_prompt,
            generation_config=genai.GenerationConfig(
                max_output_tokens=200,
                temperature=0.7,
            )
        )
        
        ai_response = response.text.strip()
        print(f"Generated response successfully")
        return jsonify({"response": ai_response})

    except Exception as e:
        error_message = str(e)
        print(f"Error in chat: {e}")
        
        if "api_key" in error_message.lower() or "authentication" in error_message.lower():
            return jsonify({"response": "API authentication failed. Please check your Gemini API key."})
        elif "quota" in error_message.lower() or "limit" in error_message.lower() or "429" in error_message:
            return jsonify({"response": "I'm currently experiencing high usage. Please try again in a few minutes. 🌱"})
        elif "blocked" in error_message.lower() or "safety" in error_message.lower():
            return jsonify({"response": "Request was blocked by safety filters. Please rephrase your question."})
        elif "not found" in error_message.lower() or "404" in error_message:
            return jsonify({"response": "Model not available. Please try again with a different question."})
        else:
            return jsonify({"response": "Sorry, I'm having trouble connecting. Please try again."})

# Test endpoint with model info
@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "Agriconnect AI is running!", 
        "version": "2.0",
        "current_model": model_name,
        "api_configured": bool(api_key)
    })

# Run app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
