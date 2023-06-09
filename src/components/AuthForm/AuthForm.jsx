import s from './AuthForm.module.scss';
import sprite from '../../assets/icons/sprite.svg';
import { useState, useEffect } from 'react';
import { selectError } from 'redux/selectors/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { refreshError } from 'redux/slices/authSlice';

const validate = (values, isLoginForm) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!isLoginForm && !values.name) {
    errors.name = 'Cannot be blank';
  }
  if (!values.email) {
    errors.email = 'Cannot be blank';
  } else if (!regex.test(values.email)) {
    errors.email = 'Invalid email format';
  }
  if (!values.password) {
    errors.password = 'Cannot be blank';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be more than 6 characters';
  }
  return errors;
};

const AuthForm = ({ onSubmit, nameForm }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const registrationError = useSelector(selectError);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChange = e => {
    setIsSubmitting(false);
    const { name, value } = e.target;
    setFormValues(p => ({ ...p, [name]: value }));
    // setFormErrors(validate(formValues, nameForm === 'login'));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues, nameForm === 'login'));
    setIsSubmitting(true);
  };

  const togglePasssword = () => {
    setPasswordShow(!passwordShow);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      onSubmit(formValues);
    }
    dispatch(refreshError());
  }, [formErrors, formValues, onSubmit, isSubmitting, dispatch, location]);

  return (
    <div className={s.modal}>
      <p className={s.title}>
        {nameForm === 'login' ? 'Log In' : 'Registration'}
      </p>
      <form className={s.card} onSubmit={handleSubmit} noValidate>
        <div className={s.block}>
          {nameForm === 'login' ? null : (
            <label className={s.label}>
              <p className={s.text}>Name</p>
              <input
                className={`${s.input} ${formErrors.name && s.invalid}`}
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formValues.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <span className={s.error}>{formErrors.name}</span>
              )}
            </label>
          )}
          <label className={s.label}>
            <p className={s.text}>Email</p>
            <input
              className={`${s.input} ${formErrors.email && s.invalid}`}
              type="text"
              name="email"
              placeholder={
                nameForm === 'login' ? 'Enter email' : 'Enter your email'
              }
              value={formValues.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <span className={s.error}>{formErrors.email}</span>
            )}
          </label>
          <label className={s.label}>
            <p className={s.text}>Password</p>
            <input
              className={`${s.input} ${formErrors.password && s.invalid}`}
              type={passwordShow ? 'text' : 'password'}
              name="password"
              autoComplete="new-password"
              placeholder={
                nameForm === 'login' ? 'Enter your password' : 'Create password'
              }
              value={formValues.password}
              onChange={handleChange}
            />
            {!passwordShow && (
              <button onClick={togglePasssword} type="button" className={s.eye}>
                <svg className={s.icon} width="24" height="24">
                  <use href={sprite + '#icon-toggle-invisible'}></use>
                </svg>
              </button>
            )}
            {passwordShow && (
              <button onClick={togglePasssword} type="button" className={s.eye}>
                <svg className={s.icon} width="24" height="24">
                  <use href={sprite + '#icon-toggle-visible'}></use>
                </svg>
              </button>
            )}
            {formErrors.password && (
              <span className={s.error}>{formErrors.password}</span>
            )}
          </label>
        </div>
        {registrationError && (
          <div className={s.invalid}>{registrationError}</div>
        )}
        <button className={s.btn} type="Submit">
          {nameForm === 'login' ? 'Log In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
