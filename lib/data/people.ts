import { cloudinaryImage } from '../utils/helpers';

export const people = {
  tovyss: {
    name: 'Tovia Amadi',
    titles: ['Digital Marketer | Product Manager'],
    avatar_url: cloudinaryImage.people('Tovia-Amadi_rml20q.png'),
    biography:
      'A dedicated digital marketing and design professional who blends creative visions with practical business insights. ',
    profile_link: 'https://toviaamadi.com',
  },

  //

  acetech: {
    name: 'Adekunle Abdul-Roqeeb Adedoyin',
    titles: ['Graphics || UI/UX Designer'],
    avatar_url: cloudinaryImage.people('Adekunle-Adedoyin_qv8rtk.jpg'),
    biography: '',
    profile_link: null,
  },
  beejay: {
    name: 'Benjamin Onuoha',
    titles: ['Branding Consultant'],
    avatar_url: cloudinaryImage.people('Benjamin-Onuoha_f5wjgh.jpg'),
    biography: '',
    profile_link: null,
  },
  biodun: {
    name: 'Biodun Bamigboye',
    titles: ['Head Developer - EPortal Net'],
    avatar_url: cloudinaryImage.people('Biodun-Bamigboye_mipsga.jpg'),
    biography: '',
    profile_link: null,
  },
  busta: {
    name: 'Olaifa Boluwatife',
    titles: ['Freelance Senior Software Developer'],
    avatar_url: cloudinaryImage.people('Olaifa-Boluwatife_vggtzb.jpg'),
    biography: 'Software engineer focused on solving solutions.',
    profile_link: 'https://github.com/grandbusta',
  },
  chuba: {
    name: 'Chuba Samuel',
    titles: ['Medical student'],
    avatar_url: cloudinaryImage.people('Chuba-Samuel_pb7hss.jpg'),
    biography: 'Nothing is free, but ALL is possible, IF God is on my side.',
    profile_link: 'https://web.facebook.com/jeremiahdavid.samuel',
  },
  iammastercraft: {
    name: 'Boluwaji Akinsefunmi',
    titles: ['Freelance Web and Mobile Developer'],
    avatar_url: cloudinaryImage.people('Boluwaji-Akinsefunmi_fnjtch.jpg'),
    biography: 'Your ever-whining-dev, mobile app developer at Lexus Technologies Ltd., Lagos',
    profile_link: 'https://iammastercraft.github.io',
  },
  iyiola: {
    name: 'Mohammed Adekunle',
    titles: ['Software Developer'],
    avatar_url: cloudinaryImage.people('Mohammed-Adekunle_hdelxh.jpg'),
    biography:
      'A software engineer with specialization in building and deploying server-side and system software. I work with PHP, Node(TS) and C/C++. I also work on web apps with Vue, Nuxt and Webpack.',
    profile_link: 'https://mohammedadekunle.com.ng',
  },
  laurence702: {
    name: 'Igbokwe Laurence',
    titles: ['Senior Software Engineer'],
    avatar_url: cloudinaryImage.people('default_msqrmt.png'),
    biography:
      'I am a prolific forger of impressive products, a creative Software engineer with more than 3 years experience in delivering result - oriented brands and creative solutions to meet business needs',
    profile_link: 'https://www.linkedin.com/in/francis-igbokwe-166597152/',
  },
  nazaa: {
    name: 'Chinaza Obiekwe',
    titles: ['Project Manager'],
    avatar_url: cloudinaryImage.people('Chinaza-Obiekwe_my83n9.jpg'),
    biography: 'I love managing people',
    profile_link: 'https://www.linkedin.com/in/chinaza-obiekwe-aa405310b',
  },
  sudoaj: {
    name: 'Abdusalam Ajayi',
    titles: ['Founder - Weandel LLC'],
    avatar_url: cloudinaryImage.people('Abdusalam-Ajayi_kk6duy.jpg'),
    biography: '',
    profile_link: 'https://www.aj-playground.org',
  },
} as const;
