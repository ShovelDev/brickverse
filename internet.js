var ip = prompt("Search Ip", "1.1.1.1")

var web = document.createElement("script")
web.src = "https://pigweb.netlify.app/web/" + ip + ".web"
web.setAttribute("id", "website")
document.body.appendChild(web)