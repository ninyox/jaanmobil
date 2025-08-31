export function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = {
        year: Math.floor(seconds / (60 * 60 * 24 * 365)),
        month: Math.floor(seconds / (60 * 60 * 24 * 30)),
        week: Math.floor(seconds / (60 * 60 * 24 * 7)),
        day: Math.floor(seconds / (60 * 60 * 24)),
        hour: Math.floor(seconds / (60 * 60)),
        minute: Math.floor(seconds / 60),
        second: seconds
    };

    let result;
    if (intervals.year > 1) {
        result = `${intervals.year}yrs`;
    } else if (intervals.month > 1) {
        result = `${intervals.month}mon`;
    } else if (intervals.week > 1) {
        result = `${intervals.week}w`;
    } else if (intervals.day > 1) {
        result = `${intervals.day}d`;
    } else if (intervals.hour > 1) {
        result = `${intervals.hour}h`;
    } else if (intervals.minute > 1) {
        result = `${intervals.minute}min`;
    } else {
        result = `${intervals.second ? intervals.second : "0"}sec`;
    }

    return result;
}


export function timeAgos(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = {
        year: Math.floor(seconds / (60 * 60 * 24 * 365)),
        month: Math.floor(seconds / (60 * 60 * 24 * 30)),
        week: Math.floor(seconds / (60 * 60 * 24 * 7)),
        day: Math.floor(seconds / (60 * 60 * 24)),
        hour: Math.floor(seconds / (60 * 60)),
        minute: Math.floor(seconds / 60),
        second: seconds
    };

    let result;
    if (intervals.year > 1) {
        result = `${intervals.year} year ago`;
    } else if (intervals.month > 1) {
        result = `${intervals.month} month ago`;
    } else if (intervals.week > 1) {
        result = `${intervals.week} week ago`;
    } else if (intervals.day > 1) {
        result = `${intervals.day} day ago`;
    } else if (intervals.hour > 1) {
        result = `${intervals.hour} hour ago`;
    } else if (intervals.minute > 1) {
        result = `${intervals.minute} minutes ago`;
    } else {
        result = `${intervals.second ? intervals.second : "0"} seconds ago`;
    }

    return result;
}
