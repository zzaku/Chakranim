import "./style/ImageCropper.css"
import "cropperjs/dist/cropper.min.css"
import Cropper from "cropperjs"
import { useEffect, useRef, useState } from "react"


const ImageCropper = ({imageUpload, style, imageSRC}) => {

    const [imageDestination, setImageDestination] = useState("")
    const imageElemnt = useRef()

    useEffect(() => {
        const cropper = new Cropper(imageElemnt.current, {
            zoomable: false,
            scalable: true,
            aspectRatio: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                setImageDestination(canvas.toDataURL("image/png"))
            }
        })
    }, [imageSRC])


    return (
        <div >
            <div style={style}>
                <img className="img-preview" src={imageDestination} alt="Destination" />
            </div>
            <div className="img-container">
                <img style={{borderRadius: "100%", height: "100%", width: "100%"}} ref={imageElemnt} src={imageSRC} alt="Source" />
            </div>
        </div>
    )
}

export default ImageCropper