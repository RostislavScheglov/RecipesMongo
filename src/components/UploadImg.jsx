import { useState } from 'react'
import { domain } from '../axios'
import { useRef } from 'react'

export function UploadImg(props) {
  const uploadImgRef = useRef()
  const [selectedImage, setSelectedImage] = useState('')
  const checker = (el) => el !== undefined && el !== null && el !== ''

  const imageChange = (e) => {
    const file = e.target.files[0]
    if (e.target.files && e.target.files.length > 0) {
      props.setImg(file)
      setSelectedImage(URL.createObjectURL(file))
    }
  }
  const clickUploadInput = () => {
    uploadImgRef.current.click()
  }
  return (
    <>
      <div className="imgActionContainer">
        {checker(props.imgUrl) ? (
          <div className="bigImgContainer">
            <div id="imgTitleContainer">
              <span id="imgActionTitle">Add image</span>
              <button
                className="littleBtns"
                variant="outlined"
                type="button"
                onClick={() => props.deleteImg(props.imgUrl, props.setImgUrl)}
              >
                Delete
              </button>
            </div>
            <img
              className="uploadedImg"
              src={`${domain}${props.imgUrl}`}
              alt="Img"
            />
          </div>
        ) : (
          <div>
            {checker(selectedImage) ? (
              <img
                id="img"
                alt="Img"
                className="uploadedImg"
                src={selectedImage}
                onClick={clickUploadInput}
              />
            ) : (
              <div
                onClick={clickUploadInput}
                className="uploadImgContainer"
              ></div>
            )}
          </div>
        )}
      </div>
      <input
        type="file"
        name="img"
        className="uploadImgInput"
        ref={uploadImgRef}
        onChange={imageChange}
      />
    </>
  )
}
