"use client";
import { useMarkdownProcessor,   MARKDOWN_TEST_MESSAGE } from "@/hooks/use-markdown-processor";

export default function Chat() {
  const content = useMarkdownProcessor(MARKDOWN_TEST_MESSAGE);

  return (
    <div className="px-2 lg:px-8 pb-8">
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="font-sans text-2xl font-semibold text-emerald-950 mb-4 mt-8">
          Supported Markdown
        </h1>
        <p className="font-sans text-base text-emerald-950">
          Below is the markdown that is supported in the LLM responses.
        </p>
        <hr className="border-t-2 border-emerald-100 my-8" />
        <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {content}
        </div>
      </div>
    </div>
  );
}
