// app/create-wallet/page.tsx
"use client";

import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../button';

export default function TextComponent() {

    return (
        <div className="bg-neutral-800 pt-10 rounded-lg pb-5 max-w-2xl w-full">
            {/* Message input at the bottom */}
            <div className="relative mx-auto max-w-2xl px-4 w-full backdrop-blur-sm bg-white bg-opacity-10">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="group relative flex flex-col items-start">
                        <form
                            // ref={formRef}
                            // onSubmit={form.handleSubmit(submitHandler)}
                            className="w-full flex items-center"
                        >
                            <TextareaAutosize
                                tabIndex={0}
                                // onKeyDown={onKeyDown}
                                placeholder="Send a message."
                                className="min-h-[60px]  w-full pr-24 resize-none focus:outline-none rounded p-2 text-lg font-medium tracking-tighter text-gray-950 dark:text-white sm:text-xl"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                autoCorrect="off"
                                rows={1}
                            // {...form.register("message")}
                            />
                            <div className="absolute right-0 top-4 sm:right-4">
                                <Button
                                    type="submit"
                                    // disabled={}
                                    className="rounded-full bg-[#A479FF] py-1 px-3"
                                >
                                    send
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
