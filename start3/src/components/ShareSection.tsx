import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon, TelegramShareButton, TelegramIcon } from 'next-share';

export default function ShareSection({ qrUrl }:{qrUrl: string}) {
  return (
    <div className="border flex flex-col items-center w-full border rounded border-[#A479FF]">
      <p className="text-pretty font-medium tracking-tighter text-black text-xl my-2">Share to your socials</p>
      
      <div className="flex gap-3 flex-col justify-center">
        {/* Twitter Share Button */}
        <TwitterShareButton
          url={`${qrUrl}`}
          title={'I just completed my Web3 onboarding flow on Start3! Join me and get started with your own personalized Web3 journey 🚀'}
          hashtags={['Web3', 'Blockchain', 'Start3', 'Crypto']}
          via={'Start3Platform'}
        >
          <TwitterIcon size={30} round />
        </TwitterShareButton>

        {/* Facebook Share Button */}
        <FacebookShareButton
          url={`${qrUrl}`}
          quote={'I just completed my Web3 onboarding flow on Start3! Join me and get started with your own personalized Web3 journey 🚀'}
          hashtag={'#Start3'}
        >
          <FacebookIcon size={30} round />
        </FacebookShareButton>

        {/* LinkedIn Share Button */}
        <LinkedinShareButton
          url={`${qrUrl}`}
          title={'I just completed my Web3 onboarding flow on Start3!'}
          summary={'Join me on this exciting Web3 journey with Start3! 🚀'}
          source={'Start3Platform'}
        >
          <LinkedinIcon size={30} round />
        </LinkedinShareButton>

        {/* Reddit Share Button */}
        <RedditShareButton
          url={`${qrUrl}`}
          title={'I just completed my Web3 onboarding flow on Start3!'}
        >
          <RedditIcon size={30} round />
        </RedditShareButton>

        {/* Telegram Share Button */}
        <TelegramShareButton
          url={`${qrUrl}`}
          title={'I just completed my Web3 onboarding flow on Start3! 🚀'}
        >
          <TelegramIcon size={30} round />
        </TelegramShareButton>
      </div>
    </div>
  );
}