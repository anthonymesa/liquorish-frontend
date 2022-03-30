/**
 * HeaderV2.js
 * 
 * Author: Anthony Mesa
 * 
 * HeaderV2 is the header module that is used across the application. There are
 * some functionalitys baked in it to make it useable across the site:
 * 
 * - does_nav: Setting this to false removes the 'back' navigation.
 * - nav_name: The text to be rendered for the back button. Not rendered if does_nav
 *    is false.
 * - nav_link: The link to navigate to. This doesn't work if does_nav is false.
 * - title: A text title to be displayed in the center of the header.
 * - elements: An array of JSX elements provided by the caller to be displayed
 *    in the far right section of the header.
 */

import './HeaderV2.css';

import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const HeaderV2 = ({ does_nav = false, nav_name, nav_link, title, elements = [], unstore = []}) => {

  const navigate = useNavigate();

  const [element_row, setElementRow] = React.useState(null)

  const handleBack = () => {
    unstore.forEach((element) => {
      sessionStorage.removeItem(element);
    });
    navigate(nav_link, { replace: true });
  }

  useEffect(async () => {
    const bootstrapped_element_cols = await elements.map((element) =>
      <Col className="headerv2-elements-col">
        {element}
      </Col>
    );

    const bootstrapped_element_row = (
      <Row className="g-0 headerv2-elements-row">
        {bootstrapped_element_cols}
      </Row>
    )

    setElementRow(bootstrapped_element_row)
  }, []);

  return (
    <div className="headerv2">

      {/* This is the left floating nav-button */}
      {does_nav &&
        <div className="headerv2-nav" onClick={() => { handleBack() }}>
          <FiChevronLeft /> {/* {nav_name} */}
        </div>
      }

      {/* This is the title display, it spans the full
          width of the page in the background */}
      <div className="headerv2-title">
        <h2>{title}</h2>
      </div>

      {/* This is a list of custom DOM elements to
          display side-by-side in the top right. This
          will be used for things like settings buttons
          and custom navigations/actions, that sort of
          thing. The dom elements need to be created 
          already as we will be calling them directly. */}
      <div className="headerv2-elements">
        {element_row}
      </div>
    </div>

  )
}

export default HeaderV2;