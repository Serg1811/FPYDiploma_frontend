import '../styles/list.css';
import { useDispatch } from 'react-redux';
import { changeActive, resetActive } from '../features/cloudSlice';
import { 
  useGetFilesQuery,
} from "../app/services/api";
import FileListItem from './fileListItem';
import { useCloud } from '../hooks/selectors';
import { useEffect, useState } from 'react';

// КОМПОНЕНТ ОТОБРАЖЕНИЯ ФАЙЛОВ ПОЛЬЗОВАТЕЛЯ СПИСКОМ
export default function FilesList(token) { 
  const { id: idActive, params } = useCloud();
  console.log(params)
  const dispatch = useDispatch();
  const [isActiveItem, setIsActiveItem] = useState(null);

  const {data: filesFilterData, isLoading: filesFilterIsLoading, isSuccess: filesFilterIsSuccess} = useGetFilesQuery(token, params);



  const focusOnFileItem = (e) => {
    const element = e.target.closest('.list_item');
    const id = element.getAttribute('id');
    if (id&&id===idActive) {
      setIsActiveItem(null)
      element.classList.remove('isActive');
      dispatch(resetActive())
    } else {
      if (isActiveItem!==null) {
        isActiveItem.classList.remove('isActive');
      }
      setIsActiveItem(element);
      element.classList.add('isActive');
      dispatch(changeActive(filesFilterData.find((obj)=>obj.id===Number(id))));
    }
  }
  
  useEffect (() => {
    if (filesFilterIsSuccess) {
      setIsActiveItem(null);
    }
  }, [filesFilterIsSuccess]);

  if (filesFilterIsLoading) {
    return (
      <div>
        ...isLoading
      </div>
    )
  };

  return (
    filesFilterData.map((file) => {

      return (
        <div
        id={file.id}
        className='list_item'
          onClick={focusOnFileItem}
        >
          <FileListItem
            file={file}         
          />
        </div>
      )
    })
  )
}
