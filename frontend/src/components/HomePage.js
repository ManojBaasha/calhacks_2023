import "../styles/HomePage.css";
import FeaturesSection from "./FeatureSection";
import CardSection from "./CardSection";

const HomePage = ({ setIsAuth }) => {
  const signInWithGoogle = () => {
    window.location.href = '/chat';
  };

  return (
    <div>
      <section className="jumbotron mt-4">
        <div className="container">
          <div className="app-header">
            <h1>Synthia</h1>
          </div>
          <h2>Prepare for Your Interviews with AI Interviewer</h2>
          <button className="button" onClick={signInWithGoogle}>Begin your next interview</button>
        </div>
      </section>

      <section className="container mt-3 mb-2">
        <h3 className="section-header">Why Choose AI Interviewer?</h3>
        <CardSection />
        <div className="mt-4">
          <div className="section-description">
            <p>AI Interviewer is an advanced artificial intelligence system designed to help you prepare for interviews effectively. It simulates real interview scenarios and provides valuable feedback and suggestions to improve your performance.</p>
          </div>
          <div className="section-features section-header mb-4">
            <FeaturesSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
