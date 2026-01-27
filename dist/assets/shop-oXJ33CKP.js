import"./script-Dnboc6F1.js";const c=12;function l(i){return i.toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim()}function o(i=1){const s=document.getElementById("bikesGrid");if(!s)return;const t=(i-1)*c,n=t+c,e=bikesData.slice(t,n);s.innerHTML=e.map(a=>`
        <a href="/bikes/${l(a.name)}.html" class="bike-card">
            <img src="${a.image}" alt="${a.name}" class="bike-image">
            <div class="bike-info">
                <span class="bike-type">${a.type}</span>
                <h3>${a.name}</h3>
                <ul class="bike-features">
                    <li><i class="fas fa-check"></i> ${a.specs.gears}</li>
                    <li><i class="fas fa-check"></i> ${a.specs.brakes}</li>
                    <li><i class="fas fa-check"></i> ${a.condition} condition</li>
                </ul>
                <p class="bike-price">£${a.price}</p>
            </div>
        </a>
    `).join(""),d(i)}function d(i){const s=document.getElementById("pagination");if(!s)return;const t=Math.ceil(bikesData.length/c);let n="";n+=`
        <button onclick="changePage(${i-1})" ${i===1?"disabled":""}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;for(let e=1;e<=t;e++)n+=`
            <button onclick="changePage(${e})" ${i===e?'class="active"':""}>
                ${e}
            </button>
        `;n+=`
        <button onclick="changePage(${i+1})" ${i===t?"disabled":""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `,s.innerHTML=n}document.addEventListener("DOMContentLoaded",function(){o(1)});
