import { useMediaQuery } from 'react-responsive';
import logoMobile from 'assets/img/logo-mobile.png';
import logoMobile2x from 'assets/img/logo-mobile-2x.png';
import logoTabletDesktop from 'assets/img/logo-desktop-tablet.png';
import logoTabletDesktop2x from 'assets/img/logo-desktop-tablet-2x.png';
import { NavLink } from 'react-router-dom';

export const Logo = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <>
      {!isDesktopOrLaptop && (
        <NavLink to="/">
          <img
            src={logoMobile}
            srcSet={logoMobile2x}
            width="93"
            heigth="22"
            alt="Finance logo"
          />
        </NavLink>
      )}
      {isDesktopOrLaptop && (
        <NavLink to="/">
          <img
            src={logoTabletDesktop}
            srcSet={logoTabletDesktop2x}
            width="138"
            heigth="28"
            alt="Finance logo"
          />
        </NavLink>
      )}
    </>
  );
};
