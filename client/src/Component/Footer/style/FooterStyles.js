import styled from 'styled-components';

export const Box = styled.div`
display: flex;
margin: 5% 0 20px;
background: black;
flex-direction: column;
justify-content: center;
width: 100%;
height: auto;

@media (max-width: 1000px) {
	padding: 70px 0px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;

`;

export const NetworkContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: auto;
justify-content: center;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const Row = styled.div`
display: flex;
justify-content: space-around;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;

&:hover {
	color: blue;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #fff;
margin-bottom: 40px;
font-weight: bold;
`;
