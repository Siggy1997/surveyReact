import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SurveyStateContext } from '../App';
import New from './New';

function Response() {
    const surveyList = useContext(SurveyStateContext);
    const { id } = useParams();
  
    const [responseData, setResponseData] = useState();
  
    // surveyId를 기준으로 해당 설문을 찾음
    const survey = surveyList.find((survey) => survey.surveyId === parseInt(id));
  
    useEffect(() => {
        setResponseData(survey);
    }, [survey, setResponseData]);
  
    return (
      <div>
        설문하기{responseData && <New isResponse={true} responseData={responseData} />}
      </div>
    );
}

export default Response