type Props = {
  symbol: string;
  displaySize: number;
  importSize?: 24 | 40;
  className?: string;
};

function TokenIcon({ symbol, displaySize }: Props) {

  return (
    <div className="flex items-center">
      {/* <img
        src={`/tokens/ic_${symbol}.svg`}
        alt={symbol}
        className="h-8"
        width={displaySize}
      /> */}
      <p
      className="uppercase focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-2xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-5xl"
        // className="ml-2 uppercase text-pretty text-sm font-medium tracking-tighter"
      >{symbol}</p>
    </div>

  );
}

export default TokenIcon;
