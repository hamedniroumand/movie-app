import axios, {AxiosInstance} from "axios";

class HttpService {
    private http: AxiosInstance;
    protected readonly baseUrl: string = 'https://api.themoviedb.org/3';
    protected readonly apiKey: string = 'f62f750b70a8ef11dad44670cfb6aa57';

    constructor() {
        this.http = axios.create({
            baseURL: this.baseUrl,
        });
    }

    public get(path: string) {
        return this.http.get(`${path}?api_key=${this.apiKey}`)
    }

}

export default new HttpService;