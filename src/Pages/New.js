import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyDispatchContext } from '../App';
import { IoIosColorPalette } from 'react-icons/io';
import { IoSettingsSharp, IoClose } from 'react-icons/io5';

import QuestionList from '../Components/QuestionList';
import TextFont from '../Components/TextFont';
import BackGroundColor from '../Components/BackGroundColor';

// surveyTitle: '',
// surveySubTitle: '',
// [
//   {questionId: generateUniqueId(),
//     questionType: 'shortText',
//     questionText: '',
//     options: [
//       {checkBoxNum: 1,
//         checked: false,
//         checkBoxText: '',
//       },
//     ],
//   },
// ]

function New({ isEdit, originData, isResponse, responseData }) {
  const [survey, setSurvey] = useState(() => {
    //수정일경우
    if (isEdit) {
      return originData;

      //설문 응답
    } else if (isResponse) {
      return responseData;

      //새로 생성
    } else {
      return {
        surveyTitle: '',
        surveySubTitle: '',
        surveyFont: '',
        surveyBackGroundColor: '',
      };
    }
  });

  const { onCreate, onEdit, onCreateResponse } = useContext(
    SurveyDispatchContext
  );

  const navigation = useNavigate();

  const surveyTitleInput = useRef();
  const surveySubTitleInput = useRef();

  const fontList = [
    {
      name: '나토산스',
      value: 'NotoSans',
    },
    {
      name: '오스왈드',
      value: 'Oswald',
    },
    {
      name: '싱글데이',
      value: 'SingleDay',
    },
    {
      name: 'Dongle',
      value: 'Dongle',
    },
    {
      name: '송명',
      value: 'SongMyung',
    },
    {
      name: '쿠키',
      value: 'Cookie',
    },
    {
      name: '코드모노',
      value: 'KodeMono',
    },
  ];

  const colorList = [
    {
      textColor: 'rgb(189 189 189)',
      backgroundColor: 'rgb(246, 246, 246)',
    },
    {
      textColor: 'rgb(255 208 208)',
      backgroundColor: 'rgb(255 227 227)',
    },
    {
      textColor: 'rgb(242 185 255)',
      backgroundColor: 'rgb(244 221 249)',
    },
    {
      textColor: 'rgb(141 206 255)',
      backgroundColor: 'rgb(221 237 249)',
    },
    {
      textColor: 'rgb(169 243 133)',
      backgroundColor: 'rgb(230 249 221)',
    },
    {
      textColor: 'rgb(255 247 140)',
      backgroundColor: 'rgb(249 247 221)',
    },
    {
      textColor: 'rgb(255 196 152)',
      backgroundColor: 'rgb(249 233 221)',
    },
    {
      textColor: 'rgb(255 181 181)',
      backgroundColor: 'rgb(247 208 208)',
    },
    {
      textColor: 'rgb(123 255 248)',
      backgroundColor: 'rgb(157 255 250)',
    },
    {
      textColor: 'rgb(157, 255, 205)',
      backgroundColor: 'rgb(157 255 205)',
    },
  ];

  const handleTitleChange = (field, value) => {
    setSurvey((prevSurvey) => ({ ...prevSurvey, [field]: value }));
  };

  // ----------------------------------------------------------------------------------------------
  // const handleQuestionChange = (questionId, field, value, isCheckBox) => {
  //   setSurvey((prevSurvey) => {
  //     const updatedQuestions = [...prevSurvey.questions];
  //     const findQuestion = updatedQuestions.filter((it) => it.questionId === questionId);
  //     console.log('findQuestion' +findQuestion.questionText)

  //     const changedQuestion = { ...findQuestion, [field]: value };
  //     console.log('changedQuestion' +changedQuestion)
  //     console.log('value' +value)

  //     if (isCheckBox) {
  //       alert("1");
  //       updatedQuestions[parseInt(questionId)] = changedQuestion;
  //     }
  //     return { ...prevSurvey, questions: updatedQuestions };
  //   });
  // };
  // ----------------------------------------------------------------------------------------------

  const handleSubmit = () => {
    const surveyElement = document.querySelector('.newForm-TitleWrapper');

    //제목 필수
    if (survey.surveyTitle.length < 1) {
      console.log(surveyTitleInput);
      surveyTitleInput.current.focus();

      surveyElement.classList.add('vibration');
      setTimeout(() => {
        surveyElement.classList.remove('vibration');
      }, 3000);

      return;
    }

    //부제목 필수
    if (survey.surveySubTitle.length < 1) {
      surveySubTitleInput.current.focus();

      surveyElement.classList.add('vibration');
      setTimeout(() => {
        surveyElement.classList.remove('vibration');
      }, 3000);

      return;
    }

    //수정일 경우
    if (isEdit) {
      onEdit({ ...survey });
      navigation('/');

      //설문지 참여 데이터
    } else if (isResponse) {
      onCreateResponse({ ...survey, date: new Date().getTime() });

      //새로 생성일경우
    } else {
      onCreate({
        ...survey,
        date: new Date().getTime(),
      });
    }
  };

  // setSurvey((prevSurvey, newQuestion) => ({
  //   ...prevSurvey,
  //   questions: [...prevSurvey.questions, newQuestion],
  // }));

  const updateSurvey = (questions) => {
    setSurvey({ ...survey, questions: [...questions] });
  };

  const [surveySetting, setSurveySetting] = useState(false);

  return (
    <div
      className={`newForm-Wrapper ${survey.surveyFont}`}
      style={{ backgroundColor: survey.surveyBackGroundColor }}
    >
      <div className='newForm-Content'>
        {/* SUBMIT */}

        <label>제목</label>

        <div className='newForm-TitleWrapper'>
          <div className='newForm-Title'>
            <input
              ref={surveyTitleInput}
              value={survey.surveyTitle}
              onChange={(e) => handleTitleChange('surveyTitle', e.target.value)}
              placeholder={'제목을 입력해 주세요'}
              //응답일경우 수정 불가
              readOnly={isResponse}
            />
          </div>
          <div className='newForm-SubTitle'>
            <input
              ref={surveySubTitleInput}
              value={survey.surveySubTitle}
              onChange={(e) =>
                handleTitleChange('surveySubTitle', e.target.value)
              }
              placeholder={'부제목을 입력해 주세요'}
              //응답일경우 수정 불가
              readOnly={isResponse}
              style={isResponse ? { border: 'none' } : {}}
            />
          </div>
        </div>
        <label>내용</label>

        <QuestionList
          originData={survey.questions}
          isResponse={isResponse}
          updateSurvey={updateSurvey}
        />
      </div>

      {/* 설문지 폰트 및 배경화면 변경 */}
      <div className='handleSurveyBox'>
        <IoIosColorPalette />
        <IoSettingsSharp onClick={() => setSurveySetting(true)} />
        <button onClick={handleSubmit}>완료</button>
      </div>
      <div className={`surveySetting ${surveySetting ? 'openSetting' : ''}`}>
        <div className='settingTopInfo' onClick={() => setSurveySetting(false)}>
          설정
          <IoClose className='closeSetting' />
        </div>
        <div>
          <div className='settingLabel'>글꼴</div>
          {fontList.map((font, idx) => (
            <TextFont
              key={idx}
              {...font}
              survey={survey}
              setSurvey={setSurvey}
            />
          ))}
        </div>
        <div className='settingLabel'>배경색</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '10px' }}>
          {colorList.map((color, idx) => (
            <BackGroundColor
              key={idx}
              {...color}
              survey={survey}
              setSurvey={setSurvey}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default New;
