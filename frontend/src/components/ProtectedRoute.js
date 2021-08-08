import React from "react";
import {Route, Redirect} from "react-router-dom";
import Footer from './Footer';

const ProtectedRoute = ({component: Component, ...props}) => {
    return (
        <Route>
            {() =>
                props.loggedIn ? <> <Redirect to="/users/me"/> <Component {...props} /> <Footer/> </> :
                    <Redirect to="/sign-up"/>
            }
        </Route>
    );
};

export default ProtectedRoute;