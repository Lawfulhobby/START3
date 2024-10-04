'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid';

interface RewardOption {
    id: number;
    title: string;
    description: string;
    users: string;
    graphic: React.ReactNode;
}


const rewardOptions: RewardOption[] = [
    {
        id: 1,
        title: 'Cryptocurrency Rewards',
        description: `
• **Airdrops:** Provide small amounts of cryptocurrency to users’ wallets upon completion of specific actions or learning milestones.
• **Discounts on Transaction Fees:** Offer reduced fees for future transactions on your platform as a reward for completing educational modules or tasks.
      `,
        users: 'Unlimited users',
        graphic: <svg width="50" height="50" viewBox="0 0 112 87" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" stroke-linecap="round" strokeLinejoin="round"><path d="M15.8293 54.2799V74.2799L7.2793 69.3399V49.3399L15.8293 54.2799Z" stroke="white" strokeLinejoin="round" /><path d="M109.429 19.9999V39.9999L103.74 43.2799V32.1899C103.7 29.7299 102.589 27.3999 100.399 25.2099L109.429 19.9999Z" stroke="white" strokeLinejoin="round" /><path d="M91.6989 32.2699C91.7089 34.1999 90.5389 35.8399 88.2089 37.1899C88.0989 37.2499 87.9889 37.3199 87.8689 37.3699C85.5989 38.5899 82.8688 39.2099 79.6888 39.1999C76.3488 39.1899 73.5088 38.5099 71.1488 37.1499L71.0989 27.6799L71.0488 17.4699L88.1488 27.3399C88.9788 27.8199 89.6689 28.3399 90.2089 28.8999C90.7489 29.4499 91.1388 30.0299 91.3988 30.6499C91.5988 31.1699 91.6989 31.6999 91.6989 32.2699Z" stroke="white" strokeLinejoin="round" /><path d="M109.429 19.9999L100.869 15.0599L92.3792 19.9699L92.3192 19.9399L83.8192 15.0299L92.3192 10.1199L83.7692 5.17993L75.2692 10.0899L62.4392 2.67993L53.9392 7.58993L62.4993 12.5299L53.9993 17.4399L19.9993 37.0599L11.4492 32.1199L2.94922 37.0299L15.7792 44.4399L7.27917 49.3399L15.8292 54.2799L24.3292 49.3799L28.8192 51.9699L32.8792 54.3099L24.3792 59.2199L28.8693 61.8099L32.9392 64.1599L41.4392 59.2499C46.1392 61.9699 51.8292 63.3299 58.5092 63.3399C60.5192 63.3399 62.4293 63.2199 64.2493 62.9799C68.5093 62.4199 72.2692 61.1999 75.5392 59.3099C75.7592 59.1799 75.9792 59.0499 76.1892 58.9199C78.9392 57.2099 80.7893 55.2699 81.7393 53.0799C82.1893 52.0499 82.4393 51.0199 82.4993 49.9999C82.5693 48.6799 82.3193 47.3899 81.7493 46.0999C82.9893 46.0499 84.2192 45.9399 85.4292 45.7699C86.9092 45.5699 88.3592 45.2799 89.7892 44.9099C92.3792 44.2399 94.6992 43.3099 96.7592 42.1199C99.7492 40.3899 101.789 38.4199 102.849 36.1999C103.199 35.4899 103.449 34.7499 103.589 33.9799C103.689 33.4299 103.739 32.8799 103.739 32.3399V32.1899C103.699 29.7299 102.589 27.3999 100.399 25.2099L109.429 19.9999ZM66.9893 54.3699C66.8793 54.4299 66.7692 54.4999 66.6492 54.5499C64.3792 55.7799 61.6492 56.3999 58.4692 56.3899C55.1292 56.3799 52.2892 55.6999 49.9292 54.3399L45.5492 51.8099L37.3192 47.0599L28.5492 41.9999L45.5492 32.1899L54.3192 37.2499L62.8693 42.1899L66.9292 44.5299C69.2792 45.8899 70.4592 47.5299 70.4792 49.4599C70.4892 51.3899 69.3193 53.0299 66.9893 54.3699ZM88.2092 37.1899C88.0992 37.2499 87.9893 37.3199 87.8693 37.3699C85.5993 38.5899 82.8692 39.2099 79.6892 39.1999C76.3492 39.1899 73.5092 38.5099 71.1492 37.1499L54.2592 27.3999L54.0492 27.2799L71.0492 17.4699L88.1492 27.3399C88.9792 27.8199 89.6692 28.3399 90.2092 28.8999C90.7492 29.4499 91.1392 30.0299 91.3992 30.6499C91.5992 31.1699 91.6992 31.6999 91.6992 32.2699C91.7092 34.1999 90.5392 35.8399 88.2092 37.1899Z" stroke="white" strokeLinejoin="round" /><path d="M32.939 64.1599V84.1599L24.3789 79.2199V59.2199L28.869 61.8099L32.939 64.1599Z" stroke="white" strokeLinejoin="round" /><path d="M103.739 32.3399V52.3499C103.739 52.8899 103.689 53.4299 103.589 53.9799C102.999 57.1199 100.719 59.8299 96.7589 62.1199C94.6989 63.3099 92.3789 64.2399 89.7889 64.9099C87.4289 65.5199 84.999 65.9099 82.489 66.0599V59.0199L82.499 49.9999C82.569 48.6799 82.319 47.3899 81.749 46.0999C82.989 46.0499 84.219 45.9399 85.429 45.7699C86.909 45.5699 88.3589 45.2799 89.7889 44.9099C92.3789 44.2399 94.6989 43.3099 96.7589 42.1199C99.7489 40.3899 101.789 38.4199 102.849 36.1999C103.199 35.4899 103.449 34.7499 103.589 33.9799C103.689 33.4299 103.739 32.8799 103.739 32.3399Z" stroke="white" strokeLinejoin="round" /><path d="M71.1488 37.1499L54.2588 27.3999L54.0488 27.2799L71.0488 17.4699L71.0989 27.6799L71.1488 37.1499Z" stroke="white" strokeLinejoin="round" /><path d="M62.4995 12.5299L53.9995 17.4399L53.9395 7.5899L62.4995 12.5299Z" stroke="white" strokeLinejoin="round" /><path d="M15.7792 44.4399L7.27917 49.3399V59.5299L2.94922 57.0299V37.0299L15.7792 44.4399Z" stroke="white" strokeLinejoin="round" /><path d="M24.3291 49.3799V69.3799L15.8291 74.2799V54.2799L24.3291 49.3799Z" stroke="white" strokeLinejoin="round" /><path d="M32.879 54.3099L24.379 59.2199V69.4099L24.3291 69.3799V49.3799L28.8191 51.9699L32.879 54.3099Z" stroke="white" strokeLinejoin="round" /><path d="M45.5488 32.1899V51.8099L37.3188 47.0599L28.5488 41.9999L45.5488 32.1899Z" stroke="white" strokeLinejoin="round" /><path d="M70.4789 49.4599C70.4889 51.3899 69.3189 53.0299 66.9889 54.3699C66.8789 54.4299 66.7688 54.4999 66.6488 54.5499C64.3788 55.7799 61.6489 56.3999 58.4689 56.3899C55.1289 56.3799 52.2888 55.6999 49.9288 54.3399L45.5488 51.8099V32.1899L54.3188 37.2499L62.8689 42.1899L66.9288 44.5299C69.2788 45.8899 70.4589 47.5299 70.4789 49.4599Z" stroke="white" strokeLinejoin="round" /><path d="M92.3193 10.1199V19.9399L83.8193 15.0299L92.3193 10.1199Z" stroke="white" strokeLinejoin="round" /><path d="M41.4395 59.2499V79.2499L32.9395 84.1599V64.1599L41.4395 59.2499Z" stroke="white" strokeLinejoin="round" /><path d="M82.4895 66.0599V69.1299C82.5795 70.4699 82.3295 71.7199 81.7395 73.0799C80.7195 75.4399 78.6494 77.5099 75.5394 79.3099C70.8594 82.0099 65.1894 83.3499 58.5094 83.3399C51.8294 83.3299 46.1395 81.9699 41.4395 79.2499V59.2499C46.1395 61.9699 51.8294 63.3299 58.5094 63.3399C60.5194 63.3399 62.4295 63.2199 64.2495 62.9799C68.5095 62.4199 72.2694 61.1999 75.5394 59.3099C75.7594 59.1799 75.9795 59.0499 76.1895 58.9199C78.9395 57.2099 80.7895 55.2699 81.7395 53.0799C82.1895 52.0499 82.4395 51.0199 82.4995 49.9999V66.0599H82.4895Z" stroke="white" strokeLinejoin="round" /><path d="M82.4893 69.8399V69.1299" stroke="white" strokeLinejoin="round" /><path d="M82.499 49.9999V49.3599" stroke="white" strokeLinejoin="round" /></svg>,

    },
    {
        id: 2,
        title: 'NFTs',
        description: `
• **Badge NFTs:** Issue digital badges as NFTs that users can collect and display as proof of their achievements or learning progress.
• **Access NFTs:** Provide NFTs that can unlock additional services, content, or privileges on your platform or partner platforms.
      `,
        users: 'Limited edition',
        graphic: <svg width="50" height="50" viewBox="0 0 127 99" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" stroke-linecap="round" strokeLinejoin="round"><path d="M70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM70.4197 58.0005V61.3605L70.4597 61.3905V58.0305L70.4197 58.0005ZM50.1997 73.5305V77.4705L50.2397 77.5005V73.5005L50.1997 73.5305Z" stroke="white" strokeLinejoin="round" /><path d="M124.46 38.0703V58.0703L93.8701 75.7303V55.7303L107.14 48.0703L124.46 38.0703Z" stroke="white" strokeLinejoin="round" /><path d="M93.87 55.7305V75.7305C93.42 75.3405 92.94 74.9805 92.43 74.6505C91.92 74.3305 91.35 73.9905 90.73 73.6305L89.65 73.0105V65.3105C89.64 64.4305 89.47 63.5905 89.15 62.7905C88.37 60.8105 86.64 59.0505 83.99 57.5205L77.57 53.8105L77.2 53.6005L70.46 57.4905V57.9105L70.42 57.9405V49.6905L63.64 45.7705C61.31 44.4205 58.67 43.4905 55.73 42.9805V37.3105C58.23 37.6105 60.62 38.1005 62.92 38.7705C63.12 38.8205 63.32 38.8805 63.51 38.9405C64.21 39.1505 64.89 39.3805 65.55 39.6305C67.26 40.2605 68.87 41.0105 70.38 41.8805L90.73 53.6305C91.35 53.9905 91.92 54.3305 92.43 54.6505C92.94 54.9805 93.42 55.3405 93.87 55.7305Z" stroke="white" strokeLinejoin="round" /><path d="M73.8799 63.3604V70.4903C72.8499 70.7103 71.7299 70.8204 70.5399 70.8204H70.4599C69.8299 70.8104 69.2299 70.7804 68.6499 70.7104C68.1199 70.6604 67.6099 70.5804 67.1299 70.4704V67.2504L70.4199 65.3503L70.4599 65.3304L73.4099 63.6303L73.8799 63.3604Z" stroke="white" strokeLinejoin="round" /><path d="M63.6798 53.5807V57.4707L55.7298 52.8907L53.5198 51.6107L49.6898 53.8207L46.7798 55.5007V59.3907L43.4098 57.4507C41.5498 56.3707 40.6098 55.0707 40.5998 53.5407C40.5898 52.6507 40.9098 51.8407 41.5298 51.1107C41.9798 50.5807 42.5898 50.0907 43.3698 49.6407C45.2198 48.5707 47.4698 48.0307 50.1198 48.0407C51.4798 48.0407 52.7398 48.1807 53.8898 48.4707C54.5398 48.6307 55.1498 48.8307 55.7298 49.0907C56.1298 49.2507 56.5198 49.4407 56.8898 49.6607L63.6798 53.5807Z" stroke="white" strokeLinejoin="round" /><path d="M43.4498 65.2505V85.2505L36.6698 81.3405C32.9398 79.1805 31.0598 76.5805 31.0498 73.5205V53.5205C31.0598 54.6505 31.3198 55.7105 31.8298 56.7205C32.2098 57.4805 32.7498 58.2105 33.4298 58.9005C34.2798 59.7705 35.3598 60.5805 36.6698 61.3405L40.9498 63.8105L43.4498 65.2505Z" stroke="white" strokeLinejoin="round" /><path d="M50.1997 61.3604V81.3604L43.4497 85.2504V65.2504L46.7797 63.3304L48.0997 62.5704L50.1997 61.3604Z" stroke="white" strokeLinejoin="round" /><path d="M33.4299 40.0005V48.1005C31.8299 49.7105 31.0399 51.5105 31.0499 53.5205V61.1105C30.6499 61.3205 30.2299 61.5605 29.7999 61.8005C27.9999 62.8405 26.4699 63.9805 25.2099 65.2405C23.9499 66.4905 23.0099 67.8105 22.3999 69.2105V49.2105C23.0099 47.8105 23.9499 46.4905 25.2099 45.2405C25.5599 44.8905 25.9199 44.5605 26.3099 44.2405C27.3299 43.3605 28.4899 42.5505 29.7999 41.8005C30.4199 41.4505 31.0099 41.1205 31.5699 40.8305C32.1299 40.5405 32.7499 40.2605 33.4299 40.0005Z" stroke="white" strokeLinejoin="round" /><path d="M89.6497 65.3101V65.4301C89.6497 67.6201 88.6597 69.5701 86.6797 71.2901C85.9497 71.9501 85.0798 72.5601 84.0698 73.1401C82.7198 73.9201 81.2697 74.5501 79.7097 75.0501C77.9097 75.6201 75.9598 76.0001 73.8798 76.1801C73.4398 76.2301 72.9997 76.2601 72.5497 76.2801C71.8997 76.3201 71.2398 76.3301 70.5698 76.3301H70.4597C69.3097 76.3201 68.1998 76.2701 67.1298 76.1601C63.2898 75.7801 59.9197 74.7601 57.0197 73.0901L50.2397 69.1701L52.0298 68.1401L56.9798 65.2801L63.6797 69.1501L63.7598 69.2001C64.7698 69.7801 65.8898 70.2001 67.1298 70.4701C67.6098 70.5801 68.1197 70.6601 68.6497 70.7101C69.2297 70.7801 69.8297 70.8101 70.4597 70.8201H70.5398C71.7298 70.8201 72.8498 70.7101 73.8798 70.4901C75.1398 70.2301 76.2798 69.8101 77.2898 69.2201C78.3398 68.6101 79.0997 67.9301 79.5497 67.1701C79.8897 66.5901 80.0598 65.9801 80.0598 65.3201C80.0498 64.5301 79.7997 63.8001 79.2997 63.1301C78.8297 62.5001 78.1498 61.9301 77.2498 61.4101L70.8297 57.7001L70.4597 57.4901L77.1998 53.6001L77.5698 53.8101L83.9897 57.5201C86.6397 59.0501 88.3697 60.8101 89.1497 62.7901C89.4697 63.5901 89.6397 64.4301 89.6497 65.3101Z" stroke="white" strokeLinejoin="round" /><path d="M89.6497 65.4302V85.3102C89.6997 88.3602 87.8398 90.9602 84.0698 93.1402C80.3698 95.2802 75.8598 96.3402 70.5698 96.3302C65.2698 96.3202 60.7497 95.2402 57.0197 93.0902L50.2397 89.1702V69.1702L57.0197 73.0902C59.9197 74.7602 63.2898 75.7802 67.1298 76.1602C68.1998 76.2702 69.3097 76.3202 70.4597 76.3302H70.5698C71.2398 76.3302 71.8997 76.3202 72.5497 76.2802C72.9997 76.2602 73.4398 76.2302 73.8798 76.1802C75.9598 76.0002 77.9097 75.6202 79.7097 75.0502C81.2697 74.5502 82.7198 73.9202 84.0698 73.1402C85.0798 72.5602 85.9497 71.9502 86.6797 71.2902C88.6597 69.5702 89.6497 67.6202 89.6497 65.4302Z" stroke="white" strokeLinejoin="round" /><path d="M73.8798 63.3604L73.4098 63.6303L70.4598 65.3304L70.4198 65.3503L67.1298 67.2504L63.6798 65.2604L46.7798 55.5004L49.6898 53.8204L53.5198 51.6104L55.7298 52.8904L63.6798 57.4704L70.4198 61.3604L70.4598 61.3904L73.8798 63.3604Z" stroke="white" strokeLinejoin="round" /><path d="M63.4 2.82031L2.72998 37.8503L20.05 47.8503L22.4 49.2103C23.01 47.8103 23.95 46.4903 25.21 45.2403C25.56 44.8903 25.92 44.5603 26.31 44.2403C27.33 43.3603 28.49 42.5503 29.8 41.8003C30.42 41.4503 31.01 41.1203 31.57 40.8303C32.13 40.5403 32.75 40.2603 33.43 40.0003L29.78 37.9003L43.26 30.1103L47.02 32.2803L55.73 37.3103C58.23 37.6103 60.62 38.1003 62.92 38.7703C63.12 38.8203 63.32 38.8803 63.51 38.9403C64.21 39.1503 64.89 39.3803 65.55 39.6303C67.26 40.2603 68.87 41.0103 70.38 41.8803L90.73 53.6303C91.35 53.9903 91.92 54.3303 92.43 54.6503C92.94 54.9803 93.42 55.3403 93.87 55.7303L107.14 48.0703L124.46 38.0703L63.4 2.82031ZM63.57 34.0503L53.76 28.3903L50 26.2203L63.49 18.4403L77.06 26.2703L73.22 28.4903L63.57 34.0503ZM93.57 40.2403L83.93 45.8103L70.36 37.9703L80 32.4003L83.84 30.1903L97.41 38.0203L93.57 40.2403Z" stroke="white" strokeLinejoin="round" /><path d="M55.7298 37.3104V42.9203L55.6398 42.9704C53.8998 42.6704 52.0498 42.5204 50.0898 42.5204C44.7998 42.5104 40.2898 43.5804 36.5898 45.7204C35.3098 46.4604 34.2498 47.2503 33.4298 48.1003V40.0004L29.7798 37.9004L43.2598 30.1104L47.0198 32.2803L55.7298 37.3104Z" stroke="white" strokeLinejoin="round" /><path d="M63.57 34.0504L53.76 28.3904L50 26.2204L63.49 18.4404L63.51 22.8904L63.57 34.0504Z" stroke="white" strokeLinejoin="round" /><path d="M77.0598 26.2704L73.2198 28.4904L63.5698 34.0504L63.5098 22.8904L63.4897 18.4404L77.0598 26.2704Z" stroke="white" strokeLinejoin="round" /><path d="M83.9299 45.8104L70.3599 37.9704L79.9999 32.4004L83.8399 30.1904L83.8699 34.6304L83.9299 45.8104Z" stroke="white" strokeLinejoin="round" /><path d="M97.4099 38.0204L93.5699 40.2404L83.9298 45.8104L83.8698 34.6304L83.8398 30.1904L97.4099 38.0204Z" stroke="white" strokeLinejoin="round" /><path d="M70.4199 58.0004V57.9404" stroke="white" strokeLinejoin="round" /><path d="M70.4202 57.9404L70.3602 57.9704L70.4202 58.0004V61.3604L63.6802 57.4704V53.5804L70.4202 49.6904V57.9404Z" stroke="white" strokeLinejoin="round" /><path d="M67.1298 67.2505V70.4705C65.8898 70.2005 64.7698 69.7805 63.7598 69.2005L63.6798 69.1505L56.9798 65.2805L52.0298 68.1405L50.2398 69.1705V73.5005L50.1998 73.5305V61.3605L46.7798 59.3905V55.5005L63.6798 65.2605L67.1298 67.2505Z" stroke="white" strokeLinejoin="round" /><path d="M70.4199 49.6901L63.6799 53.5801L56.8899 49.6601C56.5199 49.4401 56.1299 49.2501 55.7299 49.0901C55.1499 48.8301 54.5399 48.6301 53.8899 48.4701C52.7399 48.1801 51.4799 48.0401 50.1199 48.0401C47.4699 48.0301 45.2199 48.5701 43.3699 49.6401C42.5899 50.0901 41.9799 50.5801 41.5299 51.1101C40.9099 51.8401 40.5899 52.6501 40.5999 53.5401C40.6099 55.0701 41.5499 56.3701 43.4099 57.4501L46.7799 59.3901L50.1999 61.3601L48.0999 62.5701L46.7799 63.3301L43.4499 65.2501L40.9499 63.8101L36.6699 61.3401C35.3599 60.5801 34.2799 59.7701 33.4299 58.9001C32.7499 58.2101 32.2099 57.4801 31.8299 56.7201C31.3199 55.7101 31.0599 54.6501 31.0499 53.5201C31.0399 51.5101 31.8299 49.7101 33.4299 48.1001C34.2499 47.2501 35.3099 46.4601 36.5899 45.7201C40.2899 43.5801 44.7999 42.5101 50.0899 42.5201C52.0499 42.5201 53.8999 42.6701 55.6399 42.9701C55.6699 42.9801 55.6999 42.9801 55.7299 42.9801C58.6699 43.4901 61.3099 44.4201 63.6399 45.7701L70.4199 49.6901Z" stroke="white" strokeLinejoin="round" /><path d="M80.06 65.3202C80.06 65.9802 79.89 66.5902 79.55 67.1702C79.1 67.9302 78.34 68.6102 77.29 69.2202C76.28 69.8102 75.14 70.2302 73.88 70.4902V63.3602L70.46 61.3902V57.4902L70.83 57.7002L77.25 61.4102C78.15 61.9302 78.83 62.5002 79.3 63.1302C79.8 63.8002 80.05 64.5302 80.06 65.3202Z" stroke="white" strokeLinejoin="round" /><path d="M22.4 49.2101V69.2101L2.72998 57.8501V37.8501L20.05 47.8501L22.4 49.2101Z" stroke="white" strokeLinejoin="round" /></svg>,
    },
    {
        id: 6,
        title: 'Partnership Perks',
        description: `
    • **Software Tools:** Collaborate with other software providers to offer free or discounted access to tools that can benefit users in their blockchain ventures.
    • **Event Tickets:** Provide tickets to blockchain or tech conferences as a reward for completing significant milestones.
          `,
        users: 'Partnered users',
        graphic: <svg width="50" height="50" viewBox="0 0 99 103" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" stroke-linecap="round" strokeLinejoin="round"><path d="M49.53 80.19V100.19L2.24023 72.89V52.89L19.5601 62.89L36.8101 72.85L49.53 80.19Z" stroke="white" strokeLinejoin="round" /><path d="M49.1104 2.43005L2.11035 29.56L15.6204 37.36L22.3403 33.4901L15.5803 29.58L49.1504 10.2L82.9304 29.7101L76.2104 33.58L82.9705 37.48L96.3904 29.73L49.1104 2.43005Z" stroke="white" strokeLinejoin="round" /><path d="M93.5701 51.36L82.9702 45.2401L76.2102 41.34L49.2302 25.76L49.1501 25.81L22.3401 41.29L15.6201 45.16L5.06006 51.26L2.24023 52.89L19.5601 62.89L36.8101 72.85L49.53 80.19L49.8301 80.0201L53.2502 78.04L58.9902 74.73L79.2002 63.06L96.52 53.06L93.5701 51.36ZM56.4502 58.1801L52.02 57.9901L49.3601 60.45L45.3201 64.19L42.2502 57.09L40.7002 56.87L32.1301 55.63L29.9502 55.32L37.1802 52.72L40.7002 51.45L40.6101 50.7401L39.7402 44.2101L46.3501 47.42L49.3601 48.89L53.1501 48.0201L61.1301 46.19L57.9602 50.8L56.4502 52.9901L64.5601 58.54L56.4502 58.1801Z" stroke="white" strokeLinejoin="round" /><path d="M61.1304 46.19L57.9604 50.8L56.4504 52.9901V58.1801L52.0203 57.9901L49.3604 60.45V48.89L53.1504 48.0201L61.1304 46.19Z" stroke="white" strokeLinejoin="round" /><path d="M49.3601 48.89V60.45L45.3201 64.19L42.2502 57.09L40.7002 56.87V51.45L40.6101 50.7401L39.7402 44.2101L46.3501 47.42L49.3601 48.89Z" stroke="white" strokeLinejoin="round" /><path d="M40.7002 51.45V56.87L32.1301 55.63L29.9502 55.32L37.1802 52.72L40.7002 51.45Z" stroke="white" strokeLinejoin="round" /><path d="M64.5601 58.54L56.4502 58.1801V52.9901L64.5601 58.54Z" stroke="white" strokeLinejoin="round" /><path d="M96.5203 53.06V73.06L49.5303 100.19V80.29L49.8303 80.0201L53.2505 78.04L58.9905 74.73L79.2004 63.06L96.5203 53.06Z" stroke="white" strokeLinejoin="round" /><path d="M15.6204 37.36V45.16L5.0603 51.26L2.11035 49.56V29.56L15.6204 37.36Z" stroke="white" strokeLinejoin="round" /><path d="M22.3401 33.4901V41.29L15.6201 45.16V37.36L22.3401 33.4901Z" stroke="white" strokeLinejoin="round" /><path d="M49.1501 10.2V25.81L22.3401 41.29V33.4901L15.5801 29.58L49.1501 10.2Z" stroke="white" strokeLinejoin="round" /><path d="M82.9304 29.7101L76.2104 33.58V41.34L49.2305 25.76L49.1504 25.81V10.2L82.9304 29.7101Z" stroke="white" strokeLinejoin="round" /><path d="M82.9709 37.48V45.2401L76.2109 41.34V33.58L82.9709 37.48Z" stroke="white" strokeLinejoin="round" /><path d="M96.3906 29.73V49.73L93.5706 51.36L82.9707 45.2401V37.48L96.3906 29.73Z" stroke="white" strokeLinejoin="round" /></svg>,
    },
]

