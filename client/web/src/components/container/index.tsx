import clsx from 'clsx'

import { containerRootCss } from './index.css'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = ({
  children,
  ...props
}: React.PropsWithChildren<ContainerProps>) => {
  return (
    <div
      className={clsx(containerRootCss, props.className)}
      {...props}
    >
      {children}
    </div>
  )
}