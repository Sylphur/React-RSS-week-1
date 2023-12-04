export const imageToBase64 = (image: File): Promise<string> => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result as string);
    };

    reader.onerror = () => {
      res('');
    };

    reader.readAsDataURL(image);
  });
};
