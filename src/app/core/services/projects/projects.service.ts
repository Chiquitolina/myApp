import { Injectable } from '@angular/core';
import { Project } from '../../interfaces/projects';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { sideProject } from '../../interfaces/sideProject';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor() {}

  private projects: Project[] = [
    // Orden visual de proyectos. IDs estables para conservar las URLs existentes.
    {
      id: 6,
      name: 'Quant System',
      description: 'Plataforma modular de investigación cuantitativa desarrollada en Python para estudiar el mercado de futuros de criptomonedas. Integra datos de Binance, procesamiento multi-timeframe, análisis estructural, evaluación de estrategias y simulación de operaciones con datos históricos y entornos de prueba.',
      descriptionEn: 'Modular quantitative research platform built in Python to study cryptocurrency futures markets. It combines Binance market data, multi-timeframe processing, market structure analysis, strategy evaluation, and trade simulation using historical data and test environments.',
      additionalDescription: {
        es: 'El proyecto comenzó como un motor de señales y ejecución en Binance Futures Testnet y evolucionó hacia un ecosistema de servicios y laboratorios de investigación. Reúne datos de mercado compartidos, experimentos reproducibles, replays cronológicos y dashboards interactivos para validar hipótesis antes de utilizarlas en una estrategia operativa.',
        en: 'The project started as a signal and execution engine on Binance Futures Testnet and evolved into an ecosystem of research services and analytical labs. It brings together shared market data, reproducible experiments, chronological replays, and interactive dashboards to test hypotheses before considering them for an operational strategy.',
      },
      link: '', // Sin demo pública verificada: el sistema opera en infraestructura privada.
      image: '',
      showDetails: false,
      technologies: [
        { name: 'Python', image: '' },
        { name: 'pandas', image: '' },
        { name: 'Binance Futures API', image: '' },
        { name: 'WebSockets', image: '' },
        { name: 'Redis', image: '' },
        { name: 'Streamlit', image: '' },
        { name: 'Linux / Ubuntu', image: '' },
        { name: 'PM2', image: '' },
        { name: 'Git', image: '' },
      ],
      clientSide: {
        projectName: 'Quant System',
        side: 'Motores de análisis e investigación',
        description: 'Arquitectura Python por capas para contexto de mercado, generación de señales, planificación de entradas, gestión de riesgo y ejecución de prueba. Incluye motores de compresión y breakout, Horizontal Levels Lab (HLL), Reaction & Swing Lab, análisis Multi-Swing y herramientas Discovery/Universal Runner. Los backtests y replays permiten examinar eventos históricos, comparar escenarios y evaluar estrategias sin asumir rentabilidad.',
        linkRepository: '',
        technologies: [],
      },
      serverSide: {
        projectName: 'Quant System',
        side: 'Datos e infraestructura',
        description: 'Ingesta de velas OHLCV mediante API y WebSockets de Binance, con procesamiento histórico y en streaming para múltiples símbolos y temporalidades. Servicios Python desplegados en un VPS Linux y administrados con PM2; Redis se utiliza para datos y snapshots compartidos. Journals, resultados de experimentos y auditorías conservan trazabilidad de eventos, gaps, estados PRE/POST y consistencia temporal.',
        linkRepository: '',
        technologies: [],
      },
      architectureCopyEn: {
        client: {
          title: 'Analysis and research engines',
          description: 'Layered Python architecture for market context, signal generation, entry planning, risk management, and test execution. Research modules include compression and breakout detection, Horizontal Levels Lab (HLL), Reaction & Swing Lab, Multi-Swing analysis, and Discovery/Universal Runner tools. Backtests and replays help inspect historical events, compare scenarios, and evaluate strategies without assuming profitability.',
        },
        server: {
          title: 'Data and infrastructure',
          description: 'OHLCV candle ingestion through Binance APIs and WebSockets, with historical and streaming processing across multiple symbols and timeframes. Python services run on a Linux VPS and are managed through PM2, while Redis provides shared data and snapshots. Journals, experiment outputs, and audits track events, data gaps, PRE/POST states, and temporal consistency.',
        },
      },
      additionalFeatures: {
        es: [
          'Procesamiento de un universo de hasta 290 símbolos y seis temporalidades, desde velas de 1 minuto.',
          'Contexto multi-timeframe de tendencia, momentum, volumen y comportamiento del mercado.',
          'Detección y seguimiento por estados de compresiones, breakouts y posibles entradas.',
          'Horizontal Levels Lab: niveles, zonas, defensas, rupturas, recuperaciones y continuidad estructural.',
          'Reaction & Swing Lab: retests, swings confirmados, Multi-Swing y estudio de confluencias.',
          'Discovery y Universal Runner para explorar eventos y comparar comportamientos entre símbolos.',
          'Backtesting, replays, simulación de portfolio y pruebas de ejecución en Binance Futures Testnet.',
          'Dashboards Streamlit con gráficos, filtros, overlays e inspectores de casos históricos.',
          'Journaling y auditorías de integridad, gaps, causalidad y separación PRE/POST.',
        ],
        en: [
          'Processing across a universe of up to 290 symbols and six timeframes, including 1-minute candles.',
          'Multi-timeframe market context covering trend, momentum, volume, and broader market behavior.',
          'State-based detection and tracking of compressions, breakouts, and potential entries.',
          'Horizontal Levels Lab: levels, zones, defenses, breaks, recoveries, and structural continuity.',
          'Reaction & Swing Lab: retests, confirmed swings, Multi-Swing, and confluence research.',
          'Discovery and Universal Runner to explore events and compare behavior across symbols.',
          'Backtesting, chronological replays, portfolio simulation, and Binance Futures Testnet execution tests.',
          'Streamlit dashboards with charts, filters, overlays, and historical case inspectors.',
          'Journaling and audits for data integrity, gaps, causality, and PRE/POST separation.',
        ],
      },
      testingCopy: {
        es: 'Se ejecutaron pruebas automatizadas, auditorías y replays históricos. Una evaluación de investigación procesó 290 símbolos durante 14 días e identificó 14.905 eventos REACTION. Estos resultados corresponden a experimentación y simulación; no representan rentabilidad validada en operaciones reales.',
        en: 'The project has undergone automated tests, audits, and historical replays. One research run processed 290 symbols over 14 days and identified 14,905 REACTION events. These findings come from experimentation and simulation; they do not establish validated profitability in live trading.',
      },
    },
    {
      id: 7,
      name: 'Web POS',
      description: 'Sistema de punto de venta desarrollado en Angular para gestionar la operación diaria de una heladería. Integra un catálogo organizado por categorías y familias, con venta por unidad y cajas de distintos tamaños, registro de ventas, apertura y cierre de caja e impresión de comprobantes internos.',
      descriptionEn: 'Angular point-of-sale system for the daily operations of an ice cream shop. It features a catalog organized by categories and product families, sales by individual unit or different box sizes, sales registration, cash register opening and closing, and internal receipt printing.',
      additionalDescription: {
        es: 'Incluye reportes semanales y gráficos para identificar los productos, días y horarios con mayor cantidad de ventas. La información se almacena localmente en IndexedDB, con herramientas de respaldo y soporte para funcionamiento sin conexión.',
        en: 'It includes weekly reports and charts highlighting best-selling products, days, and hours. Data is stored locally in IndexedDB, with backup tools and offline support.',
      },
      link: '', // Agregar únicamente cuando exista una demo pública verificada.
      image: '',
      showDetails: false,
      technologies: [
        { name: 'Angular', image: '' },
        { name: 'TypeScript', image: '' },
        { name: 'Angular Signals', image: '' },
        { name: 'IndexedDB', image: '' },
        { name: 'Angular Service Worker', image: '' },
        { name: 'HTML5', image: '' },
        { name: 'CSS3', image: '' },
        { name: 'SVG', image: '' },
      ],
      clientSide: {
        projectName: 'Web POS',
        side: 'Interfaz y lógica de negocio',
        description: 'Aplicación construida con componentes standalone de Angular, Signals y formularios para administrar ventas, productos y operaciones de caja. La lógica de negocio está separada de la interfaz e incluye validaciones, cálculos monetarios en centavos, anulaciones con historial y conversiones entre unidades, cajas y packs. Los gráficos se desarrollaron con HTML y SVG, y los comprobantes de venta, movimientos y cierre están preparados para papel térmico de 78 mm.',
        linkRepository: '',
        technologies: [],
      },
      serverSide: {
        projectName: 'Web POS',
        side: 'Persistencia local',
        description: 'Almacenamiento en IndexedDB mediante registros individuales, índices y transacciones. Las ventas conservan los nombres y precios registrados al momento de la operación, manteniendo su historial aunque cambie el catálogo. Incluye migraciones de la base, actualización entre pestañas, respaldos JSON e importación y exportación del catálogo. Angular Service Worker permite almacenar los recursos de la aplicación para su uso sin conexión tras la primera carga.',
        linkRepository: '',
        technologies: [],
      },
      architectureCopyEn: {
        client: {
          title: 'Interface and business logic',
          description: 'Built with Angular standalone components, Signals and forms for managing sales, products, and cash register operations. Business logic is separated from the UI, including validations, monetary calculations in cents, traceable voids, and conversions between units, boxes, and packs. Charts use HTML and SVG; sales, cash movements, and closing receipts support 78 mm thermal paper.',
        },
        server: {
          title: 'Local persistence',
          description: 'IndexedDB storage with individual records, indexes, and transactions. Sales retain the names and prices recorded at the time of purchase even when the catalog changes. Includes database migrations, cross-tab updates, JSON backups, catalog import/export, and Angular Service Worker caching for offline usage after the first load.',
        },
      },
      additionalFeatures: {
        es: [
          'Historial de ventas con filtros y anulaciones que ajustan los acumulados.',
          'Registro de cambios en productos y precios.',
          'Exportación de cierres semanales en CSV.',
          'Cálculo de consumo teórico de helado y equivalencias de cajas y packs.',
          'Métricas con filtros y mapa de actividad por día y hora.',
        ],
        en: [
          'Sales history with filters and voids that adjust totals.',
          'Product and price change history.',
          'Weekly cash closing exports in CSV.',
          'Theoretical ice cream consumption and box/pack conversions.',
          'Filterable metrics and activity heatmap by day and hour.',
        ],
      },
      testingCopy: {
        es: 'El proyecto incluye 204 pruebas automatizadas sobre cálculos de caja, anulaciones, catálogo, migraciones, persistencia y reportes.',
        en: 'The project includes 204 automated tests covering cash calculations, voids, catalog, migrations, persistence, and reports.',
      },
    },
    {
      id: 1,
      name: 'AuthFlow',
      description: 'ANGULAR_FORMS_DESC',
      link: 'https://angular-auth-forms.netlify.app/',
      image: 'https://i.postimg.cc/HLfBr6Gh/actdel.png',
      showDetails: false,
      clientSide: {
        projectName: 'AuthFlow',
        side: 'client-side',
        description: 'AUTH_CLIENT_DESC',
        linkRepository: 'https://github.com/Chiquitolina/authForms',
        technologies: [
          {
            name: 'angular',
            image:
              'https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png',
          },
          {
            name: 'material-design',
            image:
              'https://www.evernote.design/assets/images/material-design-system.jpg',
          },
          {
            name: 'angular-material',
            image: 'https://image.pngaaa.com/160/4144160-middle.png',
          },
          {
            name: 'prime-ng',
            image:
              'https://external-preview.redd.it/4JkXZgPF9IW3_LUNCxSGPRE388KpNXIGgS6r6uFS1EY.jpg?auto=webp&s=b369ca8a19c5570e9a11e6455a71e0b83a6bf54a',
          },
          {
            name: 'bootstrap',
            image:
              'https://e7.pngegg.com/pngimages/439/345/png-clipart-bootstrap-logo-thumbnail-tech-companies.png',
          },
          {
            name: 'html',
            image:
              'https://cdn.iconscout.com/icon/free/png-256/free-html-5-1-1175208.png?f=webp&w=256',
          },
          {
            name: 'sass',
            image: 'https://sass-lang.com/assets/img/styleguide/seal-color.png',
          },
          {
            name: 'typescript',
            image:
              'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
          },
        ],
      },
      serverSide: {
        projectName: 'AuthFlow',
        side: 'server-side',
        description: 'AUTH_SERVER_DESC',
        linkRepository: 'https://github.com/Chiquitolina/auth-node-express-prisma',
        technologies: [
          {
            name: 'node-js',
            image:
              'https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png',
          },
          {
            name: 'express-js',
            image: 'https://img.icons8.com/color/512/express-js.png',
          },
          {
            name: 'mvc-pattern',
            image: 'https://static.thenounproject.com/png/4199124-200.png',
          },
          {
            name: 'prisma',
            image: 'https://img.icons8.com/fluency/154/prisma-orm.png',
          },
          {
            name: 'zod',
            image: 'https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg?sanitize=true',
          },
          {
            name: 'typescript',
            image:
              'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
          },
          {
            name: 'mysql',
            image:
              'https://pngimg.com/uploads/mysql/mysql_PNG23.png',
          },
        ],
      },
    },
    {
      id: 2,
      name: 'E-Commerce',
      description: 'ECOMMERCE_DESC',
      link: 'https://ecommerce-0028.onrender.com/',
      image: 'https://i.postimg.cc/qR5DxpCj/asddsa.png',
      showDetails: false,

      clientSide: {
        projectName: 'E-Commerce',
        side: 'client-side',
        description: 'ECOMMERCE_CLIENT_DESC',
        linkRepository: 'https://github.com/Chiquitolina/eCommerceClientv',
        technologies: [
          {
            name: 'angular',
            image:
              'https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png',
          },
          {
            name: 'material-design',
            image:
              'https://www.evernote.design/assets/images/material-design-system.jpg',
          },
          {
            name: 'angular-material',
            image: 'https://image.pngaaa.com/160/4144160-middle.png',
          },
          {
            name: 'prime-ng',
            image:
              'https://external-preview.redd.it/4JkXZgPF9IW3_LUNCxSGPRE388KpNXIGgS6r6uFS1EY.jpg?auto=webp&s=b369ca8a19c5570e9a11e6455a71e0b83a6bf54a',
          },
          {
            name: 'bootstrap',
            image:
              'https://e7.pngegg.com/pngimages/439/345/png-clipart-bootstrap-logo-thumbnail-tech-companies.png',
          },
          {
            name: 'html',
            image:
              'https://cdn.iconscout.com/icon/free/png-256/free-html-5-1-1175208.png?f=webp&w=256',
          },
          {
            name: 'sass',
            image: 'https://sass-lang.com/assets/img/styleguide/seal-color.png',
          },
          {
            name: 'typescript',
            image:
              'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
          },
        ],
      },
      serverSide: {
        projectName: 'E-Commerce',
        side: 'server-side',
        description: 'ECOMMERCE_SERVER_DESC',
        linkRepository: 'https://github.com/Chiquitolina/eCommerceServer',
        technologies: [
          {
            name: 'node-js',
            image:
              'https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png',
          },
          {
            name: 'express-js',
            image: 'https://img.icons8.com/color/512/express-js.png',
          },
          {
            name: 'mvc-pattern',
            image: 'https://static.thenounproject.com/png/4199124-200.png',
          },
        ],
      },
    },
    {
      id: 0,
      name: 'Devtácora',
      description: 'DEVTACORA_DESC',
      link: 'https://devtacora.com.ar/',
      image: 'https://i.postimg.cc/HLfBr6Gh/actdel.png',
      showDetails: false,
      clientSide: {
        projectName: 'Devtácora',
        side: 'client-side',
        description: 'AUTH_CLIENT_DESC',
        linkRepository: 'https://github.com/Chiquitolina/authForms',
        technologies: [
          {
            name: 'angular',
            image:
              'https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png',
          },
          {
            name: 'material-design',
            image:
              'https://www.evernote.design/assets/images/material-design-system.jpg',
          },
          {
            name: 'angular-material',
            image: 'https://image.pngaaa.com/160/4144160-middle.png',
          },
          {
            name: 'prime-ng',
            image:
              'https://external-preview.redd.it/4JkXZgPF9IW3_LUNCxSGPRE388KpNXIGgS6r6uFS1EY.jpg?auto=webp&s=b369ca8a19c5570e9a11e6455a71e0b83a6bf54a',
          },
          {
            name: 'bootstrap',
            image:
              'https://e7.pngegg.com/pngimages/439/345/png-clipart-bootstrap-logo-thumbnail-tech-companies.png',
          },
          {
            name: 'html',
            image:
              'https://cdn.iconscout.com/icon/free/png-256/free-html-5-1-1175208.png?f=webp&w=256',
          },
          {
            name: 'sass',
            image: 'https://sass-lang.com/assets/img/styleguide/seal-color.png',
          },
          {
            name: 'typescript',
            image:
              'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
          },
        ],
      },
      serverSide: {
        projectName: 'Devtácora',
        side: 'server-side',
        description: 'AUTH_SERVER_DESC',
        linkRepository: 'https://github.com/Chiquitolina/auth-node-express-prisma',
        technologies: [
          {
            name: 'node-js',
            image:
              'https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png',
          },
          {
            name: 'express-js',
            image: 'https://img.icons8.com/color/512/express-js.png',
          },
          {
            name: 'mvc-pattern',
            image: 'https://static.thenounproject.com/png/4199124-200.png',
          },
          {
            name: 'prisma',
            image: 'https://img.icons8.com/fluency/154/prisma-orm.png',
          },
          {
            name: 'zod',
            image: 'https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg?sanitize=true',
          },
          {
            name: 'typescript',
            image:
              'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
          },
          {
            name: 'mysql',
            image:
              'https://pngimg.com/uploads/mysql/mysql_PNG23.png',
          },
        ],
      },
    },
    {
      id: 4,
      name: 'PlayerDex API',
      description:
        'PlayerDex API es una solución desarrollada en PHP con Laravel para gestionar jugadores, sus habilidades y posiciones dentro de un equipo. Permite realizar operaciones CRUD y cuenta con una funcionalidad avanzada para formar equipos optimizados según habilidades específicas, garantizando una experiencia intuitiva y segura. Diseñada para ser eficiente y escalable, incluye autenticación con Bearer Token para proteger ciertas acciones, como la eliminación de jugadores..',
      link: '',
      image: '',
      showDetails: false,
      linkRepository: 'https://github.com/Chiquitolina/PlayerDex-API',
      technologies: [
        {
          name: 'php',
          image:
            'https://e7.pngegg.com/pngimages/666/502/png-clipart-brand-php-logo-computer-file-product-breeze-blue-text.png',
        },
        {
          name: 'laravel',
          image:
            'https://i.pinimg.com/736x/fc/8f/6b/fc8f6b14ee516f1da38da90f247fa2c4.jpg',
        },
        {
          name: 'eloquent-orm',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA0UYsNMEKIAS_byWysBbCvEUw8REWV1GR3Q&s',
        },
        {
          name: 'authorization-token',
          image: 'https://w7.pngwing.com/pngs/52/467/png-transparent-access-token-business-user-computer-icons-real-estate-business-text-hand-people-thumbnail.png',
        },
      ],
    },
    {
      id: 5,
      name: 'About this app',
      description:
        'aig1996 es una aplicación de portafolio desarrollada en Angular 18, creada para profundizar en mi framework de frontend preferido. Además de presentar mis proyectos y experiencia, esta app destaca mis habilidades técnicas mediante características como la traducción multilenguaje con ngx-translate, un sistema de temas claro y oscuro configurable mediante un toggle, y un manejo eficiente de los estados a través de observables, garantizando una interfaz fluida y reactiva.',
      link: 'link',
      image: '',
      showDetails: false,
      technologies: [
        {
          name: 'angular',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbOFmjGchTMwQriXqezOovYKqXWK3YXUnFlQ&s',
        },
        {
          name: 'rxjs-observables',
          image:
            'https://w7.pngwing.com/pngs/650/439/png-transparent-rxjs-hd-logo.png',
        },
        {
          name: 'material-design',
          image:
            'https://www.evernote.design/assets/images/material-design-system.jpg',
        },
        {
          name: 'angular-material',
          image: 'https://image.pngaaa.com/160/4144160-middle.png',
        },
        {
          name: 'prime-ng',
          image:
            'https://external-preview.redd.it/4JkXZgPF9IW3_LUNCxSGPRE388KpNXIGgS6r6uFS1EY.jpg?auto=webp&s=b369ca8a19c5570e9a11e6455a71e0b83a6bf54a',
        },
        {
          name: 'bootstrap',
          image:
            'https://e7.pngegg.com/pngimages/439/345/png-clipart-bootstrap-logo-thumbnail-tech-companies.png',
        },
        {
          name: 'html',
          image:
            'https://cdn.iconscout.com/icon/free/png-256/free-html-5-1-1175208.png?f=webp&w=256',
        },
        {
          name: 'sass',
          image: 'https://sass-lang.com/assets/img/styleguide/seal-color.png',
        },
        {
          name: 'typescript',
          image:
            'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
        },
      ],
    },
  ];

  showProjectDetails = false; // Estado para manejar la vista actual

  // BehaviorSubject para el proyecto seleccionado
  public selectedProject = new BehaviorSubject<Project | null>(null);
  selectedProject$ = this.selectedProject.asObservable();

  public selectedSide = new BehaviorSubject<sideProject | null>(null);
  selectedSide$ = this.selectedSide.asObservable();

  // Método para seleccionar un proyecto
  selectProject(project: Project): void {
    this.selectedProject.next(project); // Actualiza el proyecto seleccionado
  }

  // Método para seleccionar el side (clientSide o serverSide)
  selectSide(side: sideProject): void {
    this.selectedSide.next(side);
  }

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}
