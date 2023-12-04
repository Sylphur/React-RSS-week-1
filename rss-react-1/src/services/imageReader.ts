export const imageToBase64 = (img: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);
}