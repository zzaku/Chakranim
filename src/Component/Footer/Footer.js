import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./style/FooterStyles";

const Footer = () => {
return (
	<Box>
	<h1 style={{ color: "cyan",
				textAlign: "center",
				marginTop: "-50px" }}>
		Chakranime
	</h1>
	<Container>
		<Row>
		<Column>
			<Heading>Instagram</Heading>
		</Column>
		<Column>
			<Heading>Twitter</Heading>
		</Column>
		<Column>
			<Heading>Github</Heading>
		</Column>
		</Row>
        <p style={{color: "white", fontSize: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>La loi française vous autorise à télécharger un fichier seulement si vous en possédez l'original. Ni Chakranime, ni ses hébergeurs, quiconque ne pourra être tenu responsable d'une mauvaise utilisation de ce site.</p>
	</Container>
	</Box>
);
};
export default Footer;
