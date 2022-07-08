import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
NetworkContainer,
} from "./style/FooterStyles";
import { Link } from "react-router-dom";

const Footer = ({footerRef}) => {
return (
	<Box ref={footerRef && footerRef}>
	<Container>
		<NetworkContainer>
			<Row>
				<Column>
					<Heading>
						<a href="https://www.instagram.com/enzo.mkd/" target="_blank" rel="noreferrer">
							<img src="https://img.icons8.com/fluency/96/000000/instagram-new.png"/>
						</a>
					</Heading>
				</Column>
				<Column>
					<Heading>
					<a href="https://twitter.com/Zkuu_" target="_blank" rel="noreferrer">
						<img src="https://img.icons8.com/color/96/000000/twitter--v1.png"/>
					</a>
					</Heading>
				</Column>
				<Column>
					<Heading>
						<a href="https://github.com/zzaku" target="_blank" rel="noreferrer">
							<img src="https://img.icons8.com/fluency/96/000000/github.png"/>
						</a>
					</Heading>
				</Column>
			</Row>
		</NetworkContainer>
		<h1 style={{ color: "white",
				textAlign: "center",
				marginTop: "-50px" }}>
		Chakranime
	</h1>
        <p style={{color: "white", fontSize: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>La loi française vous autorise à télécharger un fichier seulement si vous en possédez l'original. Ni Chakranime, ni ses hébergeurs, quiconque ne pourra être tenu responsable d'une mauvaise utilisation de ce site.</p>
	</Container>
	</Box>
);
};
export default Footer;
