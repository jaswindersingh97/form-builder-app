import React, { Fragment } from 'react'
import styles from './LandingPage.module.css';
import {LeftImage, RightImage, Figure} from './../../assets/LandingPage/';
import { Logo } from '../../assets';
function LandingPage() {
    // const data = [{"Product":["Status", "Documentation","Roadmap","Pricing"]},{"Community":["Discord","Github repository","Twitter","Linkedin"]},{"Company":["About","Careers","Contact","Press"]}]
  return (
    <div className={styles.container}>
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src={Logo} alt="logo" />
                <h6>FormBot</h6>
            </div>
            <div className={styles.navlinks}>
                <button className={styles.Button1}>Sign in</button>
                <button className={styles.Button2}>Create a FormBot</button>
            </div>
        </div>
        <div className={styles.body}>
            <div className={styles.upper}>
                <div className={styles.upperLeft}>
                    <img src={LeftImage} alt="landingPageImage" />
                </div>
                <div className={styles.upperMiddle}>
                    <h1>Build advanced chatbots visually</h1>
                    <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them anywhere on your web/mobile apps and start collecting results like magic.</p>
                    <button className={styles.Button2}>Create a FormBot  for free</button>
                </div>
                <div className={styles.upperRight}>
                <img src={RightImage} alt="landingPageImage" />
                </div>
            </div>
            <div className={styles.lower}>
                
                <img src={Figure} alt="landingPageImage" />
            </div>
        </div>
        <div className={styles.footer}>
            <div className={styles.column}>
                <div className={styles.Logo}>
                <img src={Logo} alt='logo'/> 
                <h6>FormBot</h6>
                </div>
                <p>Made with ❤️ by</p>
                <p>Team India</p>
            </div>
            <div className={styles.column}>
                <h6>Product</h6>
                <p><span>Status</span></p>
                <p><span>Documentation</span></p>
                <p><span>Roadmap</span></p>
                <p>Pricing</p>
            </div>
            <div className={styles.column}>
                <h6>Community</h6>
                <p><span>Discord</span></p>
                <p><span>Github repository</span></p>
                <p><span>Twitter</span></p>
                <p><span>Linkedin</span></p>
                <p>OSS Friends</p>
            </div>
            <div className={styles.column}>
                <h6>Company</h6>
                <p>About</p>
                <p>Contact</p>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
            </div>
        </div>
    </div>
  )
}

export default LandingPage
