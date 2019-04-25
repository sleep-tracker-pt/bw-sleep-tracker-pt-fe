import React, { Component } from "react";
import axios from "axios";
import stripHtml from "string-strip-html";

import BlogDisplay from "./BlogDisplay";

class BlogAggregator extends Component {
  state = {
    blogUrls: [
      "https://sleeplady.com/feed/",
      "http://www.sleepreviewmag.com/feed/",
      "https://babysleepsite.com/feed/",
      "http://feeds.feedburner.com/doctorpark",
      "https://drcraigcanapari.com/feed/",
      "https://sleepjunkies.com/feed/",
      "https://thesleepdoctor.com/feed/",
      "http://feeds.feedburner.com/nsfalert"
    ],
    blogPosts: [
      {
        title: "",
        author: "",
        body: "",
        pubDate: "",
        thumbnailUrl: ""
      }
    ]
  };

  componentDidMount() {
    this.state.blogUrls.forEach(url =>
      axios
        .get(`https://api.rss2json.com/v1/api.json?rss_url=${url}`)
        .then(response => {
          console.log(response.data);
          let newPost = {
            title: response.data.items[0].title,
            author: response.data.items[0].author,
            body: response => stripHtml(response.data.items[0].content),
            pubDate: response.data.items[0].pubDate,
            thumbnailUrl: response.data.items[0].thumbnail
          };
          this.setState({ blogPosts: [...this.state.blogPosts, newPost] });
        })
        .catch(error => console.log(error))
    );
  }

  render() {
    return (
      <div className="BlogAggregator">
        {this.props.blogPosts.map(post => {
          return (
            <BlogDisplay
              title={post.title}
              author={post.author}
              body={post.body}
              pubDate={post.pubDate}
              thumnbnailUrl={post.thumbnailUrl}
            />
          );
        })}
      </div>
    );
  }
}

export default BlogAggregator;
