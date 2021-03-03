import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import {Row, Col} from 'reactstrap'


function RightMenu(props) {
    const user = useSelector(state => state.user)
    const logoutHandler = () => {
        axios.get(`${process.env.REACT_APP_SERVER_ROUTES}/logout`).then(response => {
          if (response.status === 200) {
            props.history.push("/login");
          } else {
            alert('Log Out Failed')
          }
        });
      };
      if (user.userData && !user.userData.isAuth) {
        return (
          <div className="text-center p-1 h6 font-weight-light mt-3">
            <Row >
                <Col>
                    <Link to="/login" className="btn btn-primary text-white text-decoration-none ">
                      SignIn
                    </Link>
                </Col>
                <Col>
                    <Link to="/register" className="btn btn-primary text-white text-decoration-none">
                      SignUp
                    </Link>
                </Col>
            </Row>
          </div>
        )
      } else{
        return (
          <Row className="text-center p-1 h6 font-weight-light mt-3">
              <Col>
              <Link to="/post" className="btn btn-success text-white text-decoration-none">
                Post
              </Link>
            </Col>
            <Col>
              <Link onClick={logoutHandler} className="btn btn-primary text-white text-decoration-none">
                Logout
              </Link>
            </Col>
          </Row>
        )
      }
}


export default withRouter(RightMenu)
