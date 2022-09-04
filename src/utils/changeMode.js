export const changeModeRedux = (mode) => {
    if (mode === 'light') {
        document.getElementsByTagName('html')[0]
            .setAttribute("data-theme", "light");
    } else {
        document.getElementsByTagName('html')[0]
            .setAttribute("data-theme", "dark");
    }
}

