from flask import Flask, send_from_directory, request
import asyncio
from hume import HumeStreamClient
from hume.models.config import LanguageConfig
from flask_cors import CORS
import numpy as np
import openai
import re
from colorama import Fore, Style
import json
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

openai.api_key = os.getenv("OPEN-AI-API")
hume_ai_api = os.getenv("HUME-AI-API")

app = Flask(__name__, static_folder='../frontend/reactApp/build')
CORS(app)

# @app.route("/")
# def index():
#     return send_from_directory(app.static_folder, 'index.html')
openai.api_key = "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"

SYSTEM_INSTRUCTIONS_COMEDIAN = """
You are a bot named Synthia. Talk to the user as if you are a interviewer. Mention the user as 'you'. Give your responses in relation to improving an interview performance. Be considerate of the user's feelings. Be professional.
You will answer in 7 to 8 sentences. 
"""

EMOTIONS = np.array([
    "admiring", "adoring", "appreciative", "amused", "angry", "anxious", "awestruck", "uncomfortable", "bored", "calm",
    "focused", "contemplative", "confused", "contemptuous", "content", "hungry", "determined", "disappointed",
    "disgusted", "distressed", "doubtful", "euphoric", "embarrassed", "disturbed", "entranced", "envious", "excited",
    "fearful", "guilty", "horrified", "interested", "happy", "enamored", "nostalgic", "pained", "proud", "inspired",
    "relieved", "smitten", "sad", "satisfied", "desirous", "ashamed", "negatively surprised", "positively surprised",
    "sympathetic", "tired", "triumphant"
])

conversation = [{
    "role": "system",
    "content": SYSTEM_INSTRUCTIONS_COMEDIAN
}, {
    'role':
    'user',
    'content':
    "The user walks into your Interview. As a interviewer named Synthia, based on the dataset given to you about the user, you have to analyze the user's emotions and give feedback to the user and how to improve on it."
}]

emotion_history = []


def create_message(user_message=None, user_emotion=None):
    return f"The user says, '{user_message}'. Initially the user looked {user_emotion[0]}, then {user_emotion[1]}."

def get_top_percentages(json_data):
    # Load JSON data
    #emotions = json.loads(json_data)
    # Sort emotions by score in descending order
    sorted_emotions = sorted(json_data, key=lambda x: x['score'], reverse=True)

    # Get the top 4 emotions
    top_4_emotions = sorted_emotions[:4]

    # Convert top 4 emotions to a string
    # top_4_emotions_string = json.dumps(top_4_emotions)

    # Print the result
    print(top_4_emotions)
    return top_4_emotions

def find_max_emotion(predictions):

    def get_adjective(score):
        if 0.26 <= score < 0.35:
            return "slightly"
        elif 0.35 <= score < 0.44:
            return "somewhat"
        elif 0.44 <= score < 0.53:
            return "moderately"
        elif 0.53 <= score < 0.62:
            return "quite"
        elif 0.62 <= score < 0.71:
            return "very"
        elif 0.71 <= score <= 3:
            return "extremely"
        else:
            return ""

    if len(predictions) == 0:
        return ["calm", "bored"]

    def process_section(section):
        emotion_predictions = []
        for frame_dict in section:
            if 'predictions' not in frame_dict['face']:
                continue
            frame_emo_dict = frame_dict['face']["predictions"][0]["emotions"]
            emo_dict = {x["name"]: x["score"] for x in frame_emo_dict}
            emo_frame = sorted(emo_dict.items())
            emo_frame = np.array([x[1] for x in emo_frame])
            emotion_predictions.append(emo_frame)
        if len(emotion_predictions) == 0:
            return 'calm'
        # Assuming 'emotion_predictions' is a 2D array
        mean_predictions = np.array(emotion_predictions).mean(axis=0)
        # Get the index of the highest value
        top_index = np.argmax(mean_predictions)

        # Add adjectives to the top emotion based on the prediction score
        top_emotion_adjective = f"{get_adjective(mean_predictions[top_index])} {EMOTIONS[top_index]}"
        return top_emotion_adjective

    # Split predictions into 2 sections
    section_size = len(predictions) // 2
    sections = [
        predictions[i * section_size:(i + 1) * section_size] for i in range(2)]

    # Get top emotion for each section
    top_emotions = [process_section(section) for section in sections]
    return top_emotions


def message(transcription, json_data):
    global emotion_history
    user_emotions = find_max_emotion(emotion_history)
    message = create_message(transcription, user_emotions)
    print(Fore.GREEN + "PROMPT:", message + Style.RESET_ALL)
    conversation.append({"role": "user", "content": message})
    conversation.append({"role": "user", "content": json_data})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation)
    response = completion.choices[0]['message']['content']
    conversation.append({"role": "assistant", "content": response})
    response = re.sub(r'\([^)]*\)', '', response)
    response = re.sub(r'\[.*?\]', '', response)
    response = re.sub(r'^"|"$', '', response)
    print(Fore.CYAN + "Synthia:", response + Style.RESET_ALL)
    emotion_history = []
    return response


def final_response(emotions, json_data):
    response = message(emotions, json_data)
    return response

@app.route('/process-string', methods=['POST', 'GET'])
def process_string():

    # received_string = request.form.post('data')  # Access
    # the string sent from the frontend
    # print('Hello World')
    received_string = request.get_json()
    # print("this is the string we got", received_string)
    # print(received_string['data'])
    data = received_string['data']
    response = {'message': '', 'emotions': '', 'chat-gpt': ''}
    # Process the received_string as needed
    # You can perform any desired operations on the string here
    async def process_emotions():
        try:
            # print("This is the string we got:", received_string)
            client = HumeStreamClient(hume_ai_api)
            config = LanguageConfig()
            async with client.connect([config]) as socket:
                result = await socket.send_text(data)
                try:
                    print(data)
                    emotions = result["language"]["predictions"][0]["emotions"]
                    response['message'] = "String received and processed successfully"
                    # response['emotions'] = get_top_percentages(emotions)
                    x = get_top_percentages(emotions)
                    response['emotions'] = x
                    fin_res_hume = final_response(x, data)
                    response['chat-gpt'] = fin_res_hume
                    print(fin_res_hume)
                except KeyError:
                    emotions = None
                    response['message'] = "Error: Emotions not found in the result"
                    print("Emotions not found in the result")
        except Exception as e:
            response['message'] = "Error: An error occurred" + str(e)
            print("An error occurred:", str(e))
    asyncio.run(process_emotions())
    # Return a response if needed
    #response = {'message': 'String received and processed successfully'}
    print(response)
    #print(fin_res_hume)
    return response

if __name__ == "__main__":
    app.run(debug=True)

