export class Cache {
  private static cache: {
    getItem: (key: string) => any;
    setItem: (key: string, value: any) => void;
    removeItem: (key: string) => void;
  };

  public static getCache() {
    if (!this.cache) {
      this.cache = {
        getItem: (key: string) => {
          try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
          } catch (err) {
            console.warn("Failed to get from cache:", err);
            return null;
          }
        },
        setItem: (key: string, value: any) => {
          try {
            localStorage.setItem(key, JSON.stringify(value));
          } catch (err) {
            console.warn("Failed to set cache:", err);
          }
        },
        removeItem: (key: string) => {
          try {
            localStorage.removeItem(key);
          } catch (err) {
            console.warn("Failed to remove cache item:", err);
          }
        },
      };
    }
    return this.cache;
  }
}
