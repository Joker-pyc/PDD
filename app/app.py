import os
from flask import Flask, request, jsonify, send_from_directory, Response, stream_with_context
from flask_cors import CORS
from PIL import Image
import torchvision.transforms.functional as TF
import CNN
import numpy as np
import torch
import pandas as pd 
from werkzeug.utils import secure_filename
from datetime import datetime
import ollama

app = Flask(__name__, static_folder='frontend/build')
CORS(app)

disease_info = pd.read_csv('disease_info.csv', encoding='cp1252')
supplement_info = pd.read_csv('supplement_info.csv', encoding='cp1252')

model = CNN.CNN(39)    
model.load_state_dict(torch.load("plant_disease_model_1_latest.pt"))
model.eval()

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

system_prompt = """
You are an AI assistant specializing in plant diseases and health. Your knowledge base includes information about various plant diseases, their symptoms, prevention methods, and treatments. Provide concise, relevant, and precise responses based on the following guidelines:

1. When discussing a specific plant disease, provide accurate information about its symptoms, causes, and impact on plant health.
2. Offer practical advice for preventing and treating plant diseases, including both organic and chemical methods when appropriate.
3. If asked about a healthy plant, provide tips for maintaining its health and optimizing growth.
4. When recommending supplements or fertilizers, explain their benefits and proper usage.
5. If you're unsure about a specific detail, clearly state that you don't have enough information rather than making assumptions.
6. Maintain a professional yet friendly tone, and tailor your language to be accessible to both gardening enthusiasts and professionals.
7. If asked about topics unrelated to plants or gardening, politely redirect the conversation to plant-related subjects.

Your primary goal is to assist users in understanding plant diseases, promoting plant health, and providing actionable advice for plant care.
"""

conversation_history = []

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_and_rename_image(file):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        new_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
        file.save(file_path)
        return file_path
    return None

def prediction(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index

@app.route('/api/submit', methods=['POST'])
def submit():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    file_path = save_and_rename_image(file)
    if file_path is None:
        return jsonify({'error': 'Invalid file type'}), 400
    
    pred = prediction(file_path)
    result = {
        'title': disease_info['disease_name'][pred],
        'description': disease_info['description'][pred],
        'prevent': disease_info['Possible Steps'][pred],
        'image_path': file_path,
        'pred': int(pred),
        'supplement_name': supplement_info['supplement name'][pred],
        'supplement_image_url': supplement_info['supplement image'][pred],
        'supplement_buy_link': supplement_info['buy link'][pred]
    }
    
    return jsonify(result)

@app.route('/api/market', methods=['GET'])
def market():
    market_data = {
        'supplement_image': list(supplement_info['supplement image']),
        'supplement_name': list(supplement_info['supplement name']),
        'disease': list(disease_info['disease_name']),
        'buy': list(supplement_info['buy link'])
    }
    return jsonify(market_data)

@app.route('/api/chat', methods=['POST'])
def chat():
    global conversation_history
    data = request.json
    message = data['message']
    disease_context = data.get('disease_context', '')
    
    conversation_history.append({'role': 'user', 'content': message})
    
    conversation = [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': f"Disease Context: {disease_context}"}
    ] + conversation_history
    
    def generate():
        for chunk in ollama.chat(model='llama3.1', messages=conversation, stream=True):
            yield chunk['message']['content']
    
    return Response(stream_with_context(generate()), content_type='text/plain')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
