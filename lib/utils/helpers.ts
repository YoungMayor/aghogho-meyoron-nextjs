export const cloudinaryImage = (filename: string, folder: string) => {
  return `https://res.cloudinary.com/meyoron-aghogho/image/upload/${folder}/${filename}`;
};

cloudinaryImage.dartCodeshot = (filename: string) => {
  return cloudinaryImage(filename, 'projects/codeshots/dart');
};

cloudinaryImage.goCodeshot = (filename: string) => {
  return cloudinaryImage(filename, 'projects/codeshots/go');
};

cloudinaryImage.jsCodeshot = (filename: string) => {
  return cloudinaryImage(filename, 'projects/codeshots/js');
};

cloudinaryImage.people = (filename: string) => {
  return cloudinaryImage(filename, 'people');
};

cloudinaryImage.portfolio = (filename: string) => {
  return cloudinaryImage(filename, 'projects/portfolios');
};

cloudinaryImage.project = (filename: string) => {
  return cloudinaryImage(filename, 'projects');
};
