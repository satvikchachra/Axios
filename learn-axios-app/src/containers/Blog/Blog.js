import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import axios from 'axios';

import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
import classes from './Blog.module.css';


// import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost';

// Lazy Loading
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});



class Blog extends Component {

    state = {
        auth: true
    };

    render() {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{ textDecoration: 'underlne' }}
                            >Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#idName',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    {this.state.auth ? <Route
                        path="/new-post"
                        component={AsyncNewPost} /> : null}
                    <Route
                        path="/posts"
                        component={Posts} />

                    <Route render={() => <h1>Not Found</h1>} />

                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route
                        to="/"
                        component={Posts} /> */}


                </Switch>
            </div>
        );
    }
}

export default Blog;