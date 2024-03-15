import { MdDeleteOutline } from 'react-icons/md';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { TbCategory } from 'react-icons/tb';
import QuestionType from './QuestionType';
import { useContext,  useState } from 'react';
import QuestionTypeSelect from './QuestionTypeSelect';
import { FaPlus } from 'react-icons/fa6';
import { QuestionDispatchContext } from './QuestionList';

function QuestionItem({
  question,
  questionPosition,
  questionsLength,
  isResponse,
}) {
  const { questionType, questionText, response, options } = question;

  //context
  const {
    addQuestion,
    deleteQuestion,
    handleQuestionChange,
    handleQuestionPosition,
  } = useContext(QuestionDispatchContext);

  const [toggleQuestionType, setToggleQuesionType] = useState(false);

  const [questionAddButton, setQuestionAddButton] = useState(false);

  const [animationDelete, setAnimationDelete] = useState(false);


  //질문 삭제 (질문길이 1개 이상만 )
  const handleAnimationDelete = () => {
    if (questionsLength > 1) {
      setAnimationDelete(true);

      setTimeout(() => {
        deleteQuestion(questionPosition);
      }, 700);
    } else {
      const questionElement = document.querySelector('.wrapper-Questions');
      questionElement.classList.add('vibration');
      setTimeout(() => {
        questionElement.classList.remove('vibration');
      }, 700);
    }
  };

  //토글
  const handleToggle = () => {
    setToggleQuesionType((prev) => !prev);
  };

  return (
    <div
      className={animationDelete ? 'deleteAnimation' : ''} //질문 삭제 애니메이션
      //질문 추가 버튼 보이기
      onMouseEnter={() => setQuestionAddButton(true)}
      onMouseLeave={() => setQuestionAddButton(false)}
    >
      <div className='wrapper-Questions'>
        <div className='questionWrapper'>
          <div
            className='questionTopBar'
            //응답일경우 display hidden
            style={{ visibility: isResponse ? 'hidden' : 'visible' }}
          >
            <RxDragHandleDots2 className='handleDragDrop' />

            <div>
              <TbCategory onClick={handleToggle} />
              <MdDeleteOutline onClick={handleAnimationDelete} />
            </div>
          </div>

          {/* QuestionType 선택 & OPtions */}
          {toggleQuestionType && (
            <QuestionTypeSelect
              questionPosition={questionPosition}
              questionType={questionType}
              handleToggle={handleToggle}
              toggleQuestionType={toggleQuestionType}
            />
          )}

          <div className='questionContent'>
            {/* 질문 번호 */}
            <div className='questionNum'> Q{parseInt(questionPosition)}.</div>
            {/* 질문 제목 */}
            <div className='questionTitle'>
              <input
                placeholder='질문을 입력하세요'
                value={questionText}
                onChange={(e) =>
                  handleQuestionChange(
                    questionPosition,
                    'questionText',
                    e.target.value
                  )
                }
                readOnly={isResponse}
                style={isResponse? {border:'none'} : {}}
              ></input>
            </div>
            <QuestionType
              options={options}
              questionType={questionType}
              questionPosition={questionPosition}
              isResponse={isResponse}
              response={response}
            />
          </div>
        </div>

        {/* 질문 위치변경 */}

        {/* 응답일경우 안보이기 */}
        {!isResponse && (
          <div className='changeQuestionPosition'>
            <IoIosArrowUp
              className='changePositionIcon'
              onClick={() =>
                handleQuestionPosition('upPosition', questionPosition)
              }
            />
            <IoIosArrowDown
              className='changePositionIcon'
              onClick={() =>
                handleQuestionPosition('downPosition', questionPosition)
              }
            />
          </div>
        )}
      </div>

      {/* 질문 추가 */}

      {/* 응답일경우 안보이기 */}
      {!isResponse && (
        <div
          className='addQuestions'
          onClick={() => addQuestion(questionPosition)}
        >
          <FaPlus
            className={`questionPlusBtn ${
              questionAddButton ? 'showQuestionBtn' : ''
            } `}
          />
        </div>
      )}
    </div>
  );
}

export default QuestionItem;
