if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const d=e=>n(e,o),u={module:{uri:o},exports:l,require:d};s[o]=Promise.all(i.map((e=>u[e]||d(e)))).then((e=>(r(...e),l)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AboutPage-CL9RXOiI.js",revision:null},{url:"assets/AddonPage-Ug_gXycI.js",revision:null},{url:"assets/AddonPrivacy-Bfzdd5hV.js",revision:null},{url:"assets/ContactPage-BOC3aPMN.js",revision:null},{url:"assets/index-CrS9wMBB.js",revision:null},{url:"assets/index-D6KC9-Yn.js",revision:null},{url:"assets/index-u4gXRU3P.js",revision:null},{url:"assets/NotFoundPage-CPBs0dpK.js",revision:null},{url:"assets/PageTabs-CGl41YTO.js",revision:null},{url:"assets/ScrollToTopOnMount-YbRgBmSJ.js",revision:null},{url:"assets/TeamPage-D79yHXwe.js",revision:null},{url:"assets/TrainingPage-DOF-v_VE.js",revision:null},{url:"assets/UpdatePage-DqOUXkXk.js",revision:null},{url:"assets/vendor-ClnM7L9C.js",revision:null},{url:"assets/XtremePage-DEXkxVxp.js",revision:null},{url:"index.html",revision:"a74112c849828fdd1dc1e6f7eaf15bc6"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icons/icon-72x72.png",revision:"8f749c026eb1d2bec4d71f4c3534a8aa"},{url:"icons/icon-96x96.png",revision:"17bed4e1945ff020c43f4778ea96b515"},{url:"icons/icon-128x128.png",revision:"127d9107c7fddd370c57133b52113d93"},{url:"icons/icon-144x144.png",revision:"342dac3ebd24b9245bf3c66bcf14df75"},{url:"icons/icon-152x152.png",revision:"ddd3f94ba98b1b023da0a9f7942d6ca3"},{url:"icons/icon-192x192.png",revision:"bd002b08634a1b9fed3affcfd603e01b"},{url:"icons/icon-284x284.png",revision:"67b33beee60ff7334d5292b25122c349"},{url:"icons/icon-512x512.png",revision:"21c5bd38ea043348e9f770c9b2740f48"},{url:"manifest.webmanifest",revision:"13ad3ae915d0ddea983c7a52efb0a8fd"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
