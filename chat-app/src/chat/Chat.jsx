import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
  MDBInputGroup,
  MDBCardFooter,
} from "mdb-react-ui-kit";

import "./chat.css";
import { getUsersApi, login } from "../services/ApiServices";
import { useEffect, useState } from "react";

export default function Chat() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const resp = await getUsersApi();
      if (resp?.data?.status === 200) {
        console.log('resp?.data?.data', resp?.data?.data)

        setUsers(resp?.data?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-white">
            Messages
          </h5>

          <MDBCard className="mask-custom ">
            <MDBCardBody className="scrollable-div chat-list ">
              <MDBTypography listUnStyled className="mb-0 ">
                {users && users?.length > 0
                  ? users?.map((data) => {
                      return (
                        <li
                          className="p-2 border-bottom"
                          style={{
                            borderBottom:
                              "1px solid rgba(255,255,255,.3) !important",
                          }}
                        >
                          <a
                            href="#!"
                            className="d-flex justify-content-between link-light"
                          >
                            <div className="d-flex flex-row">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                width="60"
                              />
                              <div className="pt-1">
                                <p className="fw-bold mb-0">
                                  {`${data?.firstName ?? "John"} ${
                                    data?.lastName ?? "Smith"
                                  }`}{" "}
                                </p>
                                <p className="small text-white">
                                  Hello, Are you there?
                                </p>
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="small mb-1 text-white">Just now</p>
                              <span className="badge bg-danger float-end">
                                1
                              </span>
                            </div>
                          </a>
                        </li>
                      );
                    })
                  : "data not found"}

                {/* <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Danny Smith</p>
                        <p className="small text-white">
                          Lorem ipsum dolor sit.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-whites mb-1">5 mins ago</p>
                    </div>
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Alex Steward</p>
                        <p className="small text-white">
                          Lorem ipsum dolor sit.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-white mb-1">Yesterday</p>
                    </div>
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Ashley Olsen</p>
                        <p className="small text-white">
                          Lorem ipsum dolor sit.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-white mb-1">Yesterday</p>
                    </div>
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Kate Moss</p>
                        <p className="small text-white">
                          Lorem ipsum dolor sit.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-white mb-1">Yesterday</p>
                    </div>
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Lara Croft</p>
                        <p className="small text-white">
                          Lorem ipsum dolor sit.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-white mb-1">Yesterday</p>
                    </div>
                  </a>
                </li>
                <li className="p-2">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Brad Pitt</p>
                        <p className="small text-white">
                          Lorem ipsum dolor sit.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-white mb-1">5 mins ago</p>
                      <span className="text-white float-end">
                        <MDBIcon fas icon="check" />
                      </span>
                    </div>
                  </a>
                </li> */}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled className="text-white">
            <div className="scrollable-div  chat-detail">
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <MDBCard className="w-100 mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Lara Croft</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 13 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium.
                    </p>
                  </MDBCardBody>
                </MDBCard>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="60"
                />
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
            </div>

            <MDBCardFooter className="text-muted d-flex justify-content-center align-items-center p-3">
              {/* <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                alt="avatar 3"
                style={{ width: "45px", height: "100%" }}
              /> */}
              <li className="mb-3">
                <MDBTextArea label="Message" id="textAreaExample" rows={4} />
              </li>

              <a className="ms-1 text-muted" href="#!">
                <MDBIcon fas icon="paperclip" />
              </a>
              {/* <a className="ms-3 text-muted" href="#!">
                <MDBIcon fas icon="smile" />
              </a> */}
              <a className="ms-3" href="#!">
                <MDBIcon fas icon="paper-plane" />
              </a>
            </MDBCardFooter>

            {/* <li className="mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4} />
            </li>
            <MDBBtn color="light" size="lg" rounded className="float-end">
              Send
            </MDBBtn> */}
          </MDBTypography>
          {/* </MDBScrollbar> */}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
