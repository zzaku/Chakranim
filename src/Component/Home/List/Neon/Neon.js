import styled from "styled-components"
import imgki from './assets/ki.png'

const Neon = ({neonContainerWidth, sumDelay1, neonContainerHeight}) => {
console.log(sumDelay1)
    const Neon1 = styled.img`
    position : absolute;
    height: 0;
    width: 0;
    top: 0;
    left: 30;
    -webkit-animation-name: slideInRight;
    animation-name: slideInRight;
    animation-duration: 6s;
    animation-delay: 1.4s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;

    @keyframes slideInRight {
    0% {
    transform: translateX(0);
    visibility: visible;
    height: 40%;
    width: 10%
    }
    25% {
    transform: translateX(${neonContainerWidth - 240}px);
    visibility: visible;
    height: 40%;
    width: 10%
    }
    50% {
    transform: translateX(0);
    visibility: visible;
    height: 75%;
    width: 20%
    }
    75% {
    transform: translateX(${neonContainerWidth - 240}px);
    visibility: visible;
    height: 40%;
    width: 10%
    }
    100% {
    transform: translateX(0);
    height: 40%;
    width: 10%
    }
    } 
`


    return <Neon1 src={imgki} />
}
export default Neon