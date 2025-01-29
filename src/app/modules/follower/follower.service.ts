import { User } from "../user/user.model";
import { IFollower } from "./follower.interface";
import { Follower } from "./follower.model";

const addFollowersIntoDB = async (payload: IFollower) => {
  const result = await Follower.create(payload);
  if (result) {
    await User.findByIdAndUpdate(payload.followedBy, {
      $push: { followers: payload.following },
    });
    await User.findByIdAndUpdate(payload.following, {
      $push: { followed: payload.followedBy },
    });
  }

  return result;
};

export const FollowerServices = {
  addFollowersIntoDB,
};
