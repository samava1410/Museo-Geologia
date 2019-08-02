function postAjax() {

    var nombreBuscar = document.getElementById("nombreBuscar").value;

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', "/buscar/" + nombreBuscar);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) { 
            
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("");
}