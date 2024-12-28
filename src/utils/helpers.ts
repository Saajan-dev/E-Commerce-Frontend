import { toastMessage } from "../components/ToastMessage";

export function setCookie(
  cname: string,
  cvalue: string | null,
  exdays: number = 30
): void {
  const storedValue =
    typeof cvalue === "string" ? cvalue : JSON.stringify(cvalue);
  const encodedValue = btoa(storedValue);
  const d: Date = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires: string = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${encodedValue};${expires};path=/`;
}

const getStoredData = (data: string) => {
  try {
    const decodedValue = atob(data);
    return JSON.parse(decodedValue);
  } catch (error) {
    return data;
  }
};

export function getCookie(cname: string) {
  const name: string = `${cname}=`;
  const ca: string[] = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c: string = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return getStoredData(c.substring(name.length, c.length));
    }
  }
  return null;
}

export function deleteCookie(name: string) {
  setCookie(name, "", -1);
}

export const getErrorMessage = (err: any) => {
  let toastText = "";
  if (err?.response?.data?.message) {
    toastText = err?.response?.data?.message;
  } else if (err?.response?.statusText) {
    toastText = `${err?.response?.statusText}.Try again later.`;
  } else {
    toastText = "Something went wrong!";
  }
  toastMessage("error", toastText);
};
