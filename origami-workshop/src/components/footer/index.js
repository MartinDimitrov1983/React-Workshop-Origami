import React from "react"
import styles from "./index.module.css"
import UserContext from "../../Context"

import Link from '../link';
import logo from '../../images/blue-origami-bird-flipped.png'
import getNvigation from "../../utils/navigation"

class Footer extends React.Component {

    static contextType = UserContext

    render() {
        const { user } = this.context
        const links = getNvigation(user);

        return (
            <footer className={styles.footer}>
                <div>
                    {links.map((navElement, index) => {
                        return (
                            <Link
                                key={index}
                                href={navElement.link}
                                title={navElement.title}
                                type="footer"
                            />
                        )
                    })
                    }
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <p className={styles.university}>Software University 2019</p>

            </footer>
        )
    }
};

export default Footer;