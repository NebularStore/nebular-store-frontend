export class PluginManager {
    public static instance: PluginManager = new PluginManager();

    private plugins: AppPlugin[]

    constructor() {
        this.plugins = [];
    }

    registerPlugin(plugin: AppPlugin) {
        this.plugins.push(plugin);
    }

    getDownloadHook(path: string): null|undefined|((path: string) => void) {
        const hooks = this.plugins.map(plugin => plugin.getDownloadHook(path)).filter(hook => hook != null);
        return hooks.pop();
    }
}

export interface AppPlugin {
    getDownloadHook(path: string): null | ((path: string) => void);
}