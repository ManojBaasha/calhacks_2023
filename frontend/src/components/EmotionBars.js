import React from "react";

function EmotionBar({ name, color, width, percentage}) {
  let emotionData = localStorage.getItem('emotionData');
  console.log(emotionData);
    return (
      <div>
        {/* <h6>{name}</h6>
        <div className={`progress mb-2 progress-bar-striped bg-${color}`}>
          <div className="progress-bar" role="progressbar" style={{ width }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
            <strong style={{ color: '#fff' }}>{percentage}</strong>
          </div>
        </div> */}
        {emotionData["emotions"] && emotionData["emotions"].length > 0 && emotionData["emotions"].map((emotion) => (
              <div key={emotion.key}>
                <h6>{emotion.name}</h6>
                <div className="progress mb-2">
                  <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${emotion.score}%` }} aria-valuenow={emotion.score} aria-valuemin="0" aria-valuemax="100">
                    <strong style={{ color: '#fff' }}>{emotion.score}%</strong>
                  </div>
                </div>
              </div>
            ))}
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

