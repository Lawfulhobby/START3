import { clsx } from 'clsx'
import { Subheading } from './text'

export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <>
      <Subheading as="h3" dark={true}>
        Built on popular chains
      </Subheading>
      <div
        className={clsx(
          className,
          'flex mt-3 justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
        )}
      >
        <img
          alt="Base"
          src="/logo-cloud/base.svg"
          className="h-9 max-sm:mx-auto sm:h-8 lg:h-8"
        />
        <img
          alt="Celo"
          src="/logo-cloud/celo.svg"
          className="h-9 max-sm:mx-auto sm:h-8 lg:h-8"
        />
        <img
          alt="Arbitrum"
          src="/logo-cloud/arbitrum.svg"
          className="h-9 max-sm:mx-auto sm:h-8 lg:h-8"
        />
        <img
          alt="Transistor"
          src="/logo-cloud/polygon.svg"
          className="h-9 max-sm:mx-auto sm:h-8 lg:h-8"
        />
        <img
          alt="Statamic"
          src="/logo-cloud/avalanche.svg"
          className="h-9 max-sm:mx-auto sm:h-8 lg:h-8"
        />
      </div>
    </>

  )
}
