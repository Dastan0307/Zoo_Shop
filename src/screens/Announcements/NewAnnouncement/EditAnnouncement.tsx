import { Button, Image, message, Popconfirm, Typography } from 'antd'
import { AxiosError, AxiosResponse } from 'axios'
import { Formik } from 'formik'
import { Form, Input, Select, SubmitButton } from 'formik-antd'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { errorHandler } from '@utils/errorHandler'
import { AnnouncementValidate } from '@utils/validate'

import api from '../../../api'
import { CategoriesType, CategoryType, PostAnnouncementTypes } from '../../../types/types'

import './newAnnouncement.scss'

import { motion } from 'framer-motion'
import { useGetAnnouncementQuery } from '@store/announcements/getAnnoun'
const { Title } = Typography

type PostAnnouncementTypess = {
  slug?: string | undefined
  user?: string | undefined
  photos?: any | undefined
  title?: string | undefined
  price?: string | undefined
  description: string | undefined
  phone_number: string | undefined
  location: string | undefined
  created_at?: string | undefined
  updated_at?: string | undefined
  views_count?: number | undefined
  category: string | undefined
}

export const EditAnnouncement = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [count, setCount] = useState<number>(0)
  const { announcement } = useParams()
  const [announ, setAnnoun ] = useState<PostAnnouncementTypes>()
  const [categories, setCategories] = useState<CategoryType[]> ([])
  const {data} = useGetAnnouncementQuery(announcement)
  const navigate = useNavigate()


  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await api.get<CategoriesType>(`/categories/`)
        setCategories(res.data.results)
      } catch (error: AxiosError | any) {
        errorHandler(error)
      }
    })()
  }, [announcement])
  useEffect(() => {
    (async () =>  {
      const token = localStorage.getItem('access_token')
      try {
        api.get<PostAnnouncementTypes>(
          `/announcements/${announcement}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ).then((data) => setAnnoun(data.data))
      } catch (error: AxiosError | any) {
        errorHandler(error)
      }
    })()
  }, [])


  const confirm = async () => {
    const token = localStorage.getItem('access_token')
    try {
      await api.delete(`announcements/${announ?.slug}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
    message.success(`Вы удалили объявление ${announ?.title}`)
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const cancel = () => {
    message.error('Отменено!');
  };

  

  const initialValues: PostAnnouncementTypess = {
    title: data?.title,
    price: data?.price,
    description: data?.description,
    location: data?.location,
    category: data?.category,
    phone_number: data?.phone_number,
  }

  const locations: string[] = [
    'Бишкек',
    'Ош',
    'Нарын',
    'Иссык-куль',
    'Баткен',
    'Талас',
    'Джалал-Абад',
  ]

  const photoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCount(e.target.files.length)
      setSelectedFiles(e.target.files)
    }
  }
  const submitForm = async (data: PostAnnouncementTypess) => {
    console.log(data)

    const token = localStorage.getItem('access_token')
    const photos: File[] = []
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles?.length; i++) {
        photos.push(selectedFiles[i])
      }
    }
    const formData = new FormData()
    if (typeof data.title === 'string') {
      formData.append('title', data?.title)
    }
    if (typeof data.description === 'string') {
      formData.append('description', data.description)
    }
    if (typeof data.location === 'string') {
      formData.append('location', data.location)
    }
    if (typeof data.category === 'string') {
      formData.append('category', data.category)
    }
    if (typeof data.price === 'string') {
      formData.append('price', data.price!)
    }
    if (typeof data.phone_number === 'string') {
      formData.append('phone_number', data.phone_number)
    }
    for (let i = 0; i < photos?.length; i++) {
      formData.append(`photos`, photos[i], photos[i].name)
    }
    console.log(data)

    data = { ...data, photos: selectedFiles }
    try {
      await api.patch(`announcements/${announcement}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      message.success(`Вы изменили объявление ${data.title}`)
      console.log(data)
      setTimeout(() => {
        navigate(`/`)
      }, 1500)
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="newannoun"
    >
      <Title level={2}>Редактировать</Title>
      <Formik
        initialValues={announ ? announ : initialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitForm(values)
          setSubmitting(false)
        }}
        validationSchema={AnnouncementValidate}
      >
        <Form>
          <Form.Item name="category" showValidateSuccess={true} hasFeedback={true}>
            <label>Категория</label>
            <Select name="category" defaultValue={announ?.category}>
              {categories &&
                categories.map((category) => {
                  return (
                    <Select.Option key={category.slug} value={category.slug}>
                      {category.title}
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
            <Input type="number" name="price" placeholder="Введите цену" />
            <label>Не указывайте цену если отдаете питомца даром</label>
          </Form.Item>
          <Form.Item name="phone_number" showValidateSuccess={true} hasFeedback={true}>
            <label htmlFor="phone_number" id="phone_number">
              Контакты
            </label>
            <Input type="tel" name="phone_number" placeholder="Номер" />
          </Form.Item>
          <Form.Item name="description" showValidateSuccess={true} hasFeedback={true}>
            <label htmlFor="description" id="description">
              Описание
            </label>
            <Input.TextArea
              className="description"
              name="description"
              placeholder="Расскажите о питомце"
            />
          </Form.Item>
          <div className="old-photos">
            {announ?.photos &&
              announ?.photos.map((photo) => {
                return (
                  <Image
                    className="image-corusel"
                    preview={false}
                    key={photo.id}
                    src={photo.image_url}
                  />
                )
              })}
          </div>
          <Form.Item name="photos" showValidateSuccess={true} hasFeedback={true}>
            <div className="display-files">
              <div className="files">
                <label>
                  <Input
                    className="input-file"
                    multiple
                    type="file"
                    name="photos"
                    placeholder="Описание"
                    onChange={photoChange}
                  />
                  <span className="text">Изменить Фотографии</span>
                </label>
              </div>
              {count > 0 && <p>{`Количество фотографий ${count}`}</p>}
            </div>
            <label className='ten-photo'>
              Вы можете загрузить до 10 фотографий в формате JPG или PNG.
              Максимальный размер фото — 25MB. После загрузки фотографий старые исчезнут, появятся новые!
            </label>
          </Form.Item>
          <Form.Item name="location" showValidateSuccess={true} hasFeedback={true}>
            <label>Местоположение</label>
            <Select
              defaultValue={announ?.location}
              name="location"
              placement="bottomRight"
            >
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
        <Button className="delete-btn">Удалить</Button>
      </Popconfirm>
    </motion.div>
  )
}
