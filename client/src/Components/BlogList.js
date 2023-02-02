import React from "react";
import BlogItem from "./BlogItem";
import "./BlogList.css";
import Section from './UIElements/Section'
function BlogList(props) {
  return (
    <Section className="posts">
      {props.heading && <h1 className="heading">{props.heading}</h1>}
      {props.posts && props.posts.map((post) => (
        
        <BlogItem
          key={post.id}
          id={post.id}
          title={post.title}
          desc={post.description}
          image={post.image}
          categories = {post.categories}
          date = {post.createdAt}
          name = {post.author.username}
          userImg = {post.author.image}
          uid = {post.author.id}
          userData={props.userData}
        />
      ))}
    </Section>
  );
}

export default BlogList;
