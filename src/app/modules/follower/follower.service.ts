import { User } from "../user/user.model";
import { IFollower } from "./follower.interface";
import { Follower } from "./follower.model";

const addFollowers = async (payload: IFollower) => {
  const result = await Follower.create(payload);
  if (result) {
    await User.findByIdAndUpdate(payload.followed, {
      $push: { followers: payload.follower },
    });
    await User.findByIdAndUpdate(payload.follower, {
      $push: { followed: payload.followed },
    });
  }

  return result;
};

export const FollowerServices = {
  addFollowers,
};
