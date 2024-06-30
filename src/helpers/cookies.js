export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";")
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return "";
}

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

export function deleteCookie(cname) {
    document.cookie = `${cname}=; expirse= Thu, 01 Jan 1990 00:00:00 UTC`
}

export function deleteAllCookies() {
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const egPos = cookie.indexOf("=");
        const name = egPos > -1 ? cookie.substr(0, egPos) : cookie;
        document.cookie = name + "=; exprise=Thu, 01 Jan 1990 00:00:00 GMT"
    }
}