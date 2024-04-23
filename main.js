(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"15b9ade9-0fb6-48e4-9df8-c18fc5002836","Content-Type":"application/json"}},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},c=fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers}).then((function(e){return o(e)})),a=fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers}).then((function(e){return o(e)})),i=function(e,t){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e.cardId),{method:t,headers:r.headers}).then((function(e){return o(e)}))},u=document.querySelector("#card-template").content.querySelector(".card");function s(e,t,n){var r,o=n.confirmDeleteCard,c=n.likeCard,a=n.openCard,i=u.cloneNode(!0),s=i.querySelector(".card__image"),d=i.querySelector(".card__like_count"),p=i.querySelector(".card__delete-button"),f=i.querySelector(".card__title"),m=e._id,_=i.querySelector(".card__like-button"),h=e.likes;return(r={arrayLikes:h,userId:t,likeBtn:_}).arrayLikes.forEach((function(e){e._id==r.userId&&r.likeBtn.classList.add("card__like-button_is-active")})),s.src=e.link,s.alt=e.name,f.textContent=e.name,l(d,e.likes.length),e.owner._id!==t?i.removeChild(p):p.addEventListener("click",(function(){return o({card:i,cardId:m})})),_.addEventListener("click",(function(e){return c(e,{cardLikes:d,cardId:m})})),s.addEventListener("click",(function(){return a(e)})),i}function l(e,t){e.textContent=t}function d(e,t){e.target.classList.contains("card__like-button_is-active")?i(t,"DELETE").then((function(n){e.target.classList.remove("card__like-button_is-active"),l(t.cardLikes,n.likes.length)})).catch((function(e){return console.log(e)})):i(t,"PUT").then((function(n){e.target.classList.add("card__like-button_is-active"),l(t.cardLikes,n.likes.length)})).catch((function(e){return console.log(e)}))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector),o=t.inputErrorClass,c=t.errorClass;n.forEach((function(t){t.setCustomValidity(""),m(e,t,{inputErrorClass:o,errorClass:c})})),f(n,r,t.inactiveButtonClass)}function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n):t.classList.add(n)}function m(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)}var _,h,y,v=document.querySelector(".places__list"),C=document.querySelectorAll(".popup"),S=document.forms["edit-profile"],k=S.querySelector(".popup__input_type_name"),g=S.querySelector(".popup__input_type_description"),b=document.forms["new-place"],L=b.querySelector(".popup__input_type_card-name"),E=b.querySelector(".popup__input_type_url"),q=document.querySelector(".profile__edit-button"),x=document.querySelector(".profile__add-button"),B=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),D=document.forms["change-profile-image"],U=document.querySelector(".profile__image"),I=document.querySelector(".popup_type_change-profile-image"),T=document.querySelector(".popup__input_type_url-image"),P=document.querySelector(".popup_type_edit"),j=document.querySelector(".popup_type_new-card"),w=document.querySelector(".popup_type_image"),N=w.querySelector(".popup__image"),O=w.querySelector(".popup__caption"),H=document.forms["confirm-delete"],J=document.querySelector(".popup_type_confirm-delete"),M=S.elements.addBtn,V=b.elements.addBtn,z=D.elements.addBtn,F="Сохранение...",G="Сохранить",K={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error-active"};function Q(e){B.textContent=e.name,A.textContent=e.about,U.style.backgroundImage="url(".concat(e.avatar,")")}function R(t){e(J),h=t}function W(t){N.src=t.link,N.alt=t.name,O.textContent=t.name,e(w)}S.addEventListener("submit",(function(e){e.preventDefault();var n,c=k.value,a=g.value;M.textContent=F,(n={name:c,job:a},fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n.name,about:n.job})}).then((function(e){return o(e)}))).then((function(e){Q(e),t(P),M.textContent=G})).catch((function(e){return console.log(e)}))})),b.addEventListener("submit",(function(e){e.preventDefault();var n,c=L.value,a=E.value;V.textContent=F,(n={name:c,link:a},fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:n.name,link:n.link})}).then((function(e){return o(e)}))).then((function(n){v.prepend(s(n,_,{confirmDeleteCard:R,likeCard:d,openCard:W})),e.target.reset(),t(j),V.textContent=G,p(b,K)})).catch((function(e){return console.log(e)}))})),D.addEventListener("submit",(function(e){var n;e.preventDefault(),z.textContent=F,(n=T.value,fetch("".concat(n),{method:"HEAD"}).then((function(e){return e.ok&&e.headers.get("Content-Type").includes("image")?function(e){return fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e})}).then((function(e){return o(e)}))}(n):Promise.reject("Ошибка: ".concat(e.status))}))).then((function(n){var r;r=n.avatar,U.style.backgroundImage="url(".concat(r,")"),e.target.reset(),t(I),z.textContent=G,p(D,K)})).catch((function(e){return console.log(e)}))})),H.addEventListener("submit",(function(e){var n,c;e.preventDefault(),(c=h.cardId,console.log(c),fetch("".concat(r.baseUrl,"/cards/").concat(c),{method:"DELETE",headers:r.headers}).then((function(e){return o(e)}))).then((n=h.card,void n.remove())).then(t(J)).catch((function(e){return console.log(e)}))})),x.addEventListener("click",(function(){e(j)})),U.addEventListener("click",(function(){e(I)})),C.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",(function(n){n.target.classList.contains("popup_is-opened")&&t(e),n.target.classList.contains("popup__close")&&t(e)}))})),q.addEventListener("click",(function(){k.value=B.textContent,g.value=A.textContent,e(P),p(S,K)})),y=K,Array.from(document.querySelectorAll(y.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector),o=t.inputErrorClass,c=t.errorClass;f(n,r,t.inactiveButtonClass),n.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?m(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,a,{inputErrorClass:o,errorClass:c}),f(n,r,t.inactiveButtonClass)}))}))}(e,y)}));var X=[c,a];Promise.all(X).then((function(e){Q(e[0]),_=e[0]._id,function(e,t){e.forEach((function(e){v.append(s(e,t,{confirmDeleteCard:R,likeCard:d,openCard:W}))}))}(e[1],_)})).catch((function(e){return console.log(e)}))})();