"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_unsupportedIterableToArray(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(a="Object"===a&&t.constructor?t.constructor.name:a)||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function _iterableToArrayLimit(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var n,r,o=[],c=!0,l=!1;try{for(a=a.call(t);!(c=(n=a.next()).done)&&(o.push(n.value),!e||o.length!==e);c=!0);}catch(t){l=!0,r=t}finally{try{c||null==a.return||a.return()}finally{if(l)throw r}}return o}}function _arrayWithHoles(t){if(Array.isArray(t))return t}var hostName="localhost"===document.location.hostname?"":"https://cmcknight.github.io/central-supply-catalog",cartKey="csc-cart",unitMultiplier={Cr:0,KCr:3,MCr:6,BCr:9,TCr:12},setUnitLabel=function(t){return 999999999999<t?"".concat(t/Math.pow(10,12)," TCr"):999999999<t?"".concat(t/Math.pow(10,9)," BCr"):999999<t?"".concat(t/Math.pow(10,6)," MCr"):999<t?"".concat(t/Math.pow(10,3)," KCr"):"".concat(t," Cr")},addItem=function(){var t=localStorage.getItem(cartKey),e=document.getElementById("prod-img").src,a=_slicedToArray(document.getElementById("unit-price").textContent.split(" "),2),n=a[0],r=a[1],o=parseInt(n)*Math.pow(10,unitMultiplier[r]),a=document.getElementById("product-name").textContent,n=parseInt(document.getElementById("product-qty").value),c=document.getElementById("product-name").getAttribute("data-sku"),r=(t=null==t?[]:JSON.parse(t)).find(function(t){return t.sku===c});null==r?t.push({sku:c,qty:n,name:a,unitPrice:o,image:e}):r.qty+=n,t=t.sort(function(t,e){return t.name<e.name?-1:t.name>e.name?1:0}),localStorage.setItem(cartKey,JSON.stringify(t)),updateCartBadge(),M.toast({html:"Item added to cart",displayLength:8e3})},removeItem=function(e){var t=(t=JSON.parse(localStorage.getItem(cartKey))).filter(function(t){return t.sku!==e});localStorage.setItem(cartKey,JSON.stringify(t)),updateCartUI(),updateCartBadge()},updateItemQty=function(e,t){var a=JSON.parse(localStorage.getItem(cartKey)),n=a.find(function(t){return t.sku===e});null===n|void 0===n?console.log("Sku: ".concat(e," is not in cart")):n.qty=t,localStorage.setItem(cartKey,JSON.stringify(a)),updateCartUI()},updateCartUI=function(){var t=JSON.parse(localStorage.getItem(cartKey)),e=document.querySelector(".cart-items-container"),a=document.querySelector(".cart-total"),n="",r=0;null==t||0===t.length?(console.log("No items in cart"),n='<div class="row">\n              <h5 class="center">No items in cart</h5>\n            </div>'):t.forEach(function(t){n+='\n      <div class="row product-row">\n        <div class="prod-img col s3 m2 l2">\n          <a href="#">\n            <img src="'.concat(t.image,'" class="responsive-img" alt="').concat(t.name,'">\n          </a>\n        </div>\n\n        <div class="prod-details col s5 m7 l7">\n\n          <div class="prod-title">\n              <a href="{{ ../products/').concat(t.name,' | url }}" data-sku="').concat(t.sku,'" class="item-name">').concat(t.name,'</a>\n          </div>\n\n          <div class="prod-qty">\n            <form>\n                <button><i class="fa fa-minus subtract-btn"></i></button>\n                <input type="number" class="qty" value="').concat(t.qty,'">\n                <button><i class="fa fa-plus add-btn"></i></button>\n                <button class="remove-item"><i class="fa fa-trash"></i></button>\n            </form>\n          </div>\n        </div>\n\n      <div class="prod-total col s3 m2 l2 right-align right">\n        ').concat(setUnitLabel(t.qty*t.unitPrice),"\n      </div>\n\n      </div>\n      "),r+=t.unitPrice*t.qty}),0===t.length?a.innerHTML="":a.innerHTML="Total: ".concat(setUnitLabel(r)),e.innerHTML=n},cartItemsList=document.querySelector(".cart-items-container");null!=cartItemsList&&(cartItemsList.addEventListener("change",function(t){var e;t.preventDefault,"qty"===t.target.className&&(e=t.target.parentNode.parentNode.querySelector(".qty"),e=Number(e.value),t=t.target.parentNode.parentNode.parentNode.parentNode.querySelector(".item-name").dataset.sku,updateItemQty(t,e))}),cartItemsList.addEventListener("click",function(t){t.preventDefault;var e=t.target.parentNode.parentNode.querySelector(".qty"),a=Number(e.value),e=t.target.parentNode.parentNode.parentNode.parentNode.querySelector(".item-name").dataset.sku;t.target.className.includes("fa-minus")?updateItemQty(e,a-1):t.target.className.includes("fa-plus")?updateItemQty(e,a+1):t.target.className.includes("fa-trash")&&removeItem(e)}));var removeAllItemsBtn=document.getElementById("empty-cart");null!=removeAllItemsBtn&&removeAllItemsBtn.addEventListener("click",function(){localStorage.setItem(cartKey,JSON.stringify([])),document.querySelector(".cart-total").textContent="",updateCartUI(),updateCartBadge()});var updateCartBadge=function(){var t=document.getElementById("cart-badge"),e=JSON.parse(localStorage.getItem(cartKey)).length;0===e?t.style.display="none":(t.textContent=e,t.style.display="block")};document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector(".sidenav");M.Sidenav.init(t,{});t=document.querySelectorAll(".modal");M.Modal.init(t,{});t=document.getElementById("add-to-cart");null!=t&&t.addEventListener("click",addItem),updateCartBadge(),window.location.href.includes("shopping-cart")&&updateCartUI()});