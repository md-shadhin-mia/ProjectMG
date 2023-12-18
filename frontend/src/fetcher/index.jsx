import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeader = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

apiClient.interceptors.request.use((config) => {
  const auth = getAuthHeader();
  if (auth.Authorization) {
    config.headers = { ...config.headers, ...auth };
  }
  return config;
});

const fetcher = {
  getUser() {
    return apiClient.get("/auth/do");
  },

  register(data) {
    return apiClient.post("/auth/register", data);
  },

  login(username, password) {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    return apiClient.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  getProjects() {
    return apiClient.get("/projects");
  },

  getProject(id) {
    return apiClient.get(`/projects/${id}`);
  },

  createProject(data) {
    return apiClient.post("/projects", data);
  },

  updateProject(id, data) {
    return apiClient.put(`/projects/${id}`, data);
  },

  deleteProject(id) {
    return apiClient.delete(`/projects/${id}`);
  },

  getProjectGoals(projectId) {
    return apiClient.get(`/projects/${projectId}/goals`);
  },

  addGoalToProject(projectId, data) {
    return apiClient.post(`/projects/${projectId}/goals`, data);
  },

  getGoal(projectId, goalId) {
    return apiClient.get(`/projects/${projectId}/goals/${goalId}`);
  },

  updateGoal(projectId, goalId, data) {
    return apiClient.put(`/projects/${projectId}/goals/${goalId}`, data);
  },

  deleteGoal(projectId, goalId) {
    return apiClient.delete(`/projects/${projectId}/goals/${goalId}`);
  },

  getGoalTasks(projectId, goalId) {
    return apiClient.get(`/projects/${projectId}/goals/${goalId}/tasks`);
  },

  addTaskToGoal(projectId, goalId, data) {
    return apiClient.post(`/projects/${projectId}/goals/${goalId}/tasks`, data);
  },

  completeTask(projectId, goalId, taskId) {
    return apiClient.put(`/projects/${projectId}/goals/${goalId}/tasks/${taskId}`);
  },

  deleteTask(projectId, goalId, taskId) {
    return apiClient.delete(`/projects/${projectId}/goals/${goalId}/tasks/${taskId}`);
  },

  getProfile() {
    return apiClient.get("/profiles");
  },

  updateProfile(id, data) {
    return apiClient.put(`/profiles/${id}`, data);
  },

  uploadProfileImage(id, file) {
    const formData = new FormData();
    formData.append("image", file);
    return apiClient.post(`/profiles/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getReportSummary() {
    return apiClient.get("/reports/summary");
  },

  getProjectReport(projectId) {
    return apiClient.get(`/reports/projects/${projectId}`);
  },
};

export default fetcher;