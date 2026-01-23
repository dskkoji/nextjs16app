const ImageUpload = ({
  image,
  onImageChange,
}: {
  image: any;
  onImageChange: (file: File) => void;
}) => {
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      onImageChange(e.target.files[0]);
    }
  };
  return (
    <input
      type="file"
      id="image"
      accept="image/*"
      onChange={handleChangeFile}
    />
  );
};

export default ImageUpload;
