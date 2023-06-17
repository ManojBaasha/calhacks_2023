import "../styles/Auth.css";
// import Genie from './../assets/WiseGenie_Genie.png';
// import manoj from './../assets/me.png';
// import shubox from './../assets/me2.png';
// import { QualtricsAPI } from 'qualtrics-api;


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
      <div className="container">
        {/* <img style={styles.Genie} src={Genie} alt="Genie" /> */}
        <text className="StartText"> CalHacks 2023</text>
        <button style={styles.Button} onClick={signInWithGoogle}> Start Here </button>
        <br />
        <text style={styles.Text}> Scroll down to learn more! </text>
      </div>
      <div className="bigbox">
        {/* add the first box */}
        <div className="box1">
          <h3> Bla bla bla</h3>
          <p> Our project WiseGenie centers around exploring the implementation of different AI-driven learning methods and identifying effective speed learning strategies for knowledge acquisition with the help of open-ai.  With the increasing integration of AI into every digital platform that we use, it can get repetitive to see chatbots that can do anything and everything. But WiseGenie focuses on exploring the already known faster AI-driven forms of learning by collaborating with open-ai. We made our exploration interactable in the form of a website structured and styled with React (A combination of Javascript, HTML and CSS)! </p>

          <p>
            We explore the topics of how AI is revolutionizing our everyday lives in the educational field. With the premium access to GPT-4 on the rise, individuals do not need to think or perform easy calculations anymore! With its immense potential, AI is reshaping the educational field, offering innovative solutions and paving the way for personalized, efficient, and engaging learning experiences. So much that the role of teachers and tutors is being questioned! These AI-powered learning strategies carry the capability of answering questions, summarizing content, providing examples and solutions. Education powered by AI will be transforming how we learn in the near future. We chose to explore training open-ai to summarize content and ask questions based on content for a faster and more radical way of learning! </p>
        </div>
        {/* add the second box */}
        <div className="box2">
          <h3> Our Mission </h3>
          <p> WiseGenie is a creative AI-driven learning tool for the target audience being students of any education level. It is often found that students feel overwhelmed and unmotivated to catch up on boring lectures and do a gazillion practice questions. Say goodbye to boring and tedious old learning methods that leave you drained. We introduce you to WiseGenie. WiseGenie is here to transform your educational journey into an exciting adventure. Say hello to easy interactive gamified learning methods that are effective and enjoyable.</p>
          <p>
            WiseGenie is a website platform where students can engage with the study tools built by training open-ai! The study strategies that we trained our open-ai models focus on helping students summarize information, and ask questions from the material sent to the ai. All of these simplified features make it easy, fast and accessible for students to learn in one place, and motivates them to actually finish work!
          </p>
        </div>
      </div>
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