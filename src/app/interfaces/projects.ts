import { BehaviorSubject } from "rxjs";
import { sideProject } from "./sideProject";
export interface Project {
    id: number;
    name: string;
    description: string;
    link?: string;
    image: string;
    showDetails: boolean;
    technologies?: any[];
    clientSide?: sideProject;
    serverSide?: sideProject
}