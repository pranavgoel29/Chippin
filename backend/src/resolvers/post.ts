import { Post } from "../entities/Post";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { MyContext } from "./types";
import { RequiredEntityData } from "@mikro-orm/core";

@Resolver()
export class PostResolver {
  // All Posts query
  @Query(() => [Post])
  // destructuring the ctx as it will provide cleaner syntax.
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    // find will return a promise of posts.
    return em.find(Post, {});
  }

  // Single Post query
  @Query(() => Post, { nullable: true })
  // destructuring the ctx as it will provide cleaner syntax.
  post(
    // Taking argument 'id' for returning a single post.
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    // findOne will return a single one post, giving 'id' in curly braces simply says where id id equal to this.
    return em.findOne(Post, { id });
  }

  // Creating Post
  @Mutation(() => Post)
  async createPost(
    // Taking argument 'title' for new post
    @Arg("title") title: string, // The string type will get Infered here.
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title } as RequiredEntityData<Post>);
    await em.persistAndFlush(post);
    return post;
  }

  // Updating Post
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    // For making a field optional we have to make it 'nullable' and to make it nullable, we have to exxplicitly set the type.
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    // fetching the post to update.
    const post = await em.findOne(Post, { id });
    if (!post) {
      // If we can't find the id of the post, means post is not there return 'null'.
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }

  // Delete Post
  @Mutation(() => Boolean) // returning boolean to just get whether it worked or not.
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { id });
    } catch {
      return false; // returning false if request failed/post not there.
    }
    return true;
  }
}
