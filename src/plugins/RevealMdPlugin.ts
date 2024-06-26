import type {AppPlugin} from "./PluginManager";

export class RevealMdPlugin implements AppPlugin {
    getDownloadHook(path: string): ((path: string) => void) | null {
        return path.endsWith(".md") ? RevealMdPlugin.openInRevealMd : null;
    }

    static openInRevealMd(path: string) {
        window.open(import.meta.env.VITE_REVEAL_MD_URL + path, "_blank")?.focus();
    }

    constructor() {
    }
}