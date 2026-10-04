export function displayStatus(status){return String(status||'').replaceAll('_',' ')}
export function metricDelta(baseline,structured){return Number(structured)-Number(baseline)}
export function isOpenAction(status){return status!=='RESOLVED'}
