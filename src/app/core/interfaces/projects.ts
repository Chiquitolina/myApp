import { BehaviorSubject } from "rxjs";
import { sideProject } from "./sideProject";
export interface Project {
    id: number;
    name: string;
    description: string;
    link: string;
    image: string;
    showDetails: boolean;
    technologies?: any[];
    linkRepository?: string;
    clientSide?: sideProject;
    serverSide?: sideProject
}