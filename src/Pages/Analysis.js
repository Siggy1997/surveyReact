import React from 'react';
import './Analysis.css'

function Analysis(props) {
  // responseList에서 surveyTitle를 기준으로 객체를 그룹화
  const groupedData = props.responseList.reduce((acc, curr) => {
    const { surveyTitle } = curr;
    if (!acc[surveyTitle]) {
      acc[surveyTitle] = [];
    }
    acc[surveyTitle].push(curr);
    return acc;
  }, {});

  console.log(groupedData);

  return (
    <div>
      {/* 각 그룹에 대한 처리 */}
      {Object.keys(groupedData).map((surveyTitle) => (
        <div key={surveyTitle}>
          <h2>
            설문 제목 : {surveyTitle} ( {surveyTitle.length} ){' '}
          </h2>

          {/* surveyId별로 묶인 데이터 처리 */}
          {groupedData[surveyTitle].map((data, index) => (
            <div className='analysisWrapper' key={index}>
              {/* 여기서 데이터를 렌더링 */}
              <div className='analysisTitle'>작성 날짜</div>  {data.date}
              {data.questions.map((question, idx) => (
                <div key={idx} className='analysisTitle'>{question.questionText}</div>
              ))}

              {/* 그 외 데이터 필드들에 대한 처리 */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Analysis;
