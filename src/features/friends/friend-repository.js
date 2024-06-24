import { UserModel } from "../users/user-schema.js";
import { FriendModel } from "./friend-schema.js";

export default class FriendRepository {
  async getFriends(userId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const friends = await FriendModel.find({
        userId,
        status: "accepted",
      }).populate("friendId");
      if (friends.length > 0) {
        return friends;
      } else {
        throw new Error("Friends not found for this user");
      }
    } catch (err) {
      throw err;
    }
  }

  async getPendingRequests(userId) {
    try {
      const friends = await FriendModel.find({
        userId,
        status: "pending",
      }).populate("friendId");
      if (friends.length > 0) {
        return friends;
      } else {
        throw new Error("Pending friend requests not found for this user");
      }
    } catch (err) {
      throw err;
    }
  }

  async toggleFriendship(userId, friendId) {
    //toggling between sending friend request and withdrawing the request
    try {
      const friend = await UserModel.findById(friendId);
      if (!friend) {
        throw new Error("Friend not found");
      }
      //if friendId is already a friend don't send request
      const friendAlready = await FriendModel.findOne({
        userId,
        friendId,
        status: "accepted",
      });
      if (friendAlready) {
        return "He/She has already accepted the request";
      }
      //if request sent from this user then delete (withdrawing the friend request)
      const requestSent = await FriendModel.findOneAndDelete({
        userId,
        requestSent: friendId,
      });
      if (requestSent) {
        //deleting fFriend request from this user to the friend
        const requestReceived = await FriendModel.findOneAndDelete({
          userId: friendId,
          friendId: userId,
          status: "pending",
        });
        return "Friend request withdrawn";
      } else {
        //else send a friend request
        const requestSend = new FriendModel({ userId, requestSent: friendId });
        await requestSend.save();
        const receiveRequest = new FriendModel({
          userId: friendId,
          friendId: userId,
          status: "pending",
        });
        await receiveRequest.save();
        return "Friend request sent";
      }
    } catch (err) {
      throw err;
    }
  }

  async responseToRequest(userId, friendId, response) {
    try {
      const friend = await UserModel.findById(friendId);
      if (!friend) {
        throw new Error("Friend not found");
      }
      //if pending request is there update it to accepted or rejected
      const requestReceived = await FriendModel.findOneAndUpdate(
        {
          userId,
          friendId,
          status: "pending",
        },
        { status: response },
        { returnOriginal: false }
      ).populate("friendId");
      if (requestReceived) {
        //if request accepted or rejected delete the request sent
        await FriendModel.findOneAndDelete({
          userId: friendId,
          requestSent: userId,
        });
        //if request accepted or rejected, receive that response
        const receiveFriend = new FriendModel({
          userId: friendId,
          friendId: userId,
          status: response,
        });
        await receiveFriend.save();
        return requestReceived;
      } else {
        //if pending request is not there
        throw new Error("Friend request not found");
      }
    } catch (err) {
      throw err;
    }
  }
}
