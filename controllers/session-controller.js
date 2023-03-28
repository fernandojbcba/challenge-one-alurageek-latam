
export function userLoggedIn() {
    const userEmail = localStorage.getItem("email");
    return userEmail != null;
}

export function userLogout() {
    localStorage.removeItem("email");
    localStorage.removeItem("nombrex")
    window.location.reload();
}