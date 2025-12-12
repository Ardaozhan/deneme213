import React from "react";
import "./AIRecommendations.css";

const AIRecommendations = ({ horses, userBalance }) => {
  const generateRecommendations = () => {
    if (userBalance < 50) {
      return ["Düşük bütçeli bahisler önerilir.", "Risk oranı düşük yarışlara odaklanın."];
    }

    if (horses.length > 0) {
      return horses.map((horse) => `At ${horse.name} yüksek kazanma şansı sunuyor.`);
    }

    return ["Yarış listesi henüz yüklenmedi. Daha sonra tekrar deneyin."];
  };

  const recommendations = generateRecommendations();

  return (
    <div className="ai-recommendations">
      <h2>AI Önerileri</h2>
      <p>Bakiyeniz: {userBalance} ₺</p>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIRecommendations;
