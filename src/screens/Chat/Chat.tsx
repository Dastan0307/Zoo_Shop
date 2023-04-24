import { Image, Input, Layout, List, Row, Space, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { motion } from 'framer-motion'
import moment from 'moment'
import React, { InputHTMLAttributes, useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useTypedSelector } from 'src/hooks'
import { WebsocketBuilder } from 'websocket-ts'

import { API_URL } from '@api/index'

import SendIcon from '../../../public/chat/send.svg'
import { ChatApi, getChatsProps } from '../../api/Chat'

import './chat.scss'

type Message = { date: string; id: string; name: string; text: string }

export const Chat = () => {
  const id = useTypedSelector((state) => state.auth.userInfo?.id)
  const [currentChat, setCurrentChat] = useState<getChatsProps>({})
  const [chats, setChats] = useState<getChatsProps[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)
  // new WebSocket(`ws://104.199.175.143/ws/chat`)
  const changeChat = (user: getChatsProps) => {
    console.log(user)
    setMessages([])
    setCurrentChat(user)
    if (ws) {
      ws.close()
    }
    setWs(new WebSocket(`ws://104.199.175.143/ws/chat/${user.id}_${user.announcement}/`))
  }

  if (ws) {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
          console.log(data)
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setMessages([...messages!, ...data.messages])
    }
    ws.onclose = (ev) => {
      setTimeout(() => {
        setWs(
          new WebSocket(
            `ws://104.199.175.143/ws/chat/${currentChat.id}_${currentChat.announcement}/`,
          ),
        )
      }, 1000)
    }
  }
  useEffect(() => {
    const getDataChats = async () => {
      const data = await ChatApi.getChats()
      console.log(data)
      if (data) {
        setChats(data?.data)
      }
      return
    }
    getDataChats()
  }, [ws])

  const userChat = 'true'
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)

    if (e.key == 'Enter') {
      if (ws) {
        console.log(ws)

        ws.send(
          JSON.stringify({
            message: e.currentTarget.value,
            author_id: id,
            // seller_id: '3',
          }),
        )
      }
    }
  }

  // [
  //   {
  //     id: 1,
  //     customer: 1,
  //     announcement: 'chat',
  //     announcement_image: null,
  //     user_photo: null,
  //     last_message: {
  //       content: 'asdlfj',
  //       author: 1,
  //       date: '2023-04-22:12:09',
  //       author_name: 'gandon',
  //     },
  //   },
  // ]

  return (
    <Layout className="chat">
      <button onClick={() => changeChat({ id: '1', announcement: 'chat' })}>
        chat
      </button>
      <Sider className="chat-sidebar">
        <ul className="chat-sidebar_user">
          {chats.map((user, index) => (
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={index}
              onClick={() => changeChat(user)}
              className="sidebar_user_item"
            >
              <Image
                className="sidebar_user_item_image"
                preview={false}
                height={40}
                width={40}
                src="/holand.png"
              />
              <div className="sidebar_user_item_info">
                <Typography.Title className="sidebar_user_item_info_name">
                  Владимир. Б {user.id}
                </Typography.Title>
                <Typography.Text className="sidebar_user_item_info_status">
                  {user.last_message ? user.last_message.content : ''}
                </Typography.Text>
              </div>
            </motion.li>
          ))}
        </ul>
      </Sider>
      <Content
        className="chat_contnent"
        style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Row justify="space-between" className="chat_header">
          <div className="sidebar_user_item">
            <Image
              className="sidebar_user_item_image"
              preview={false}
              height={46}
              width={46}
              src="/holand.png"
            />
            <div className="sidebar_user_item_info">
              <Typography.Title className="sidebar_user_item_info_name">
                Владимир. Б
              </Typography.Title>
              <Typography.Text className="sidebar_user_item_info_status">
                Последнее сообщение
              </Typography.Text>
            </div>
          </div>
          <div className="sidebar_user_item">
            <Image
              className="sidebar_user_item_image image-card"
              preview={false}
              height={45}
              width={45}
              src="/dog.png"
            />
            <div className="sidebar_user_item_info">
              <Typography.Text className="sidebar_user_item_info_status2">
                Хороший добрый пес
              </Typography.Text>
              <Typography.Title className="sidebar_user_item_info_name2">
                5000 ₸
              </Typography.Title>
            </div>
          </div>
        </Row>
        <ul className="chat_message">
          {userChat ? (
            messages &&
            messages.map((value, index) => <ChatMessage {...value} key={index} />)
          ) : (
            <div className="no-chat">Выберите чат</div>
          )}
        </ul>
        <Row className="chat_content_input">
          <Input
            // onChange={(e) => setValue(e.target.value)}
            // onClick={(e) => handleInput()}
            onKeyDown={handleInput}
            suffix={
              <Image style={{ cursor: 'pointer' }} src={SendIcon} preview={false} />
            }
          />
        </Row>
      </Content>
    </Layout>
  )
}
type chatMessage = {
  text: string
  name: string
  id: string
  date: string
}

const ChatMessage = (value: chatMessage) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="chat_message_item"
    >
      <Image
        className="chat_message_item_image"
        preview={false}
        height={40}
        width={40}
        src="/holand.png"
      />
      <div className="chat_message_item_info">
        <Typography.Title className="sidebar_user_item_info_name">
          {value.name}
        </Typography.Title>
        <Typography.Text className="chat_message_item_info_status">
          {value.text}
        </Typography.Text>
      </div>
      <div className="chat_message_item_info_status2">
        <span>
          <Image src="/chat/readed.svg" />
          <Image src="/chat/read.svg" />
        </span>
        <span>{moment(value.date).format('LT')}</span>
      </div>
    </motion.li>
  )
}
