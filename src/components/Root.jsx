import { Outlet } from 'react-router-dom';
import Header from './header';


//КОМПОНЕНТ(корневой роут) ДОМАШНЕЙ СТРАНИЦЫ ПРИ НЕПРОЙДЕННОЙ АУТЕНТИФИКАЦИИ
export default function Root() {

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
