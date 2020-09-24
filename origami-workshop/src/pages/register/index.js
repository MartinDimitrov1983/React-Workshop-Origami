import React, { useState, useContext } from "react";
import styles from "./index.module.css";
import Title from "../../components/title";
import PageLayout from "../../components/page-layout";
import Input from "../../components/input"
import SubmitButton from "../../components/button/submit-button"
import UserContext from "../../Context"
import authenticate from '../../utils/authenticate'
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const context = useContext(UserContext);
    const history = useHistory()


    const handleSubmit = async (event) => {

        event.preventDefault();

        await authenticate("http://localhost:9999/api/user/register",
            { username, password },
            (user) => {
                context.logIn(user);
                history.push("/")
            },
            (e) => {
                console.log("Error", e)
            })
    }

    return (

        <PageLayout>

            <form className={styles.container} onSubmit={handleSubmit}>
                <Title title="Register Page" />
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username"
                    id="username"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    id="password"
                />
                <Input
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    label="Re-Password"
                    id="re-Password"
                />
                <SubmitButton title="Register" />
            </form>
        </PageLayout >
    )
}

export default RegisterPage;