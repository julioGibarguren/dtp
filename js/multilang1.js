//objengo el lang del body


//Cargo el template del header cuando se carga la pagina.
var UIController = (function(){

    var DOMstrings = {
        navbarRight: '.tooglenav',
        langButton: '.lang-button'
    }

    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
          var status = xhr.status;
          if (status === 200) {
            callback(null, xhr.response);
          } else {
            callback(status, xhr.response);
          }
        };
        xhr.send();
    };

    function createCookie(name, value, days){
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        console.log('creo cookie')
        document.cookie = name + "=" + value + expires + "; path=/";
        var cookiee = document.cookie = name + "=" + value + expires + "; path=/";
    }
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    function setNavLang(newlang){
        console.log('entra')
        var navMenu, html, init, about, services, contact, navbar;
        
        navbar = '<li><a class="inicioBtn" href="index.html">%home%</a></li><li><a class="aboutBtn" href="index.html#sobreNosotros">%about%</a></li><li><a class="servicesBtn" href="index.html#services">%services%</a></li><li><a class="contactBtn" href="contacto.html">%contact%</a></li>';
        navMenu = document.querySelector(DOMstrings.navbarRight);
        html = navbar;

        if(newlang === 'es'){  
           init = 'INICIO';
           about = 'SOBRE NOSOTROS';
           services = 'SERVICIOS';
           contact = 'CONTACTO';

        } else if(newlang === 'en'){
            init = 'HOME';
            about = 'ABOUT US';
            services = 'SERVICES';
            contact = 'CONTACT';
           

        } else if(newlang === 'pt'){
            init = 'HOME';
            about = 'ABOUT US';
            services = 'SERVICES';
            contact = 'CONTACT';
        }

        newHtml = html.replace('%home%', init);
        newHtml = newHtml.replace('%lang%', newlang);
        newHtml = newHtml.replace('%about%', about);
        newHtml = newHtml.replace('%services%', services);
        newHtml = newHtml.replace('%contact%', contact);
       
        document.querySelector(DOMstrings.navbarRight).innerHTML = newHtml;
        createCookie('lang', newlang, 30);
    }
    
    // function replaceText(data){
    //     var translates = document.querySelectorAll('.translate');       
    //     for(var i = 0; i < translates.length; i++){
    //         console.log(translates[i]);
    //         console.log(data.contact.title)
    //         var a = translates[i].id;
    //         var b = data + '.' + a;
    //         console.log(b)      
    //         document.getElementById(translates[i].id).textContent = b
    //     }
    // }
    function loadTranslateJson(){
        var cookieLang = readCookie('lang')
        var jsonUrl = '../js/' + cookieLang + '.json'
      
        getJSON(jsonUrl ,
        function(err, data) {
          if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            alert('Your title: ' + data.title);
            var translates = document.querySelectorAll('.translate');       
            for(var i = 0; i < translates.length; i++){
                var a = translates[i].id;
                console.log(translates[i].id
                )
                document.getElementById(translates[i].id).innerHTML = data[a]
                
            }
          }
          
        }); 
                
    }
    return {
        
        setNewLang: function(){
            var newLang = readCookie('lang')
            document.getElementById('btn-es').addEventListener('click', function(){ 
                newLang = 'es' 
                console.log(newLang)
                setNavLang(newLang);
                loadTranslateJson();
                
            });
            document.getElementById('btn-en').addEventListener('click', function(){ 
                newLang = 'en' 
                console.log(newLang)
                setNavLang(newLang);
                loadTranslateJson();
            });
            document.getElementById('btn-pt').addEventListener('click', function(){ 
                newLang = 'pt' 
                console.log(newLang)
                setNavLang(newLang);
            });
            setNavLang(newLang);
            loadTranslateJson();
        }
    }
})();

//asigno el lang en el body
var translatorController = (function(){

    return{
        getUrl: function(lang){
            var url = window.location.href;
            
            var newUrl = url + '?' + lang;
            
            // window.location.href = newUrl;
            console.log(newUrl);
        },
        
        setHtmlLang: function(lang){
            document.getElementsByTagName('html')[0].setAttribute('lang',lang);
        }
      
    }
})();

var siteController = (function(translatorCtrl, UICtrl){
    var changeLang = function(){
       UICtrl.setNewLang();
       

       
    };
    return {
        init: function() {
            console.log('aplication started');
            changeLang();   
        }
    };
    
})(translatorController, UIController);

siteController.init();
//traigo el json con los textos de la pagina segun el lang del body



