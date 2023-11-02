import React, { FC } from 'react';
import logoImg from '../assets/kisspng-cinema-ticket-film-clip-art-tickets-5ad0eea5e31519.2636180215236420219301.png';
import logoDB from '../assets/tmdb.png';
import styles from './HeaderStyle.module.css'
const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className='-hlogoImageeader'><img src={logoImg} alt="logo" className={styles.logoImage}   /></div>
      <div className='headerDBImage'><img src={logoDB} alt="logoMovieDB" className={styles.logoMovieDB}    /></div>
    </div>
  );
}

export default Header;
