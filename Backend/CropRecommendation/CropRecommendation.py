from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load the trained model and label encoder
model = joblib.load(open('./crop_predictor_model.pkl', 'rb'))
encoder = joblib.load(open('./crop_label_encoder.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict_crop():
    try:
        # Extract data from POST request
        data = request.json
        temperature = float(data['temperature'])
        humidity = float(data['humidity'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])

        # Prepare input features for prediction
        features = np.array([[temperature, humidity, ph, rainfall]])
        prediction = model.predict(features)

        # Decode predicted label into human-readable crop name
        crop_name = encoder.inverse_transform(prediction)[0]

        # Return the prediction as a JSON response
        return jsonify({"crop": crop_name})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Use the PORT environment variable (set by Render) for deployment
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 for local
    app.run(host='0.0.0.0', port=port)
