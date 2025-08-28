const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  createdAt?: string
}

export interface Note {
  id: number
  title: string
  content: string
  category: string
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("auth_token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || "An error occurred" }
      }

      return { data }
    } catch (error) {
      return { error: "Network error. Please try again." }
    }
  }

  // Auth methods
  async signup(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async login(credentials: { email: string; password: string }): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.request("/auth/me")
  }

  // Notes methods
  async getNotes(params?: { category?: string; search?: string }): Promise<ApiResponse<{ notes: Note[] }>> {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append("category", params.category)
    if (params?.search) searchParams.append("search", params.search)

    const queryString = searchParams.toString()
    return this.request(`/notes${queryString ? `?${queryString}` : ""}`)
  }

  async getNote(id: number): Promise<ApiResponse<{ note: Note }>> {
    return this.request(`/notes/${id}`)
  }

  async createNote(noteData: {
    title: string
    content: string
    category?: string
  }): Promise<ApiResponse<{ note: Note }>> {
    return this.request("/notes", {
      method: "POST",
      body: JSON.stringify(noteData),
    })
  }

  async updateNote(
    id: number,
    noteData: {
      title: string
      content: string
      category?: string
      isFavorite?: boolean
    },
  ): Promise<ApiResponse<{ note: Note }>> {
    return this.request(`/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(noteData),
    })
  }

  async deleteNote(id: number): Promise<ApiResponse> {
    return this.request(`/notes/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient()
