export type ProjectRecord={id:string;name:string;client:string;category:string;status:string;amount:number;clientDue:string;internalDue:string;tags:string[];createdAt:string};
export type CustomerRecord={id:string;name:string;person:string;email:string;createdAt:string};
export type EstimateItem={name:string;qty:number;unit:string;price:number;hours:number;material:number;outsource:number;other:number};
export type EstimateRecord={projectId:string;items:EstimateItem[];updatedAt:string};
export type WorkRecord={id:number;date:string;task:string;hours:number};
export type CostRecord={id:number;type:string;title:string;amount:number};
export type ExtraRecord={id:number;title:string;amount:number;billable:boolean};
export type ActualRecord={projectId:string;works:WorkRecord[];costs:CostRecord[];extras:ExtraRecord[];updatedAt:string};
const KEYS={projects:"mitsumori-note-projects",customers:"mitsumori-note-customers",estimates:"mitsumori-note-estimates",actuals:"mitsumori-note-actuals"};
const seedProjects:ProjectRecord[]=[{id:"1",name:"コーポレートサイト制作",client:"株式会社ABC",category:"Web制作",status:"作業中",amount:320000,clientDue:"2026-07-31",internalDue:"2026-07-25",tags:["Web","CMS"],createdAt:"2026-07-01"},{id:"2",name:"LPデザイン・実装",client:"山田商店",category:"LP制作",status:"見積提出済",amount:180000,clientDue:"2026-08-02",internalDue:"2026-07-29",tags:["LP"],createdAt:"2026-07-10"}];
export function loadProjects(){if(typeof window==="undefined")return seedProjects;const raw=localStorage.getItem(KEYS.projects);if(!raw){localStorage.setItem(KEYS.projects,JSON.stringify(seedProjects));return seedProjects}try{return JSON.parse(raw) as ProjectRecord[]}catch{return seedProjects}}
export function saveProjects(data:ProjectRecord[]){if(typeof window!=="undefined")localStorage.setItem(KEYS.projects,JSON.stringify(data))}
export function addProject(data:Omit<ProjectRecord,"id"|"createdAt">){const all=loadProjects();const item:ProjectRecord={...data,id:crypto.randomUUID(),createdAt:new Date().toISOString().slice(0,10)};saveProjects([item,...all]);return item}
export function getProject(id:string){return loadProjects().find(x=>x.id===id)}
export function updateProject(id:string,patch:Partial<ProjectRecord>){const all=loadProjects().map(x=>x.id===id?{...x,...patch}:x);saveProjects(all);return all.find(x=>x.id===id)}
export function loadEstimates(){if(typeof window==="undefined")return[] as EstimateRecord[];try{return JSON.parse(localStorage.getItem(KEYS.estimates)||"[]") as EstimateRecord[]}catch{return[]}}
export function getEstimate(projectId:string){return loadEstimates().find(x=>x.projectId===projectId)}
export function saveEstimate(projectId:string,items:EstimateItem[]){const all=loadEstimates().filter(x=>x.projectId!==projectId);const record:EstimateRecord={projectId,items,updatedAt:new Date().toISOString()};localStorage.setItem(KEYS.estimates,JSON.stringify([record,...all]));const amount=items.reduce((a,x)=>a+x.qty*x.price,0);updateProject(projectId,{amount});return record}
export function loadActuals(){if(typeof window==="undefined")return[] as ActualRecord[];try{return JSON.parse(localStorage.getItem(KEYS.actuals)||"[]") as ActualRecord[]}catch{return[]}}
export function getActual(projectId:string){return loadActuals().find(x=>x.projectId===projectId)}
export function saveActual(projectId:string,works:WorkRecord[],costs:CostRecord[],extras:ExtraRecord[]){const all=loadActuals().filter(x=>x.projectId!==projectId);const record:ActualRecord={projectId,works,costs,extras,updatedAt:new Date().toISOString()};localStorage.setItem(KEYS.actuals,JSON.stringify([record,...all]));return record}
export function loadCustomers(){if(typeof window==="undefined")return[] as CustomerRecord[];try{return JSON.parse(localStorage.getItem(KEYS.customers)||"[]") as CustomerRecord[]}catch{return[]}}
export function addCustomer(data:Omit<CustomerRecord,"id"|"createdAt">){const item={...data,id:crypto.randomUUID(),createdAt:new Date().toISOString().slice(0,10)};const all=loadCustomers();localStorage.setItem(KEYS.customers,JSON.stringify([item,...all]));return item}
