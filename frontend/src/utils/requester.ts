
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

export async function sendRequest(url: string, method: HttpMethod, data?: Record<string, any>, headers?: Record<string, string>) {
  const options: RequestOptions = {
    method,
    headers: { "Content-Type": "application/json" ,
      ...headers,
    },
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  if (method === 'GET' || method === 'DELETE') {
    delete options.body;
  }

  try {
    const response = await fetch(url, options);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Request failed");
    }

    return resData;

  } catch (err: any) {
    throw new Error(err?.message || "Something went wrong");
  }
};
