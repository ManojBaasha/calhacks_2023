import React from "react";

function Card({ title, description }) {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

function CardSection() {
  return (
    <div className="row">
      <Card
        title="Enhance Your Skills"
        description="Practice answering interview questions and improve your communication and problem-solving abilities."
      />
      <Card
        title="Gain Confidence"
        description="Boost your confidence by familiarizing yourself with interview scenarios and receiving personalized feedback."
      />
      <Card
        title="Save Time"
        description="Efficiently prepare for interviews without the need for scheduling or coordinating with others."
      />
    </div>
  );
}

export default CardSection;
