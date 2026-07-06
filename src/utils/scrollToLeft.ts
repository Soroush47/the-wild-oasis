export function scrollToLeft(behavior: ScrollBehavior = "auto") {
    document.getElementById("table-div")?.scrollTo({
        left: 0,
        behavior,
    });
}
