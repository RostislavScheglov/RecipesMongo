import { useState } from 'react'
import { useRef } from 'react'
import '../styles/componentsStyles/UploadImg.css'

export function UploadImg({ imgUrl, setImgUrl, setImg, deleteImg }) {
  const uploadImgRef = useRef()
  const [selectedImage, setSelectedImage] = useState('')
  const checker = (el) => el !== undefined && el !== null && el !== ''

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  const imageChange = async (e) => {
    const file = e.target.files[0]
    if (e.target.files && e.target.files.length > 0) {
      const base64img = await convertToBase64(file)
      console.log(base64img)
      setImg(base64img)
      setSelectedImage(URL.createObjectURL(file))
    }
  }
  const clickUploadInput = () => {
    uploadImgRef.current.click()
  }

  return (
    <>
      <div className="imgActionContainer">
        {checker(imgUrl) ? (
          <div className="bigImgContainer">
            <div className="imgTitleContainer">
              <span className="imgActionTitle">Add image</span>
              <button
                className="littleBtns"
                variant="outlined"
                type="button"
                onClick={() => deleteImg(setImgUrl)}
              >
                Delete
              </button>
            </div>
            <img
              className="uploadedImg"
              src={`${imgUrl}`}
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
        accept=".jpeg, .png, .jpg, .svg"
      />
    </>
  )
}
