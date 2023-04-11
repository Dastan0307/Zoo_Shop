import { Button, Checkbox, Radio } from 'antd'
import Typography from 'antd/es/typography/Typography'

import { OutlineButton, PrimaryButton } from '@components/index'

export const Main = () => {
  return (
    <div style={{ background: 'red', height: '100px' }}>
      <Checkbox />
      <PrimaryButton>Выбрать питомца</PrimaryButton>
      <OutlineButton>Выбрать питомца</OutlineButton>
    </div>
  )
}
