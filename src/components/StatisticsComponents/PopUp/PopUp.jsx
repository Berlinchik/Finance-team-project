import { useState } from 'react';
import s from './Popup.module.scss';
import iconSvg from '../Svg';
import clsx from 'clsx';
import { putOneTransaction } from '../../../redux/operations/cashflowOperations';
import SelectCategory from './Select';
import { Notify } from 'notiflix';
import { useDispatch } from 'react-redux';

export const PopUp = ({ isActive, setActive, data, setTransactionData }) => {
  // const { _id, date, comment, category, sum, type } = setData;
  const dispatch = useDispatch();
  // const initialValues = {
  //   _id,
  //   date,
  //   category,
  //   comment,
  //   sum,
  //   type,
  // };
  const [form, setForm] = useState(data);

  const getBackdropClass = () => clsx(s.backdrop, isActive && s.active);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'sum') {
      if (Boolean(Number(value)) === false) {
        Notify.warning('Please, input number');
      } else {
        setForm(prevForm => {
          return {
            ...prevForm,
            [name]: Number(value),
          };
        });
      }
    }
    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleSelect = data => {
    if (!data) return;
    setForm(prevForm => {
      return {
        ...prevForm,
        category: data.value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(putOneTransaction(form));
    setActive(false);
    setTransactionData(prevState => {
      const indexOfUpdatedExpense = prevState.findIndex(
        elem => elem._id === form._id
      );
      const expenses = prevState.filter(elem => elem._id !== form._id);
      expenses.splice(indexOfUpdatedExpense, 0, form);
      return [...expenses];
    });
  };

  return (
    <div
      className={getBackdropClass()}
      onClick={() => {
        setActive(false);
      }}
    >
      <div className={s.popup_block} onClick={e => e.stopPropagation()}>
        <button className={s.svg_icon}>
          {iconSvg('close', '#3A6AF5', '20', () => {
            setActive(false);
          })}
        </button>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.inputField}>
            <label>
              <span className={s.labelTitle}>Per category</span>
              <SelectCategory
                currentCategory={form.category}
                setCategory={handleSelect}
              />
            </label>
          </div>
          <div className={s.inputField}>
            <label>
              <span className={s.labelTitle}>Expense comment</span>
              <input
                name="comment"
                onChange={handleChange}
                value={form.comment}
                className={s.inputText}
                type="text"
                placeholder="Expense comment"
              />
            </label>
          </div>
          <div className={s.inputField}>
            <label>
              <span className={s.labelTitle}>Sum</span>
              <input
                name="sum"
                onChange={handleChange}
                value={form.sum}
                className={s.inputText}
                type="text"
                placeholder="Sum"
              />
            </label>
          </div>
          <button type="submit" className={s.button}>
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};
