from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load your pre-trained model (ensure this is the correct path)
model = joblib.load('diabetes_model.pkl')

@app.route('/')
def index():
    # Serve the HTML template
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the JSON data sent from the form
    data = request.get_json()

    # Extract features from the JSON data
    features = [
        int(data['age']),
        int(data['gender']),
        int(data['polyuria']),
        int(data['polydipsia']),
        int(data['blood_pressure']),
        float(data['bmi']),
        int(data['glucose_tolerance']),
        int(data['skin_thickness']),
        int(data['insulin']),
        float(data['diabetes_pedigree'])
    ]

    # Convert to NumPy array and reshape for prediction
    features_array = np.array([features])

    # Perform prediction
    prediction = model.predict(features_array)[0]
    probability = model.predict_proba(features_array)[0][1]  # Get probability for class 1

    # Send back a JSON response
    return jsonify({
        'prediction': 'Positive' if prediction == 1 else 'Negative',
        'probability': probability
    })

if __name__ == '__main__':
    app.run(debug=True)
