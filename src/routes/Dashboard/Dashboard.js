import React from 'react'
import { Link } from 'react-router-dom'

import Button from 'components/Button'

const Dashboard = () => (
  <Link to='/home'>
    <Button>DASHBOARD BUTTON</Button>
  </Link>
)

export default Dashboard
