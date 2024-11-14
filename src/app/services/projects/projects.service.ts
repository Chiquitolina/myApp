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
    {
      id: 1,
      name: 'E-Commerce',
      description: 'ECOMMERCE_DESC',
      link: 'https://ecommerce-0028.onrender.com/',
      image: 'https://i.postimg.cc/qR5DxpCj/asddsa.png',
      showDetails: false,

      clientSide: {
        projectName: 'E-Commerce',
        side: 'Frontend',
        description: 'ECOMMERCE_CLIENT_DESC',
        linkRepository: 'https://github.com/Chiquitolina/eCommerceClientv',
        technologies: [
          {
            name: 'angular',
            image: 'https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png',
          },
          {
            name: 'material-design',
            image: 'https://www.evernote.design/assets/images/material-design-system.jpg',
          },
          {
            name: 'angular-material',
            image: 'https://image.pngaaa.com/160/4144160-middle.png',
          },
          {
            name: 'prime-ng',
            image: 'https://external-preview.redd.it/4JkXZgPF9IW3_LUNCxSGPRE388KpNXIGgS6r6uFS1EY.jpg?auto=webp&s=b369ca8a19c5570e9a11e6455a71e0b83a6bf54a',
          },
          {
            name: 'bootstrap',
            image: 'https://e7.pngegg.com/pngimages/439/345/png-clipart-bootstrap-logo-thumbnail-tech-companies.png',
          },
          {
            name: 'html',
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-html-5-1-1175208.png?f=webp&w=256',
          },
          {
            name: 'sass',
            image: 'https://sass-lang.com/assets/img/styleguide/seal-color.png',
          },
          {
            name: 'typescript',
            image: 'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
          },
        ],
      },
      serverSide: {
        projectName: 'E-Commerce',
        side: 'Backend',
        description: 'ECOMMERCE_SERVER_DESC',
        linkRepository: 'https://github.com/Chiquitolina/eCommerceServer',
        technologies: [
          {
            name: 'node-js',
            image: 'https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png',
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
      id: 2,
      name: 'Activity Delegator',
      description: 'ACTIVITY_DELEGATOR_DESC',
      link: 'https://activity-delegator.netlify.app/',
      image: 'https://i.postimg.cc/HLfBr6Gh/actdel.png',
      showDetails: false,
      technologies: [
        {
          name: 'angular',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbOFmjGchTMwQriXqezOovYKqXWK3YXUnFlQ&s',
        },
        {
          name: 'material-design',
          image: 'https://www.evernote.design/assets/images/material-design-system.jpg',
        },
        {
          name: 'angular-material',
          image: 'https://image.pngaaa.com/160/4144160-middle.png',
        },
        {
          name: 'prime-ng',
          image: 'https://external-preview.redd.it/4JkXZgPF9IW3_LUNCxSGPRE388KpNXIGgS6r6uFS1EY.jpg?auto=webp&s=b369ca8a19c5570e9a11e6455a71e0b83a6bf54a',
        },
        {
          name: 'bootstrap',
          image: 'https://e7.pngegg.com/pngimages/439/345/png-clipart-bootstrap-logo-thumbnail-tech-companies.png',
        },
        {
          name: 'html',
          image: 'https://cdn.iconscout.com/icon/free/png-256/free-html-5-1-1175208.png?f=webp&w=256',
        },
        {
          name: 'sass',
          image: 'https://sass-lang.com/assets/img/styleguide/seal-color.png',
        },
        {
          name: 'typescript',
          image: 'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
        },
      ],
    },
    {
      id: 4,
      name: 'aig1996',
      description:
        'aig1996 es una aplicación de portafolio desarrollada en Angular 18, creada para profundizar en mi framework de frontend preferido. Además de presentar mis proyectos y experiencia, esta app destaca mis habilidades técnicas mediante características como la traducción multilenguaje con ngx-translate, un sistema de temas claro y oscuro configurable mediante un toggle, y un manejo eficiente de los estados a través de observables, garantizando una interfaz fluida y reactiva.',
      link: 'link',
      image: '',
      showDetails: false,
      technologies: [
        {
          name: 'angular',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbOFmjGchTMwQriXqezOovYKqXWK3YXUnFlQ&s',
        },
        {
          name: 'rxjs-observables',
          image: 'https://w7.pngwing.com/pngs/650/439/png-transparent-rxjs-hd-logo.png',
        },
        {
          name: 'material-design',
          image: 'https://www.evernote.design/assets/images/material-design-system.jpg',
        },
        {
          name: 'angular-material',
          image: 'https://image.pngaaa.com/160/4144160-middle.png',
        },
        {
          name: 'prime-ng',
          image: 'https://external-preview.redd.it/4JkXZgPF9IW3_LUNCxSGPRE388KpNXIGgS6r6uFS1EY.jpg?auto=webp&s=b369ca8a19c5570e9a11e6455a71e0b83a6bf54a',
        },
        {
          name: 'bootstrap',
          image: 'https://e7.pngegg.com/pngimages/439/345/png-clipart-bootstrap-logo-thumbnail-tech-companies.png',
        },
        {
          name: 'html',
          image: 'https://cdn.iconscout.com/icon/free/png-256/free-html-5-1-1175208.png?f=webp&w=256',
        },
        {
          name: 'sass',
          image: 'https://sass-lang.com/assets/img/styleguide/seal-color.png',
        },
        {
          name: 'typescript',
          image: 'https://typescript-eslint.io/assets/files/logo-62ab572de114d03f1ec685d989f92cd6.svg',
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
