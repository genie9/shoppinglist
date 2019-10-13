import mongoose from 'mongoose';
import User from './User';
import Item from './Item';
import ItemList from './ItemList';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
};

const models = { User, Item, ItemList };

export default models;
export { connectDb };
