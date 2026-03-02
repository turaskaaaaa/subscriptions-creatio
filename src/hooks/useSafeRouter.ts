import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useSafeNavigate() {
  try {
    const navigate = useNavigate();
    return navigate;
  } catch {
    // Fallback when rendered outside Router context (e.g., Visual Edits)
    return (path: string) => {
      window.location.href = path;
    };
  }
}

export function useSafeLocation() {
  try {
    return useLocation();
  } catch {
    return { pathname: window.location.pathname, search: "", hash: "", state: null, key: "" };
  }
}
