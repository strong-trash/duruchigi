import { ClassAttributes, FC, LiHTMLAttributes } from 'react';
import logo from './logo.svg';
import {Link} from 'react-router-dom';
import '../App.Module.css';

const Footer: FC = (props) => {

  return (
    <footer>
    <div className='footer-container'>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join the Adventure newsletter to receive our best vacation deals
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input type="email" name = "email" placeholder = "Your Email" 
                        className="footer-input"/>
                        <button>Subscribe</button>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                       
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                       
                    </div>
                    </div>
                    <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Videos</h2>
                        
                    </div>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                       
                            TRVL <i className="fab fa-typo3"></i>

                    </div>
                    <small className="website-rights">TRVL © 2020</small>
                    <div className="social-icons">
                       
                            <i className="fab fa-facebook-f"></i>

                       
                        
                        <i className='fab fa-youtube' />
                      
                        <i className='fab fa-twitter' />
                        
                        <i className='fab fa-linkedin' />

                    </div>
                </div>
            </section>
        </div>
    </footer>
  );
}

export default Footer;
