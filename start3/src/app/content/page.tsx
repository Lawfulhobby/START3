'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContentForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rewardInstructions, setRewardInstructions] = useState('');
    const [steps, setSteps] = useState([{ step: 1, title: '', content: '' }]);

    const router = useRouter(); // For navigation after form submission

    const addStep = () => {
        setSteps([...steps, { step: steps.length + 1, title: '', content: '' }]);
    };

    const handleStepChange = (index: number, field: string, value: string) => {
        const updatedSteps = steps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step
        );
        setSteps(updatedSteps);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const contentData = {
            name,
            description,
            rewardInstructions,
            steps,
        };

        try {
            const response = await fetch('/api/POST/createForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contentData),
            });

            if (response.ok) {
                const responseData = await response.json();
                const contentId = responseData.id; // Extract the content id
                alert(`Content created successfully with ID: ${contentId}`);
                router.push(`/flow/${contentId}`); // Navigate to the home page after successful submission
            } else {
                alert('Failed to create content');
            }
        } catch (error) {
            console.error('Error creating content:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 text-black">
            <h1 className="text-2xl mb-4">Create New Content</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Reward Instructions</label>
                    <textarea
                        value={rewardInstructions}
                        onChange={(e) => setRewardInstructions(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>

                <h2 className="text-xl mb-4">Steps</h2>
                {steps.map((step, index) => (
                    <div key={index} className="mb-4">
                        <div className="mb-2">
                            <label className="block">Step {index + 1} Title</label>
                            <input
                                type="text"
                                value={step.title}
                                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block">Step {index + 1} Content</label>
                            <textarea
                                value={step.content}
                                onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addStep}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Add Step
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded ml-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}