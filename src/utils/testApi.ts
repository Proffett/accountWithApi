const BASE_URL = 'http://emphasoft-test-assignment.herokuapp.com';

class TestApi {
  readonly baseUrl: string;

  readonly defaultHeaders: HeadersInit;

  constructor(options: { baseUrl: string }) {
    this.baseUrl = options.baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        ...this.defaultHeaders,
        Authorization: `Token ${token}`,
      };
    }
    return {
      ...this.defaultHeaders,
    };
  }

  private async post(url: string, options: { headers?: HeadersInit; body: unknown }) {
    return fetch(`${this.baseUrl}/${url}`, {
      headers: options.headers || this.getHeaders(),
      method: 'POST',
      body: JSON.stringify(options.body),
    });
  }

  private async patch(url: string, options: { headers?: HeadersInit; body: unknown }) {
    return fetch(`${this.baseUrl}/${url}`, {
      headers: options.headers || this.getHeaders(),
      method: 'PATCH',
      body: JSON.stringify(options.body),
    });
  }

  // public methods:
  public async postData(url: string, options: { headers?: HeadersInit; body: unknown }) {
    return this.post(url, options);
  }

  public async patchData(url: string, options: { headers?: HeadersInit; body: unknown }) {
    return this.patch(url, options);
  }
}

const testApi = new TestApi({
  baseUrl: BASE_URL,
});

export default testApi;
