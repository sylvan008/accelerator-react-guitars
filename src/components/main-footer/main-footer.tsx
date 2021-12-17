import Logo from '../logo/logo';
import Socials from '../socials/socials';
import FooterAboutUs from '../footer-about-us/footer-about-us';
import FooterInformation from '../footer-information/footer-information';
import FooterContacts from '../footer-contacts/footer-contacts';

function MainFooter(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo />
        <Socials />
        <FooterAboutUs />
        <FooterInformation />
        <FooterContacts />
      </div>
    </footer>
  );
}

export default MainFooter;
