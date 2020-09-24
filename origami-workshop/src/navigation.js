import React, { useContext } from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Publications from "./pages/publications"
import ErrorPage from "./pages/error"
import RegisterPage from "./pages/register"
import LoginPage from "./pages/login"
import ProfilePage from "./pages/profile"
import ShareThoughtsPage from "./pages/share-thoughts"
import UserContext from "./Context"

const Navigation = () => {
    const context = useContext(UserContext)
    const loggedIn = context.user === null ? false : context.user.loggedIn 

    return (
        <BrowserRouter>
            <Switch>

                <Route path="/" exact component={Publications} />
                <Route path="/register" component={RegisterPage} >
                    {loggedIn ? (<Redirect to="/" />) :(<RegisterPage />)}
                </Route>
                <Route path="/login">
                    { loggedIn ? (<Redirect to="/"/>) : <LoginPage />}
                </Route>
                <Route path="/profile/:userid" > 
                    {loggedIn ? (<ProfilePage />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/share">
                    {loggedIn ? (<ShareThoughtsPage />) : (<Redirect to="/login" />)}
                </Route>
                <Route component={ErrorPage} />

            </Switch>
        </BrowserRouter>
    )
}

export default Navigation