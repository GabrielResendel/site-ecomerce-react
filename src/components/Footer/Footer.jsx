import React from "react";
import Pix from "../../assets/pix.png";
import Mcard from "../../assets/mastercard.png";
import Visa from "../../assets/visa.png";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { CONTATO, EMAIL } from "../../config";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Sobre Nós */}
        <div className={styles.footerSection}>
          <h3>Sobre Nós</h3>
          <p>
            Somos uma loja especializada em moda streetwear e casual. Oferecemos
            produtos de qualidade com entrega em todo o Brasil.
          </p>
        </div>

        {/* Entre em Contato */}
        <div className={styles.footerSection}>
          <h3>Entre em Contato</h3>
          <Link to={`mailto:${EMAIL}`}>Email</Link>
          <Link to={`https://wa.me/${CONTATO}`}>Whatsapp</Link>
          <p>Atendimento: Seg a sab, 9h às 18h</p>
        </div>

        {/* Formas de Pagamento */}
        <div className={styles.footerSection}>
          <h3>Formas de Pagamento</h3>
          <p>Cartão de crédito, Pix, Boleto</p>
          {/* Você pode adicionar ícones de pagamentos com Font Awesome ou imagens */}
          <div className={styles.paymentIcons}>
            <img src={Pix} alt="Pix" />
            <img src={Visa} alt="Visa" />
            <img src={Mcard} alt="Mastercard" />
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2025 G&R Store - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
