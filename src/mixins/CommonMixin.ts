export default {
    methods: {
        getImageUrl(path: string | undefined, size: 'original' | string = 'w500') {
            if (path) {
                return `https://image.tmdb.org/t/p/${size}/${path}`;
            }
        },
        priceFormat(price: string | number) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+price);
        },
        minutesToHour(minute: number) {
            if (!minute) return;
            const h = Math.floor(minute / 60);
            const m = Math.floor(minute % 60);
            return `${h}h ${m}m`; 
        }
    }
};