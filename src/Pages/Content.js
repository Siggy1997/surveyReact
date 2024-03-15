import { HiOutlinePlusSmall } from 'react-icons/hi2';

import { useNavigate } from 'react-router-dom';
import ItemList from '../Components/ItemList';
import { createContext, useContext } from 'react';
import { SurveyStateContext } from '../App';

export const FormStateContext = createContext();

function Content() {
  const surveyList = useContext(SurveyStateContext);

  const navigation = useNavigate();

  return (
    <div className='Content-Wrapper'>
      <div className='ItemListWrppaer ' onClick={() => navigation('/new')}>
        <HiOutlinePlusSmall className=' Add-Icon' id='plusIcon' />
      </div>

      {surveyList.map((it, idx) => (
        <div key={idx} className='ItemListWrppaer'>
          <ItemList key={idx} {...it} />
        </div>
      ))}
    </div>
  );
}

export default Content;
