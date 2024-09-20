'use server';
import { MarkdownMessage } from "../markdown-message";

export async function ServerSideMarkdown({
    children,
}: {
    children: string;
}) {

    return (
        <MarkdownMessage children={children} />
    );
}