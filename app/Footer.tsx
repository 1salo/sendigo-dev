import React from "react";
import Logo from "./components/ui/Logo";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <img src="/images/sendigologowhite.png" alt="logo" className="w-24" />
      <nav>
        <h6 className="footer-title">Om oss</h6>
        <a className="link link-hover">Om Sendigo</a>
        <a className="link link-hover">Kundcase</a>
        <a className="link link-hover">Nyheter</a>
        <a className="link link-hover">Partner</a>
        <a className="link link-hover">Kontakt</a>
        <a className="link link-hover">Jobb</a>
        <a className="link link-hover">Press</a>
      </nav>
      <nav>
        <h6 className="footer-title">Tjänster</h6>
        <a className="link link-hover">Sendigo Free</a>
        <a className="link link-hover">Sendigo Plus</a>
        <a className="link link-hover">Sendigo Pro</a>
      </nav>
      <nav>
        <h6 className="footer-title">Transportörer</h6>
        <a className="link link-hover">DHL</a>
        <a className="link link-hover">DSV</a>
        <a className="link link-hover">TNT</a>
        <a className="link link-hover">UPS</a>
        <a className="link link-hover">FEDEX</a>
      </nav>
      <nav>
        <h6 className="footer-title">Logistikguider</h6>
        <a className="link link-hover">Skicka paket</a>
        <a className="link link-hover">Skicka pall</a>
        <a className="link link-hover">Skicka container</a>
        <a className="link link-hover">Skicka styckegods</a>
        <a className="link link-hover">Skicka partigods</a>
        <a className="link link-hover">Sjöfrakt</a>
        <a className="link link-hover">Tågfrakt</a>
        <a className="link link-hover">Flygfrakt</a>
        <a className="link link-hover">Vägtransport</a>
        <a className="link link-hover">Exportera</a>
        <a className="link link-hover">Importera</a>
      </nav>
      <nav>
        <h6 className="footer-title">Avtal & Policy</h6>
        <a className="link link-hover">Personuppgiftspolicy</a>
        <a className="link link-hover">Användaravtal</a>
        <a className="link link-hover">Cookies</a>
      </nav>
    </footer>
  );
};

export default Footer;
