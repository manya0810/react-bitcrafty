import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './navbar.css';
function Navbar(){
    const [click, setClick] = useState(false);

    const closeMobileMenu = () => setClick(false);

    return(
        <>
            <nav className="navbar">
                <div className="navbarContainer">
                    <img src="images/blockchain-app logo.png" className="imgLogo"/>
                    <Link to="/" className ="navbar-logo">
                        BitCrafty
                    </Link>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClickx  ={closeMobileMenu}>
                            View Handicrafts
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/create-nft' className='nav-links' onClick={closeMobileMenu}>
                            Sell New Handicrafts
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/owned-handicrafts' className='nav-links' onClick={closeMobileMenu}>
                            Owned Handicrafts
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/personal-listed-nft' className='nav-links' onClick={closeMobileMenu}>
                            Personal Listed Handicrafts
                        </Link>
                    </li>
                </ul>

            </nav>
        </>
)
}
export default Navbar