import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SurveyStateContext } from '../App';
import New from './New';

function Edit() {
  const surveyList = useContext(SurveyStateContext);
  const { id } = useParams();

  const [originData, setOriginData] = useState();

  // surveyId를 기준으로 해당 설문을 찾음
  const survey = surveyList.find((survey) => survey.surveyId === parseInt(id));

  useEffect(() => {
    setOriginData(survey);
  }, [survey, originData]);

  return (
    <div>
      편집입니다ㄴ{originData && <New isEdit={true} originData={originData} />}
    </div>
  );
}

export default Edit;
