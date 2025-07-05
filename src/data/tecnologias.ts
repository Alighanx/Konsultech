// Base de datos de tecnologías con precios en soles peruanos (PEN)
export interface Tecnologia {
  id: string;
  nombre: string;
  categoria: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'tools' | 'security' | 'design' | 'mobile';
  tipo: 'licencia' | 'servicio' | 'desarrollo' | 'subscripcion';
  precio: number; // Precio en soles peruanos (PEN)
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
  // FRONTEND WEB
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
    casos_uso: ['SPAs', 'Aplicaciones web complejas', 'Dashboards', 'E-commerce'],
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
    id: 'nuxtjs',
    nombre: 'Nuxt.js',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework de Vue.js con SSR, SSG y optimizaciones automáticas',
    recomendada: true,
    ventajas: ['SSR/SSG', 'Basado en Vue.js', 'Configuración automática', 'Módulos'],
    desventajas: ['Menos flexible que Vue puro', 'Ecosistema más pequeño'],
    alternativas: ['Next.js', 'Gatsby', 'SvelteKit'],
    casos_uso: ['E-commerce', 'Blogs', 'Aplicaciones web full-stack'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://nuxtjs.org'
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
  {
    id: 'svelte',
    nombre: 'Svelte',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework que compila a JavaScript vanilla para máximo rendimiento',
    recomendada: false,
    ventajas: ['Muy rápido', 'Bundle pequeño', 'Sintaxis simple'],
    desventajas: ['Ecosistema pequeño', 'Menos recursos', 'Comunidad pequeña'],
    alternativas: ['React', 'Vue.js', 'Angular'],
    casos_uso: ['Aplicaciones de alto rendimiento', 'Proyectos pequeños'],
    complejidad: 'baja',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://svelte.dev'
  },
  {
    id: 'sveltekit',
    nombre: 'SvelteKit',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework full-stack basado en Svelte con SSR y routing',
    recomendada: false,
    ventajas: ['Muy rápido', 'SSR/SSG', 'Full-stack', 'Bundle pequeño'],
    desventajas: ['Nuevo', 'Ecosistema pequeño', 'Menos recursos'],
    alternativas: ['Next.js', 'Nuxt.js', 'Remix'],
    casos_uso: ['Aplicaciones web modernas', 'Prototipos rápidos'],
    complejidad: 'media',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://kit.svelte.dev'
  },
  {
    id: 'remix',
    nombre: 'Remix',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework full-stack de React centrado en web standards',
    recomendada: false,
    ventajas: ['Web standards', 'Excelente UX', 'Manejo de datos', 'SSR nativo'],
    desventajas: ['Nuevo', 'Ecosistema pequeño', 'Curva de aprendizaje'],
    alternativas: ['Next.js', 'Nuxt.js', 'SvelteKit'],
    casos_uso: ['Aplicaciones web modernas', 'E-commerce'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://remix.run'
  },
  {
    id: 'gatsby',
    nombre: 'Gatsby',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Generador de sitios estáticos basado en React y GraphQL',
    recomendada: false,
    ventajas: ['Muy rápido', 'SEO optimizado', 'GraphQL', 'Plugins'],
    desventajas: ['Compilación lenta', 'Complejidad innecesaria para sitios simples'],
    alternativas: ['Next.js', 'Nuxt.js', 'Hugo'],
    casos_uso: ['Blogs', 'Sitios marketing', 'Documentación'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://gatsbyjs.com'
  },
  {
    id: 'tailwindcss',
    nombre: 'Tailwind CSS',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework CSS utility-first para diseño rápido',
    recomendada: true,
    ventajas: ['Utility-first', 'Customizable', 'Consistent design', 'Pequeño en producción'],
    desventajas: ['HTML verbose', 'Curva de aprendizaje'],
    alternativas: ['Bootstrap', 'Bulma', 'CSS Modules'],
    casos_uso: ['Diseño rápido', 'Sistemas de diseño', 'Prototipos'],
    complejidad: 'baja',
    popularidad: 5,
    soporte: 'mixto',
    url_oficial: 'https://tailwindcss.com'
  },
  {
    id: 'bootstrap',
    nombre: 'Bootstrap',
    categoria: 'frontend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework CSS con componentes pre-construidos',
    recomendada: false,
    ventajas: ['Componentes listos', 'Responsive', 'Documentación', 'Comunidad'],
    desventajas: ['Diseños genéricos', 'Pesado', 'Menos flexible'],
    alternativas: ['Tailwind CSS', 'Bulma', 'Foundation'],
    casos_uso: ['Prototipos rápidos', 'Proyectos internos', 'MVPs'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://getbootstrap.com'
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
  {
    id: 'python-fastapi',
    nombre: 'Python + FastAPI',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework moderno y rápido para APIs con Python',
    recomendada: true,
    ventajas: ['Muy rápido', 'Documentación automática', 'Type hints', 'Async nativo'],
    desventajas: ['Relativamente nuevo', 'Ecosistema más pequeño'],
    alternativas: ['Django', 'Flask', 'Node.js Express'],
    casos_uso: ['APIs REST', 'Microservicios', 'Machine Learning APIs'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://fastapi.tiangolo.com'
  },
  {
    id: 'python-flask',
    nombre: 'Python + Flask',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework minimalista de Python para aplicaciones web',
    recomendada: false,
    ventajas: ['Ligero', 'Flexible', 'Fácil de aprender'],
    desventajas: ['Requiere más configuración', 'Menos características'],
    alternativas: ['Django', 'FastAPI', 'Node.js'],
    casos_uso: ['APIs simples', 'Prototipos', 'Microservicios'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'comunidad',
    url_oficial: 'https://flask.palletsprojects.com'
  },
  {
    id: 'php-laravel',
    nombre: 'PHP + Laravel',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework elegante de PHP para aplicaciones web',
    recomendada: false,
    ventajas: ['Desarrollo rápido', 'Eloquent ORM', 'Artisan CLI'],
    desventajas: ['PHP tiene limitaciones', 'Monolítico'],
    alternativas: ['Node.js', 'Django', 'Ruby on Rails'],
    casos_uso: ['CMS', 'E-commerce', 'Aplicaciones web tradicionales'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'comunidad',
    url_oficial: 'https://laravel.com'
  },
  {
    id: 'ruby-rails',
    nombre: 'Ruby on Rails',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework de Ruby para desarrollo web rápido',
    recomendada: false,
    ventajas: ['Convention over configuration', 'Desarrollo rápido', 'Comunidad'],
    desventajas: ['Performance', 'Curva de aprendizaje', 'Menos popular'],
    alternativas: ['Django', 'Laravel', 'Spring Boot'],
    casos_uso: ['Startups', 'Prototipos', 'E-commerce'],
    complejidad: 'media',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://rubyonrails.org'
  },
  {
    id: 'csharp-dotnet',
    nombre: 'C# + .NET Core',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework multiplataforma de Microsoft para aplicaciones web',
    recomendada: false,
    ventajas: ['Alto rendimiento', 'Type safety', 'Ecosistema robusto'],
    desventajas: ['Curva de aprendizaje', 'Más verboso'],
    alternativas: ['Java Spring', 'Node.js', 'Python Django'],
    casos_uso: ['Aplicaciones enterprise', 'APIs de alto rendimiento'],
    complejidad: 'alta',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://dotnet.microsoft.com'
  },
  {
    id: 'golang',
    nombre: 'Go (Golang)',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Lenguaje de Google para aplicaciones de alto rendimiento',
    recomendada: false,
    ventajas: ['Muy rápido', 'Concurrencia nativa', 'Compilado'],
    desventajas: ['Ecosistema más pequeño', 'Sintaxis simple pero limitada'],
    alternativas: ['Node.js', 'Java', 'Rust'],
    casos_uso: ['Microservicios', 'APIs de alto rendimiento', 'DevOps tools'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://golang.org'
  },
  {
    id: 'rust-actix',
    nombre: 'Rust + Actix Web',
    categoria: 'backend',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework web de Rust para máximo rendimiento y seguridad',
    recomendada: false,
    ventajas: ['Extremadamente rápido', 'Memory safe', 'Concurrencia'],
    desventajas: ['Curva de aprendizaje muy empinada', 'Ecosistema pequeño'],
    alternativas: ['Go', 'C++', 'Java'],
    casos_uso: ['Sistemas críticos', 'APIs de alto rendimiento'],
    complejidad: 'alta',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://actix.rs'
  },

  // MÁS BASES DE DATOS
  {
    id: 'sqlite',
    nombre: 'SQLite',
    categoria: 'database',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Base de datos ligera embebida',
    recomendada: false,
    ventajas: ['Muy ligero', 'Sin servidor', 'Fácil deployment'],
    desventajas: ['No escalable', 'Single user', 'Limitaciones'],
    alternativas: ['PostgreSQL', 'MySQL', 'MongoDB'],
    casos_uso: ['Prototipos', 'Aplicaciones pequeñas', 'Testing'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'comunidad',
    url_oficial: 'https://sqlite.org'
  },
  {
    id: 'redis',
    nombre: 'Redis',
    categoria: 'database',
    tipo: 'servicio',
    precio: 15,
    unidad: 'mes',
    descripcion: 'Base de datos en memoria para cache y sesiones',
    recomendada: true,
    ventajas: ['Muy rápido', 'Estructura de datos rica', 'Pub/Sub'],
    desventajas: ['Solo en memoria', 'Limitado por RAM'],
    alternativas: ['Memcached', 'DynamoDB', 'Cassandra'],
    casos_uso: ['Cache', 'Sesiones', 'Real-time analytics'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://redis.io'
  },
  {
    id: 'mariadb',
    nombre: 'MariaDB',
    categoria: 'database',
    tipo: 'servicio',
    precio: 18,
    unidad: 'mes',
    descripcion: 'Fork de MySQL con mejoras adicionales',
    recomendada: false,
    ventajas: ['Compatible con MySQL', 'Mejoras adicionales', 'Open source'],
    desventajas: ['Fragmentación del ecosistema MySQL'],
    alternativas: ['MySQL', 'PostgreSQL', 'SQLite'],
    casos_uso: ['Migración desde MySQL', 'Aplicaciones web'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'comunidad',
    url_oficial: 'https://mariadb.org'
  },
  {
    id: 'cassandra',
    nombre: 'Apache Cassandra',
    categoria: 'database',
    tipo: 'servicio',
    precio: 45,
    unidad: 'mes',
    descripcion: 'Base de datos NoSQL distribuida para big data',
    recomendada: false,
    ventajas: ['Altamente escalable', 'Tolerancia a fallos', 'Big data'],
    desventajas: ['Complejo', 'Eventual consistency', 'Curva de aprendizaje'],
    alternativas: ['MongoDB', 'DynamoDB', 'CouchDB'],
    casos_uso: ['Big data', 'IoT', 'Analytics en tiempo real'],
    complejidad: 'alta',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://cassandra.apache.org'
  },
  {
    id: 'elasticsearch',
    nombre: 'Elasticsearch',
    categoria: 'database',
    tipo: 'servicio',
    precio: 35,
    unidad: 'mes',
    descripcion: 'Motor de búsqueda y análisis distribuido',
    recomendada: false,
    ventajas: ['Búsqueda full-text', 'Analytics', 'Escalable'],
    desventajas: ['Complejo', 'Consumo de recursos', 'Caro'],
    alternativas: ['PostgreSQL full-text', 'Solr', 'MongoDB'],
    casos_uso: ['Búsqueda', 'Logging', 'Analytics'],
    complejidad: 'alta',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://elasticsearch.com'
  },
  {
    id: 'dynamodb',
    nombre: 'Amazon DynamoDB',
    categoria: 'database',
    tipo: 'servicio',
    precio: 25,
    unidad: 'mes',
    descripcion: 'Base de datos NoSQL serverless de AWS',
    recomendada: false,
    ventajas: ['Serverless', 'Escalabilidad automática', 'Baja latencia'],
    desventajas: ['Vendor lock-in', 'Limitaciones de consultas', 'Costo variable'],
    alternativas: ['MongoDB', 'PostgreSQL', 'Redis'],
    casos_uso: ['Aplicaciones serverless', 'IoT', 'Gaming'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://aws.amazon.com/dynamodb'
  },
  {
    id: 'firebase-firestore',
    nombre: 'Firebase Firestore',
    categoria: 'database',
    tipo: 'servicio',
    precio: 20,
    unidad: 'mes',
    descripcion: 'Base de datos NoSQL de Google para aplicaciones web y móviles',
    recomendada: false,
    ventajas: ['Real-time sync', 'Offline support', 'Integración móvil'],
    desventajas: ['Vendor lock-in', 'Limitaciones de consultas', 'Pricing complejo'],
    alternativas: ['MongoDB', 'PostgreSQL', 'Supabase'],
    casos_uso: ['Apps móviles', 'Apps real-time', 'Prototipos'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://firebase.google.com/firestore'
  },

  // MÁS INFRAESTRUCTURA
  {
    id: 'google-cloud',
    nombre: 'Google Cloud Platform',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 45,
    unidad: 'mes',
    descripcion: 'Plataforma de nube de Google con servicios escalables',
    recomendada: true,
    ventajas: ['Machine Learning integrado', 'Kubernetes nativo', 'Precios competitivos'],
    desventajas: ['Menor cuota de mercado', 'Menos servicios que AWS'],
    alternativas: ['AWS', 'Microsoft Azure', 'DigitalOcean'],
    casos_uso: ['Machine Learning', 'Kubernetes', 'Analytics'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://cloud.google.com'
  },
  {
    id: 'microsoft-azure',
    nombre: 'Microsoft Azure',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 48,
    unidad: 'mes',
    descripcion: 'Plataforma de nube de Microsoft para aplicaciones empresariales',
    recomendada: false,
    ventajas: ['Integración Microsoft', 'Híbrido cloud', 'Enterprise features'],
    desventajas: ['Interfaz compleja', 'Precios variables'],
    alternativas: ['AWS', 'Google Cloud', 'DigitalOcean'],
    casos_uso: ['Aplicaciones enterprise', '.NET apps', 'Híbrido cloud'],
    complejidad: 'alta',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://azure.microsoft.com'
  },
  {
    id: 'digitalocean',
    nombre: 'DigitalOcean',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 25,
    unidad: 'mes',
    descripcion: 'Hosting cloud simple y económico para desarrolladores',
    recomendada: true,
    ventajas: ['Simple de usar', 'Precios claros', 'Buena documentación'],
    desventajas: ['Menos servicios', 'No enterprise features'],
    alternativas: ['AWS', 'Linode', 'Vultr'],
    casos_uso: ['Startups', 'Aplicaciones simples', 'Desarrollo'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://digitalocean.com'
  },
  {
    id: 'vercel',
    nombre: 'Vercel',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 20,
    unidad: 'mes',
    descripcion: 'Plataforma para deployment de aplicaciones frontend y serverless',
    recomendada: true,
    ventajas: ['Deploy automático', 'Edge network', 'Integración Git'],
    desventajas: ['Limitado a frontend/serverless', 'Pricing por uso'],
    alternativas: ['Netlify', 'AWS Amplify', 'Firebase Hosting'],
    casos_uso: ['Frontend apps', 'JAMstack', 'Next.js apps'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://vercel.com'
  },
  {
    id: 'netlify',
    nombre: 'Netlify',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 18,
    unidad: 'mes',
    descripcion: 'Plataforma para sitios estáticos y JAMstack',
    recomendada: true,
    ventajas: ['Deploy continuo', 'CDN global', 'Forms handling'],
    desventajas: ['Limitado a sites estáticos', 'Functions limitadas'],
    alternativas: ['Vercel', 'GitHub Pages', 'AWS Amplify'],
    casos_uso: ['Sites estáticos', 'Blogs', 'Landing pages'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://netlify.com'
  },
  {
    id: 'railway',
    nombre: 'Railway',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 22,
    unidad: 'mes',
    descripcion: 'Plataforma de deployment simple para aplicaciones full-stack',
    recomendada: false,
    ventajas: ['Muy simple', 'Deploy desde Git', 'Databases incluidas'],
    desventajas: ['Nuevo', 'Limitado', 'Menos features'],
    alternativas: ['Heroku', 'DigitalOcean', 'AWS'],
    casos_uso: ['Prototipos', 'Apps pequeñas', 'Startups'],
    complejidad: 'baja',
    popularidad: 2,
    soporte: 'empresa',
    url_oficial: 'https://railway.app'
  },
  {
    id: 'heroku',
    nombre: 'Heroku',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 30,
    unidad: 'mes',
    descripcion: 'Plataforma como servicio (PaaS) para deployment fácil',
    recomendada: false,
    ventajas: ['Muy fácil de usar', 'Add-ons ecosystem', 'Git deployment'],
    desventajas: ['Caro para producción', 'Limitaciones', 'Dyno sleeping'],
    alternativas: ['Railway', 'DigitalOcean', 'AWS'],
    casos_uso: ['Prototipos', 'MVPs', 'Desarrollo'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://heroku.com'
  },

  // HERRAMIENTAS Y SERVICIOS
  {
    id: 'docker',
    nombre: 'Docker',
    categoria: 'tools',
    tipo: 'desarrollo',
    precio: 5,
    unidad: 'mes',
    descripcion: 'Plataforma de contenedores para deployment consistente',
    recomendada: true,
    ventajas: ['Consistent environments', 'Scalable', 'DevOps friendly'],
    desventajas: ['Curva de aprendizaje', 'Overhead'],
    alternativas: ['Virtual machines', 'Kubernetes', 'Podman'],
    casos_uso: ['Microservicios', 'CI/CD', 'Development environments'],
    complejidad: 'media',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://docker.com'
  },
  {
    id: 'kubernetes',
    nombre: 'Kubernetes',
    categoria: 'infrastructure',
    tipo: 'servicio',
    precio: 40,
    unidad: 'mes',
    descripcion: 'Orquestador de contenedores para aplicaciones escalables',
    recomendada: false,
    ventajas: ['Altamente escalable', 'Self-healing', 'Industry standard'],
    desventajas: ['Muy complejo', 'Overhead', 'Curva de aprendizaje empinada'],
    alternativas: ['Docker Swarm', 'AWS ECS', 'Managed services'],
    casos_uso: ['Aplicaciones enterprise', 'Microservicios', 'High availability'],
    complejidad: 'alta',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://kubernetes.io'
  },
  {
    id: 'github-actions',
    nombre: 'GitHub Actions',
    categoria: 'tools',
    tipo: 'servicio',
    precio: 8,
    unidad: 'mes',
    descripcion: 'CI/CD integrado con GitHub para automatización',
    recomendada: true,
    ventajas: ['Integración GitHub', 'Fácil configuración', 'Marketplace'],
    desventajas: ['Limitado a GitHub', 'Minutes limitados'],
    alternativas: ['GitLab CI', 'Jenkins', 'CircleCI'],
    casos_uso: ['CI/CD', 'Testing automatizado', 'Deployments'],
    complejidad: 'baja',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://github.com/features/actions'
  },
  {
    id: 'gitlab-ci',
    nombre: 'GitLab CI/CD',
    categoria: 'tools',
    tipo: 'servicio',
    precio: 12,
    unidad: 'mes',
    descripcion: 'Plataforma completa de DevOps con CI/CD integrado',
    recomendada: false,
    ventajas: ['DevOps completo', 'Self-hosted option', 'Pipelines robustos'],
    desventajas: ['Interface compleja', 'Curva de aprendizaje'],
    alternativas: ['GitHub Actions', 'Jenkins', 'Azure DevOps'],
    casos_uso: ['Enterprise DevOps', 'Self-hosted CI/CD'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://gitlab.com'
  },

  // SEGURIDAD
  {
    id: 'auth0',
    nombre: 'Auth0',
    categoria: 'security',
    tipo: 'servicio',
    precio: 25,
    unidad: 'mes',
    descripcion: 'Plataforma de autenticación y autorización como servicio',
    recomendada: true,
    ventajas: ['Fácil integración', 'Múltiples providers', 'Seguridad robusta'],
    desventajas: ['Costo', 'Vendor lock-in', 'Complejidad para casos simples'],
    alternativas: ['NextAuth.js', 'Firebase Auth', 'AWS Cognito'],
    casos_uso: ['Autenticación web', 'SSO', 'APIs seguras'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://auth0.com'
  },
  {
    id: 'nextauth',
    nombre: 'NextAuth.js',
    categoria: 'security',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Biblioteca de autenticación para Next.js',
    recomendada: true,
    ventajas: ['Gratis', 'Múltiples providers', 'Fácil configuración'],
    desventajas: ['Solo para Next.js', 'Menos features que Auth0'],
    alternativas: ['Auth0', 'Passport.js', 'Firebase Auth'],
    casos_uso: ['Next.js apps', 'Autenticación simple', 'Prototipos'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://next-auth.js.org'
  },
  {
    id: 'firebase-auth',
    nombre: 'Firebase Authentication',
    categoria: 'security',
    tipo: 'servicio',
    precio: 15,
    unidad: 'mes',
    descripcion: 'Servicio de autenticación de Google Firebase',
    recomendada: false,
    ventajas: ['Integración Firebase', 'Múltiples providers', 'Mobile friendly'],
    desventajas: ['Vendor lock-in', 'Limitaciones de customización'],
    alternativas: ['Auth0', 'NextAuth.js', 'AWS Cognito'],
    casos_uso: ['Apps móviles', 'Firebase ecosystem', 'Prototipos'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://firebase.google.com/auth'
  },

  // MOBILE - DESARROLLO NATIVO
  {
    id: 'swift-ios',
    nombre: 'Swift (iOS Nativo)',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Desarrollo nativo para iOS usando Swift',
    recomendada: true,
    ventajas: ['Performance máximo', 'Todas las APIs nativas', 'Swift language', 'Xcode integration'],
    desventajas: ['Solo iOS', 'Curva de aprendizaje', 'Xcode required', 'Mac required'],
    alternativas: ['React Native', 'Flutter', 'Ionic'],
    casos_uso: ['Apps iOS complejas', 'Performance crítico', 'APIs específicas iOS', 'Juegos móviles'],
    complejidad: 'alta',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://developer.apple.com/swift'
  },
  {
    id: 'kotlin-android',
    nombre: 'Kotlin (Android Nativo)',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Desarrollo nativo para Android usando Kotlin',
    recomendada: true,
    ventajas: ['Performance máximo', 'Todas las APIs nativas', 'Kotlin language', 'Android Studio integration'],
    desventajas: ['Solo Android', 'Android Studio required', 'Curva de aprendizaje'],
    alternativas: ['React Native', 'Flutter', 'Ionic'],
    casos_uso: ['Apps Android complejas', 'Performance crítico', 'APIs específicas Android', 'Juegos móviles'],
    complejidad: 'alta',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://kotlinlang.org'
  },
  {
    id: 'java-android',
    nombre: 'Java (Android)',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Desarrollo nativo para Android usando Java',
    recomendada: false,
    ventajas: ['Language familiar', 'Todas las APIs nativas', 'Documentación extensa'],
    desventajas: ['Solo Android', 'Verbose', 'Kotlin es preferido'],
    alternativas: ['Kotlin', 'React Native', 'Flutter'],
    casos_uso: ['Apps Android', 'Legacy projects', 'Equipos Java'],
    complejidad: 'alta',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://developer.android.com'
  },
  {
    id: 'objective-c',
    nombre: 'Objective-C (iOS)',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Desarrollo nativo para iOS usando Objective-C',
    recomendada: false,
    ventajas: ['Language maduro', 'Todas las APIs nativas', 'Legacy support'],
    desventajas: ['Solo iOS', 'Sintaxis compleja', 'Swift es preferido'],
    alternativas: ['Swift', 'React Native', 'Flutter'],
    casos_uso: ['Legacy iOS apps', 'Mantenimiento de código existente'],
    complejidad: 'alta',
    popularidad: 2,
    soporte: 'empresa',
    url_oficial: 'https://developer.apple.com'
  },

  // MOBILE - CROSS-PLATFORM
  {
    id: 'react-native',
    nombre: 'React Native',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework para apps móviles nativas usando React',
    recomendada: true,
    ventajas: ['Code sharing', 'Native performance', 'React ecosystem', 'Hot reload'],
    desventajas: ['Bridge overhead', 'Platform-specific bugs', 'Third-party dependencies'],
    alternativas: ['Flutter', 'Ionic', 'Native development'],
    casos_uso: ['Apps iOS/Android', 'MVPs móviles', 'Cross-platform', 'Startups'],
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
    descripcion: 'Framework de Google para apps nativas multiplataforma',
    recomendada: true,
    ventajas: ['Performance nativo', 'UI consistente', 'Hot reload', 'Dart language'],
    desventajas: ['Dart language', 'App size', 'Ecosistema más pequeño'],
    alternativas: ['React Native', 'Ionic', 'Xamarin'],
    casos_uso: ['Apps móviles', 'Cross-platform', 'UI complejas', 'Startups'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://flutter.dev'
  },
  {
    id: 'xamarin',
    nombre: 'Xamarin',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework de Microsoft para apps móviles usando C#',
    recomendada: false,
    ventajas: ['Ecosistema .NET', 'Code sharing', 'Performance nativo'],
    desventajas: ['Microsoft-centric', 'App size', 'Menos popular'],
    alternativas: ['React Native', 'Flutter', 'Ionic'],
    casos_uso: ['Enterprise apps', 'Apps .NET ecosystem', 'Equipos Microsoft'],
    complejidad: 'media',
    popularidad: 2,
    soporte: 'empresa',
    url_oficial: 'https://dotnet.microsoft.com/apps/xamarin'
  },
  {
    id: 'ionic',
    nombre: 'Ionic',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework híbrido para apps móviles usando web technologies',
    recomendada: false,
    ventajas: ['Web technologies', 'Rápido desarrollo', 'Code sharing'],
    desventajas: ['Performance', 'Native feel limitado', 'Dependencia de Cordova'],
    alternativas: ['React Native', 'Flutter', 'Cordova'],
    casos_uso: ['MVPs móviles', 'Apps simples', 'Prototipos'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://ionicframework.com'
  },
  {
    id: 'cordova',
    nombre: 'Apache Cordova',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Platform para crear apps móviles usando HTML, CSS y JavaScript',
    recomendada: false,
    ventajas: ['Web technologies', 'Plugins ecosystem', 'Cross-platform'],
    desventajas: ['Performance limitado', 'UI no nativa', 'Deprecated'],
    alternativas: ['React Native', 'Flutter', 'Ionic'],
    casos_uso: ['Apps simples', 'Prototipos', 'Web to mobile'],
    complejidad: 'baja',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://cordova.apache.org'
  },
  {
    id: 'expo',
    nombre: 'Expo',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Platform para desarrollar React Native apps más rápido',
    recomendada: true,
    ventajas: ['Desarrollo rápido', 'No Xcode/Android Studio', 'OTA updates', 'Expo Go'],
    desventajas: ['Limitaciones de funcionalidades nativas', 'App size', 'Vendor lock-in'],
    alternativas: ['React Native CLI', 'Flutter'],
    casos_uso: ['Prototipos rápidos', 'MVPs', 'Apps simples', 'Startups'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://expo.dev'
  },
  {
    id: 'capacitor',
    nombre: 'Capacitor',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Runtime nativo para apps web como móviles nativas',
    recomendada: false,
    ventajas: ['Web technologies', 'APIs nativas', 'PWA support'],
    desventajas: ['Performance limitado', 'Native feel limitado'],
    alternativas: ['React Native', 'Flutter', 'Ionic'],
    casos_uso: ['PWAs como apps móviles', 'Apps web existentes'],
    complejidad: 'baja',
    popularidad: 2,
    soporte: 'empresa',
    url_oficial: 'https://capacitorjs.com'
  },

  // MOBILE - GAMING
  {
    id: 'unity',
    nombre: 'Unity',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Engine para desarrollo de juegos móviles y apps interactivas',
    recomendada: true,
    ventajas: ['Cross-platform', 'Graphics engine', 'Asset store', 'Visual scripting'],
    desventajas: ['Overhead para apps simples', 'Curva de aprendizaje', 'App size'],
    alternativas: ['Unreal Engine', 'Godot', 'React Native'],
    casos_uso: ['Juegos móviles', 'Apps AR/VR', 'Apps interactivas', 'Simuladores'],
    complejidad: 'alta',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://unity.com'
  },
  {
    id: 'unreal-engine',
    nombre: 'Unreal Engine',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Engine avanzado para juegos móviles de alta calidad',
    recomendada: false,
    ventajas: ['Graphics de alta calidad', 'Blueprint visual scripting', 'AAA games'],
    desventajas: ['App size muy grande', 'Complejo', 'Overhead'],
    alternativas: ['Unity', 'Godot', 'Native development'],
    casos_uso: ['Juegos móviles AAA', 'Apps AR/VR avanzadas'],
    complejidad: 'alta',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://unrealengine.com'
  },
  {
    id: 'godot',
    nombre: 'Godot',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Engine open-source para juegos móviles',
    recomendada: false,
    ventajas: ['Open source', 'Ligero', 'GDScript fácil', 'Exportación móvil'],
    desventajas: ['Menos recursos', 'Comunidad pequeña', 'Menos plugins'],
    alternativas: ['Unity', 'Unreal Engine', 'Construct'],
    casos_uso: ['Juegos indie', 'Prototipos de juegos', 'Juegos 2D'],
    complejidad: 'media',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://godotengine.org'
  },

  // MOBILE - BACKEND/SERVICES
  {
    id: 'firebase-mobile',
    nombre: 'Firebase Mobile SDK',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Backend como servicio para aplicaciones móviles',
    recomendada: true,
    ventajas: ['Backend listo', 'Realtime database', 'Auth incluido', 'Push notifications'],
    desventajas: ['Vendor lock-in', 'Costos por uso', 'Menos control'],
    alternativas: ['AWS Amplify', 'Supabase', 'Backend custom'],
    casos_uso: ['MVPs móviles', 'Apps tiempo real', 'Prototipos', 'Startups'],
    complejidad: 'baja',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://firebase.google.com'
  },
  {
    id: 'aws-amplify-mobile',
    nombre: 'AWS Amplify Mobile',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 74,
    unidad: 'mes',
    descripcion: 'Platform de AWS para desarrollo móvil full-stack',
    recomendada: false,
    ventajas: ['Ecosistema AWS', 'Scalable', 'GraphQL automático', 'Offline support'],
    desventajas: ['Complejidad AWS', 'Costos variables', 'Curva de aprendizaje'],
    alternativas: ['Firebase', 'Supabase', 'Backend custom'],
    casos_uso: ['Apps enterprise', 'Escalabilidad alta', 'Ecosistema AWS'],
    complejidad: 'alta',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://aws.amazon.com/amplify'
  },
  {
    id: 'supabase-mobile',
    nombre: 'Supabase Mobile',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Alternative open-source a Firebase para móviles',
    recomendada: true,
    ventajas: ['Open source', 'PostgreSQL', 'Auth incluido', 'Real-time'],
    desventajas: ['Más nuevo', 'Menos integrado', 'Documentación limitada'],
    alternativas: ['Firebase', 'AWS Amplify', 'Backend custom'],
    casos_uso: ['Apps móviles', 'MVPs', 'Alternativa a Firebase'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://supabase.com'
  },
  {
    id: 'appwrite-mobile',
    nombre: 'Appwrite Mobile',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Backend como servicio open-source para móviles',
    recomendada: false,
    ventajas: ['Open source', 'Self-hosted', 'APIs REST/GraphQL', 'Multi-platform'],
    desventajas: ['Más nuevo', 'Menos integrado', 'Requiere setup'],
    alternativas: ['Firebase', 'Supabase', 'AWS Amplify'],
    casos_uso: ['Apps móviles self-hosted', 'Alternativa open-source'],
    complejidad: 'media',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://appwrite.io'
  },
  {
    id: 'realm-mobile',
    nombre: 'Realm Mobile Database',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 148,
    unidad: 'mes',
    descripcion: 'Base de datos móvil con sincronización en tiempo real',
    recomendada: false,
    ventajas: ['Offline-first', 'Sync automático', 'Performance', 'Easy to use'],
    desventajas: ['Vendor lock-in', 'Costos', 'Menos flexible'],
    alternativas: ['Firebase', 'SQLite', 'WatermelonDB'],
    casos_uso: ['Apps offline-first', 'Sync complejo', 'Performance crítico'],
    complejidad: 'media',
    popularidad: 2,
    soporte: 'empresa',
    url_oficial: 'https://realm.io'
  },
  {
    id: 'sqlite-mobile',
    nombre: 'SQLite Mobile',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Base de datos local para aplicaciones móviles',
    recomendada: true,
    ventajas: ['Local storage', 'Performance', 'Offline support', 'Estándar'],
    desventajas: ['No sync automático', 'Queries manuales', 'Migrations'],
    alternativas: ['Realm', 'Firebase', 'WatermelonDB'],
    casos_uso: ['Storage local', 'Apps offline', 'Caching'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'comunidad',
    url_oficial: 'https://sqlite.org'
  },
  {
    id: 'watermelondb',
    nombre: 'WatermelonDB',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Base de datos reactive para apps móviles React Native',
    recomendada: false,
    ventajas: ['Reactive', 'Performance', 'Offline-first', 'React Native optimized'],
    desventajas: ['React Native specific', 'Curva de aprendizaje', 'Menos maduro'],
    alternativas: ['SQLite', 'Realm', 'Firebase'],
    casos_uso: ['Apps React Native', 'Performance crítico', 'Offline-first'],
    complejidad: 'media',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://watermelondb.com'
  },

  // MOBILE - TESTING
  {
    id: 'detox',
    nombre: 'Detox',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework E2E testing para React Native',
    recomendada: true,
    ventajas: ['E2E testing', 'React Native specific', 'Stable', 'CI/CD ready'],
    desventajas: ['React Native only', 'Setup complejo', 'Simulador dependent'],
    alternativas: ['Appium', 'Maestro', 'Manual testing'],
    casos_uso: ['React Native E2E', 'Automated testing', 'CI/CD'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'comunidad',
    url_oficial: 'https://wix.github.io/Detox'
  },
  {
    id: 'appium',
    nombre: 'Appium',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework automation testing para apps móviles',
    recomendada: false,
    ventajas: ['Cross-platform', 'Multiple languages', 'Real devices'],
    desventajas: ['Setup complejo', 'Performance', 'Maintenance'],
    alternativas: ['Detox', 'Maestro', 'XCUITest'],
    casos_uso: ['Cross-platform testing', 'Automated QA', 'CI/CD'],
    complejidad: 'alta',
    popularidad: 3,
    soporte: 'comunidad',
    url_oficial: 'https://appium.io'
  },
  {
    id: 'maestro',
    nombre: 'Maestro',
    categoria: 'mobile',
    tipo: 'desarrollo',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Framework simple para UI testing móvil',
    recomendada: false,
    ventajas: ['Simple', 'Cross-platform', 'Easy setup', 'Fast'],
    desventajas: ['Nuevo', 'Menos features', 'Comunidad pequeña'],
    alternativas: ['Detox', 'Appium', 'XCUITest'],
    casos_uso: ['UI testing simple', 'Prototipos', 'Smoke tests'],
    complejidad: 'baja',
    popularidad: 2,
    soporte: 'comunidad',
    url_oficial: 'https://maestro.mobile.dev'
  },

  // MOBILE - ANALYTICS & MONITORING
  {
    id: 'analytics-mobile',
    nombre: 'Firebase Analytics',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Analytics para aplicaciones móviles',
    recomendada: true,
    ventajas: ['Gratis', 'Integrado Firebase', 'Eventos custom', 'Audiences'],
    desventajas: ['Vendor lock-in', 'Limitado', 'Privacy concerns'],
    alternativas: ['Mixpanel', 'Amplitude', 'Custom analytics'],
    casos_uso: ['User behavior', 'App performance', 'Marketing'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://firebase.google.com/products/analytics'
  },
  {
    id: 'crashlytics',
    nombre: 'Firebase Crashlytics',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Crash reporting para aplicaciones móviles',
    recomendada: true,
    ventajas: ['Gratis', 'Real-time', 'Detailed reports', 'Integrado Firebase'],
    desventajas: ['Vendor lock-in', 'Privacy concerns'],
    alternativas: ['Bugsnag', 'Sentry', 'Custom logging'],
    casos_uso: ['Crash monitoring', 'Error tracking', 'App stability'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://firebase.google.com/products/crashlytics'
  },
  {
    id: 'sentry-mobile',
    nombre: 'Sentry Mobile',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 26,
    unidad: 'mes',
    descripcion: 'Error tracking y performance monitoring para móviles',
    recomendada: false,
    ventajas: ['Detailed errors', 'Performance monitoring', 'Custom dashboards'],
    desventajas: ['Costos', 'Setup complejo', 'Overhead'],
    alternativas: ['Crashlytics', 'Bugsnag', 'Custom logging'],
    casos_uso: ['Error tracking', 'Performance monitoring', 'Production apps'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://sentry.io'
  },

  // MOBILE - PUSH NOTIFICATIONS
  {
    id: 'fcm',
    nombre: 'Firebase Cloud Messaging',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Push notifications para aplicaciones móviles',
    recomendada: true,
    ventajas: ['Gratis', 'Cross-platform', 'Reliable', 'Integrado Firebase'],
    desventajas: ['Vendor lock-in', 'Limitado customization'],
    alternativas: ['OneSignal', 'Pusher', 'Custom solution'],
    casos_uso: ['Push notifications', 'User engagement', 'Marketing'],
    complejidad: 'baja',
    popularidad: 5,
    soporte: 'empresa',
    url_oficial: 'https://firebase.google.com/products/cloud-messaging'
  },
  {
    id: 'onesignal',
    nombre: 'OneSignal',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Platform de push notifications cross-platform',
    recomendada: false,
    ventajas: ['Gratis', 'Cross-platform', 'Rich features', 'Segmentation'],
    desventajas: ['Vendor lock-in', 'Privacy concerns', 'Limited free tier'],
    alternativas: ['FCM', 'Pusher', 'Custom solution'],
    casos_uso: ['Push notifications', 'User engagement', 'Marketing'],
    complejidad: 'baja',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://onesignal.com'
  },

  // MOBILE - PAYMENT
  {
    id: 'stripe-mobile',
    nombre: 'Stripe Mobile SDK',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 185, // 3.5% + 30 cents per transaction
    unidad: 'mes',
    descripcion: 'Pagos en aplicaciones móviles',
    recomendada: true,
    ventajas: ['Fácil integración', 'Secure', 'Multiple payment methods', 'Global'],
    desventajas: ['Fees', 'Complex for basic needs', 'KYC requirements'],
    alternativas: ['PayPal', 'Square', 'In-app purchases'],
    casos_uso: ['E-commerce apps', 'Subscription apps', 'Marketplace'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://stripe.com'
  },
  {
    id: 'paypal-mobile',
    nombre: 'PayPal Mobile SDK',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 148, // 2.9% + fixed fee
    unidad: 'mes',
    descripcion: 'Pagos PayPal en aplicaciones móviles',
    recomendada: false,
    ventajas: ['Brand recognition', 'Multiple payment methods', 'Buyer protection'],
    desventajas: ['Fees', 'Complex integration', 'User friction'],
    alternativas: ['Stripe', 'Square', 'In-app purchases'],
    casos_uso: ['E-commerce apps', 'Marketplace', 'Global payments'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://paypal.com'
  },
  {
    id: 'in-app-purchases',
    nombre: 'In-App Purchases',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 111, // 30% app store fee
    unidad: 'mes',
    descripcion: 'Compras dentro de la aplicación (App Store/Google Play)',
    recomendada: true,
    ventajas: ['Native integration', 'User trust', 'Simple UX'],
    desventajas: ['30% fee', 'Platform restrictions', 'Limited products'],
    alternativas: ['Stripe', 'PayPal', 'Direct payments'],
    casos_uso: ['Premium features', 'Subscriptions', 'Digital goods'],
    complejidad: 'media',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://developer.apple.com/in-app-purchase'
  },

  // MOBILE - SOCIAL LOGIN
  {
    id: 'auth0-mobile',
    nombre: 'Auth0 Mobile',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 69,
    unidad: 'mes',
    descripcion: 'Authentication y authorization para móviles',
    recomendada: false,
    ventajas: ['Multiple providers', 'Secure', 'Easy integration', 'SSO'],
    desventajas: ['Costos', 'Vendor lock-in', 'Complex setup'],
    alternativas: ['Firebase Auth', 'AWS Cognito', 'Custom auth'],
    casos_uso: ['Enterprise apps', 'Multiple auth methods', 'SSO'],
    complejidad: 'media',
    popularidad: 3,
    soporte: 'empresa',
    url_oficial: 'https://auth0.com'
  },
  {
    id: 'firebase-auth',
    nombre: 'Firebase Authentication',
    categoria: 'mobile',
    tipo: 'servicio',
    precio: 0,
    unidad: 'gratis',
    descripcion: 'Authentication para aplicaciones móviles',
    recomendada: true,
    ventajas: ['Gratis', 'Multiple providers', 'Easy integration', 'Integrado Firebase'],
    desventajas: ['Vendor lock-in', 'Limited customization'],
    alternativas: ['Auth0', 'AWS Cognito', 'Custom auth'],
    casos_uso: ['User authentication', 'Social login', 'MVPs'],
    complejidad: 'baja',
    popularidad: 4,
    soporte: 'empresa',
    url_oficial: 'https://firebase.google.com/products/auth'
  },

  // ...existing code...
];

// Funciones auxiliares para gestión de tecnologías

export function getTecnologiasPorCategoria(categoria: string): Tecnologia[] {
  return TECNOLOGIAS.filter(tech => tech.categoria === categoria);
}

export function getTecnologiasRecomendadas(): Tecnologia[] {
  return TECNOLOGIAS.filter(tech => tech.recomendada);
}

export function buscarTecnologias(termino: string): Tecnologia[] {
  const terminoLower = termino.toLowerCase();
  return TECNOLOGIAS.filter(tech => 
    tech.nombre.toLowerCase().includes(terminoLower) ||
    tech.descripcion.toLowerCase().includes(terminoLower)
  );
}

export function obtenerTecnologiaPorId(id: string): Tecnologia | undefined {
  return TECNOLOGIAS.find(tech => tech.id === id);
}

export function calcularCostoTecnologias(tecnologiaIds: string[], meses: number = 12): number {
  let costoTotal = 0;
  
  tecnologiaIds.forEach(id => {
    const tech = obtenerTecnologiaPorId(id);
    if (tech && tech.precio > 0) {
      switch (tech.unidad) {
        case 'mes':
          costoTotal += tech.precio * meses;
          break;
        case 'año':
          costoTotal += tech.precio;
          break;
        case 'proyecto':
          costoTotal += tech.precio;
          break;
        case 'usuario/mes':
          costoTotal += tech.precio * 10 * meses; // Asumiendo 10 usuarios
          break;
        case 'usuario/año':
          costoTotal += tech.precio * 10; // Asumiendo 10 usuarios
          break;
      }
    }
  });
  
  return costoTotal;
}

// Filtrar tecnologías según el tipo de proyecto
export function getTecnologiasPorTipoProyecto(tipoProyecto: string): {
  frontend: Tecnologia[];
  backend: Tecnologia[];
  database: Tecnologia[];
  mobile: Tecnologia[];
  infrastructure: Tecnologia[];
  tools: Tecnologia[];
  security: Tecnologia[];
  design: Tecnologia[];
} {
  const result = {
    frontend: [] as Tecnologia[],
    backend: [] as Tecnologia[],
    database: [] as Tecnologia[],
    mobile: [] as Tecnologia[],
    infrastructure: [] as Tecnologia[],
    tools: [] as Tecnologia[],
    security: [] as Tecnologia[],
    design: [] as Tecnologia[]
  };

  switch (tipoProyecto) {
    case 'mobile-app':
      // SOLO tecnologías móviles relevantes
      result.mobile = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'mobile' && (
          tech.id.includes('react-native') ||
          tech.id.includes('flutter') ||
          tech.id.includes('expo') ||
          tech.id.includes('swift-ios') ||
          tech.id.includes('kotlin-android') ||
          tech.id.includes('ionic') ||
          tech.id.includes('xamarin') ||
          tech.id.includes('firebase-mobile') ||
          tech.id.includes('supabase-mobile') ||
          tech.id.includes('sqlite-mobile') ||
          tech.id.includes('fcm') ||
          tech.id.includes('crashlytics') ||
          tech.id.includes('analytics-mobile') ||
          tech.id.includes('auth') ||
          tech.id.includes('stripe-mobile') ||
          tech.id.includes('paypal-mobile') ||
          tech.id.includes('in-app-purchases')
        )
      );
      
      // Backend específico para móviles (APIs, microservicios)
      result.backend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'backend' && (
          tech.id.includes('node') ||
          tech.id.includes('express') ||
          tech.id.includes('nestjs') ||
          tech.id.includes('fastify') ||
          tech.id.includes('python') ||
          tech.id.includes('django') ||
          tech.id.includes('fastapi') ||
          tech.id.includes('golang') ||
          tech.id.includes('java') ||
          tech.id.includes('spring') ||
          tech.casos_uso.includes('APIs') ||
          tech.casos_uso.includes('Microservicios')
        )
      );
      
      // Bases de datos móviles
      result.database = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'database' && (
          tech.id.includes('firebase') ||
          tech.id.includes('mongodb') ||
          tech.id.includes('postgresql') ||
          tech.id.includes('mysql') ||
          tech.id.includes('redis') ||
          tech.id.includes('supabase') ||
          tech.casos_uso.includes('APIs') ||
          tech.casos_uso.includes('Mobile')
        )
      );
      
      // Infraestructura para móviles
      result.infrastructure = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'infrastructure' && (
          tech.id.includes('firebase') ||
          tech.id.includes('aws') ||
          tech.id.includes('vercel') ||
          tech.id.includes('heroku') ||
          tech.id.includes('digitalocean') ||
          tech.id.includes('docker') ||
          tech.casos_uso.includes('APIs') ||
          tech.casos_uso.includes('Microservicios')
        )
      );
      
      // Herramientas para desarrollo móvil
      result.tools = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'tools' && (
          tech.id.includes('expo') ||
          tech.id.includes('android-studio') ||
          tech.id.includes('xcode') ||
          tech.id.includes('github') ||
          tech.id.includes('gitlab') ||
          tech.id.includes('bitbucket') ||
          tech.id.includes('figma') ||
          tech.id.includes('sketch') ||
          tech.id.includes('postman') ||
          tech.id.includes('jest') ||
          tech.id.includes('detox') ||
          tech.id.includes('appium') ||
          tech.casos_uso.includes('Mobile') ||
          tech.casos_uso.includes('Testing') ||
          tech.casos_uso.includes('Design')
        )
      );
      break;

    case 'web-app':
      // SOLO tecnologías web relevantes
      result.frontend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'frontend' && (
          tech.id.includes('react') ||
          tech.id.includes('nextjs') ||
          tech.id.includes('vue') ||
          tech.id.includes('nuxt') ||
          tech.id.includes('angular') ||
          tech.id.includes('svelte') ||
          tech.id.includes('sveltekit') ||
          tech.id.includes('remix') ||
          tech.casos_uso.includes('SPAs') ||
          tech.casos_uso.includes('Aplicaciones web')
        )
      );
      
      result.backend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'backend' && (
          tech.id.includes('node') ||
          tech.id.includes('express') ||
          tech.id.includes('nestjs') ||
          tech.id.includes('python') ||
          tech.id.includes('django') ||
          tech.id.includes('flask') ||
          tech.id.includes('php') ||
          tech.id.includes('laravel') ||
          tech.id.includes('ruby') ||
          tech.id.includes('rails') ||
          tech.id.includes('java') ||
          tech.id.includes('spring') ||
          tech.casos_uso.includes('Aplicaciones web') ||
          tech.casos_uso.includes('APIs')
        )
      );
      
      result.database = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'database' && (
          tech.id.includes('postgresql') ||
          tech.id.includes('mysql') ||
          tech.id.includes('mongodb') ||
          tech.id.includes('redis') ||
          tech.id.includes('sqlite') ||
          tech.id.includes('supabase') ||
          tech.casos_uso.includes('Web') ||
          tech.casos_uso.includes('Aplicaciones web')
        )
      );
      break;

    case 'ecommerce':
      // Tecnologías específicas para e-commerce
      result.frontend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'frontend' && (
          tech.id.includes('nextjs') ||
          tech.id.includes('nuxt') ||
          tech.id.includes('react') ||
          tech.id.includes('vue') ||
          tech.id.includes('shopify') ||
          tech.id.includes('woocommerce') ||
          tech.id.includes('magento') ||
          tech.casos_uso.includes('E-commerce') ||
          tech.casos_uso.includes('Tiendas online')
        )
      );
      
      result.backend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'backend' && (
          tech.id.includes('node') ||
          tech.id.includes('express') ||
          tech.id.includes('nestjs') ||
          tech.id.includes('python') ||
          tech.id.includes('django') ||
          tech.id.includes('php') ||
          tech.id.includes('laravel') ||
          tech.id.includes('ruby') ||
          tech.id.includes('rails') ||
          tech.id.includes('shopify') ||
          tech.id.includes('woocommerce') ||
          tech.id.includes('magento') ||
          tech.casos_uso.includes('E-commerce') ||
          tech.casos_uso.includes('APIs')
        )
      );
      
      result.database = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'database' && (
          tech.id.includes('postgresql') ||
          tech.id.includes('mysql') ||
          tech.id.includes('mongodb') ||
          tech.id.includes('redis') ||
          tech.casos_uso.includes('E-commerce') ||
          tech.casos_uso.includes('Transacciones')
        )
      );
      break;

    case 'api':
      // Solo tecnologías para APIs y microservicios
      result.backend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'backend' && (
          tech.id.includes('node') ||
          tech.id.includes('express') ||
          tech.id.includes('nestjs') ||
          tech.id.includes('fastify') ||
          tech.id.includes('python') ||
          tech.id.includes('fastapi') ||
          tech.id.includes('django') ||
          tech.id.includes('flask') ||
          tech.id.includes('golang') ||
          tech.id.includes('gin') ||
          tech.id.includes('echo') ||
          tech.id.includes('java') ||
          tech.id.includes('spring') ||
          tech.id.includes('csharp') ||
          tech.id.includes('aspnet') ||
          tech.id.includes('ruby') ||
          tech.id.includes('rails') ||
          tech.id.includes('graphql') ||
          tech.casos_uso.includes('APIs') ||
          tech.casos_uso.includes('Microservicios')
        )
      );
      
      result.database = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'database' && (
          tech.id.includes('postgresql') ||
          tech.id.includes('mysql') ||
          tech.id.includes('mongodb') ||
          tech.id.includes('redis') ||
          tech.id.includes('elasticsearch') ||
          tech.casos_uso.includes('APIs') ||
          tech.casos_uso.includes('High performance')
        )
      );
      
      result.tools = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'tools' && (
          tech.id.includes('postman') ||
          tech.id.includes('insomnia') ||
          tech.id.includes('swagger') ||
          tech.id.includes('docker') ||
          tech.id.includes('kubernetes') ||
          tech.id.includes('nginx') ||
          tech.id.includes('github') ||
          tech.id.includes('gitlab') ||
          tech.casos_uso.includes('APIs') ||
          tech.casos_uso.includes('Testing')
        )
      );
      break;

    case 'crm-erp':
      // Tecnologías empresariales
      result.frontend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'frontend' && (
          tech.id.includes('angular') ||
          tech.id.includes('react') ||
          tech.id.includes('vue') ||
          tech.id.includes('nextjs') ||
          tech.casos_uso.includes('Dashboards') ||
          tech.casos_uso.includes('Aplicaciones web') ||
          tech.casos_uso.includes('Enterprise')
        )
      );
      
      result.backend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'backend' && (
          tech.id.includes('java') ||
          tech.id.includes('spring') ||
          tech.id.includes('csharp') ||
          tech.id.includes('aspnet') ||
          tech.id.includes('node') ||
          tech.id.includes('nestjs') ||
          tech.id.includes('python') ||
          tech.id.includes('django') ||
          tech.id.includes('php') ||
          tech.id.includes('laravel') ||
          tech.casos_uso.includes('Enterprise') ||
          tech.casos_uso.includes('Aplicaciones web')
        )
      );
      
      result.database = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'database' && (
          tech.id.includes('postgresql') ||
          tech.id.includes('mysql') ||
          tech.id.includes('mssql') ||
          tech.id.includes('oracle') ||
          tech.id.includes('mongodb') ||
          tech.casos_uso.includes('Enterprise') ||
          tech.casos_uso.includes('Transacciones')
        )
      );
      break;

    case 'analytics':
      // Tecnologías para análisis de datos
      result.frontend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'frontend' && (
          tech.id.includes('react') ||
          tech.id.includes('vue') ||
          tech.id.includes('angular') ||
          tech.id.includes('d3') ||
          tech.id.includes('chart') ||
          tech.casos_uso.includes('Dashboards') ||
          tech.casos_uso.includes('Visualización')
        )
      );
      
      result.backend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'backend' && (
          tech.id.includes('python') ||
          tech.id.includes('django') ||
          tech.id.includes('flask') ||
          tech.id.includes('fastapi') ||
          tech.id.includes('node') ||
          tech.id.includes('java') ||
          tech.id.includes('r') ||
          tech.id.includes('scala') ||
          tech.casos_uso.includes('Análisis') ||
          tech.casos_uso.includes('Data processing')
        )
      );
      
      result.database = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'database' && (
          tech.id.includes('postgresql') ||
          tech.id.includes('mongodb') ||
          tech.id.includes('redis') ||
          tech.id.includes('elasticsearch') ||
          tech.id.includes('influxdb') ||
          tech.id.includes('clickhouse') ||
          tech.casos_uso.includes('Analytics') ||
          tech.casos_uso.includes('Big data')
        )
      );
      break;

    case 'game':
      // Tecnologías para videojuegos
      result.mobile = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'mobile' && (
          tech.id.includes('unity') ||
          tech.id.includes('unreal') ||
          tech.id.includes('godot') ||
          tech.id.includes('react-native') ||
          tech.id.includes('flutter') ||
          tech.casos_uso.includes('Juegos') ||
          tech.casos_uso.includes('Gaming')
        )
      );
      
      result.backend = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'backend' && (
          tech.id.includes('node') ||
          tech.id.includes('golang') ||
          tech.id.includes('java') ||
          tech.id.includes('csharp') ||
          tech.id.includes('python') ||
          tech.id.includes('rust') ||
          tech.id.includes('c++') ||
          tech.casos_uso.includes('Real-time') ||
          tech.casos_uso.includes('Gaming') ||
          tech.casos_uso.includes('APIs')
        )
      );
      
      result.database = TECNOLOGIAS.filter(tech => 
        tech.categoria === 'database' && (
          tech.id.includes('redis') ||
          tech.id.includes('mongodb') ||
          tech.id.includes('postgresql') ||
          tech.id.includes('firebase') ||
          tech.casos_uso.includes('Real-time') ||
          tech.casos_uso.includes('Gaming')
        )
      );
      break;

    default:
      // Por defecto, mostrar tecnologías recomendadas de cada categoría
      result.frontend = TECNOLOGIAS.filter(tech => tech.categoria === 'frontend' && tech.recomendada);
      result.backend = TECNOLOGIAS.filter(tech => tech.categoria === 'backend' && tech.recomendada);
      result.database = TECNOLOGIAS.filter(tech => tech.categoria === 'database' && tech.recomendada);
      result.mobile = TECNOLOGIAS.filter(tech => tech.categoria === 'mobile' && tech.recomendada);
      break;
  }

  // Agregar tecnologías comunes para todas las categorías si están vacías
  if (result.infrastructure.length === 0) {
    result.infrastructure = TECNOLOGIAS.filter(tech => 
      tech.categoria === 'infrastructure' && (
        tech.recomendada ||
        tech.id.includes('aws') ||
        tech.id.includes('vercel') ||
        tech.id.includes('heroku') ||
        tech.id.includes('digitalocean') ||
        tech.id.includes('docker') ||
        tech.id.includes('nginx')
      )
    );
  }
  
  if (result.tools.length === 0) {
    result.tools = TECNOLOGIAS.filter(tech => 
      tech.categoria === 'tools' && (
        tech.recomendada ||
        tech.id.includes('github') ||
        tech.id.includes('gitlab') ||
        tech.id.includes('figma') ||
        tech.id.includes('postman') ||
        tech.id.includes('jest') ||
        tech.id.includes('docker')
      )
    );
  }
  
  if (result.security.length === 0) {
    result.security = TECNOLOGIAS.filter(tech => 
      tech.categoria === 'security' && (
        tech.recomendada ||
        tech.id.includes('ssl') ||
        tech.id.includes('jwt') ||
        tech.id.includes('oauth') ||
        tech.id.includes('auth0') ||
        tech.id.includes('firebase-auth')
      )
    );
  }
  
  if (result.design.length === 0) {
    result.design = TECNOLOGIAS.filter(tech => 
      tech.categoria === 'design' && (
        tech.recomendada ||
        tech.id.includes('figma') ||
        tech.id.includes('sketch') ||
        tech.id.includes('adobe') ||
        tech.id.includes('canva')
      )
    );
  }

  return result;
}

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
