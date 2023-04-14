import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const errorHandler = (er: AxiosError) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = er.response?.data as any
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(er.response?.data, key)) {
      toast.error(`${key}: ${data[key]}`, {
        position: 'top-right',
      })
    }
  }
  return
}
