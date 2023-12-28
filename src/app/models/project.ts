import Technology from "./Technology";
import Author from "./author";

export default interface Project {
    id:string,
    name:string, 
    description:string,
    imageURL:string,
    projectUrl: string,
    author:Author,
    technologys: Technology[]
}