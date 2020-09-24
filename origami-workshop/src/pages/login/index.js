import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./index.module.css";
import Title from "../../components/title";
import PageLayout from "../../components/page-layout";
import Input from "../../components/input"
import SubmitButton from "../../components/button/submit-button"
import UserContext from "../../Context"
import authenticate from "../../utils/authenticate"

const LoginPage = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const context = useContext(UserContext)
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()

        await authenticate('http://localhost:9999/api/user/login', {
            username,
            password
        },
            (user) => {
                context.logIn(user)
                history.push('/')
            },
            (e) => {
                console.log('Error', e)
            }
        )
    }

    return (
        <PageLayout>
            <form className={styles.container} onSubmit={handleSubmit}>
                <Title title="Login Page" />
                <Input
                    id="email"
                    label="Emial"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <SubmitButton title="Login" />
            </form>
        </PageLayout>
    )
}

export default LoginPage;