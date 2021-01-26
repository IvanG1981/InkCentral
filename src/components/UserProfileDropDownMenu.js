import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { getLoggedArtist } from '../store/artistReducer';
import { getLoggedClient } from '../store/clientReducer';

export function UserProfileDropDownMenu({ user, handleLogOut }) {
  const dispatch = useDispatch();

  function handleClick() {
    if (user === "artist") {
      dispatch(getLoggedArtist())
    }
    else {
      dispatch(getLoggedClient());
    }
  }

  return (
    <DropdownButton
      menuAlign="right"
      title={<i className="fas fa-2x fa-user-astronaut"></i>}
      id="dropdown-menu-align-right"
      variant="dark"
    >
      {
        user === "client" &&
          <Dropdown.Item eventKey="1" >
            <LinkContainer to={`/${user}-form`} style={{ color: "black" }}>
              <Nav.Link>
                <i className="fas fa-user-edit"></i>   Edit Profile
              </Nav.Link>
            </LinkContainer>
          </Dropdown.Item>
      }
      <Dropdown.Item eventKey="2">
        <LinkContainer to="/transactions" style={{ color: "black" }}>
          <Nav.Link onClick={handleClick}>
            <i className="fas fa-columns"></i>   Transactions
          </Nav.Link>
        </LinkContainer>
      </Dropdown.Item>
      { 
        user === "artist" && 
          <Dropdown.Item eventKey="3">
            <LinkContainer to="/customize-profile" style={{ color: "black" }}>
              <Nav.Link>
                <i className="fas fa-magic"></i>  Customize Profile
              </Nav.Link>
            </LinkContainer> 
          </Dropdown.Item> 
      } 
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4">
        <LinkContainer to="/login" onClick={handleLogOut} style={{ color: "black" }}>
          <Nav.Link>
            <i className="fas fa-sign-out-alt"></i>   Log Out
          </Nav.Link>
        </LinkContainer>
      </Dropdown.Item>

    </DropdownButton>
  )
}