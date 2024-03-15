import React from 'react';
function TextFont({ name, value, survey, setSurvey }) {
  return (
    <div className={value}
      style={{
        fontSize: '16px',
        color: 'rgb(100, 100, 100)',
      }}
      onClick={() => setSurvey({ ...survey, surveyFont: value })}
    >
      <div className='fontPreview-Wrapper'>
        <div className='fontPreview'>{value}</div>
        <div style={{ display: 'flex', justifyContent: 'center', flex: '1' }}>
          {name}
        </div>
      </div>
    </div>
  );
}

export default TextFont;
