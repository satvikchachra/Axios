import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
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
                this.setState({
                    error: true
                })
                console.log(err);
                // if (err.response) {
                //     // Status other than 200
                //     console.log(err.response.status);
                //     console.log(err.response.data);
                //     console.log(err.response.headers);
                // }
                // else if (err.request) {
                //     console.log(err.request);
                // }
                // else {
                //     console.log(err.message);
                // }
            });
    }

    postSelectedHandler = (id) => {
        console.log(`Article ${id} clicked`);
        this.setState({
            selectedPostId: id
        });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts
                .map((post) => (<Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                >${post}
                </Post>));
        }


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;