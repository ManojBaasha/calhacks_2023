# SynthiaAI

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [APIs Used](#apis-used)
- [Developers](#developers)

## Description

SynthiaAI is an advanced AI system that simulates real interview scenarios, providing feedback and personalized suggestions to enhance your interview skills and boost your confidence.

Our project was built using a combination of JavaScript and React for the front-end, while Python and Flask were utilized for the back-end. We selected these languages and libraries because of their ease of use, making the development process more streamlined. We integrated the OpenAI API and the Hume AI to power our AI interviewer. This combination allowed our system to generate appropriate responses, guide users during interviews, and improve its feedback through learning. The Hume AI component was instrumental in analyzing the users' emotions during their responses, enhancing the overall user experience and feedback provided by our AI interviewer. Utilizing the OpenAI API, we generated contextually relevant and coherent responses aligned with the user's inputs and interview scenarios, making the interview experience more realistic and practical.

## Installation

Here are the steps to install and setup this project on your local machine:

```bash
# Clone the repo
git clone https://github.com/ManojBaasha/calhacks_2023.git

# Navigate to project directory
cd calhacks_2023

# Install npm packages for frontend
cd frontend
npm install

# Install python packages for backend
cd ../backend
pip install -r requirements.txt

## Usage

The frontend of the application is developed in React.js while the backend uses Flask. Here's a brief on how to use it:

```bash
# To run frontend
cd frontend
npm start

# To run backend
cd ../backend
python app.py
```

## APIs Used

This project uses following APIs:

1. [OpenAI API](https://openai.com/research/](https://openai.com/blog/openai-api) - Used for AI generated responses.
2. [Whipsir API](https://developers.whispir.com/bc98e4074ef97-about-the-whispir-platform-api) - Used for speech to text conversion.
3. [HumeAI API](https://docs.hume.ai/) - Used for emotion analysis.

## Developers

This project was made with love by the following developers:

1. [Manoj Elango](https://github.com/ManojBaasha) 
2. [Yash Inani](https://github.com/yinani24) 
3. [Vinh Pham](https://github.com/VinnyXP) 
4. [Keena Vasiloff](https://github.com/TheGhostCoder0) 

