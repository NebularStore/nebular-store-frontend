export function createNewDir(parentPath: string|undefined, onCreated: () => void) {
    const name = prompt("Enter a name fo the new directory:")
    if (!name) return;

    fetch("http://localhost:8080/files/repository/dir/" + (parentPath == undefined ? "" : parentPath + "/") + name, {
        method: "POST",
    }).then(onCreated)
}

export function uploadNewFile(parentPath: string|undefined, onUploaded: () => void) {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        if (!input.files) return;
        const data = new FormData();
        data.append('file', input.files[0])

        fetch("http://localhost:8080/files/repository/file/" + (parentPath == undefined ? "" : parentPath + "/") + input.files[0].name, {
            method: "POST",
            body: data,
        }).then(onUploaded)
    };
    input.click();
}