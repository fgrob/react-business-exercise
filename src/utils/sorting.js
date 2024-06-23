import moment from "moment-timezone";

export const sortByDateDesc = (data, dateField) => {
    return data.sort((a, b) => {
        const dateA = new Date(a[dateField]);
        const dateB = new Date(b[dateField]);
        return dateB - dateA;
    });
};

export const sortByField = (data, field, order) => {
    return data.sort((a, b) => {
        try {
            if (order === "desc") {
                if (typeof a[field] === "string") {
                    if (moment(a[field], moment.ISO_8601, true).isValid()) {
                        return b[field].localeCompare(a[field], undefined, { numeric: true })
                    }
                    return a[field].localeCompare(b[field], undefined, { numeric: true });
                } else {
                    return b[field] - a[field];
                }
            } else {
                if (typeof a[field] === "string") {
                    if (moment(a[field], moment.ISO_8601, true).isValid()) {
                        return a[field].localeCompare(b[field], undefined, { numeric: true })
                    }
                    return b[field].localeCompare(a[field], undefined, { numeric: true });
                } else {
                    return a[field] - b[field];
                }
            }
        } catch {
            return data
        }
    });
};
