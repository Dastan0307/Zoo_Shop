import { Button, Image, message, Popconfirm, Typography } from 'antd'
import { AxiosError } from 'axios'
import { Formik } from 'formik'
import { Form, Input, Select, SubmitButton } from 'formik-antd'
import { motion } from 'framer-motion'
import {  useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetAnnouncementQuery } from '@store/announcements/getAnnoun'
import { errorHandler } from '@utils/errorHandler'
import { AnnouncementValidate } from '@utils/validate'

import api from '../../../api'
import { CategoriesType, CategoryType, PostAnnouncementTypes } from '../../../types/types'

import './newAnnouncement.scss'

const { Title } = Typography

type PostAnnouncementTypess = {
  slug?: string
  user?: string
  photos?: any
  title: string
  price: string
  description: string
  phone_number: string
  location: string
  created_at?: string
  updated_at?: string
  views_count?: number
  category: string
}

export const EditAnnouncement = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [count, setCount] = useState<number>(0)
  const { announcement } = useParams()
  const [announ, setAnnoun] = useState<PostAnnouncementTypes | null>(null)
  const [categories, setCategories] = useState<CategoryType[]>([])
  // const res = useGetAnnouncementQuery(announcement)
  // const data = res.data!
  const [loader, setLoader] = useState<boolean>(true)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    ;(async () => {
      setLoader(true)
      const token = localStorage.getItem('access_token')
      try {
        const res = await api.get<CategoriesType>(`/categories/`)
        const data = await api.get<PostAnnouncementTypes>(
          `/announcements/${announcement}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setAnnoun(data.data)
        setCategories(res.data.results)
        setLoader(false)
      } catch (error: AxiosError | any) {
        errorHandler(error)
        setLoader(false)
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
    message.error('Отменено!')
  }

  const initialValues: PostAnnouncementTypess = {
    title: announ ? announ.title : '',
    price: announ ? announ.price : '',
    description: announ ? announ.description : '',
    location: announ ? announ.location : '',
    category: announ ? announ.category : '',
    phone_number: announ ? announ.phone_number : '',
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

  const photoChange = (e: FileList) => {
    if (e) {
      setCount(e.length)
      setSelectedFiles(e)
    }
  }
  const submitForm = async (data: PostAnnouncementTypess) => {
    const token = localStorage.getItem('access_token')
    const formData = new FormData()
    formData.append('title', data?.title)
    formData.append('description', data.description)
    formData.append('location', data.location)
    formData.append('category', data.category)
    formData.append('price', data.price)
    formData.append('phone_number', data.phone_number)
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`photos`, selectedFiles[i] as File, selectedFiles[i].name)
      }
    }
    data = { ...data, photos: selectedFiles }
    try {
      await api.patch(`announcements/${announcement}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      message.success(`Вы изменили объявление ${data.title}`)
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
      {!loader && (
        <Formik
          initialValues={initialValues ? initialValues : ({} as PostAnnouncementTypess)}
          onSubmit={submitForm}
          validationSchema={AnnouncementValidate}
        >
          <Form>
            <Form.Item name="category" showValidateSuccess={true} hasFeedback={true}>
              <label>Категория</label>
              <Select name="category" style={{margin: 0}} defaultValue={announ?.category}>
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
                      onChange={(e) => {
                        if (e.target.files) {
                          photoChange(e.target.files)
                        }
                      }}
                    />
                    <span className="text">Изменить Фотографии</span>
                  </label>
                </div>
                {count > 0 && <p>{`Количество фотографий ${count}`}</p>}
              </div>
              <label className="ten-photo">
                Вы можете загрузить до 10 фотографий в формате JPG или PNG. Максимальный
                размер фото — 25MB. После загрузки фотографий старые исчезнут, появятся
                новые!
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
      )}
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
