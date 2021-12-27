export default {
    methods: {
        getImageUrl(path: string, size: 'original' | string = 'w500') {
            return `https://image.tmdb.org/t/p/${size}/${path}`;
        }
    }
};