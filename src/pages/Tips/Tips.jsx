import React from 'react';
import styles from './Tips.module.css';

const Tips = () => {
    return (
        <div className={styles['tips-cont']}>
            <div className={styles['tips-bhasha-buddy-tips']}>

                <div className={styles['tips-upper']}>
                    <img style={{ height: '100px' }} src={require('./images/logo.png')} alt="Logo" />
                    <h2>Bhasha Buddy</h2>
                    <h3>TIPS TO LEARN A NEW </h3>
                    <h2 id={styles['tips-lang']}>LANGUAGE</h2>
                </div>
                <div className={styles['tips-ul']}>
                    <div className={styles['tips-li']}><span>1</span>Set Your Language Goals</div>
                    <div className={styles['tips-li']}><span>2</span>Connect With Native Speakers</div>
                    <div className={styles['tips-li']}><span>3</span>Enhance Your Vocabulary</div>
                    <div className={styles['tips-li']}><span>4</span>Be Consistent</div>
                </div>
            </div>
        </div>
    );
};

export default Tips;
