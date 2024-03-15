import React, { useContext } from 'react';
import './QuestionTypeOption.css';
import longTextIcon from '../assets/longText.png';
import shortTextIcon from '../assets/shortText.png';
import checkBox from '../assets/checkBox.png';
import { QuestionDispatchContext } from './QuestionList';

function QuestionTypeOption({
  handleToggle,
  questionType,
  questionPosition,
  name,
  value,
}) {
  const { handleQuestionChange } = useContext(QuestionDispatchContext);
  
  const handleTypeChange = (questionPosition, questionType, value) => {
    handleQuestionChange(questionPosition, questionType, value);
    handleToggle();
  };

  let iconSrc;
  switch (value) {
    case 'shortText':
      iconSrc = shortTextIcon;
      break;

    case 'longText':
      iconSrc = longTextIcon;
      break;

    case 'checkBox':
      iconSrc = checkBox;
      break;

    default:
      iconSrc = ''; 
      break;
  }

  return (
    <div
      className={`QuestionTypeImgWrapper ${
        questionType === value ? 'selected' : ''
      }`}
      onClick={() => handleTypeChange(questionPosition, 'questionType', value)}
    >
      <div className='OptionImg'>
        <img alt='' src={iconSrc}></img>
      </div>
      <div className='optionName'>{name}</div>
    </div>
  );
}

export default QuestionTypeOption;
