import '../styles/list.css';
import { fileSize } from '../lib/helpers';


// // КОМПОНЕНТ ОТОБРАЖЕНИЯ ФАЙЛОВ ПОЛЬЗОВАТЕЛЯ СПИСКОМ
export default function FileListItem({ file }) { 
  return (
    <>
      {/* <div
        className=""
      >
        
        <img src={} alt="" />
      </div> */}
      <div
        className="w-3/5 text-xs flex items-center"
      >
        <span
          className="w-1/2 ml-1 font-medium"
        >
          {file.name?.length > 20 ? file.name.slice(0, 13) + ' ...' + file.name.slice(-7) : file.name}
        </span>
        <span
          className="w-1/2 ml-1"
        >
          {file.comment?.length > 50 ? file.comment.slice(0, 43) + ' ...' + file.comment.slice(-7) : file.comment}
        </span>
      </div>
      <div
        className="w-[13%] h-5 text-xs"
      >
        {fileSize(file.size)} 
      </div>
    </>
  );
}
