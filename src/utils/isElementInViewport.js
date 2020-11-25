const isElementInViewport = (el, offset = 0) => {
    const box = el.getBoundingClientRect(),
        top = box.top >= 0,
        left = box.left >= 0,
        bottom =
            box.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) + offset,
        right =
            box.right <=
            (window.innerWidth || document.documentElement.clientWidth) + offset;
    return top && left && bottom && right;
};

export default isElementInViewport;