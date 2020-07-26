import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import classes from './Posts.module.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
// import { Link } from 'react-router-dom';F


class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log(this.props);
        axios
            .get('/posts')
            .then(res => {
                const posts = res.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Satvik'
                    }
                })
                this.setState({
                    posts: updatedPosts
                })
            }
            )
            .catch(err => {
                console.log(err);

                // this.setState({
                //     error: true
                // })
            });
    }

    postSelectedHandler = (id) => {
        console.log(`Article ${id} clicked`);

        this.props.history.push({ pathname: '/posts/' + id });
        // this.props.history.push('/posts/' + id);

        // this.setState({
        //     selectedPostId: id
        // });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts
                .map((post) => (
                    // <Link to={'/posts' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    >${post}
                    </Post>
                    // </Link>
                ));
        }

        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <Route
                    path={this.props.match.url + '/:id'}
                    exact
                    component={FullPost}
                />
            </div>

        )
    }
}

export default Posts;
