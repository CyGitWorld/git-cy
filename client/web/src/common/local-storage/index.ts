class SafeLocalStorage {
  isClient: boolean;

  constructor() {
    this.isClient = typeof window !== "undefined";
  }

  setItem(key: string, value: string) {
    if (this.isClient) {
      window.localStorage.setItem(key, value);
    }
  }

  getItem(key: string) {
    if (this.isClient) {
      return window.localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string) {
    if (this.isClient) {
      window.localStorage.removeItem(key);
    }
  }

  clear() {
    if (this.isClient) {
      window.localStorage.clear();
    }
  }
}

export const localStorage = new SafeLocalStorage();
