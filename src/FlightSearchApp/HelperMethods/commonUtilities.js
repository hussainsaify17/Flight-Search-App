export function getTimeDifference(t1, t2) {
    let t1Array = t1.split(':');
    let t2Array = t2.split(':');
    var date1 = new Date().setHours(t1Array[0], t1Array[1]);
    var date2 = new Date().setHours(t2Array[0], t2Array[1]);
    var diff = new Date(date1).getTime() - new Date(date2).getTime();
    
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    return { hours: hh, minutes: mm }
}

export const formatUnit = (unit) => ("0" + unit).slice(-2);