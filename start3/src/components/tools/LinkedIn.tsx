"use client"
import React, { FC, useState } from "react";
import { LinkedInEmbed } from "react-social-media-embed";
import { BackgroundGradient } from "../ui/background-gradient";

interface User {
    linkedInUrl?: string;
}

interface LinkedInProps {
    handleClick: React.ChangeEventHandler<HTMLInputElement>;
    user: User;
}

const LinkedIn: FC<LinkedInProps> = ({ handleClick, user }) => {
    return (
        <div className="space-y-6">
            {user.linkedInUrl ? (
                <LinkedInEmbed url={user.linkedInUrl} width={325} height={424} />
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

const LinkedInComponent: FC = () => {
    const [user, setUser] = useState<User>({});

    const handleFormFieldChange = (
        fieldName: keyof User,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUser({ ...user, [fieldName]: e.target.value });
    };

    return (
        <BackgroundGradient className="rounded-xl flex items-center justify-center p-5 bg-white">
            <div className="bg-white ">
                <LinkedIn
                    user={user}
                    handleClick={(e) => handleFormFieldChange("linkedInUrl", e)}
                />
            </div>
        </BackgroundGradient>
    );
};

export default LinkedInComponent;