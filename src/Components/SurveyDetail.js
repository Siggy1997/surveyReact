import React from 'react';
import './SurveyDetail.css';
import MyButton from './MyButton';

function SurveyDetail({ onToggleModal }) {
  return (
    <>
      <div className='background'>
        <div className='Survey-Detail-Wrapper'>
          <div className='Survey-Content'>
            내용
            <br />
          </div>

          <div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SurveyDetail;
