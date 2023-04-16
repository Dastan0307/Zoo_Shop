import React from 'react'
import { Space, Typography,Form, Input, Select, Upload, Layout, Row} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import './newAnnouncement.scss'

const {Text, Title, Paragraph} = Typography

function NewAnnouncement() {

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout className='new-announcement'>
        <Title level={3}>Новое объявление</Title>
        <label>Категория</label>
          <Select
            placeholder="Tags Mode"
            defaultValue={'Собаки'}
            // onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
          <Form>
            <Form.Item>
              <label htmlFor="">Название объявления</label>
              <Input name='name' placeholder='Введите название'/>
            </Form.Item>
            <Form.Item>
              <label htmlFor="">Цена</label>
              <Input name='price' placeholder='Введите цену'/>
              <label>Не указывайте цену если отдаете питомца даром</label>
            </Form.Item>
            <Form.Item>
              <label htmlFor="">Контакты</label>
              <Input name='price' placeholder='Номер телефона'/>
            </Form.Item>
            <Form.Item>
              <label htmlFor="">Описание</label>
              <TextArea name='price' placeholder='Расскажите о питомце'/>
            </Form.Item>
          </Form>
          <label>Фотографии</label>
          <Row className='uploads'>
            <Upload className='upload'>Добавьте фото</Upload>
            <Upload className='upload'>Добавьте фото</Upload>
            <Upload className='upload'>Добавьте фото</Upload>
            <Upload className='upload'>Добавьте фото</Upload>
          </Row>
          <label>Вы можете загрузить до 10 фотографий в формате JPG или PNG.
            Максимальный размер фото — 25MB.
          </label>
          <label>Местоположение</label>
          <Select
            placeholder="Tags Mode"
            defaultValue={'Собаки'}
            // onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
      </Layout>
    </Space>
  )
}

export default NewAnnouncement
