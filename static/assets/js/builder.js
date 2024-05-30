var callService = (endpoint, method, callback, data = null, externalUrl = false) => {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.DONE) {
            if (xhr.getResponseHeader('content-type').indexOf('application/json') == 0) {
                try {
                    callback(JSON.parse(xhr.response), xhr);
                } catch (e) {
                    console.error(e);
                    callback(xhr.response, xhr);
                }
            } else {
                callback(xhr.response, xhr);
            }
        }
    };
    if (!externalUrl) {
        xhr.open(method, 'https://api.narikraus.co.uk' + endpoint, true);
    } else {
        xhr.open(method, endpoint, true);
    }
    xhr.withCredentials = true;
    if (data) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
};

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let searchBtn = document.querySelector('.bx-search');

closeBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    menuBtnChange();
});

function menuBtnChange() {
    if (sidebar.classList.contains('open')) {
        closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
        closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
}

sidebar.querySelector(`a[href="${window.location.pathname}"]`).classList.add('active')