import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: String,
  Date: Date,
  catagory: String,
  updatedAt: { type: Date, default: Date.now },
  history: [
    {
      version: Number,
      title: String,
      content: String,
      category: String,
      updatedAt: Date,
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;


//หน้า Scema วางโครงข้อมูล

