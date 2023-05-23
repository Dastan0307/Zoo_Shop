import { Card, Col, Image, Row, Typography } from 'antd'
import Devider from 'antd/es/divider'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { OrganizarionType } from '@typess/types'

import './card-org.scss'

export const CardOrg = (values: OrganizarionType) => {
  const { adress, image, title, location, phone_number, adress_type, user } = values
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/org/${values.id}`, {
      state: { ...values },
    })
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card style={{ border: 'none' }}>
        <div className="card-org">
          <div>
            <Image src={image} className="card-org_image" />
          </div>
          <div className="card-org_content">
            <Row justify={'space-between'}>
              <Typography.Title
                style={{ cursor: 'pointer' }}
                level={5}
                onClick={() => handleClick()}
                className="card-org_title"
              >
                {title}
              </Typography.Title>
              <a
                href={`tel:${phone_number}`}
                style={{ color: '#333333', fontSize: 12, textDecoration: 'none' }}
              >
                {phone_number}
              </a>
            </Row>

            <Devider className="card-org-hr" style={{ margin: '0 !important' }} />
            <div className="card-org_content_location">
              <div>
                <Image src={image} className="card-org_content_location_image" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Title className="card-org_content_location_title" level={5}>
                  {title}
                </Typography.Title>
                <Typography.Text
                  style={{ margin: 0, padding: 0 }}
                  className="card-org_content_location_address"
                >
                  <img src="/local.png" /> {location}
                </Typography.Text>
                <Typography.Paragraph
                  style={{ margin: 0, padding: 0 }}
                  className="card-org_content_location_address"
                >
                  <a
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    href={adress}
                    rel="noreferrer"
                  >
                    {adress}
                  </a>
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