export default function ContentForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rewardInstructions, setRewardInstructions] = useState('');
    const [steps, setSteps] = useState([{ step: 1, title: '', content: '' }]);
    const [selectedRewardOption, setSelectedRewardOption] = useState(rewardOptions[0])

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
        <div className=" mx-auto text-black ">
            <form onSubmit={handleSubmit}>
                <div className="  flex w-full  ">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl"
                        placeholder="Name your flow!"
                        spellCheck={false}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#A479FF] w-[250px] h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300  "
                    >
                        Generate flow
                    </button>
                </div>
                <div className="mb-4">

                </div>
                <div className="mb-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-lg font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-xl"
                        placeholder='Give it a description'
                        required
                    />
                </div>

                <div className='flex gap-4 justify-left items-center'>
                    <h2 className="text-xl  ml-2">Questions</h2>
                    <button
                        type="button"
                        onClick={addStep}
                        className="bg-white text-[#A479FF] border border-[#A479FF] rounded-full flex py-2 px-3 items-center justify-center text-center hover:bg-black hover:text-white"
                    >
                        <PlusIcon className='h-4 w-4 font-bold' />
                        <p className='uppercase text-xs font-bold'>Add Question</p>
                    </button>
                </div>


                {steps.map((step, index) => (
                    <div key={index} className="mb-4">
                        <div className="mb-2">
                            <input
                                type="text"
                                value={step.title}
                                placeholder={`Step ${index + 1} title`}
                                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-lg font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-xl"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <textarea
                                value={step.content}
                                placeholder={`Step ${index + 1} content`}
                                onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                                className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-lg font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-xl"
                                required
                            />
                        </div>
                    </div>
                ))}



                {/* <p>{JSON.stringify(selectedRewardOption.description)}</p> */}

                <fieldset>
                    <RadioGroup
                        value={selectedRewardOption}
                        onChange={setSelectedRewardOption}
                        className="mt-6  grid grid-cols-1 gap-y-6 sm:grid-cols-7 sm:gap-x-4"
                    >
                        {rewardOptions.map((rewardOption) => (
                            <Radio
                                key={rewardOption.id}
                                value={rewardOption}
                                aria-label={rewardOption.title}
                                aria-description={`${rewardOption.description} to ${rewardOption.users}`}
                                className="group relative flex flex-col cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[focus]:border-[#A479FF] data-[focus]:ring-2 data-[focus]:ring-[#A479FF] group-data-[checked]:bg-[#A479FF]"
                            >
                                <div className="text-2xl text-black transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
                                    {rewardOption.graphic}
                                </div>
                                <span className="flex mt-4">
                                    <span className="flex flex-col">
                                        <span className="block text-sm font-medium text-gray-900">{rewardOption.title}</span>
                                    </span>
                                </span>

                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-[#A479FF]"
                                />
                            </Radio>
                        ))}
                    </RadioGroup>
                </fieldset>




            </form>
        </div>
    );
}
