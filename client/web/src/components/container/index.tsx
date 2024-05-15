import clsx from 'clsx'

import { containerRootCss } from './index.css'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<ContainerProps>) => {
  return (
    <div
      className={clsx(containerRootCss, className)}
      {...props}
    >
      {children}
    </div>
  )
}