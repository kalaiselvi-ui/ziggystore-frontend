import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {FaFacebookF} from 'react-icons/fa'
import {BsInstagram, BsTwitter, BsYoutube} from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='footer'>
      <Container>
        <Row>
          <Col md={3} lg={3}>
            <h5 className='footer-title'>ONLINE SHOPPING</h5>
            <ul className='footer-list'>
              <li>Men</li>
              <li>Women</li>
              <li>Sports Wear</li>
              <li>Ethinic Wear</li>
              <li>Tops</li>
            </ul>
          </Col>
          <Col md={3} lg={3}>
            <h5 className='footer-title'>USEFUL LINKS</h5>
            <ul className='footer-list'>
              <li>Blogs</li>
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>Returns</li>
              <li>FAQ</li>
            </ul>
          </Col>
          <Col md={3} lg={3}>
            <h5 className='footer-title'>Contact Us</h5>
            <ul className='footer-list'>
              <li>Apt #1710 & 1711, </li>
                <li> Preatoni Tower JLT,</li>
              <li>Dubai, UAE.</li>
              <li>+971 5044 29331</li>
              <li>mkpaul@jothsnaeandc.com</li>
            </ul>
          </Col>
          <Col md={3} lg={3}>
            <h1 className='footer-title mb-3'>Connect With Us</h1>
            <Link to="#" className='social-icon'>
              <FaFacebookF className='social-link'/>
            </Link>
            <Link to="#" className='social-icon'>
              <BsInstagram className='social-link'/>
            </Link>
            <Link to="#" className='social-icon'>
              <BsTwitter className='social-link'/>
            </Link>
            <Link to="#" className='social-icon'>
              <BsYoutube className='social-link'/>
            </Link>
          </Col>
        </Row>
        <Row>
            <Col className="copy-right">
            <p>© 2022 Jothsana. All Rights Reserved</p>
            </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Footer