import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
// import { NEXT_PUBLIC_URL } from '@/lib/config';

const NEXT_PUBLIC_URL = "http://localhost:3000";

const title = "Transactions with Basenames";
const description = "A basename is a human-readable name that can be registered for blockchain addresses It serves as a foundational building block for on-chain identit making it easier to identify and interact with addresses";

// Encode the title and description to ensure they're URL-safe
const encodedTitle = encodeURIComponent(title);
const encodedDescription = encodeURIComponent(description);

// Define font sizes
const titleFontSize = 60; // Adjusted for better fit
const descriptionFontSize = 30; // Adjusted for better fit

// Adjust y positions to ensure texts are within the canvas
const titleYPosition = "-150"; // Adjusted to position towards the top
const descriptionYPosition = "50"; // Adjusted to position below the title

// Optional: Define maximum width for text wrapping (Cloudinary doesn't support explicit wrapping, so we handle it by limiting character count or using line breaks)
const maxTitleLength = 20; // Adjust based on image size
const maxDescriptionLength = 100; // Adjust based on image size

// Optionally, split the description into multiple lines for better readability
const formattedDescription = description.length > maxDescriptionLength
  ? `${description.substring(0, maxDescriptionLength)}...`
  : description;

// Alternatively, you can insert manual line breaks if needed
// const formattedDescription = "Line 1 of description\nLine 2 of description";


const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Send',
    },
  ],
  image: {
    src: `https://res.cloudinary.com/den4cf4vq/image/upload/l_text:helvetica_${titleFontSize}_bold_white:${encodedTitle}/fl_layer_apply,y_${titleYPosition}/co_rgb:000000,bo_5px_solid_white/l_text:arial_${descriptionFontSize}_white:${formattedDescription}/fl_layer_apply,y_${descriptionYPosition}/photo-1604079628040-94301bb21b91_livf44.jpg`.replace(/\s+/g, ''),
    aspectRatio: '1:1',
  },
  input: {
    text: 'Tell me a story',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'start3w.xyz',
  description: 'LFG',
  openGraph: {
    title: 'start3w.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <p>{NEXT_PUBLIC_URL}</p>
      <h1>zizzamia.xyz</h1>
    </>
  );
}