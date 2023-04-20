import s from './Info.module.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DreamHomePicUpload from './DreamHomePicUpload';

const Info = () => {
  const now = 60;
  return (
    <div>
      <div className={s.infoBlock}>
        <p className={s.allPeriod}>After 4 years 1 month</p>
        <ul className={s.list}>
          <li className={s.item}>
            <span className={s.text}>Accumulated, %:</span>
            <span className={s.value}>28%</span>
          </li>
          <li className={s.item}>
            <span className={s.text}>Accumulated, UAH:</span>
            <span className={s.value}>60 000 ₴</span>
          </li>
          <li className={s.item}>
            <span className={s.text}>And this:</span>
            <span className={s.value}>22 кв. м</span>
          </li>
        </ul>
        <p className={s.acumulated}>22 out of 60 sq.m accumulated</p>
        <ProgressBar style={{ height: '8px' }} now={now} />
      </div>
      <DreamHomePicUpload />
    </div>
  );
};

export default Info;
