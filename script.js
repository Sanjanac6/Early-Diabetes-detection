document.addEventListener('DOMContentLoaded', function() {
    const predictBtn = document.getElementById('predict-btn');
    const homeBtn = document.getElementById('home-btn');
    const homeScreen = document.getElementById('home-screen');
    const formScreen = document.getElementById('form-screen');
    const resultScreen = document.getElementById('result-screen');
    const predictionForm = document.getElementById('prediction-form');

    // Show form screen when "Predict" button is clicked
    predictBtn.addEventListener('click', function() {
        homeScreen.style.display = 'none';
        formScreen.style.display = 'block';
    });

    // Show home screen when "Back to Home" is clicked
    homeBtn.addEventListener('click', function() {
        resultScreen.style.display = 'none';
        homeScreen.style.display = 'block';
    });

    // Handle form submission
    predictionForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from reloading the page

        // Collect form data
        const formData = new FormData(predictionForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send form data to Flask server (adjust URL to match your setup)
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Update result screen with prediction
            document.getElementById('prediction').textContent = `Prediction: ${data.prediction}`;
            document.getElementById('probability').textContent = `Probability: ${(data.probability * 100).toFixed(2)}%`;

            // Hide the form and show the result
            formScreen.style.display = 'none';
            resultScreen.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
