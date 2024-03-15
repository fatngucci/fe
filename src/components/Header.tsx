import { Container, Nav, NavItem, Navbar } from "react-bootstrap";
// import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import { useAdminIDContext } from "./AdminIDContext";
import { logout } from "../backend/api";

export default function Header() {

  const { adminID, setAdminID } = useAdminIDContext();
  const navigate = useNavigate();

  function logoutNav() {
    logout();
    setAdminID(undefined);
    navigate('/');
  }

  if (adminID) {
    return (
      <Container fluid className="p-0 sticky-top bg-white">
        {/* <Container> */}
        <Navbar className="px-5 py-3">
          {/* <Container> */}
          <Navbar.Brand className='p-0' onClick={() => navigate('/')} style={{ cursor: "pointer" }} >
            <Image src={require('./../assets/imgs/logoImaginum_neu_black.png')} style={{ height: '100%', width: '175px' }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link id='dashboard-btn' data-testid='dashboard-btn' className="mx-5 fw-header fs-5 header-hover" style={{ color: "black" }} onClick={() => navigate('/dashboard')}> Dashboard </Nav.Link>
            <NavItem className="mx-5 fw-header fs-5">
              <Nav.Link className="header-hover" style={{ color: "black" }} onClick={() => logoutNav()}> Logout </Nav.Link>
            </NavItem>
          </Nav>
          {/* </Container> */}
        </Navbar>
        {/* </Container> */}
      </Container>
    )
  } else {
    return (
      <Container fluid className="p-0 sticky-top bg-white">
        {/* //   <Container> */}
        <Navbar className="px-5 py-3">
          {/* <Container> */}
          <Navbar.Brand className=' p-0' onClick={() => navigate('/')} style={{ cursor: "pointer" }}>
            <Image src={require('./../assets/imgs/logoImaginum_neu_black.png')} style={{ height: '100%', width: '175px' }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link id='home-btn' data-testid='home-btn' className="mx-5 fw-header fs-5 header-hover" style={{ color: "black" }} onClick={() => navigate('/')}> Home </Nav.Link>
            <Nav.Link id='galerien-btn' data-testid='galerien-btn' className="mx-5 fw-header fs-5 header-hover" style={{ color: "black" }} onClick={() => navigate('/galerien')}> Galerien </Nav.Link>
            <Nav.Link id='kunstwerke-btn' data-testid='kunstwerke-btn' className="mx-5 fw-header fs-5 header-hover" style={{ color: "black" }} onClick={() => navigate('/kunstwerke')}> Kunstwerke </Nav.Link>
            <Nav.Link id='news-btn' data-testid='news-btn' className="ms-5 fw-header fs-5 header-hover" style={{ color: "black" }} onClick={() => navigate('/news')}> News </Nav.Link>
            {/* <Nav.Link id='person-btn' data-testid='person-btn' ><Icon.Person /></Nav.Link>
                    <Nav.Link id='heart-btn' data-testid='heart-btn'><Icon.Heart /></Nav.Link>
                    <Nav.Link id='cart-btn' data-testid='cart-btn'><Icon.Cart /></Nav.Link> */}
          </Nav>
          {/* </Container> */}
        </Navbar>
        {/* //   </Container> */}
        {/* <Container fluid className="px-5">
          <div className="hr m-0"></div>
        </Container> */}
      </Container>
    )
  }
}