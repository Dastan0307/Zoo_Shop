import { AnnouncementTypes } from "@typess/types"
import { AnnouncementValidate } from "@utils/validate"
import { Form, Select, Typography, Input } from "antd"
import { Field, Formik } from "formik"
import api from '../../../api'
import { AxiosError } from "axios"
import { errorHandler } from "@utils/errorHandler"
import { useTypedSelector } from "src/hooks"
import './newAnnouncement.scss'
import { PrimaryButton } from "@components/index"

const { Title } = Typography

export const NewAnnouncement = () => {

  const initialValues: AnnouncementTypes = {
    title: '',
    price: '',
    description: '',
    location: '',
    category: ''
  }

  const changePhoto = (e: any) => {
    // for(let key in e) {
    //   console.log(key)
    // }
  }

  const tokens = useTypedSelector(state => state.auth.userInfo)
  
  console.log(tokens);
  
  const categories: string[] = ['Собаки','Кошки','Птицы','Рыбки','Грызуны','Рептилии и амфибии','Насекомые','Паукообразные','Сельскохозяйственные животные']
  const locations: string[] = ['Бишкек', 'Ош', 'Нарын', 'Иссык-куль', 'Баткен', 'Талас', 'Джалал-Абад']
  
  const submitForm = async (data: AnnouncementTypes) => {
    const token = useTypedSelector(state => state.auth.userToken)
    try {
      await api.post('announcements/', data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
    
  }


  return(
    <div className="newannoun">
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
          <Form.Item name='category'>
            <label>Категория</label>
            <Select
              placement="bottomLeft"
              defaultValue='Собаки'
            >
              {
                categories.map(category => {
                  return (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  );
                })
              }
            </Select>
            {/* <Field 
              name='category'
            /> */}
          </Form.Item>
          <Form.Item
            name="title"
          >
            <label htmlFor="title" id="title">Название объявления</label>
            <Input
              name="title"
              placeholder="Введите название"
            />
          </Form.Item>
          <Form.Item
            name="price"
          >
            <label htmlFor="price" id="price">Цена</label>
            <Input
              name="price"
              placeholder="Введите цену"
            />
            <label>Не указывайте цену если отдаете питомца даром</label>
          </Form.Item>
          <Form.Item
            name="phone"
          >
            <label htmlFor="phone" id="phone">Контакты</label>
            <Input
              name="phone"
              placeholder="Номер телефона"
            />
          </Form.Item>
          <Form.Item
            name="description"
          >
            <label htmlFor="description" id="description">Описание</label>
            <Input.TextArea
              className="description"
              name="description"
              placeholder="Расскажите о питомце"
            />
          </Form.Item>
          <Form.Item
            name="photo"
          >
            <label htmlFor="photo" id="photo">фотографии</label>
            <Input
              multiple
              type="file"
              name="photo"
              placeholder="Описание"
              onChange={(e) => changePhoto(e.target.files)}
            />
            <label>Вы можете загрузить до 10 фотографий в формате JPG или PNG.
              Максимальный размер фото — 25MB.</label>
          </Form.Item>
          <Select
          placement="bottomRight"
          >
            {
              locations.map(loc => {
                return (
                  <Select.Option key={loc} value={loc}>
                    {loc}
                  </Select.Option>
                );
              })
            }
          </Select>
          <PrimaryButton>Опубликовать объявление</PrimaryButton>
        </Form>
      </Formik>
    </div>
  )
}