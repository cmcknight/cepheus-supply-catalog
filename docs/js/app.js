<<<<<<< HEAD
"use strict";var SW_LOCATION="".concat(location.pathname.match("((?:/central-supply-catalog/)?)")[0],"sw.js"),APP={SW:null,init:function(){APP.registerSW()},registerSW:function(){var e="".concat(SW_LOCATION);"serviceWorker"in navigator?navigator.serviceWorker.register(e).then(function(e){APP.SW=e.installing||e.waiting||e.active},function(e){console.log("Service worker registration failed")}):console.log("Service workers are not supported.")}};document.addEventListener("DOMContentLoaded",APP.init);
=======
"use strict";var SW_LOCATION="/sw.js",APP={SW:null,init:function(){APP.registerSW()},registerSW:function(){var e="".concat(SW_LOCATION);"serviceWorker"in navigator?navigator.serviceWorker.register(e).then(function(e){APP.SW=e.installing||e.waiting||e.active},function(e){console.log("Service worker registration failed")}):console.log("Service workers are not supported.")}};document.addEventListener("DOMContentLoaded",APP.init);
>>>>>>> gh-pages
