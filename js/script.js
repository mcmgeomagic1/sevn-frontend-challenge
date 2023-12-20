const Menu =(menuitems)=> {
    var ulElement = document.createElement("ul");
    ulElement.classList.add("menu")

    menuitems.forEach(function(item)  {
            var liElement = document.createElement("li")
            liElement.classList.add("menu-items")
            liElement.appendChild(document.createTextNode(item))
            ulElement.appendChild(liElement)
    })

    return ulElement
}

var divApp = document.getElementById("app");

var items = ["Home", "About", "Contact"]

var menuComponent = Menu(items)

divApp.appendChild(menuComponent)