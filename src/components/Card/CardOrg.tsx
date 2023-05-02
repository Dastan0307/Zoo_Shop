import { Card, Col, Image, Row, Typography } from 'antd'
import Devider from 'antd/es/divider'

import { OrganizarionType } from '@typess/types'

import './card-org.scss'

export const CardOrg = ({
  adress,
  image,
  title,
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
        <Devider className="card-org-hr" />
        <div className="card-org_content_location">
          <div>
            <Image src={image} className="card-org_content_location_image" />
          </div>
          <div>
            <Typography.Title className="card-org_content_location_title" level={5}>
              {title}
            </Typography.Title>
            <Typography.Text className="card-org_content_location_address">
              {adress}
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
    </Card>
  )
}
