import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components'
import styles from "./index.module.css"
import PageLayout from "../../components/page-layout";
import Origamis from "../../components/origamis"
import UserContext from "../../Context"

const ProfilePage = () => {

    const [username, setUsername] = useState(null);
    const [posts, setPosts] = useState(null);
    const context = useContext(UserContext);
    const history = useHistory();
    const params = useParams();

    const getData = useCallback(async () => {
        
        const id = params.userid
        const response = await fetch(`http://localhost:9999/api/user?id=${id}`)

        if (!response.ok) {
            
            history.push('/error')       
        } else {

            const user = await response.json()
            setUsername(user.username)
            setPosts(user.posts && user.posts.length)
            
        }
    }, [params.userid, history])

    useEffect(() => {
        getData()
    }, [getData])

    const logOut = () => {
        context.logOut()
        history.push('/')
    }

    if (!username) {
        return (
            <PageLayout>
                <div>Loading....</div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <div className={styles["personal-info"]}>
                <p>
                    <span>Username:</span>
                    {username}
                </p>
                <p>
                    <span>Posts:</span>
                    {posts}
                </p>
                <button onClick={logOut}>Logout</button>
            </div>
            <H2>3 of your recent posts</H2>
            <Origamis length={3} updatedOrigami={posts}/>
        </PageLayout>

    )
}

const H2 = styled.h2`
    color: #234465;
    text-decoration: underline;
`

export default ProfilePage