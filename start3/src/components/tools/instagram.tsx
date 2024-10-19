"use client"
import React, { FC, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { BsTwitterX } from "react-icons/bs";
import { BackgroundGradient } from "../ui/background-gradient";

interface User {
    instagramUrl?: string;
}

interface InstagramProps {
    handleClick: React.ChangeEventHandler<HTMLInputElement>;
    user: User;
}

const Instagram: FC<InstagramProps> = ({ handleClick, user }) => {
    return (
        <div className="space-y-6">
            {user.instagramUrl ? (
                <InstagramEmbed url={user.instagramUrl} width={325} height={424} />
            ) : (
                <div className="flex flex-col mb-4">
                    <label className="mb-2 text-gray-700">Post Url</label>
                    <input
                        onChange={handleClick}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter Instagram Post Url"
                    />
                </div>
            )}
        </div>
    );
};

const InstagramComponent: FC = () => {
    const [user, setUser] = useState<User>({});

    const handleFormFieldChange = (
        fieldName: keyof User,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUser({ ...user, [fieldName]: e.target.value });
    };

    return (
        <BackgroundGradient className="rounded-xl flex items-center justify-center p-5 bg-white">
            <div className="container mx-auto ">
                <div className="flex justify-center">
                    <div className="w-full max-w-lg">
                        <div className="bg-white ">
                            <Instagram
                                user={user}
                                handleClick={(e) => handleFormFieldChange("instagramUrl", e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </BackgroundGradient>
    );
};

export default InstagramComponent;