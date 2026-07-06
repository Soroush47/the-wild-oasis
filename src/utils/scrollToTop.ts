export function scrollToTop(behavior: ScrollBehavior = "auto") {
    document.getElementById("app-main")?.scrollTo({ top: 0, behavior });
}
