import { Button, ButtonProps } from 'antd'
import { FC } from 'react'

export const PrimaryButton: FC<ButtonProps> = (props) => {
  return (
    <Button {...props} type="primary">
      {props.children}
    </Button>
  )
}

export const OutlineButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      type="primary"
      style={{ background: 'transparent', border: '3px solid #96e7b7',}}
    >
      {props.children}
    </Button>
  )
}
