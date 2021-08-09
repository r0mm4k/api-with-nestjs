import { Injectable, NotFoundException } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import Post from './post.interface';
import UpdatePostDto from './dto/updatePost.dto';

@Injectable()
export default class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  replacePost(id: number, post: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex < 0) throw new NotFoundException('Post not found');

    this.posts[postIndex] = post;

    return post;
  }

  createPost(post: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...post,
    };
    this.posts.push(newPost);

    return newPost;
  }

  deletePost(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex < 0) throw new NotFoundException('Post not found');

    this.posts.splice(postIndex, 1);
  }
}
