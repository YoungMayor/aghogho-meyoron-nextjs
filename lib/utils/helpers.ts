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

cloudinaryImage.book = (filename: string) => {
  return cloudinaryImage(filename, 'books');
};

export const gravatar = async (email: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return `https://www.gravatar.com/avatar/${hexHash}?s=400&d=mp`;
};
