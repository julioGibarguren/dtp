var UIController = (function () {
    var DOMstrings = {
        navbarRight: '.tooglenav',
        langButton: '.lang-button'
    }

    var getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

    function createCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
        var cookiee = document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function setNavLang(newlang) {
        var navMenu, html, init, about, services, contact, navbar, mainFlagImg, mainFlagText, flagUrl;
        navbar = '<li><a class="inicioBtn" href="index.html">%home%</a></li><li><a class="aboutBtn" href="index.html#sobreNosotros">%about%</a></li><li><a class="servicesBtn" href="index.html#services">%services%</a></li><li><a class="contactBtn" href="contacto.html">%contact%</a></li>';
        navMenu = document.querySelector(DOMstrings.navbarRight);
        mainFlagImg = document.getElementById('flag_main');
        mainFlagText = document.getElementById('lang_indicator');
        flagUrl = 'img/flag-' + newlang + '.jpg';
        html = navbar;
        document.getElementById('flag_main').setAttribute('src', flagUrl);
        document.getElementById('lang_indicator').textContent = newlang;
        if (newlang === 'es') {
            init = 'INICIO';
            about = 'SOBRE NOSOTROS';
            services = 'SERVICIOS';
            contact = 'CONTACTO';
        } else if (newlang === 'en') {
            init = 'HOME';
            about = 'ABOUT US';
            services = 'SERVICES';
            contact = 'CONTACT';
        } else if (newlang === 'pt') {
            init = 'INÍCIO';
            about = 'ACERCA DE NÓS';
            services = 'SERVIÇOS';
            contact = 'CONTATO';
        }
        newHtml = html.replace('%home%', init);
        newHtml = newHtml.replace('%lang%', newlang);
        newHtml = newHtml.replace('%about%', about);
        newHtml = newHtml.replace('%services%', services);
        newHtml = newHtml.replace('%contact%', contact);
        document.querySelector(DOMstrings.navbarRight).innerHTML = newHtml;
        createCookie('lang', newlang, 30);
    }

    function loadTranslateJson() {
        var cookieLang = readCookie('lang')
        var jsonUrl = '../js/' + cookieLang + '.json'
        var currentLocation = window.location.pathname;
        var URLdomain = window.location.host;
        var currentUrl = URLdomain + currentLocation;
        getJSON(jsonUrl,
            function (err, data) {
                if (err !== null) {
                    alert('Something went wrong: ' + err);
                } else {
                    if (cookieLang !== 'es') {
                        var translates = document.querySelectorAll('.translate');
                        for (var i = 0; i < translates.length; i++) {
                            var a = translates[i].id;
                            translates[i].innerHTML = data[a]
                        }
                        if (currentLocation === '/contacto.html') {
                            var inputName = document.getElementById('contact_form_name').innerHTML;
                            var inputEmail = document.getElementById('contact_form_email').innerHTML;
                            var inputMessage = document.getElementById('contact_form_message').innerHTML;
                            var inputSubmit = document.getElementById('contact_form_button').innerHTML;
                            document.getElementById('form_name').placeholder = inputName;
                            document.getElementById('form_email').placeholder = inputEmail;
                            document.getElementById('form_message').placeholder = inputMessage;
                            document.getElementById('form_button').value = inputSubmit;
                        }
                    }
                }
            });
    }

    return {
        setNewLang: function () {
            var newLang = readCookie('lang')
            document.getElementById('btn-es').addEventListener('click', function () {
                newLang = 'es'
                setNavLang(newLang);
                loadTranslateJson();
                location.reload();
            });
            document.getElementById('btn-en').addEventListener('click', function () {
                newLang = 'en'
                setNavLang(newLang);
                loadTranslateJson();
                location.reload();
            });
            document.getElementById('btn-pt').addEventListener('click', function () {
                newLang = 'pt'
                setNavLang(newLang);
                location.reload();
            });
            setNavLang(newLang);
            loadTranslateJson();
        }
    }
})();

var translatorController = (function () {
    return {
        getUrl: function (lang) {
            var url = window.location.href;
            var newUrl = url + '?' + lang;
        },
        setHtmlLang: function (lang) {
            document.getElementsByTagName('html')[0].setAttribute('lang', lang);
        }

    }
})();

var siteController = (function (translatorCtrl, UICtrl) {
    var changeLang = function () {
        UICtrl.setNewLang();
    };
    
    return {
        init: function () {
            console.log('aplication started');
            changeLang();
        }
    };
})(translatorController, UIController);

siteController.init();



