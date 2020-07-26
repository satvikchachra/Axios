import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
// import axios from 'axios';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost';

import classes from './Blog.module.css';


class Blog extends Component {

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
                    <Route
                        path="/new-post"
                        component={NewPost} />
                    <Route
                        path="/posts"
                        component={Posts} />
                </Switch>
            </div>
        );
    }
}

export default Blog;