const a=t=>{if(t<=0)return"0%";if(t>=1)return"100%";if(t<1e-30)return"~0%";const r=t*100,o=Math.log10(r);return`${r.toFixed(-Math.floor(o)+1)}%`};export{a as f};
