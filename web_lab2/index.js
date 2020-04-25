const serverURL = 'https://weblabnotes.herokuapp.com/';

function sendAjax(method, url, data, callback, headers = []) {
    const params = [];
    for (const key in data) {
        params.push(key + '=' + encodeURI(data[key]));
    }
    const dataURL = params.join('&');
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            callback(xmlHttp.responseText, xmlHttp.status);
        }
    };
    xmlHttp.open(method, url);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.setRequestHeader('Accept', 'application/json');
    for (let key in headers) {
        xmlHttp.setRequestHeader(headers[key].name, headers[key].value);
    }
    if (method === 'GET') {
        xmlHttp.send();
    } else {
        xmlHttp.send(dataURL);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    changePage();
    setAvailableEntities();
    changeListOfEndPoints();
    changeRequestParams();
}, false);

function isLoggedIn() {
    return localStorage.getItem('apiKey') != null;
}

function changePage() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registrationForm');
    const apiExplorer = document.getElementById('apiExplorer');
    const logoutForm = document.getElementById('logoutForm');

    if (isLoggedIn()) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        apiExplorer.style.display = 'block';
        logoutForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'block';
        apiExplorer.style.display = 'none';
        logoutForm.style.display = 'none';
    }
}

function login() {
    sendAjax('POST', serverURL + 'oauth/token', {
        client_id: 11,
        client_secret: '2UD9eZtGyZi100m6JbDsmz4noHkgHss36m9cUgB8',
        grant_type: 'password',
        username: document.getElementById('login_email_input').value,
        password: document.getElementById('login_password_input').value,
    }, function (res, status) {
        if (status === 200) {
            res = JSON.parse(res);
            localStorage.setItem('apiKey', res.access_token);
            changePage();
        } else {
            alert('Bad data');
        }
    });
}

function logout() {
    localStorage.removeItem('apiKey');
    changePage();
}

function registration() {
    sendAjax('POST', serverURL + 'api/register', {
        email: document.getElementById('reg_email_input').value,
        password: document.getElementById('reg_password_input').value,
        name: document.getElementById('reg_name_input').value,
    }, function (res, status) {
        if (status === 200) {
            alert('Registered.');
        } else {
            alert('Error\nResponse: ' + res);
        }
    });
}

function setAvailableEntities() {
    let optionsHtml = '';
    for (let key in requests) {
        optionsHtml += '<option value="' + key + '">' + requests[key].entity + '</option>';
    }
    document.getElementById('entity_select').innerHTML = optionsHtml;
}

function changeListOfEndPoints(index = 0) {
    let optionsHtml = '';
    for (let key in requests[index].endpoints) {
        optionsHtml += '<option value="' + key + '">' + requests[index].endpoints[key].name + '</option>';
    }
    document.getElementById('endpoint_select').innerHTML = optionsHtml;
}

function changeRequestParams() {
    let entityNum = document.getElementById('entity_select').value;
    let endPointNum = document.getElementById('endpoint_select').value;

    const params = requests[entityNum].endpoints[endPointNum];

    document.getElementById('generated_url').value = serverURL + params.route;
    document.getElementById('request_params').value = params.body;
    document.getElementById('request_method').innerText = params.method;
}

function makeRequestToApi() {
    let url = document.getElementById('generated_url').value;
    let requestParams = document.getElementById('request_params').value;
    let requestMethod = document.getElementById('request_method').innerText;

    if (requestParams.length !== 0) {
        requestParams = JSON.parse(requestParams);
    }

    sendAjax(requestMethod, url, requestParams, function (res, status) {
        let obj = JSON.parse(res);
        let pretty = JSON.stringify(obj, undefined, 4);
        document.getElementById('response').innerText = pretty;
    }, [{
        name: 'Authorization',
        value: 'Bearer ' + localStorage.getItem('apiKey'),
    }]);
}
