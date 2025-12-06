import { Technology } from '@/lib/types';
import { icons } from './icons';

export const technologies: Record<string, Technology> = {
    // Languages
    HTML5: { name: 'HTML5', icon: icons.HTML5 },
    CSS3: { name: 'CSS3', icon: icons.CSS3 },
    SASS: { name: 'SASS', icon: icons.SASS },
    JavaScript: { name: 'JavaScript', icon: icons.JavaScript },
    TypeScript: { name: 'TypeScript', icon: icons.TypeScript },
    PHP: { name: 'PHP', icon: icons.PHP },
    Python: { name: 'Python', icon: icons.Python },
    Dart: { name: 'Dart', icon: icons.Dart },
    CPP: { name: 'C++', icon: icons.CPP },
    CSharp: { name: 'C#', icon: icons.CSharp },
    Go: { name: 'Go', icon: icons.Go },
    Java: { name: 'Java', icon: icons.Java },
    Kotlin: { name: 'Kotlin', icon: icons.Kotlin },
    Swift: { name: 'Swift', icon: icons.Swift },
    Solidity: { name: 'Solidity', icon: icons.Solidity },

    // Frameworks & Libraries
    VueJS: { name: 'Vue.js', icon: icons.VueJS },
    NuxtJS: { name: 'Nuxt', icon: icons.NuxtJS },
    React: { name: 'React', icon: icons.React },
    NextJS: { name: 'NextJS', icon: icons.NextJS },
    Bootstrap: { name: 'Bootstrap', icon: icons.Bootstrap },
    TailwindCSS: { name: 'Tailwind CSS', icon: icons.TailwindCSS },
    Vuetify: { name: 'Vuetify', icon: icons.Vuetify },
    Laravel: { name: 'Laravel', icon: icons.Laravel },
    ExpressJS: { name: 'ExpressJS', icon: icons.NODEJS },
    NodeJS: { name: 'Node.js', icon: icons.NODEJS },
    Django: { name: 'Django', icon: icons.Django },
    Flutter: { name: 'Flutter', icon: icons.Flutter },
    ReactNative: { name: 'React Native', icon: icons.ReactNative },
    Expo: { name: 'Expo', icon: icons.Expo },
    jQuery: { name: 'jQuery', icon: icons.jQuery },
    GenKit: { name: 'GenKit', icon: icons.GenKit },
    ChartJS: { name: 'ChartJS', icon: icons.ChartJS },
    DOTNET: { name: '.NET', icon: icons.CSharp }, // Using C# icon for .NET

    // Databases
    MySQL: { name: 'MySQL', icon: icons.MySQL },
    SQLite: { name: 'SQLite', icon: icons.SQLite },
    PostgreSQL: { name: 'PostgreSQL', icon: icons.PostgreSQL },
    MongoDB: { name: 'MongoDB', icon: icons.MongoDB },
    Redis: { name: 'Redis', icon: icons.Redis },
    Firebase: { name: 'Firebase', icon: icons.Firebase },

    // DevOps & Cloud
    Docker: { name: 'Docker', icon: icons.Docker },
    AWS: { name: 'AWS', icon: icons.AWS },
    GoogleCloud: { name: 'Google Cloud', icon: icons.GoogleCloud },
    Heroku: { name: 'Heroku', icon: icons.Heroku },
    Vercel: { name: 'Vercel', icon: icons.Vercel },
    Netlify: { name: 'Netlify', icon: icons.Netlify },
    Render: { name: 'Render', icon: icons.Render },
    DigitalOcean: { name: 'Digital Ocean', icon: icons.DigitalOcean },
    CloudfareWorkers: { name: 'Cloudfare Workers', icon: icons.CloudfareWorkers },

    // Other
    Ethereum: { name: 'Ethereum', icon: icons.Ethereum },
    Web3: { name: 'Web3', icon: icons.Web3 },
    RestAPI: { name: 'Rest API', icon: icons.RestAPI },
    API: { name: 'API', icon: icons.API },
};
