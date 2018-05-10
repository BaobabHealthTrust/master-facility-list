function scrollBars() {
    var body = document.querySelector('body');
    return {
        vertical: body.scrollHeight > body.clientHeight,
        horizontal: body.scrollWidth > body.clientWidth
    }
}

export default () => {
    setTimeout(() => {
        if (scrollBars().vertical) {
            document.querySelector('.page-footer').style.position = "relative";
        } else {
            document.querySelector('.page-footer').style.position = "absolute";
        }
    }, 0);
}