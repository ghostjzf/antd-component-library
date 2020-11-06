import moment from 'moment-timezone';

const regionKeyMap = {
    us: 'America/New_York'
};

export default function dateFilter(date, format = 'YYYY-MM-DD HH:mm:ss zz', customTimeZone) {
    const region = regionKeyMap[customTimeZone];

    if (typeof date !== 'number') {
        return date || '--';
    }

    if (region) {
        return moment(date)
            .tz(region)
            .format(format);
    }

    return moment(date).format(format);
}
