import { User } from "../user/user.model";
import { IFollower } from "./follower.interface";

import { Follower } from "./follower.model";

const addFollowersIntoDB = async (payload: IFollower) => {
  const result = await Follower.create(payload);
  if (result) {
    await User.findByIdAndUpdate(payload.followedBy, {
      $addToSet: { following: payload.following },
    });
    await User.findByIdAndUpdate(payload.following, {
      $addToSet: { followedBy: payload.followedBy },
    });
  }

  return result;
};

const removeFollowersFromDB = async (payload: IFollower) => {
  const result = await Follower.findOneAndDelete({
    following: payload.following,
    followedBy: payload.followedBy,
  });

  if (result) {
    await User.findByIdAndUpdate(payload.followedBy, {
      $pull: { following: payload.following },
    });
    await User.findByIdAndUpdate(payload.following, {
      $pull: { followedBy: payload.followedBy },
    });
  }
  return result;
};

export const FollowerServices = {
  addFollowersIntoDB,
  removeFollowersFromDB,
};
