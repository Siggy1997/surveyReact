import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { IoAnalytics, IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineLogin } from 'react-icons/ai';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { createContext, useState } from 'react';

import Content from './Pages/Content';
import Login from './Pages/Login';
import Analysis from './Pages/Analysis';
import Edit from './Pages/Edit';
import './App.css';
import Survey from './Pages/Survey';
import New from './Pages/New';
import Response from './Pages/Response';

export const SurveyStateContext = createContext();
export const SurveyDispatchContext = createContext();

function App() {
  const [sideBarDetail, setSideBarDetail] = useState(true);

  const [surveyList, setSurveyList] = useState([
    {
      surveyId: 0,
      surveyTitle: '설문조사1',
      surveySubTitle: '서브 타이틀',

      date: 1707322599671,
      questions: [
        {
          questionId: '0',
          questionType: 'shortText',
          questionText: '1번질문',
          response:'',
          options :[]
        },
      ],
    },
  ]);

  const [responseList, setResponseList] =useState([])


  const newSurveyId =
    surveyList.length > 0 ? surveyList[surveyList.length - 1].surveyId + 1 : 0;

  const newResponseId =
  responseList.length > 0 ? responseList[responseList.length - 1].responseId + 1 : 0;

  const onCreate = (data) => {
    const newData = { ...data, surveyId: newSurveyId };
    setSurveyList([...surveyList, newData]);
  };

  const onCreateResponse = (data) => {
    const newData = {...data, responseId: newResponseId}
    setResponseList([...responseList, newData])
  }

  const onEdit = (data) => {
    const editSurvey = surveyList.map((it) =>
      it.surveyId === data.surveyId ? { ...data } : it
    );
    setSurveyList(editSurvey);
  };

  const onDelete = (surveyId) => {
    const deleteSurvey = surveyList.filter((it) => it.surveyId !== surveyId);
    setSurveyList(deleteSurvey);
  };

  const onCopy = (surveyId) => {
    const copySurvey = surveyList.find((it) => it.surveyId === surveyId);
    const changedCopySurveyId = { ...copySurvey, surveyId: newSurveyId };
    setSurveyList([...surveyList, changedCopySurveyId]);
    console.log('copySurveyList' + surveyList);
  };

  return (
    <SurveyStateContext.Provider value={surveyList}>
      <SurveyDispatchContext.Provider
        value={{ onCreate, onEdit, onDelete, onCopy,onCreateResponse }}
      >
        <BrowserRouter>
          <div className='App'>
            <div className='Top-Bar'>LOGO + NAME</div>
            <div className='Body-Wrapper'>
              <div className='Side-Bar'>
                <div
                  className='Side-Bar-Top-Title'
                  onClick={() => setSideBarDetail(!sideBarDetail)}
                >
                  My Content
                  {sideBarDetail ? (
                    <FaLongArrowAltUp />
                  ) : (
                    <FaLongArrowAltDown />
                  )}
                </div>

                {sideBarDetail && (
                  <div className='Side-Bar-Top'>
                    <Link to={'/'}>- 전체콘텐츠</Link>
                    <Link to={'/survey'}>- 설문</Link>
                    <Link to={'/survey'}>- 퀴즈</Link>
                    <Link to={'/survey'}>- 설문</Link>
                  </div>
                )}

                <div className='Side-Bar-Bottom'>
                  <Link to={'/analysis'}>
                    <IoAnalytics className='icons' />
                    응답 및 분석
                  </Link>
                  <Link to={'/setting'}>
                    <IoSettingsOutline className='icons' />
                    설정
                  </Link>
                  <Link to={'/login'}>
                    <AiOutlineLogin className='icons' /> 로그인
                  </Link>
                </div>
              </div>

              <div className='Item-Section'>
                <Routes>
                  <Route path='/' element={<Content />} />
                  <Route path='/edit/:id' element={<Edit />} />
                  <Route path='/survey' element={<Survey />} />
                  <Route path='/analysis' element={<Analysis responseList={responseList} />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/new' element={<New />} />
                  <Route path='/response/:id' element={<Response />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </SurveyDispatchContext.Provider>
    </SurveyStateContext.Provider>
  );
}

export default App;
