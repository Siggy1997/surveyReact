import React from 'react';

function BackGroundColor({ textColor,backgroundColor, survey, setSurvey }) {
  return (
    <div
      className='backGroundColor'
      style={{ backgroundColor: textColor }}
      onClick={() => setSurvey({ ...survey, surveyBackGroundColor: backgroundColor })}
    ></div>
  );
}

export default BackGroundColor;
