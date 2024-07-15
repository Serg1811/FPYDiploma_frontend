import "../../styles/popup.css"
import React, { useState, useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import { Form,
  useNavigate,
} from 'react-router-dom';
import FieldForm from '../fieldForm'
import { 
  useEditFileIdMutation
} from "../../app/services/api";
import { 
  useUser,
  useCloud,
  useValidation,
 } from "../../hooks/selectors";
import { dataEditNameCommentForm } from "../../lib/data";
import { parsError } from "../../lib/errorParser";
import { resetActive } from "../../features/cloudSlice";
import { resetValidation } from "../../features/validationSlice";

export default function EditNameCommentForm() {
  
  const { isValidEditNameCommentForm, values } = useValidation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, is_staff } = useUser();
  const { id, name, comment } = useCloud();
  const [filename, setFilename] = useState(null);
  const [fileType, setFiletype] = useState(null);

  useEffect(() => {
    if (name) {  
      const fileNameList = name.split('.');
      console.log()
      const _type = fileNameList.pop();
      const _name = fileNameList.join('.');
      setFiletype(_type);
      setFilename(_name);
    }
  }, [name]);
  const defaultValue = {
    filename: filename,
    fileComment: comment,
  }

  const [
    setEditFileId,
    { data: editFileIdData, error: editFileIdError, isLoading: editFileIdIsLoading, isError: editFileIdIsError, isSuccess: editFileIdIsSuccess },
  ] = useEditFileIdMutation();

  // ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР НА РЕДАКТИРОВАНИЕ ИМЕНИ И КОМЕНТАРИЯ ФАЙЛА
  const handleSubmit = async () => {
    if (isValidEditNameCommentForm) {
      const body = {
        name: `${values.filename}.${fileType}`,
        comment: values.fileComment
      }
      await setEditFileId({id: id, token, body: JSON.stringify(body)});
    }
  }

  useEffect(() => {
    if (editFileIdIsSuccess) {
      // dispatch(resetIsActive());
      dispatch(resetValidation());
      dispatch(resetActive());
      return is_staff ? navigate('/admin') : navigate('/user')
    }
  }, [editFileIdIsSuccess]);

  
  return (
    <div
      className="_hidden"
    >
      <div
        className="popup__container"
      >      
        <Form
          autoComplete="off"
          className="form__container"
          onSubmit={handleSubmit}
        >
          <span className="main__title hidden__title">Редактировать {name}</span>
          {Object.keys(dataEditNameCommentForm).map((atr, index) => {
            return (
              <FieldForm
                key={index}
                attribute={atr}
                text={dataEditNameCommentForm[atr].text}
                type={dataEditNameCommentForm[atr].type}
                defaultValue={defaultValue[atr]}
              />
            );
          })}
          <div className="form-group">
            <button className="popup__send">отправить</button>
          </div>
        </Form> 
        <div
          className="server_response"
        >
          {editFileIdIsLoading ? (
            <div
              className="loading"
            >
              Loading...
            </div>
          ) :(
            null
          )}
          {editFileIdIsError ? (
            <div
              className="form__error"
            >
              Ошибка при редактировании - ${parsError(editFileIdError)}
            </div>
          ):(null)}
        </div>
        <div
          onClick={() => is_staff ? navigate('/admin') : navigate('/user')}
          className="popup__close" 
        >
          Закрыть окно
        </div>
      </div>
    </div>
  );
}
