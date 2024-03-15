import React, { useState } from 'react';
import './ItemList.css';
import getDate from '../Util/Date';
import { IoIosArrowDown } from 'react-icons/io';
import ToggleEditBox from './ToggleEditBox';
import { useNavigate } from 'react-router-dom';

function ItemList({
  surveyId,
  surveyTitle,
  surveySubTitle,
  date,
}) {
  const [toggleEditBox, setToggleEditBox] = useState(false);
  const navigation = useNavigate();

  //모달 열기
  const onToggleEditBox = () => {
    setToggleEditBox((prev) => !prev);
  };

  return (
    <div className='ItemList' >
      <div className='ItemList-Title'> {surveyTitle}</div>
      <div className='ItemList-SubTitle' >
        <div className='subTitle'>{surveySubTitle} </div>

        <div className='date'> {getDate(new Date(date))}</div>

        <div className='arrowDown' onClick={onToggleEditBox}>
          <IoIosArrowDown />
        </div>

        {toggleEditBox && (
          <ToggleEditBox
            surveyId={surveyId}
            onToggleEditBox={onToggleEditBox}
          />
        )}
      </div>
    </div>
  );
}

export default ItemList;
