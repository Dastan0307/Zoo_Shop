import { Button, Typography, message, Popconfirm, PopconfirmProps } from 'antd'
import { AxiosError, AxiosResponse } from 'axios'
import { Field, Formik } from 'formik'
import { Form, Input, Select, SubmitButton } from 'formik-antd'
import { useNavigate, useParams } from 'react-router-dom'
import { AnnouncementTypes } from '@typess/types'
import { errorHandler } from '@utils/errorHandler'
import { AnnouncementValidate } from '@utils/validate'
import api from '../../../api'
import './newAnnouncement.scss'
import { useGetAnnouncementQuery, useGetAnnouncementsQuery } from '@store/announcements/getAnnoun'
import { motion } from 'framer-motion'

const { Title } = Typography

export const EditAnnouncement = () => {
  const { announcement } = useParams()
  const {data, error, isLoading} = useGetAnnouncementQuery(announcement)
  const photo = data?.photos
  const categoryes = useGetAnnouncementsQuery('dogs')
  const navigate = useNavigate()

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);s
    
    // async () => {
    //   const token = localStorage.getItem('access_token')
    //   try {
    //     await api.delete(`announcements/${data?.slug}/`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     })
    //   } catch (error: AxiosError | any) {
    //     errorHandler(error)
    //   }
    // }
    message.success(`Вы удалили объявление ${data?.title}`);
    // setTimeout(() => {
    //   navigate('/')
    // }, 3000)
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Отменено!');
  };


  const initialValues: AnnouncementTypes = {
    title: data?.title,
    price: data?.price,
    description: data?.description,
    location: data?.location,
    category: data?.category,
    phone_number: data?.phone_number,
  }


  const categories: string[] = [
    'dogs',
    'koshki',
    'Птицы',
    'Рыбки',
    'Грызуны',
    'Рептилии и амфибии',
    'Насекомые',
    'Паукообразные',
    'Сельскохозяйственные животные',
  ]
  const locations: string[] = [
    'Бишкек',
    'Ош',
    'Нарын',
    'Иссык-куль',
    'Баткен',
    'Талас',
    'Джалал-Абад',
  ]

  const submitForm = async (data: AnnouncementTypes) => {
    console.log(data);
    const token = localStorage.getItem('access_token')
    try {
      await api.patch(`announcements/${announcement}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="newannoun">
      <Title level={2}>Новое объявление</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitForm(values)
          setSubmitting(false)
        }}
        validationSchema={AnnouncementValidate}
      >
        <Form>
          <Form.Item name="category" showValidateSuccess={true} hasFeedback={true}>
            <label>Категория</label>
            <Select name="category" defaultValue={data?.category}>
              {categories.map((category) => {
                return (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item name="title" showValidateSuccess={true} hasFeedback={true}>
            <label htmlFor="title" id="title">
              Название объявления
            </label>
            <Input name="title" placeholder="Введите название" />
          </Form.Item>
          <Form.Item name="price" showValidateSuccess={true} hasFeedback={true}>
            <label htmlFor="price" id="price">
              Цена
            </label>
            <Input type='number' name="price" placeholder="Введите цену" />
            <label>Не указывайте цену если отдаете питомца даром</label>
          </Form.Item>
          <Form.Item name="phone_number" showValidateSuccess={true} hasFeedback={true}>
            <label htmlFor="phone_number" id="phone_number">
              Контакты
            </label>
            <Input type='tel' name="phone_number" placeholder="Номер"/>
          </Form.Item>
          <Form.Item
            name="description"
            showValidateSuccess={true}
            hasFeedback={true}
          >
            <label htmlFor="description" id="description">
              Описание
            </label>
            <Input.TextArea
              className="description"
              name="description"
              placeholder="Расскажите о питомце"
            />
          </Form.Item>
          <Form.Item name="photo" showValidateSuccess={true} hasFeedback={true}>
            <label htmlFor="photo" id="photo">
              фотографии
            </label>
            <Input
              multiple
              type="file"
              name="photo"
              placeholder="Описание"
            />
            <label>
              Вы можете загрузить до 10 фотографий в формате JPG или PNG.
              Максимальный размер фото — 25MB.
            </label>
          </Form.Item>
          <Form.Item
            name="location"
            showValidateSuccess={true}
            hasFeedback={true}
          >
            <Select defaultValue={data?.location} name="location" placement="bottomRight">
              {locations.map((loc) => {
                return (
                  <Select.Option key={loc} value={loc}>
                    {loc}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <SubmitButton type="primary">Редактировать</SubmitButton>
        </Form>
      </Formik>
      <Popconfirm
        title="УДАЛЕНИЕ"
        description="Хотите удалить объявление?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Удалить"
        cancelText="Отменить"
      >
        <Button className='delete-btn'>Удалить</Button>
      </Popconfirm>
    </motion.div>
  )
}
