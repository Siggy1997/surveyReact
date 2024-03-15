import { FaPlus } from 'react-icons/fa6';

import CheckBoxList from './CheckBoxList';

import './QuestionType.css';
import { ReactSortable } from 'react-sortablejs';
import { useContext, useEffect, useRef, useState } from 'react';
import { QuestionDispatchContext } from './QuestionList';

function QuestionType({
  options,
  questionType,
  questionPosition,
  isResponse,
  response,
}) {
  // const [checkBoxList, setCheckBoxList] = useState(options);
  // console.log(options)

  // const addCheckBoxList = () => {
  //   const newCheckBox = {
  //     id: 0,
  //     checkBoxNum: checkBoxList.length + 1,
  //     checked: false,
  //     checkBoxText: '',
  //   };
  //   setCheckBoxList([...checkBoxList, newCheckBox]);
  // };

  // =========================================================
  // checkBox Option들 넣어주기
  // const handleOptionChange = (idx, field, value) => {
  //   // checkBoxList의 복사본 생성
  //   const updatedCheckBoxList = [...checkBoxList];

  //   // 복사본의 idx번째 요소의 field 속성을 업데이트
  //   updatedCheckBoxList[idx - 1][field] = value;

  //   // 업데이트된 복사본을 상태로 설정
  //   setCheckBoxList(updatedCheckBoxList);
  // };

  // =========================================================

  // useEffect(() => {
  //   if (questionType === 'checkBox') {
  //     handleQuestionChange(questionPosition, 'options', checkBoxList);
  //   }
  // }, [questionType, checkBoxList]);

  // useEffect(() => {
  //   if (questionType === 'shortText' || questionType === 'longText') {
  //     setCheckBoxList([]);optionDragDrop
  //   }
  // }, [questionType]);

  const [plusOption, setPlusOption] = useState(false);
  const { handleOptionIndex, addCheckBoxList, handleQuestionChange } =
    useContext(QuestionDispatchContext);
  // 단답형
  const [shortInputText, setShortInputText] = useState(response);
  const [longInputText, setLongInputText] = useState(response);

  useEffect(() => {
    handleQuestionChange(questionPosition, 'response', shortInputText);
  }, [shortInputText]);

  useEffect(() => {
    handleQuestionChange(questionPosition, 'response', longInputText);
  }, [longInputText]);


  const inputRef = useRef(null);


  const handleChange = () => {
    const inputValue = inputRef.current.value;
    if (inputValue.length >= 15) {
      setShortInputText(inputValue.slice(0, 15));
      inputRef.current.classList.add('vibration');

      setTimeout(() => {
             inputRef.current.classList.remove('vibration');
      }, 3000);
    } else {
      setShortInputText(inputValue);
    }
  };


  if (questionType === 'shortText') {
    return (
      <div className='shortTextWrapper'>
        <input
          className='shortTextInput'
          ref={inputRef}
          placeholder={isResponse? "최대 15글자 입력 가능" : ''}
          readOnly={!isResponse}
          value={shortInputText}
          onChange={handleChange}
        ></input>
      </div>
    );

    // 장문형
  } else if (questionType === 'longText') {
    return (
      <div className='longTextWrapper'>
        <textarea
          className='longTextInput'
          readOnly={!isResponse}
          value={longInputText}
          onChange={(e) => setLongInputText(e.target.value)}
        ></textarea>
      </div>
    );

    //체크박스
  } else if (questionType === 'checkBox') {
    return (
      <div
        //체크박스 옵션 플러스보이기
        onMouseEnter={() => setPlusOption(true)}
        onMouseLeave={() => setPlusOption(false)}
      >
        <ReactSortable
          list={options}
          setList={(updatedOptions) => {
            handleOptionIndex(questionPosition - 1, updatedOptions);
          }}
          animation={200}
          delayOnTouchOnly={true}
          delay={2}
          handle='.optionDragDrop'
        >
          {options &&
            options.map((it, idx) => (
              <CheckBoxList
                key={idx}
                {...it}
                idx={idx}
                questionPosition={questionPosition}
                isResponse={isResponse}
              />
            ))}

          <div
            className='addCheckBox'
            onClick={() => addCheckBoxList(questionPosition)}
            //응답 display hidden
            style={{ visibility: isResponse ? 'hidden' : 'visible' }}
          >
            <FaPlus className={`optionPlus ${plusOption ? 'showPlus' : ''}`} />
          </div>
        </ReactSortable>
      </div>
    );
  }
}

export default QuestionType;
