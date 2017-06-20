import fetch from 'node-fetch';

class RequestHandler {
  static async fetch(url) {
    const response = await fetch(url);

    return response.json();
  }
}

export default RequestHandler;