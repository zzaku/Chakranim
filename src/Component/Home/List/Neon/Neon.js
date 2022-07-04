import styled from "styled-components"

const Neon = ({neonContainerWidth, neonContainerHeight}) => {

    const Neon1 = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 70px;
    -webkit-animation: 3s linear 2s infinite move_neon1;
    animation: 3s linear 2s infinite move_neon1;

    @keyframes move_neon1 {
        0% {
          transform: translateX(0) translateY(0);
          width: 28%;
          height: 28%;
        }
      
        25% {
          transform: translateX(${neonContainerWidth/4}px) translateY(0) !important;
          width: 28%;
          height: 28%;
        }
      
        50% {
          transform: translateX(${neonContainerWidth/2}px) translateY(0);
          width: 28%;
          height: 28%;
        }
      
        75% {
          transform: translateX(${neonContainerWidth - 200}px) translateY(0);
          width: 28%;
          height: 28%;
        }

      90% {
        transform: translateX(${neonContainerWidth/4}) translateY(0);
          width: 28%;
          height: 28%;
      }

      100% {
        transform: translateX(0) translateY(0);
          width: 28%;
          height: 28%;
      }
        
      }
`
    const Neon2 = styled.div`
    position: absolute;
    height: 15px;
    width: 50px;
    background-color: aqua;
    left: ${neonContainerWidth-10}px;
    top: ${neonContainerHeight-10}px;
    -webkit-animation: 3.5s linear 0s infinite move_neon2;
    animation: 1s linear 0s infinite move_neon2;

    @keyframes move_neon2 {
        0% {
          transform: translateX(-50px) translateY(0);
          width: 50px;
          height: 10px;
        }
      
        25% {
          transform: translateX(-${neonContainerWidth/2}px) translateY(0);
          width: 80px;
          height: 10px;
        }
      
        50% {
          transform: translateX(-${(neonContainerWidth/4)*3}px) translateY(0);
          width: 110px;
          height: 10px;
        }
      
        75% {
          transform: translateX(-${neonContainerWidth}px) translateY(0);
          width: 150px;
          height: 10px;
        }

      90% {
        transform: translateX(-${(neonContainerWidth/4)}) translateY(0);
          width: 80px;
          height: 10px;
      }

      100% {
        transform: translateX(-50px) translateY(0);
        width: 50px;
        height: 10px;
      }
    }  
`

    return <Neon1 />
}
export default Neon