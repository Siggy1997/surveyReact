import './QuestionTypeSelect.css';
import QuestionTypeOption from './QuestionTypeOption';

function QuestionTypeSelect({
  questionPosition,
  questionType,
  handleToggle,
  toggleQuestionType,
}) {
  const questionTypeList = [
    { value: 'shortText', name: '단답형' },
    { value: 'longText', name: '장문형' },
    { value: 'checkBox', name: '체크박스' },
  ];

  return (
    <>
      <div className='toggleBackGround' onClick={handleToggle}></div>
      <div
        className={`questionTypeModal ${toggleQuestionType ? 'modalOpen' : ''}`}
      >
        {questionTypeList.map((it, idx) => (
          <QuestionTypeOption
            key={idx}
            {...it}
            questionType={questionType}
            handleToggle={handleToggle}
            questionPosition={questionPosition}
          />
        ))}
      </div>
    </>
  );
}

export default QuestionTypeSelect;
