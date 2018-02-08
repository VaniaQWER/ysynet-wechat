import React from 'react';
import styles from './style.css';
const CardTitle = ({title, subTitle, style}) => (
  <div>
    <h4 className={styles.workplace_avatar_title} style={{color: '#262626', ...style}}> { title } </h4>
    <h5 className={styles.workplace_avatar_title} style={{color: 'rgba(0, 0, 0, .5)'}}> { subTitle } </h5>
  </div>
)

export default CardTitle