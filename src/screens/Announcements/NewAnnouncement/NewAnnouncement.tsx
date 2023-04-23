import { Typography } from 'antd'
import { AxiosError } from 'axios'
import { Formik } from 'formik'
import { useState } from 'react'
import { Form, Input, Select, SubmitButton } from 'formik-antd'
import { errorHandler } from '@utils/errorHandler'
import { AnnouncementValidate } from '@utils/validate'
import api from '../../../api'
import './newAnnouncement.scss'

const { Title } = Typography
type PostAnnouncementTypes = {
  slug?: string
  user?: string
  photos?: File[]
  title: string
  price?: string
  description: string
  phone_number: string
  location: string
  created_at?: string
  updated_at?: string
  views_count?: number
  category: string
}

export const NewAnnouncement = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const initialValues: PostAnnouncementTypes = {
    title: '',
    price: '',
    description: '',
    location: '',
    category: '',
    photos: [],
    phone_number: '',
  }

  const categories: string[] = [
    'dogs',
    'cats',
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
  const photos: File[] = []
  const photoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
    if(!selectedFiles){
      return
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      photos.push(selectedFiles[i])
    }
  }

  console.log(photos);
  

  const submitForm = async (data: PostAnnouncementTypes) => {
    const token = localStorage.getItem('access_token')
    try {
      await api.post('announcements/', data, {
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
    <div className="newannoun">
      <Title level={2}>Новое объявление</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log('click')

          submitForm(values)
          setSubmitting(false)
        }}
        validationSchema={AnnouncementValidate}
      >
        <Form>
          <Form.Item name="category" showValidateSuccess={true} hasFeedback={true}>
            <label>Категория</label>
            <Select name="category" defaultValue="Собаки">
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
            <Input type='tel' name="phone_number" placeholder="Номер телефона"/>
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
          <Form.Item name="photos" showValidateSuccess={true} hasFeedback={true}>
            <label htmlFor="photos" id="photos">
              фотографии
            </label>
            <Input
              multiple
              type="file"
              name="photos"
              placeholder="Описание"
              onChange={photoChange}
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
            <Select name="location" placement="bottomRight">
              {locations.map((loc) => {
                return (
                  <Select.Option key={loc} value={loc}>
                    {loc}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <SubmitButton type="primary">Опубликовать объявление</SubmitButton>
          <Form.Item name='dawd'>
          </Form.Item>
        </Form>
      </Formik>
    </div>
  )
}




// import { Typography } from 'antd'
// import { AxiosError } from 'axios'
// import { useState } from 'react'
// import { Formik } from 'formik'
// import { Form, Input, Select, SubmitButton } from 'formik-antd'
// import { errorHandler } from '@utils/errorHandler'
// import { AnnouncementValidate } from '@utils/validate'
// import api from '../../../api'
// import './newAnnouncement.scss'

// const { Title } = Typography
// type PostAnnouncementTypes = {
//   slug?: string
//   user?: string
//   photos?: File[]
//   title: string
//   price?: string
//   description: string
//   phone_number: string
//   location: string
//   created_at?: string
//   updated_at?: string
//   views_count?: number
//   category: string
// }

// export const NewAnnouncement = () => {
//   const initialValues: PostAnnouncementTypes = {
//     title: '',
//     price: '',
//     description: '',
//     location: '',
//     category: '',
//     photos: [],
//     phone_number: '',
//   }

//   const categories: string[] = [
//     'dogs',
//     'cats',
//     'Птицы',
//     'Рыбки',
//     'Грызуны',
//     'Рептилии и амфибии',
//     'Насекомые',
//     'Паукообразные',
//     'Сельскохозяйственные животные',
//   ]
//   const locations: string[] = [
//     'Бишкек',
//     'Ош',
//     'Нарын',
//     'Иссык-куль',
//     'Баткен',
//     'Талас',
//     'Джалал-Абад',
//   ]

//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  
//   const [value, setValue] = useState({
//     title: '',
//     price: '',
//     phone_number: '',
//     description: '',
//     category: '',
//     location: ''
//   })

  

//   const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
//     setValue({
//       ...value, [e.target.name]: e.target.value
//     })
//   }

//   const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSelectedFiles(event.target.files);
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!selectedFiles) {
//       return;
//     }

//     const photos: File[] = []
//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       photos.push(selectedFiles[i])
//     }

//     for (let i = 0; i < photos.length; i++) {
//       formData.append('photos', photos[i]);
//     }
//     formData.append('category', value.category);
//     formData.append('title', value.title);
//     formData.append('price', value.price);
//     formData.append('phone_number', value.phone_number);
//     formData.append('description', value.description);
//     formData.append('location', value.location);

//     // Отправить formData на сервер с помощью axios или другой библиотеки
//     try {
//       const token = localStorage.getItem('access_token')
//       await api.post('announcements/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     } catch (error: AxiosError | any) {
//       errorHandler(error)
//     }
//   };


//   return (
//     <div className="newannoun">
//       <Title level={2}>Новое объявление</Title>
      
//         <form onSubmit={handleSubmit} onChange={handleChange}>
//           <input type="text" name="category" placeholder="Заголовок" />
//           <input type="text" name="title" placeholder="Заголовок" />
//           <input type="text" name="price" placeholder="price" />
//           <input type="text" name="phone_number" placeholder="price" />
//           <textarea name="description" placeholder="Описание"></textarea>
//           <input type="file" multiple onChange={handleFileInputChange} />
//           <input type="text" name="location" placeholder="Заголовок" />
//           <button type="submit">Отправить</button>
//         </form>
//     </div>
//   )
// }
