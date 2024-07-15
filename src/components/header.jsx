import "../styles/header.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    
    <header 
      className="top"
    >
      <div
        className="top-panel"
      >
        <div
          className="logo"
          onClick={()=> navigate('/')}
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