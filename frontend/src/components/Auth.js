import "../styles/Auth.css";

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <section className="jumbotron mt-4">
        <div className="container">
          <div className="app-header">
            <h1>Interview AI</h1>
          </div>
          <h2>Prepare for Your Interview with AI Interviewer</h2>
          <button className="button" onClick={signInWithGoogle}>Begin your next interview</button>
        </div>
      </section>

      <section className="container mt-3 mb-2">
        <h3 className="section-header">Why Choose AI Interviewer?</h3>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Enhance Your Skills</h5>
                <p className="card-text">Practice answering interview questions and improve your communication and problem-solving abilities.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Gain Confidence</h5>
                <p className="card-text">Boost your confidence by familiarizing yourself with interview scenarios and receiving personalized feedback.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Save Time</h5>
                <p className="card-text">Efficiently prepare for interviews without the need for scheduling or coordinating with others.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="section-description">
            <p>AI Interviewer is an advanced artificial intelligence system designed to help you prepare for interviews effectively. It simulates real interview scenarios and provides valuable feedback and suggestions to improve your performance.</p>
          </div>
          <div class="section-features section-header mb-4">
            <h3>Key Features:</h3>
            <ul class="list-group">
              <li class="list-group-item">Question Simulation: AI Interviewer asks a series of interview questions to simulate real interview scenarios.</li>
              <li class="list-group-item">Follow-up Questions: It intelligently generates follow-up questions based on your responses, enhancing the depth of the interview experience.</li>
              <li class="list-group-item">Emotion Analysis: The AI system can analyze your facial expressions and tone of voice to gauge your emotions during the interview.</li>
              <li class="list-group-item">Performance Evaluation: It assesses the quality of your responses, taking into account both the content and the delivery of your answers.</li>
              <li class="list-group-item">Feedback and Suggestions: AI Interviewer provides personalized feedback and suggestions to help you improve your interview skills and increase your chances of success.</li>
            </ul>
          </div>
        </div>

      </section>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '45vh',
  },
  Button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'tomato',  // Change the background color to red
    color: 'white',         // Change the text color to white
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  StartText: {
    textAlign: 'center',
    fontSize: '50px',
    fontFamily: 'abel',
    borderRadius: '5px',
  },
  Text: {
    textAlign: 'center',
    color: 'black',
  },
  Genie: {
    width: '50%',
    height: 'auto',
  },
};