export type ProjectRecord={id:string;name:string;client:string;category:string;status:string;amount:number;clientDue:string;internalDue:string;tags:string[];createdAt:string};
export type CustomerRecord={id:string;name:string;person:string;email:string;createdAt:string};
const KEYS={projects:"mitsumori-note-projects",customers:"mitsumori-note-customers"};
const seedProjects:ProjectRecord[]=[{id:"1",name:"コーポレートサイト制作",client:"株式会社ABC",category:"Web制作",status:"作業中",amount:320000,clientDue:"2026-07-31",internalDue:"2026-07-25",tags:["Web","CMS"],createdAt:"2026-07-01"},{id:"2",name:"LPデザイン・実装",client:"山田商店",category:"LP制作",status:"見積提出済",amount:180000,clientDue:"2026-08-02",internalDue:"2026-07-29",tags:["LP"],createdAt:"2026-07-10"}];
export function loadProjects(){if(typeof window==="undefined")return seedProjects;const raw=localStorage.getItem(KEYS.projects);if(!raw){localStorage.setItem(KEYS.projects,JSON.stringify(seedProjects));return seedProjects}try{return JSON.parse(raw) as ProjectRecord[]}catch{return seedProjects}}
export function saveProjects(data:ProjectRecord[]){if(typeof window!=="undefined")localStorage.setItem(KEYS.projects,JSON.stringify(data))}
export function addProject(data:Omit<ProjectRecord,"id"|"createdAt">){const all=loadProjects();const item:ProjectRecord={...data,id:crypto.randomUUID(),createdAt:new Date().toISOString().slice(0,10)};saveProjects([item,...all]);return item}
export function getProject(id:string){return loadProjects().find(x=>x.id===id)}
export function loadCustomers(){if(typeof window==="undefined")return[] as CustomerRecord[];try{return JSON.parse(localStorage.getItem(KEYS.customers)||"[]") as CustomerRecord[]}catch{return[]}}
export function addCustomer(data:Omit<CustomerRecord,"id"|"createdAt">){const item={...data,id:crypto.randomUUID(),createdAt:new Date().toISOString().slice(0,10)};const all=loadCustomers();localStorage.setItem(KEYS.customers,JSON.stringify([item,...all]));return item}
