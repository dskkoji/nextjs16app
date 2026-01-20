
import { useState } from 'react'
const ImageUpload = ({ image }: { image: string }) => {
  const [file,setFile] = useState(image)
  const handleChangeFile = (e: any) => {
    if (e.target.files.length !== 0) {
      setFile(e.target.files[0])
    }
  }

  return (
    <input 
      type="file"
      id="image"
      accept="image/*"
      onChange={(e: any) => handleChangeFile(e)}
    />
  )
}

export default ImageUpload