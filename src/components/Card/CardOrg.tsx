import { Card, Col, Image, Row, Typography } from 'antd'
import Devider from 'antd/es/divider'

import { OrganizarionType } from '@typess/types'

import './card-org.scss'

export const CardOrg = ({
  adress,
  image,
  title,
  location,
  phone_number,
  adress_type,
  user,
}: OrganizarionType) => {

  return (
    <Card style={{border: 'none'}} >
      <div className="card-org">
      <div>
        <Image src={image} className="card-org_image" />
      </div>
      <div className="card-org_content">
        <Typography.Title level={5} className="card-org_title">
          {title}
        </Typography.Title>
        <Devider className="card-org-hr" style={{margin : '0 !important'}} />
        <div className="card-org_content_location">
          <div>
            <Image src={image} className="card-org_content_location_image" />
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}} >
            <Typography.Title className="card-org_content_location_title" level={5}>
              {title}
            </Typography.Title>
            <Typography.Text  style={{margin: 0, padding: 0}} className="card-org_content_location_address">
             <img src='/local.png' /> {location}
            </Typography.Text  >
            <Typography.Paragraph  style={{margin: 0, padding: 0}} className="card-org_content_location_address">
            <img src='/phone.png' /> {adress}
            </Typography.Paragraph>
          </div>
        </div>
      </div>
    </div>
    </Card>
  )
}
