import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./style/DropFileInput.css"
import { useRef, useState } from "react";
import PlayCircle from '@mui/icons-material/PlayCircle';


const DropFileInput = ({setUrlUpload}) => {

    const wrapperVodRef = useRef(null)

    const [fileList, setFileList] = useState([])

    const onDragEnter = () => wrapperVodRef.current.classList.add('dragover')

    const onDragLeave = () => wrapperVodRef.current.classList.remove('dragover')

    const onDrop = () => wrapperVodRef.current.classList.remove('dragover')

    const setUrlImage = (e) => {
        const newFile = e.target.files[e.target.files.length - 1]
        if(newFile){
        const reader = new FileReader();
        let buffer = reader.readAsArrayBuffer(newFile);
        newFile.arrayBuffer().then((arrayBuffer) => {
            const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'video/mp4' });
            setUrlUpload([...fileList, { result: blob }])
        });
        let url = window.URL.createObjectURL(newFile);
        reader.addEventListener(
          "load",
          () => {
            setFileList([...fileList, { name: newFile["name"], result: url }]);
          },
          false
        );
      };
    }

    return (
        <div className="DropFileInput-container">
            <div className="DropFileInput" ref={wrapperVodRef} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
                <div style={{display: "flex", height: "auto", width: "100%"}}>
                    <h2>Drag & Drop ta vidéo juste ici</h2>
                </div>
                <div>
                    <CloudUploadIcon sx={{fontSize: "150px"}} />
                </div>
                <div className="input-file-video">
                    <input type="file" accept="video/*" onChange={setUrlImage} name="video"/>
                </div>
            </div>
                {
                    fileList.length > 0 &&
                        <div className="file-img">
                            {
                                fileList.map((vod, i) => {
                                    return (
                                       <div key={i} className="input-image-vod">
                                            <div className='input-image-vod-container'>
                                                <video className='video-image' src={vod.result} type="video/mp4"></video>
                                                <div style={{display: "flex", postion: "absolute", alignItems: "center", justifyContent: "center", zIndex: "5", height: "100%", width: "100%"}}><PlayCircle sx={{height: "50%", width: "50%"}}/></div>
                                                <div className='overlay-video-image'></div>
                                            </div>
                                            <div className='image-vod-name' style={{ alignItems: fileList.length > 4 && "center", justifyContent: fileList.length > 4 && "center", fontSize: fileList.length > 4 && "14px"}}>
                                                <h5>{vod.name}</h5>
                                            </div>
                                        </div> 
                                    )
                                })
                            }
                        </div>
                }
            
        </div>
        )
}

export default DropFileInput