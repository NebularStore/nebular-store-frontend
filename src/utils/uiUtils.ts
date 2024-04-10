export function openFileSelection(onSelect: (files: FileList) => void){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        if (!input.files) return;
        onSelect(input.files)
    };
    input.click();
}