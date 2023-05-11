export const formatTimestamp = (timestamp, locales = 'en-US') => {
    timestamp = new Date(timestamp?.seconds ? timestamp.seconds * 1000 : timestamp);
    if (
        timestamp.getDate() !== new Date().getDate() ||
        timestamp.getMonth() !== new Date().getMonth() ||
        timestamp.getFullYear() !== new Date().getFullYear()
    ) {
        return new Intl.DateTimeFormat(locales, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        }).format(timestamp);
    }
    return new Intl.DateTimeFormat(locales, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(timestamp);
};
