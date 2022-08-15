import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  Heading,
  NetworkContainer,
} from "./style/FooterStyles";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Footer = ({ footerRef }) => {
  const location = useLocation();
  const pathLocation = location.pathname;
  const mobile = useMediaQuery("(max-width:968px)");

  return pathLocation !== "/Search/Animes" ? (
    <Box ref={footerRef && footerRef}>
      <Container>
        <NetworkContainer
          style={{ alignItems: mobile ? "center" : "flex-end" }}
        >
          <Row>
            <Column>
              <Heading>
                <a
                  href="https://www.instagram.com/chakranimes/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt="insta"
                    src="https://img.icons8.com/fluency/96/000000/instagram-new.png"
                    style={{ height: "80px", width: "80px" }}
                  />
                </a>
              </Heading>
            </Column>
            
            <Column>
              <Heading>
                <a
                  href="https://github.com/zzaku"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt="github"
                    src="https://img.icons8.com/fluency/96/000000/github.png"
                    style={{ height: "80px", width: "80px" }}
                  />
                </a>
              </Heading>
            </Column>
          </Row>
        </NetworkContainer>
        <div
          style={{
            display: "flex",
            width: mobile ? "100%" : "50%",
            justifyContent: "space-around",
            color: "grey",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <a href="mailto:chakranimes@gmail.com" style={{ all: "unset" }}>
              <h5>Contact us</h5>
            </a>
          </div>
          <div style={{ cursor: "pointer" }}>
            <a href="#" style={{ all: "unset" }}>
              <h5>Privacy Policy</h5>
            </a>
          </div>
          <div style={{ cursor: "pointer" }}>
            <a href="#" style={{ all: "unset" }}>
              <h5>Terms & Conditions</h5>
            </a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "50%",
            justifyContent: "space-around",
          }}
        >
          <h4 style={{ color: "white", textAlign: "center" }}>
            © 2022 by Chakranimes. Aucun droit réservé.
          </h4>
        </div>
        <div style={{ width: mobile ? "80%" : "100%" }}>
          <h5
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Chakranimes n'héberge aucune vidéo sur ses serveurs. Contactez-nous
            ou contactez directement la plateforme d'hébergement vidéo pour
            toute réclamation de droits relatifs aux contenus présents sur le
            site.
          </h5>
        </div>
      </Container>
    </Box>
  ) : null;
};
export default Footer;
