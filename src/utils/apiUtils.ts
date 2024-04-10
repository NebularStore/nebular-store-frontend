import type {RepositoryEntry} from "../types/RepositoryEntry.ts";

export function createNewDir(parentPath: string, name:string): Promise<Response> {
    return fetch(import.meta.env.VITE_BACKEND_URL + "/files/repository/dir/" + parentPath + "/" + name, {
        method: "POST",
    });
}

export function uploadNewFile(parentPath: string, file: File): Promise<Response> {
    const data = new FormData();
    data.append('file', file)

    return fetch(import.meta.env.VITE_BACKEND_URL + "/files/repository/file/" + parentPath + "/" + file.name, {
        method: "POST",
        body: data,
    });
}

export function getLogoURL(): string {
    return import.meta.env.VITE_BACKEND_URL + '/theme/icon';
}

export async function getCompanyName(): Promise<string> {
    return (await fetch(import.meta.env.VITE_BACKEND_URL + "/theme/company_name", {
        method: "GET"
    })).text();
}

export function deleteEntry(isFile: boolean, path: string): Promise<Response> {
    const url = import.meta.env.VITE_BACKEND_URL + "/files/repository/" + (isFile ? "file" : "dir") + "/" + path
    return fetch(url, {
        method: "DELETE"
    });
}

export async function fetchStructure(path: string): Promise<RepositoryEntry[]> {
    const url = import.meta.env.VITE_BACKEND_URL + "/files/structure/" + path;
    console.log(url)
    return await (await fetch(url)).json()
}

export function getServeURL(path: string): string {
    return import.meta.env.VITE_BACKEND_URL + "/files/serve/" + path;
}