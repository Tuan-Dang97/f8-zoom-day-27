const codeEditor = document.getElementById('codeEditor');
const preview = document.getElementById('preview');
const contextMenu = document.getElementById('contextMenu');

let hasUnsavedChanges = false;

function updatePreview() {
    const code = codeEditor.value;
    preview.srcdoc = code;
    hasUnsavedChanges = code.trim() !== '';
}

codeEditor.addEventListener('input', updatePreview);

window.addEventListener('beforeunload', function(e) {
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang? Code chưa được lưu sẽ bị mất.';
        return e.returnValue;
    }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    contextMenu.style.left = e.clientX + 'px';
    contextMenu.style.top = e.clientY + 'px';
    contextMenu.classList.add('show');
});

document.addEventListener('click', function(e) {
    if (!contextMenu.contains(e.target)) {
        contextMenu.classList.remove('show');
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        contextMenu.classList.remove('show');
    }
});

contextMenu.addEventListener('click', function(e) {
    const action = e.target.dataset.action;
    
    if (action === 'clear') {
        if (confirm('Bạn có chắc chắn muốn xóa toàn bộ code?')) {
            codeEditor.value = '';
            updatePreview();
            hasUnsavedChanges = false;
        }
    }
    
    contextMenu.classList.remove('show');
});

window.addEventListener('load', function() {
    updatePreview();
});

codeEditor.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
    }
});