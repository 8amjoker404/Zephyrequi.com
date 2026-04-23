(function (window) {
  const API_BASE_URL = "https://api.zephyrq.site/api";
  const IMAGE_BASE_URL = "https://api.zephyrq.site";

  const trimSlashes = (value) => String(value || "").replace(/^\/+|\/+$/g, "");

  window.APP_CONFIG = {
    API_BASE_URL,
    IMAGE_BASE_URL,
  };

  window.API_BASE_URL = API_BASE_URL;
  window.IMAGE_BASE_URL = IMAGE_BASE_URL;
  window.apiUrl = function apiUrl(path) {
    const cleanPath = trimSlashes(path);
    return cleanPath ? `${API_BASE_URL}/${cleanPath}` : API_BASE_URL;
  };
  window.imageUrl = function imageUrl(path) {
    const value = String(path || "");
    if (!value) return "";
    if (/^https?:\/\//i.test(value)) return value;
    return `${IMAGE_BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
  };
})(window);
