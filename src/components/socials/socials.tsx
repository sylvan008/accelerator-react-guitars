function Socials(): JSX.Element {
  return (
    <div className="socials footer__socials">
      <ul className="socials__list">
        <li className="socials-item">
          <a className="socials__link" href="https://www.facebook.com/" aria-label="facebook">
            <svg className="socials__icon" width="24" height="24" aria-hidden="true">
              <use xlinkHref="#icon-facebook"/>
            </svg>
          </a>
        </li>
        <li className="socials-item">
          <a className="socials__link" href="https://www.instagram.com/" aria-label="instagram">
            <svg className="socials__icon" width="24" height="24" aria-hidden="true">
              <use xlinkHref="#icon-instagram"/>
            </svg>
          </a>
        </li>
        <li className="socials-item">
          <a className="socials__link" href="https://www.twitter.com/" aria-label="twitter">
            <svg className="socials__icon" width="24" height="24" aria-hidden="true">
              <use xlinkHref="#icon-twitter"/>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Socials;
