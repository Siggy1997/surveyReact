import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { TiDeleteOutline } from 'react-icons/ti';
import './CheckBoxList.css';
import { useContext, useEffect, useState } from 'react';
import { QuestionDispatchContext } from './QuestionList';

function CheckBoxList({ questionPosition, checkBoxText, idx, isResponse, checked}) {
  const [open, setOpen] = useState(false);
  const { handleOptionChange, handleOptionDelete } = useContext(
    QuestionDispatchContext
  );

  const [toggleChecked, setToggleChecked] = useState(checked);

  useEffect(() => {
    handleOptionChange(questionPosition, idx + 1, 'checked', toggleChecked);
  }, [toggleChecked]);
  
  return (
    <div
      // 체크박스 옵션들 삭제 보이기
      className='checkBoxList-Wrppaer'
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <RxDragHandleDots2
        className={`optionDragDrop ${open ? 'showOptionEdit' : ''}`}
        //응답 display hidden
        style={{ visibility: isResponse ? 'hidden' : 'visible' }}
      />
      <div
        className='optionInput-Wrapper'
        onClick={isResponse ? () => setToggleChecked((prev) => !prev) : undefined}
      >
        {checked ? (
          <MdCheckBox className='isChecked' />
        ) : (
          <MdCheckBoxOutlineBlank className='isChecked' />
        )}
        <input
          placeholder={`${idx + 1}번 체크박스`}
          value={checkBoxText}
          onChange={(e) =>
            handleOptionChange(
              questionPosition,
              idx + 1,
              'checkBoxText',
              e.target.value
            )
          }
          readOnly={isResponse}
        />
        {/* 옵션 삭제 */}
        <TiDeleteOutline
          className={`deleteCheckBoxList ${open ? 'showOptionEdit' : ''}`}
          onClick={() => handleOptionDelete(questionPosition - 1, idx)}
          //응답 display hidden
          style={{ visibility: isResponse ? 'hidden' : 'visible' }}
        />
      </div>
    </div>
  );
}

export default CheckBoxList;
