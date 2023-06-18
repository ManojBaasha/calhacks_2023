import React from "react";

function FeatureItem({ text }) {
  return <li className="list-group-item">{text}</li>;
}

function FeatureList() {
  return (
    <ul className="list-group">
      <FeatureItem text="Question Simulation: Experience real interview scenarios with AI Interviewer asking a series of interview questions." />
      <FeatureItem text="Follow-up Questions: Intelligent generation of follow-up questions based on your responses, enhancing the depth of the interview experience." />
      <FeatureItem text="Emotion Analysis: Analyze your facial expressions and tone of voice to gauge your emotions during the interview." />
      <FeatureItem text="Performance Evaluation: Assess the quality of your responses, considering both content and delivery." />
      <FeatureItem text="Feedback and Suggestions: Receive personalized feedback and suggestions to improve your interview skills and increase your chances of success." />
    </ul>
  );
}

function FeaturesSection() {
  return (
    <div className="section-features section-header mb-4">
      <h3>Key Features:</h3>
      <FeatureList />
    </div>
  );
}

export default FeaturesSection;