from flask import Flask, jsonify
from flask_cors import CORS
from backend.data_handler import get_price_data, get_event_data, get_model_summary
from src.utils import ensure_dir

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/api/prices', methods=['GET'])
def prices():
    """Return price data."""
    return jsonify(get_price_data())

@app.route('/api/events', methods=['GET'])
def events():
    """Return event data."""
    return jsonify(get_event_data())

@app.route('/api/summary', methods=['GET'])
def summary():
    """Return model summary."""
    return jsonify(get_model_summary())

if __name__ == "__main__":
    ensure_dir("outputs/plots")
    app.run(debug=True, port=5000)
