import { PostModel } from "./post-schema.js";

export default class PostRepository {
  async addPost(userId, imageUrl, caption) {
    try {
      const post = new PostModel({ userId, imageUrl, caption });
      const savedPost = await post.save();
      return savedPost;
    } catch (err) {
      throw err;
    }
  }

  async getOnePost(id) {
    try {
      const post = await PostModel.findById(id);
      return post;
    } catch (err) {
      throw err;
    }
  }

  async getPosts(userId) {
    try {
      const post = await PostModel.find({ userId });
      return post;
    } catch (err) {
      throw err;
    }
  }

  async deletePost(id) {
    try {
      const post = await PostModel.findByIdAndDelete(id);
      return post;
    } catch (err) {
      throw err;
    }
  }

  async updatePost(id, caption, imageUrl) {
    try {
      const details = { imageUrl, caption };
      const post = await PostModel.findByIdAndUpdate(id, details, {
        returnOriginal: false,
      });
      return post;
    } catch (err) {
      throw err;
    }
  }
}
