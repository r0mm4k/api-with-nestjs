import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import Post from './post.entity';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postsRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async update(id: number, post: UpdatePostDto) {
    const updatedPost = await this.findOne(id);
    return this.postsRepository.save({ ...updatedPost, ...post });
  }

  async create(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  async remove(id: number) {
    const removedPost = await this.findOne(id);
    return this.postsRepository.remove(removedPost);
  }
}
