import React from "react";

function EmotionBar({ name, color, width, percentage }) {
    return (
      <div>
        <h6>{name}</h6>
        <div className={`progress mb-2 progress-bar-striped bg-${color}`}>
          <div className="progress-bar" role="progressbar" style={{ width }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
            <strong style={{ color: '#fff' }}>{percentage}</strong>
          </div>
        </div>
      </div>
    );
}

function EmotionBars() {
  return (
    <div>
      <EmotionBar name="Confidence" color="success" width="25%" percentage="25%" />
      <EmotionBar name="Enthusiasm" color="info" width="50%" percentage="55%" />
      <EmotionBar name="Positivity" color="warning" width="75%" percentage="75%" />
      <EmotionBar name="Professionalism" color="danger" width="100%" percentage="100%" />
    </div>
  );
}
export default EmotionBars;

