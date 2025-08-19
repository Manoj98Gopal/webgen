// Store data in localStorage
export function setToLocalStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing to localStorage:", error);
  }
}

// Get data from localStorage
export function getFromLocalStore(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting from localStorage:", error);
    return null;
  }
}

// Delete data from localStorage
export function deleteFromLocalStore(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
  }
}
