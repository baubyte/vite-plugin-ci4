async function i(o,r){for(let e of Array.isArray(o)?o:[o]){let n=r[e];if(!(typeof n>"u"))return typeof n=="function"?n():n}throw new Error(`Page not found: ${o}`)}export{i as resolvePageComponent};
