import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { resetActive  } from '../features//cloudSlice';
import { 
  useEditFileIdMutation,
  useSendFileMutation,
  useDeleteFileIdMutation,
  useDownloadFileIdMutation,
 } from "../app/services/api";
import { 
  useUser,
  useCloud, 
} from "../hooks/selectors";

// КОМПОНЕНТ КНОПОК УПРАВЛЕНИЯ ФАЙЛАМИ ХРАНИЛИЩА
export default function ButtonUserMenu({ btnName, src }) {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, id } = useUser();
  const { id:idActive, name, file_download_url } = useCloud();
  const [ error , setError ] = useState(false);
  const [
    setSendFile,
    { data: sendFileData, error: sendFileError, isLoading: sendFileIsLoading, isError: sendFileIsError, isSuccess: sendFileIsSuccess },
  ] = useSendFileMutation();

  const [
    setEditFileIdId,
    { data: editFileIdData, error: editFileIdError, isLoading: editFileIdIsLoading, isError: editFileIdIsError, isSuccess: editFileIdIsSuccess },
  ] = useEditFileIdMutation();

  const [
    setDownloadFileId,
    result,
  ] = useDownloadFileIdMutation();

  const [
    setDeleteFileId,
    { data: deleteFileId, error: deleteIdFileError, isLoading: deleteFileIdIsLoading, isError: deleteFileIdIsError, isSuccess: deleteFileIdIsSuccess },
  ] = useDeleteFileIdMutation();

    

  // Обработчики кнопок управления
  const buttons = {
    'скачать': () => idActive ? setDownloadFileId({id: idActive, name, token}) : setError(true),
    'поделиться': () => idActive ? downloadUrl(idActive) : setError(true),
    'загрузить': (e) => inputRef.current.click(),
    'удалить':  () => idActive ? setDeleteFileId({id: idActive, token}) : setError(true),
    'изменить': () => idActive ? navigate(`/user/file/${idActive}/editNameComment`) : setError(true),
  };

  const multipleChange = async (e) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file.type)
        formData.append('name', file.name);
        formData.append('type', file.type);
        formData.append('size', file.size);
        await setSendFile({body: formData, token });      
      }
    }
    return;
  }

  const downloadUrl = (id) => {
    navigator.clipboard.writeText(file_download_url);
  }

  useEffect(()=> { 
    if (deleteFileIdIsSuccess) {
      dispatch(resetActive());
    }
  },[deleteFileIdIsSuccess]);

  return (
    <div
      className="menu__list"
      onClick={buttons[btnName]}
    >
      <div
        className="menu__list-container"
      >
        <div
          className="menu_container-img"
        >
          <img src={src} alt="" className="menu_img" />
        </div>
        <div
          className=""
        >
          {btnName}
        </div>
      </div>
      <>
        {btnName === 'загрузить' ? (
          <Form
            method='post'
          >
            <input
              type="file"
              ref={inputRef}
              onChange={(e) => multipleChange(e)}
              multiple
              hidden
            />
          </Form>
        ) : (
          null
        )}
      </>
    </div>
  );
}
