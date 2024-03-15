import { useNavigate } from 'react-router-dom';

import {
  MdOutlineEdit,
  MdOutlineDeleteOutline,
  MdContentCopy,
} from 'react-icons/md';
import './ToggleEditBox.css';
import { useContext } from 'react';
import { SurveyDispatchContext } from '../App';
import { TbExternalLink } from "react-icons/tb";
import Swal from 'sweetalert2';

function ToggleEditBox({ surveyId, onToggleEditBox }) {
  const navigation = useNavigate();

  const { onDelete } = useContext(SurveyDispatchContext);
  const { onCopy } = useContext(SurveyDispatchContext);

  const handleCopySurvey = () => {

    let timerInterval;
    Swal.fire({
      title: "복사중...",
      html: " <b></b> .",
      timer: 700,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      
    onCopy(surveyId);
    onToggleEditBox();
    });

  };
  const handleDeleteSurvey = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      onToggleEditBox();
      if (result.isConfirmed) {
        onDelete(surveyId);

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div className='ToggleEditBox-Wrapper'>
      <div  onClick={() => navigation(`/response/${surveyId}`)}>
        <TbExternalLink  className='EditBoxIcon' />
        설문 보기
      </div>
      <div onClick={() => navigation(`/edit/${surveyId}`)}>
        <MdOutlineEdit className='EditBoxIcon' />
        편집
      </div>
      <div onClick={handleCopySurvey}>
        <MdContentCopy className='EditBoxIcon' /> 복제
      </div>
      <div className='DeleteBox' onClick={handleDeleteSurvey}>
        <MdOutlineDeleteOutline className='EditBoxIcon' />
        삭제
      </div>
    </div>
  );
}

export default ToggleEditBox;
