import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./style/DropFileInput.css"
import { useEffect, useRef, useState } from "react";
import PlayCircle from '@mui/icons-material/PlayCircle';
import { Button, TextField } from '@mui/material';


const DropFileInput = ({setUrlUpload, urlUpload, allTitle, setAllTitle}) => {

    const wrapperVodRef = useRef(null)
    const vodName = useRef([])
    const vodNameBtn = useRef([])
    const vodNameTextField = useRef(null)

    const [fileList, setFileList] = useState([])
    const [changeName, setChangeName] = useState({})
    const [newTitle, setNewTitle] = useState({})

    const onDragEnter = () => wrapperVodRef.current.classList.add('dragover')

    const onDragLeave = () => wrapperVodRef.current.classList.remove('dragover')

    const onDrop = () => wrapperVodRef.current.classList.remove('dragover')

    const displayChangeNameOfVod = (i) => {
        vodName.current[i].style.opacity = 0
        vodNameBtn.current[i].style.opacity = 1
    }

    const disappearChangeNameOfVod = (i) => {
        vodName.current[i].style.opacity = 1
        vodNameBtn.current[i].style.opacity = 0
    }

    const changingName = (e, i) => {
        setNewTitle({[i]: e.target.value})
    }

    const submitNewTitle = (e, i) => {
        e.preventDefault()
        handleClose();
        setAllTitle({...allTitle, [i]: {...allTitle[i], name: newTitle[i]}})
        setNewTitle({})
    }

    const handleClose = () => {
        setChangeName(null)
    }

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if(vodNameTextField){
                if (vodNameTextField.current && !vodNameTextField.current.contains(event.target)) {
                  handleClose();
                }
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [vodNameTextField]);

    const setUrlImage = (e) => {
        const newFile = e.target.files[e.target.files.length - 1]
        if(newFile){
        const reader = new FileReader();
        let buffer = reader.readAsArrayBuffer(newFile);
        newFile.arrayBuffer().then((arrayBuffer) => {
            const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'video/mp4' });
            setUrlUpload([...urlUpload, { name: newFile["name"], result: blob }])
        });
        let url = window.URL.createObjectURL(newFile);
        reader.addEventListener(
          "load",
          () => {
            setFileList([...fileList, { name: newFile["name"], result: url }]);
            setAllTitle({...allTitle, [fileList.length]: {name: newFile["name"], position: fileList.length}})
          },
          false
        );
      };
    }
    
    return (
        <div className="DropFileInput-container">
            <div className="DropFileInput" style={{height: fileList.length > 0 ? "40%" : "100%"}} ref={wrapperVodRef} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
                <div style={{display: "flex", height: "auto", width: "100%", justifyContent: "center"}}>
                    <h2>Drag & Drop ta vidéo juste ici</h2>
                </div>
                <div>
                    <CloudUploadIcon sx={{fontSize: "150px", color: "#ceb5ff"}} />
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
                                            {
                                                !changeName?.[i] ?
                                                    <div onMouseOver={() => displayChangeNameOfVod(i)} onMouseLeave={() => disappearChangeNameOfVod(i)} className="image-vod-name-container" style={{ alignItems: fileList.length > 4 && "center", justifyContent: fileList.length > 4 && "center", fontSize: fileList.length > 4 && "14px"}}>
                                                        <div ref={(element) => {vodName.current[i] = element}} className='image-vod-name'>
                                                            <h5>{allTitle[i] ? allTitle[i].name : vod.name}</h5>
                                                        </div>
                                                        <div ref={(element) => {vodNameBtn.current[i] = element}} className='image-overlay-vod-name'>
                                                            <Button onClick={() => setChangeName({[i]: true})} sx={{width: "100%", color: "rgba(163, 155, 182, 0.678)"}} variant='outained' >Changer de titre</Button>
                                                        </div>
                                                    </div>
                                                :
                                                    <div ref={vodNameTextField}>
                                                        <form onSubmit={(e) => submitNewTitle(e, i)}>
                                                            <TextField
                                                                onChange={(e) => changingName(e, i)}
                                                                value={newTitle[i]}
                                                                autoComplete="off"
                                                                style={{
                                                                    background: "white",
                                                                    color: "black",
                                                                    borderRadius: "5px 5px 5px 5px",
                                                                }}
                                                                id="standard"
                                                                label="Nouveau titre"
                                                                variant="standard"
                                                            />
                                                        </form>
                                                    </div>
                                                }
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