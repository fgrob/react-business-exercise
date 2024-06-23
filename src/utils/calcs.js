export const calculateSalesByAgency = (sales) => {
    const aggregatedSales = sales.reduce((acc, sale) => {
        if (!acc[sale.nameAgency]) {
            acc[sale.nameAgency] = {
                nameAgency: sale.nameAgency,
                total: 0,
                commission: 0,
                path: `${sale.nameAgency.toLowerCase().replace(/ /g, "-")}`,
            };
        }
        acc[sale.nameAgency].total += sale.finalPrice;
        acc[sale.nameAgency].commission = acc[sale.nameAgency].total * 0.025;

        return acc;
    }, {});

    return Object.values(aggregatedSales);
};

export const calculateTopAgency = (salesByAgency) => {
    if (salesByAgency.length === 0) return null;

    const topAgency = salesByAgency.reduce((topAgency, currentAgency) => {
        return currentAgency.total > topAgency.total ? currentAgency : topAgency
    });

    return { nameAgency: topAgency.nameAgency, total: topAgency.total }
};

export const calcTopSalesDate = (sales) => {
    const salesByMonthYear = {};

    sales.forEach((sale) => {
        const saleDate = new Date(sale.createdAt);
        const saleMonth = saleDate.getMonth() + 1;
        const saleYear = saleDate.getFullYear();
        const key = `${saleMonth}-${saleYear}`

        if (!salesByMonthYear[key]) {
            salesByMonthYear[key] = { year: saleYear, month: saleMonth, total: sale.finalPrice }
        } else {
            salesByMonthYear[key].total += sale.finalPrice
        }
    });

    let maxSales = 0;
    let topMonth;
    let topYear;

    Object.entries(salesByMonthYear).forEach(([key, value]) => {
        if (value.total > maxSales) {
            maxSales = value.total
            topMonth = value.month;
            topYear = value.year;
        }
    });
    return { year: topYear, month: topMonth, total: maxSales }
}