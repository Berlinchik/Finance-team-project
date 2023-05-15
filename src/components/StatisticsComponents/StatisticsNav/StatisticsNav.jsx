import { Outlet, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from './StatisticsNav.module.scss';

const getLinkActiveClass = ({ isActive }) =>
  clsx(s.link, isActive && s.active_link);

export const StatisticsNav = () => {
  return (
    <>
      <div className={s.static_nav}>
        <NavLink className={getLinkActiveClass} to="/statistics/expenses" end>
          <div key="expenses">
            <span className={s.link__title}>Expenses</span>
          </div>
        </NavLink>

        <NavLink className={getLinkActiveClass} to="/statistics/categories" end>
          <div key="categories">
            <span className={s.link__title}>Categories</span>
          </div>
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};
