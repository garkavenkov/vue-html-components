var e={name:"VueCheckbox",model:{prop:"checked",event:"change"},props:{checked:Boolean,id:{type:String,required:!1,default:"vue-checkbox"}}};var t=function(e,t,n,a,o,i,c,r,d,s){"boolean"!=typeof c&&(d=r,r=c,c=!1);var l,u="function"==typeof n?n.options:n;if(e&&e.render&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0,o&&(u.functional=!0)),a&&(u._scopeId=a),i?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,d(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},u._ssrRegister=l):t&&(l=c?function(){t.call(this,s(this.$root.$options.shadowRoot))}:function(e){t.call(this,r(e))}),l)if(u.functional){var p=u.render;u.render=function(e,t){return l.call(t),p(e,t)}}else{var h=u.beforeCreate;u.beforeCreate=h?[].concat(h,l):[l]}return n},n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());var a=document.head||document.getElementsByTagName("head")[0],o={};var i=t({render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vue-checkbox"},[n("input",{attrs:{type:"checkbox",id:e.id},domProps:{checked:e.checked},on:{change:function(t){return e.$emit("change",t.target.checked)}}}),e._v(" "),n("label",{attrs:{for:e.id}},[e._t("default")],2)])},staticRenderFns:[]},function(e){e&&e("data-v-5c8a8a5a_0",{source:".vue-checkbox[data-v-5c8a8a5a] input[type=checkbox]{position:relative;width:40px;height:20px;-webkit-appearance:none;-moz-appearance:none;outline:0;background:#c6c6c6;border-radius:20px;box-shadow:0 0 5px rgba(0,0,0,.2);transition:.3s;vertical-align:middle;margin-right:5px}.vue-checkbox[data-v-5c8a8a5a] input[type=checkbox]~label{margin-bottom:0;vertical-align:middle}.vue-checkbox[data-v-5c8a8a5a] input:checked[type=checkbox]{background:#03a9f4}.vue-checkbox[data-v-5c8a8a5a] input[type=checkbox]:before{content:' ';position:absolute;width:20px;height:20px;border-radius:50%;top:0;left:0;background:#fff;transform:scale(1.2);box-shadow:0 2px 5px rgba(0,0,0,.2);transition:.3s}.vue-checkbox[data-v-5c8a8a5a] input:checked[type=checkbox]:before{left:20px}",map:void 0,media:void 0})},e,"data-v-5c8a8a5a",!1,void 0,function(e){return function(e,t){return function(e,t){var i=n?t.media||"default":e,c=o[i]||(o[i]={ids:new Set,styles:[]});if(!c.ids.has(e)){c.ids.add(e);var r=t.source;if(t.map&&(r+="\n/*# sourceURL="+t.map.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t.map))))+" */"),c.element||(c.element=document.createElement("style"),c.element.type="text/css",t.media&&c.element.setAttribute("media",t.media),a.appendChild(c.element)),"styleSheet"in c.element)c.styles.push(r),c.element.styleSheet.cssText=c.styles.filter(Boolean).join("\n");else{var d=c.ids.size-1,s=document.createTextNode(r),l=c.element.childNodes;l[d]&&c.element.removeChild(l[d]),l.length?c.element.insertBefore(s,l[d]):c.element.appendChild(s)}}}(e,t)}},void 0),c=Object.freeze({VueCheckbox:i});var r={install:function e(t){e.installed||(e.installed=!0,Object.keys(c).forEach(function(e){t.component(e,c[e])}))}},d=null;"undefined"!=typeof window?d=window.Vue:"undefined"!=typeof global&&(d=global.Vue),d&&d.use(r);export default r;export{i as VueCheckbox};