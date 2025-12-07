export const cloudinaryImage = (filename: string, folder: string) => {
  return `https://res.cloudinary.com/meyoron-aghogho/image/upload/${folder}/${filename}`;
};

cloudinaryImage.project = (filename: string) => {
  return cloudinaryImage(filename, 'projects');
};

cloudinaryImage.people = (filename: string) => {
  return cloudinaryImage(filename, 'people');
};
