//objengo el lang del body


//Cargo el template del header cuando se carga la pagina.
var UIController = (function(){

    var DOMstrings = {
        navbarRight: '.navbar-right'
    }
    
    return {
        setNavLang: function(newlang){
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
            newHtml = newHtml.replace('%about%', about);
            newHtml = newHtml.replace('%services%', services);
            newHtml = newHtml.replace('%contact%', contact);

            document.querySelector(DOMstrings.navbarRight).insertAdjacentHTML('beforeend', newHtml);
            
           
        },
        getHref: function(){

            var newHref = document.querySelector('.explore').getAttribute("href");
            console.log(newHref);
            var newHref2 = document.querySelector('.inicioBtn').getAttribute("href");
            console.log(newHref2);
            
            //Levantar todos los href de la home y retornar sus valores en variables en un array
            


        },
        setHref: function(lang, arr){

            //recorrer el array de urls 


            //modificar las urls sumandole el valor de lang
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
        var lang = 'en'
        UICtrl.setNavLang(lang)
        translatorCtrl.setHtmlLang(lang);
        translatorCtrl.getUrl(lang);
        UICtrl.getHref();
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



