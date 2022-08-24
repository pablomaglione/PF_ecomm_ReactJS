import { Link } from "react-router-dom";
import "../css/style.css"

const Footer = () => {
    return (
        <footer class="footer row">
            <div  class="row banner">
                <div class="col-6 banner_env d-flex justify-content-evenly align-items-baseline">
                    <div>
                        <i class="fas fa-truck"></i>
                    </div>
                    <div>
                        <h3 class="h3">ENVIOS A TODO EL PAIS</h3>
                    </div>
                </div>
                <div class="col-6 banner_fin d-flex justify-content-evenly align-items-baseline">
                    <div>
                        <i class="fas fa-credit-card"></i>
                    </div>
                    <div>
                        <h3 class="h3">CUOTAS SIN INTERESES</h3>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-around">
                <div class="footer_nav col-4">
                    <h4 class="footer_enc">NAVEGACIÓN</h4>
                    <ul>
                        <li><Link className="menu_footer" to="/"><a>INICIO</a></Link></li>
                    </ul>
                </div>
                <div class="footer_pay col-4">
                    <h4 class="footer_enc">FORMAS DE PAGO</h4>
                    <div class="icon">
                        <img class="icon_item" src="./img/iconos/visa.png" alt="icon_visa"/>
                        <img class="icon_item" src="./img/iconos/mastercard.png" alt="icon_mc"/>
                        <img class="icon_item" src="./img/iconos/tarjeta-naranja.png" alt="icon_tn"/>
                        <img class="icon_item" src="./img/iconos/american.png" alt="icon_amer"/>
                        <img class="icon_item" src="./img/iconos/cabal.png" alt="icon_cabal"/>
                        <img class="icon_item" src="./img/iconos/diners.png" alt="icon_diner"/>
                        <img class="icon_item" src="./img/iconos/mercadopago.png" alt="icon_mp"/>
                    </div>
                </div>
                <div class="footer_net col-4">
                    <h4 class="footer_enc">CONTACTANOS</h4>
                    <div class="icon">
                        <a href="https://api.whatsapp.com/send?phone=+5493482541388">
                            <img class="icon_item" src="./img/iconos/whatsapp.png" alt="icon_wsp" 
                             />
                        </a>
                        <a href="mailto:jyrsuiza@gmail.com">
                            <img class="icon_item" src="./img/iconos/email.png" alt="icon_mail" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-12 text-center footer_cr">
                <p class="footer_cr_p">© Joyería y Relojería Suiza</p>
            </div>
            <div class="col-12 text-center footer_autor">
                <p class="footer_autor_p">Pablo Maglione</p>
            </div>
        </footer>
    );
}

export default Footer;