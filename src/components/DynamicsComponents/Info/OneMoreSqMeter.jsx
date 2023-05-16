import image from 'assets/img/one-more-sq-meter.png';
import image2x from 'assets/img/one-more-sq-meter-2x.png';
import s from './OneMoreSqMeter.module.scss';
import useCalcPrice from 'components/DynamicsComponents/hooks/useCalcPrice';

const OneMoreSqMeter = () => {
  const priceForOneMOreSqM = useCalcPrice();

  return (
    <div className={s.container}>
      <div className={s.info}>
        <p className={s.text}>
          To add more <span className={s.accent}>1 sq.m</span> for planning, it
          remains to accumulate
        </p>
        <p className={s.sum}>{(priceForOneMOreSqM || 0) + '₴'}</p>
      </div>
      <img
        className={s.img}
        src={image}
        srcSet={image2x}
        alt="Finance app"
        width="185"
        height="165"
      />
    </div>
  );
};

export default OneMoreSqMeter;
