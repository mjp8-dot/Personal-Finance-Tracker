export function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'light') {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    }

}

export function applyTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(currentTheme);
}
