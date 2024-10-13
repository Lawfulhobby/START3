import React, { FC, useState } from "react";
import {
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import { BsTwitterX } from "react-icons/bs";
import { BackgroundGradient } from "../ui/background-gradient";

interface User {
  twitterId?: string;
}

interface TwitterProps {
  handleClick: React.ChangeEventHandler<HTMLInputElement>;
  user: User;
}

const Twitter: FC<TwitterProps> = ({ handleClick, user }) => {
  return (
    <div className="space-y-6">
      {user.twitterId ? (
        <TwitterTweetEmbed tweetId={user.twitterId} />
      ) : (
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-700">Post ID</label>
          <input
            onChange={handleClick}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Twitter Post ID"
          />
        </div>
      )}
    </div>
  );
};

const TwitterComponent: FC = () => {
  const [user, setUser] = useState<User>({});

  const handleFormFieldChange = (
    fieldName: keyof User,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  return (
    <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <div className="container mx-auto ">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div className="bg-white  rounded-lg ">
              <Twitter
                user={user}
                handleClick={(e) => handleFormFieldChange("twitterId", e)}
              />
            </div>
          </div>
        </div>
      </div>
    </BackgroundGradient>
  );
};

export default TwitterComponent;