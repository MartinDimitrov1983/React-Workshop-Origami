import React from "react"
import styles from "./index.module.css"

import Link from '../link';
import UserContext from "../../Context"
import getNvigation from "../../utils/navigation"

class Aside extends React.Component {

    static contextType = UserContext

    render() {
        
        const { user } = this.context
        const links = getNvigation(user);

        return (
            <aside className={styles.container}>

                {links.map((navElement, index) => {
                    return (
                        <Link
                            key={index}
                            href={navElement.link}
                            title={navElement.title}
                            type="aside"
                        />
                    )
                })
                }

            </aside>
        )
    }
};

export default Aside;