from flask import Flask, send_from_directory, request
import asyncio
from hume import HumeStreamClient
from hume.models.config import LanguageConfig

app = Flask(__name__, static_folder='../frontend/reactApp/build')

@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/process-string', methods=['POST'])
def process_string():
    received_string = request.form.get('data')  # Access the string sent from the frontend
    # Process the received_string as needed
    # You can perform any desired operations on the string here

    async def main():
        client = HumeStreamClient("h0BIQIKbPwM5vuaKIiDKsZ6yz4QVVqDFHccGLqYRgpklON2E")
        config = LanguageConfig()
        async with client.connect([config]) as socket:
            result = await socket.send_text(received_string)
            emotions = result["language"]["predictions"][0]["emotions"]
            print(emotions)

    asyncio.run(main())
    # Return a response if needed
    response = {'message': 'String received and processed successfully'}
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

