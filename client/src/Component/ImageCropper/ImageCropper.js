import "./style/ImageCropper.css"
import "cropperjs/dist/cropper.min.css"
import Cropper from "cropperjs"
import { useEffect, useRef, useState } from "react"


const ImageCropper = ({previewImage, format, imageDestination, setImageDestination,  imageElement, style, imageSRC}) => {

    useEffect(() => {
        if(imageElement.current){
            const cropper = new Cropper(imageElement.current, {
                zoomable: true,
                scalable: false,
                aspectRatio: 1,
                crop: () => {
                    const canvas = cropper.getCroppedCanvas();
                    setImageDestination(canvas.toDataURL("image/png"))
                }
            })
        }
       
    }, [imageElement])


    return (
        <div className="container-cropper-image">
            {previewImage ?
            <div className="container-profile-image">
                <div style={style}>
                    <img style={{borderRadius: format === "avatar" && "100%", height: "100%", width: "100%"}} className="img-preview" src={imageDestination} alt="Destination" />
                </div>
            </div>
            :
            <div className="container-profile-image2"> 
                <div style={style}>
                    <div className="img-container">
                        <img style={{height: "auto", width: "auto"}} ref={imageElement} src={imageSRC} alt="Source" />
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ImageCropper