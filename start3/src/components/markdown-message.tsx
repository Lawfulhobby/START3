"use client"
import { useMarkdownProcessor } from "@/hooks/use-markdown-processor";

interface Props {
  children: string;
}

export const MarkdownMessage = ({ children }: Props) => {
  const content = useMarkdownProcessor(children);

  return (
    <li className="flex flex-col flex-1 text-black">
      <div >
        {content}
      </div>
    </li>
  );
};
