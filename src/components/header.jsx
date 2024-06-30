import "../styles/header.css"
import { Link, Form, redirect } from 'react-router-dom';

const Header = () => {

  return (
    
    <header 
      className="top"
    >
      <div
        className="top-panel"
      >
        <div
          className="logo"
        >
          Cloud
        </div>
        <div
          className="container-person"
        >
          <Link
            to='/login'
            className="person_link"
          >
            <img
            className="person_image"
              src="/img/unknown_user.png"
              alt="?"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header