
import './HeaderV2.css';

import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const HeaderV2 = ({ does_nav = false, nav_name, nav_link, title, elements }) => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(nav_link);
  }

  return (
    <div className="headerv2">

      {/* This is the left floating nav-button */}
      {does_nav &&
        <div className="headerv2-nav" onClick={() => { handleBack() }}>
          <FiChevronLeft /> {nav_name}
        </div>
      }

      {/* This is the title display, it spans the full
          width of the page in the background */}
      <div className="headerv2-title">
        {title}
      </div>

      {/* This is a list of custom DOM elements to
          display side-by-side in the top right. This
          will be used for things like settings buttons
          and custom navigations/actions, that sort of
          thing. The dom elements need to be created 
          already as we will be calling them directly. */}
      <div>
        {elements}
      </div>
    </div>

  )
}

export default HeaderV2;

/*
<Row className="headerv2">
      <Col className="col-2">
        {does_nav &&
          <div id="header_nav" onClick={() => { handleBack() }}>
            <FiChevronLeft /> { nav_name }
          </div>
        }

      </Col>
      <Col className="col-10 headerv2-title">
        { title }
      </Col>
    </Row>*/