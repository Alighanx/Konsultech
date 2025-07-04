// Base de datos de tecnologías con precios reales del mercado
export interface Tecnologia {
  id: string;
  nombre: string;
  categoria: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'tools' | 'security' | 'design' | 'mobile';
  tipo: 'licencia' | 'servicio' | 'desarrollo' | 'subscripcion';
  precio: number;
  unidad: 'mes' | 'año' | 'usuario/mes' | 'usuario/año' | 'proyecto' | 'gratis' | 'hora';
  descripcion: string;
  recomendada: boolean;
  ventajas: string[];
  desventajas: string[];
  alternativas: string[];
  casos_uso: string[];
  complejidad: 'baja' | 'media' | 'alta';
  popularidad: number; // 1-5
  soporte: 'comunidad' | 'empresa' | 'mixto';
  url_oficial?: string;
}

export const TECNOLOGIAS: Tecnologia[] = [
  // FRONTEND
  {
    id: 'react',
    nombre: 'React + TypeScript',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Biblioteca de JavaScript para construir interfaces de usuario interactivas',
    recomendada: true,
    ventajas: ['Ecosistema maduro', 'Gran comunidad', 'Flexible', 'Reutilizable'],
    desventajas: ['Curva de aprendizaje', 'Muchas opciones pueden confundir'],
    alternativas: ['Vue.js', 'Angular', 'Svelte'],
    casos_uso: ['SPAs', 'Aplicaciones web complejas', 'Dashboards'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'mixto',
    url_oficial: 'https://react.dev'
  },
  {
    id: 'nextjs',
    nombre: 'Next.js',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework de React con SSR, SSG y optimizaciones automáticas',
    recomendada: true,
    ventajas: ['SSR/SSG', 'Optimización automática', 'Routing automático', 'API Routes'],
    desventajas: ['Opinionado', 'Puede ser complejo para principiantes'],
    alternativas: ['Nuxt.js', 'Gatsby', 'Remix'],
    casos_uso: ['E-commerce', 'Blogs', 'Aplicaciones web full-stack'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://nextjs.org'
  },
  {
    id: 'vue',
    nombre: 'Vue.js',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework progresivo de JavaScript para interfaces de usuario',
    recomendada: true,
    ventajas: ['Fácil de aprender', 'Documentación excelente', 'Flexible'],
    desventajas: ['Ecosistema más pequeño que React', 'Menos oportunidades laborales'],
    alternativas: ['React', 'Angular', 'Svelte'],
    casos_uso: ['Aplicaciones web', 'Prototipos rápidos', 'Migración gradual'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://vuejs.org'
  },
  {
    id: 'angular',
    nombre: 'Angular',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework completo de TypeScript para aplicaciones web',
    recomendada: false,
    ventajas: ['Framework completo', 'TypeScript nativo', 'Arquitectura robusta'],
    desventajas: ['Curva de aprendizaje empinada', 'Verbose', 'Overhead'],
    alternativas: ['React', 'Vue.js', 'Svelte'],
    casos_uso: ['Aplicaciones enterprise', 'Sistemas complejos', 'Equipos grandes'],
    complejidad: 'alta',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://angular.io'
  },

  // BACKEND
  {
    id: 'nodejs',
    nombre: 'Node.js + Express',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Runtime de JavaScript para servidor con framework Express',
    recomendada: true,
    ventajas: ['Mismo lenguaje que frontend', 'NPM ecosystem', 'Rápido desarrollo'],
    desventajas: ['Single-threaded', 'Callback hell', 'Seguridad requiere cuidado'],
    alternativas: ['Python Django', 'Java Spring', 'C# .NET', 'PHP Laravel'],
    casos_uso: ['APIs REST', 'Microservicios', 'Aplicaciones real-time'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'comunidad',
    url_oficial: 'https://nodejs.org'
  },
  {
    id: 'python-django',
    nombre: 'Python + Django',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework web de Python con baterías incluidas',
    recomendada: true,
    ventajas: ['Rápido desarrollo', 'Admin panel incluido', 'Seguridad robusta'],
    desventajas: ['Puede ser lento', 'Monolítico', 'Curva de aprendizaje'],
    alternativas: ['Node.js', 'Ruby on Rails', 'Java Spring'],
    casos_uso: ['CMS', 'E-commerce', 'Aplicaciones web complejas'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://djangoproject.com'
  },
  {
    id: 'java-spring',
    nombre: 'Java + Spring Boot',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework empresarial de Java para aplicaciones robustas',
    recomendada: false,
    ventajas: ['Muy robusto', 'Ecosistema maduro', 'Escalable'],
    desventajas: ['Verbose', 'Curva de aprendizaje', 'Desarrollo más lento'],
    alternativas: ['Node.js', 'Python Django', 'C# .NET'],
    casos_uso: ['Aplicaciones enterprise', 'Sistemas financieros', 'Microservicios'],
    complejidad: 'alta',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://spring.io'
  },

  // BASES DE DATOS
  {
    id: 'postgresql',
    nombre: 'PostgreSQL',
    categoria: 'database',
    tipo: 'servicio',
    precio: 25,
    unidad: 'mes',
    descripcion: 'Base de datos relacional avanzada con características NoSQL',
    recomendada: true,
    ventajas: ['Muy robusto', 'ACID compliant', 'Extensible', 'JSON support'],
    desventajas: ['Puede ser complejo', 'Consumo de memoria'],
    alternativas: ['MySQL', 'MongoDB', 'SQLite'],
    casos_uso: ['Aplicaciones web', 'Análisis de datos', 'Sistemas complejos'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'comunidad',
    url_oficial: 'https://postgresql.org'
  },
  {
    id: 'mysql',
    nombre: 'MySQL',
    categoria: 'database',
    tipo: 'servicio',
    precio: 20,
    unidad: 'mes',
    descripcion: 'Base de datos relacional popular y fácil de usar',
    recomendada: true,
    ventajas: ['Fácil de usar', 'Muy popular', 'Buen rendimiento'],
    desventajas: ['Menos características que PostgreSQL', 'Limitaciones en consultas complejas'],
    alternativas: ['PostgreSQL', 'SQLite', 'MongoDB'],
    casos_uso: ['Aplicaciones web', 'CMS', 'E-commerce'],
    complejidad: 'baja',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://mysql.com'
  },
  {
    id: 'mongodb',
    nombre: 'MongoDB',
    categoria: 'database',
    tipo: 'servicio',
    precio: 30,
    unidad: 'mes',
    descripcion: 'Base de datos NoSQL orientada a documentos',
    recomendada: false,
    ventajas: ['Flexible', 'Escalable', 'Bueno para datos no estructurados'],
    desventajas: ['No ACID', 'Consumo de memoria', 'Curva de aprendizaje'],
    alternativas: ['PostgreSQL', 'MySQL', 'CouchDB'],
    casos_uso: ['APIs', 'Aplicaciones real-time', 'Big Data'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://mongodb.com'
  },

  // INFRAESTRUCTURA
  {
    id: 'aws-ec2',
    nombre: 'AWS EC2',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 50,
    unidad: 'mes',
    descripcion: 'Servidores virtuales escalables en la nube',
    recomendada: true,
    ventajas: ['Muy escalable', 'Muchos servicios', 'Confiable'],
    desventajas: ['Puede ser caro', 'Complejo de configurar'],
    alternativas: ['Google Cloud', 'Azure', 'DigitalOcean'],
    casos_uso: ['Hosting web', 'Aplicaciones escalables', 'Microservicios'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://aws.amazon.com'
  },
  {
    id: 'digitalocean',
    nombre: 'DigitalOcean Droplets',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 25,
    unidad: 'mes',
    descripcion: 'Servidores virtuales simples y económicos',
    recomendada: true,
    ventajas: ['Económico', 'Fácil de usar', 'Buen rendimiento'],
    desventajas: ['Menos servicios que AWS', 'Limitado para enterprise'],
    alternativas: ['AWS', 'Linode', 'Vultr'],
    casos_uso: ['Startups', 'Aplicaciones pequeñas', 'Desarrollo'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://digitalocean.com'
  },
  {
    id: 'vercel',
    nombre: 'Vercel',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 20,
    unidad: 'mes',
    descripcion: 'Plataforma de hosting para aplicaciones frontend',
    recomendada: true,
    ventajas: ['Deploy automático', 'CDN global', 'Optimizado para Next.js'],
    desventajas: ['Limitado a frontend', 'Puede ser caro para mucho tráfico'],
    alternativas: ['Netlify', 'AWS S3', 'Firebase Hosting'],
    casos_uso: ['SPAs', 'Aplicaciones Next.js', 'Sitios estáticos'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://vercel.com'
  },

  // HERRAMIENTAS
  {
    id: 'github',
    nombre: 'GitHub Pro',
    categoria: 'tools',
    tipo: 'licencia',
    precio: 4,
    unidad: 'usuario/mes',
    descripcion: 'Plataforma de control de versiones y colaboración',
    recomendada: true,
    ventajas: ['Estándar de la industria', 'CI/CD integrado', 'Gran comunidad'],
    desventajas: ['Caro para equipos grandes', 'Dependencia de servicio externo'],
    alternativas: ['GitLab', 'Bitbucket', 'Git self-hosted'],
    casos_uso: ['Control de versiones', 'Colaboración', 'CI/CD'],
    complejidad: 'baja',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://github.com'
  },
  {
    id: 'docker',
    nombre: 'Docker',
    categoria: 'tools',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Containerización de aplicaciones para desarrollo y producción',
    recomendada: true,
    ventajas: ['Portabilidad', 'Consistencia', 'Escalabilidad'],
    desventajas: ['Curva de aprendizaje', 'Overhead de rendimiento'],
    alternativas: ['Podman', 'LXC', 'VM tradicionales'],
    casos_uso: ['Desarrollo', 'Microservicios', 'CI/CD'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://docker.com'
  },

  // SEGURIDAD
  {
    id: 'ssl-cert',
    nombre: 'Certificado SSL',
    categoria: 'security',
    tipo: 'licencia',
    precio: 100,
    unidad: 'año',
    descripcion: 'Certificado de seguridad para conexiones HTTPS',
    recomendada: true,
    ventajas: ['Seguridad', 'Confianza del usuario', 'SEO'],
    desventajas: ['Costo anual', 'Configuración'],
    alternativas: ['Let\'s Encrypt (gratis)', 'Cloudflare SSL'],
    casos_uso: ['Sitios web', 'APIs', 'E-commerce'],
    complejidad: 'baja',
    popularidad: 5,
    soporte: 'empresa'
  },
  {
    id: 'auth0',
    nombre: 'Auth0',
    categoria: 'security',
    tipo: 'subscripcion',
    precio: 23,
    unidad: 'mes',
    descripcion: 'Servicio de autenticación y autorización',
    recomendada: true,
    ventajas: ['Fácil implementación', 'Muchas integraciones', 'Seguro'],
    desventajas: ['Costo mensual', 'Dependencia externa'],
    alternativas: ['Firebase Auth', 'AWS Cognito', 'Implementación propia'],
    casos_uso: ['Autenticación', 'SSO', 'Gestión de usuarios'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://auth0.com'
  },

  // DISEÑO
  {
    id: 'figma',
    nombre: 'Figma Professional',
    categoria: 'design',
    tipo: 'licencia',
    precio: 12,
    unidad: 'usuario/mes',
    descripcion: 'Herramienta de diseño UI/UX colaborativa',
    recomendada: true,
    ventajas: ['Colaborativo', 'Basado en web', 'Prototipos interactivos'],
    desventajas: ['Requiere internet', 'Costo mensual'],
    alternativas: ['Adobe XD', 'Sketch', 'Penpot (gratis)'],
    casos_uso: ['Diseño UI/UX', 'Prototipos', 'Sistemas de diseño'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://figma.com'
  },
  {
    id: 'adobe-creative',
    nombre: 'Adobe Creative Cloud',
    categoria: 'design',
    tipo: 'licencia',
    precio: 60,
    unidad: 'usuario/mes',
    descripcion: 'Suite completa de herramientas de diseño',
    recomendada: false,
    ventajas: ['Herramientas profesionales', 'Estándar de la industria'],
    desventajas: ['Muy caro', 'Complejo para principiantes'],
    alternativas: ['Figma', 'Canva', 'GIMP + Inkscape'],
    casos_uso: ['Diseño gráfico', 'Edición de video', 'Ilustración'],
    complejidad: 'alta',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://adobe.com'
  },

  // MÓVIL
  {
    id: 'react-native',
    nombre: 'React Native',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework para desarrollo de apps móviles multiplataforma',
    recomendada: true,
    ventajas: ['Código compartido', 'Comunidad grande', 'Rendimiento nativo'],
    desventajas: ['Limitaciones de plataforma', 'Debugging complejo'],
    alternativas: ['Flutter', 'Ionic', 'Xamarin'],
    casos_uso: ['Apps iOS/Android', 'Prototipado rápido', 'Startups'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://reactnative.dev'
  },
  {
    id: 'flutter',
    nombre: 'Flutter',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework de Google para apps móviles y web',
    recomendada: true,
    ventajas: ['Rendimiento excelente', 'UI consistente', 'Hot reload'],
    desventajas: ['Lenguaje Dart', 'Tamaño de app', 'Ecosistema más pequeño'],
    alternativas: ['React Native', 'Ionic', 'Xamarin'],
    casos_uso: ['Apps móviles', 'Apps web', 'Apps desktop'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://flutter.dev'
  }
];

// Función para obtener tecnologías por categoría
export const getTecnologiasPorCategoria = (categoria: string): Tecnologia[] => {
  return TECNOLOGIAS.filter(tech => tech.categoria === categoria);
};

// Función para obtener tecnologías recomendadas
export const getTecnologiasRecomendadas = (): Tecnologia[] => {
  return TECNOLOGIAS.filter(tech => tech.recomendada);
};

// Función para buscar tecnologías
export const buscarTecnologias = (termino: string): Tecnologia[] => {
  const terminoLower = termino.toLowerCase();
  return TECNOLOGIAS.filter(tech => 
    tech.nombre.toLowerCase().includes(terminoLower) ||
    tech.descripcion.toLowerCase().includes(terminoLower) ||
    tech.casos_uso.some(caso => caso.toLowerCase().includes(terminoLower))
  );
};

// Precios de roles de desarrollo (por hora en EUR)
export const ROLES_DESARROLLO = {
  'desarrollador-junior': { tarifa: 25, descripcion: 'Desarrollador Junior (0-2 años)' },
  'desarrollador-mid': { tarifa: 35, descripcion: 'Desarrollador Mid (2-5 años)' },
  'desarrollador-senior': { tarifa: 45, descripcion: 'Desarrollador Senior (5+ años)' },
  'tech-lead': { tarifa: 60, descripcion: 'Tech Lead / Arquitecto' },
  'fullstack-junior': { tarifa: 30, descripcion: 'Full Stack Junior' },
  'fullstack-mid': { tarifa: 40, descripcion: 'Full Stack Mid' },
  'fullstack-senior': { tarifa: 50, descripcion: 'Full Stack Senior' },
  'frontend-specialist': { tarifa: 35, descripcion: 'Especialista Frontend' },
  'backend-specialist': { tarifa: 40, descripcion: 'Especialista Backend' },
  'devops-engineer': { tarifa: 55, descripcion: 'DevOps Engineer' },
  'ui-ux-designer': { tarifa: 40, descripcion: 'UI/UX Designer' },
  'product-manager': { tarifa: 50, descripcion: 'Product Manager' },
  'project-manager': { tarifa: 45, descripcion: 'Project Manager' },
  'qa-tester': { tarifa: 30, descripcion: 'QA Tester' },
  'qa-automation': { tarifa: 40, descripcion: 'QA Automation Engineer' }
};

// Multiplicadores por complejidad del proyecto
export const MULTIPLICADORES_COMPLEJIDAD = {
  'basica': 1.0,
  'media': 1.3,
  'alta': 1.7,
  'enterprise': 2.2
};

// Porcentajes adicionales estándar
export const PORCENTAJES_ADICIONALES = {
  gestion: 15,        // Gestión de proyecto
  testing: 20,        // Testing y QA
  deployment: 10,     // Despliegue y configuración
  maintenance: 12,    // Mantenimiento (primer año)
  contingency: 10,    // Contingencias
  documentation: 8    // Documentación
};
