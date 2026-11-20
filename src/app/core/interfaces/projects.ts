import { BehaviorSubject } from "rxjs";
import { sideProject } from "./sideProject";
export interface Project {
    id: number;
    name: string;
    description: string;
    /** Optional English copy for new entries, without changing legacy translation keys. */
    descriptionEn?: string;
    additionalDescription?: { es: string; en: string };
    additionalFeatures?: { es: string[]; en: string[] };
    testingCopy?: { es: string; en: string };
    architectureCopyEn?: {
        client: { title: string; description: string };
        server: { title: string; description: string };
    };
    link: string;
    image: string;
    showDetails: boolean;
    technologies?: any[];
    linkRepository?: string;
    clientSide?: sideProject;
    serverSide?: sideProject
}