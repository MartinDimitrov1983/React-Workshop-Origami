import React from "react"
import styles from "./index.module.css"
import UserContext from "../../Context"

import Link from '../link';
import logo from '../../images/white-origami-bird.png'
import getNvigation from "../../utils/navigation"

class Header extends React.Component {

    static contextType = UserContext

    render() {
        
        const {  user } = this.context
        const links = getNvigation( user);

        return (
            <header className={styles.navigation}>
                <div>
                    <img className={styles.logo} src={logo} alt="logo" />
                    {links.map((navElement, index) => {
                        return (
                            <Link
                                key={index}
                                href={navElement.link}
                                title={navElement.title}
                                type="header"
                            />
                        )
                    })
                    }
                </div>
            </header>
        )
    }
};

export default Header;