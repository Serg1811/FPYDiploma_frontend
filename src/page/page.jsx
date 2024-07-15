import { Outlet } from 'react-router-dom';
import Header from '../components/header';


//КОМПОНЕНТ(корневой роут) ДОМАШНЕЙ СТРАНИЦЫ ПРИ НЕПРОЙДЕННОЙ АУТЕНТИФИКАЦИИ
export default function StartPage() {

  return (
    <>
      <Header />
      <main
      >
        <div
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}
