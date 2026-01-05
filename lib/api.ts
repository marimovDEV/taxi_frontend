import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { logApiError } from './utils'

// API Configuration
const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }
  
  // Use the provided API server
  const apiServerUrl = 'http://46.173.29.248/api'
  console.log('Using Taxi UZ API Server:', apiServerUrl)
  return apiServerUrl
}

const API_BASE_URL = getApiBaseUrl()

// Debug mode for API requests
const DEBUG_MODE = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEBUG_API === 'true'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for network access
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    
    // Debug logging for requests
    if (DEBUG_MODE) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data
      })
    }
    
    return config
  },
  (error) => {
    if (DEBUG_MODE) {
      console.error('❌ Request interceptor error:', error)
    }
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    // Debug logging for successful responses
    if (DEBUG_MODE) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      })
    }
    return response
  },
  (error) => {
    logApiError(error, 'API Interceptor')

    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('Request timeout:', error)
      if (typeof window !== 'undefined') {
        alert('Server bilan bog\'lanishda muammo. Iltimos, qaytadan urinib ko\'ring.')
      }
    } else if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    } else if (error.response?.status >= 500) {
      console.error('Server error:', error)
      if (typeof window !== 'undefined') {
        alert('Server xatoligi. Iltimos, keyinroq urinib ko\'ring.')
      }
    } else if (!error.response) {
      console.error('Network error:', error)
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname
        if (hostname === '172.20.1.49') {
          alert('Tarmoq xatoligi. Django server 172.20.1.49:8000 da ishlayotganini tekshiring.')
        } else {
          alert('Tarmoq xatoligi. Django server localhost:8000 da ishlayotganini tekshiring.')
        }
      }
    }
    return Promise.reject(error)
  }
)

// Types
export interface User {
  id: number
  username: string
  full_name: string
  phone: string
  role: 'client' | 'driver' | 'admin'
  balls: number
  language: string
  status: string
  address: string
  travel_route: string
  date_joined: string
}

export interface DriverApplication {
  id: number
  application_id: string
  user: User
  full_name: string
  phone: string
  car_model: string
  car_number: string
  car_year: number
  direction: 'taxi' | 'cargo'
  direction_display: string
  cargo_capacity: number
  passport_file_id: string
  license_file_id: string
  sts_file_id: string
  car_photo_file_id: string
  passport_image_url: string | null
  license_image_url: string | null
  sts_image_url: string | null
  car_photo_url: string | null
  assigned_admin_id: number
  assigned_admin_username: string
  assigned_at: string
  status: 'pending' | 'assigned' | 'approved' | 'rejected'
  status_display: string
  rejection_reason: string
  created_at: string
  updated_at: string
  reviewed_at: string
  invite_link_sent: boolean
}

export interface Order {
  id: number
  client: User
  category: 'taxi' | 'parcel' | 'cargo'
  category_display: string
  from_location: string
  to_location: string
  date: string
  description: string
  accepted_driver: User | null
  status: 'pending' | 'accepted' | 'cancelled'
  status_display: string
  passengers: number
  parcel_content: string
  parcel_weight: string
  parcel_size: string
  cargo_type: string
  cargo_weight: string
  cargo_vehicle_type: string
  created_at: string
}

export interface BallPayment {
  id: number
  driver: User
  amount: number
  screenshot: string
  screenshot_url: string | null
  status: 'pending' | 'approved' | 'rejected'
  status_display: string
  created_at: string
}

export interface Rating {
  id: number
  client: User
  driver: User
  score: number
  comment: string
  created_at: string
}

export interface FlightTicket {
  id: number
  ticket_id: string
  client: User
  full_name: string
  phone: string
  passport_number: string
  passport_photo: string
  passport_image_url: string | null
  from_location: string
  to_location: string
  travel_date: string
  status: string
  status_display: string
  description: string
  admin_comment: string
  created_at: string
  updated_at: string
  admin_responded_at: string
  admin_responded_by: User | null
}

export interface TrainTicket {
  id: number
  ticket_id: string
  client: User
  full_name: string
  phone: string
  passport_number: string
  passport_photo: string
  passport_image_url: string | null
  from_location: string
  to_location: string
  travel_date: string
  status: string
  status_display: string
  description: string
  admin_comment: string
  created_at: string
  updated_at: string
  admin_responded_at: string
  admin_responded_by: User | null
}

export interface Statistics {
  total_users: number
  total_drivers: number
  total_orders: number
  total_payments: number
  pending_applications: number
  pending_payments: number
  total_revenue: number
  orders_by_category: Record<string, number>
  orders_by_status: Record<string, number>
  recent_orders: Order[]
  recent_payments: BallPayment[]
}

export interface DriverStatistics {
  driver: User
  total_orders: number
  completed_orders: number
  total_earnings: number
  average_rating: number
  total_ratings: number
  rating_breakdown: Record<number, number>
  recent_orders: Order[]
  recent_ratings: Rating[]
}

export interface BotSettings {
  bot_token: string
  admin_id: string
  channel_name: string
  channel_link: string
  channel_description: string
  channel_username: string
}

export interface BotSettingsUpdate {
  bot_token?: string
  admin_id?: string
  channel_name?: string
  channel_link?: string
}

// Admin Settings Types
export interface BallPricing {
  id: number
  service_type: 'taxi_parcel' | 'cargo'
  service_type_display: string
  base_price: number
  price_per_person: number
  cargo_price_per_ball: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BallPricingUpdate {
  service_type: 'taxi_parcel' | 'cargo'
  base_price?: number
  price_per_person?: number
  cargo_price_per_ball?: number
}

export interface LocationData {
  id: number
  name_uz: string
  name_ru: string
  name_en: string
  name_tj: string
  name_kk: string
}

export interface CountryData extends LocationData {
  code: string
}

export interface RegionData extends LocationData {
  country: number
}

export interface CityData extends LocationData {
  region: number
}

export interface PaymentData {
  id: number
  driver_id: number
  driver_name: string
  driver_phone: string
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  status_display: string
  screenshot: string
  created_at: string
}

export interface StatisticsData {
  users: {
    total: number
    drivers: number
    clients: number
    new_today: number
    new_week: number
    new_month: number
  }
  orders: {
    total: number
    today: number
    week: number
    month: number
    by_category: {
      taxi: number
      parcel: number
      cargo: number
    }
    by_status: {
      pending: number
      accepted: number
      cancelled: number
    }
  }
  payments: {
    total: number
    pending: number
    approved: number
    rejected: number
    total_balls_paid: number
  }
  applications: {
    total: number
    pending: number
    approved: number
    rejected: number
  }
  tickets: {
    flight: {
      total: number
      pending: number
    }
    train: {
      total: number
      pending: number
    }
  }
  ratings: {
    total: number
    average: number
  }
  recent_activity: {
    orders: number
    payments: number
    applications: number
  }
}

export interface DriverRatingData {
  driver_id: number
  driver_name: string
  driver_phone: string
  driver_username: string
  avg_rating: number
  total_ratings: number
  total_orders: number
  balls: number
  status: string
  date_joined: string
  recent_ratings: {
    id: number
    score: number
    comment: string
    client_name: string
    created_at: string
  }[]
}

export interface GroupSettings {
  admin_group_id: string
  taxi_parcel_group_id: string
  avia_train_group_id: string
  cargo_group_id: string
}

export interface GroupSettingsUpdate {
  admin_group_id?: string
  taxi_parcel_group_id?: string
  avia_train_group_id?: string
  cargo_group_id?: string
}

export interface PaymentReminderSettings {
  reminder_day: number
  is_active: boolean
  last_sent: string | null
}

export interface PaymentReminderUpdate {
  reminder_day: number
  is_active: boolean
}

export interface PaymentCard {
  id: number
  card_number: string
  cardholder_name: string
  bank_name: string
  is_active: boolean
  masked_number: string
  created_at: string
  updated_at: string
}

export interface PaymentCardCreate {
  card_number: string
  cardholder_name: string
  bank_name: string
  is_active: boolean
}

export interface PaymentCardUpdate {
  card_number?: string
  cardholder_name?: string
  bank_name?: string
  is_active?: boolean
}

// --- Ball Package Types ---
export interface BallPackage {
  id: number
  package_name: string
  service_type: 'taxi_parcel' | 'cargo'
  ball_count: number
  price: number
  discount_percentage: number
  is_active: boolean
  is_popular: boolean
  description?: string
  sort_order?: number
  created_at?: string
  updated_at?: string
}

export type BallPackageCreate = Omit<BallPackage, 'id' | 'created_at' | 'updated_at'>
export type BallPackageUpdate = Partial<BallPackageCreate>

// Demo mode configuration
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || process.env.NODE_ENV === 'development'

// API Service Class
class ApiService {
  private async retryRequest<T>(requestFn: () => Promise<T>, maxRetries = 3): Promise<T> {
    let lastError: any
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn()
      } catch (error: any) {
        lastError = error
        
        // Enhanced error logging
        logApiError(error, `Retry ${attempt}/${maxRetries}`)
        
        // Don't retry on 4xx errors (client errors)
        if (error.response?.status >= 400 && error.response?.status < 500) {
          throw error
        }
        
        // Don't retry on auth errors
        if (error.response?.status === 401) {
          throw error
        }
        
        if (attempt < maxRetries) {
          // Exponential backoff: 1s, 2s, 4s
          const delay = Math.pow(2, attempt - 1) * 1000
          console.log(`Retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    
    throw lastError
  }

  async login(username: string, password: string): Promise<{ token: string; user: User }> {
    if (DEMO_MODE) {
      // Demo login - accept any credentials
      const mockUser = {
        id: 1,
        username: 'admin',
        full_name: 'Admin User',
        phone: '+998901234567',
        role: 'admin' as const,
        balls: 1000,
        language: 'uz',
        status: 'active',
        address: 'Toshkent shahri',
        travel_route: 'Toshkent - Samarqand',
        date_joined: '2024-01-15T10:00:00Z'
      }
      
      // Store demo token
      localStorage.setItem('auth_token', 'demo_token_12345')
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      return {
        token: 'demo_token_12345',
        user: mockUser
      }
    }
    
    return this.retryRequest(async () => {
      const response: AxiosResponse = await api.post('/login/', { username, password })
      return response.data
    })
  }

  async logout(): Promise<void> {
    await api.post('/logout/')
  }

  async getCurrentUser(): Promise<User> {
    if (DEMO_MODE) {
      const userData = localStorage.getItem('user_data')
      if (userData) {
        return JSON.parse(userData)
      }
      throw new Error('User not found')
    }
    
    const response: AxiosResponse = await api.get('/user/me/')
    return response.data
  }

  // Driver Applications
  async getDriverApplications(params?: {
    status?: string
    direction?: string
    search?: string
    ordering?: string
    page?: number
  }): Promise<{ results: DriverApplication[]; count: number }> {
    if (DEMO_MODE) {
      const { mockDriverApplications } = await import('./mock-data')
      let filtered = [...mockDriverApplications]
      
      if (params?.status) {
        filtered = filtered.filter(app => app.status === params.status)
      }
      if (params?.direction) {
        filtered = filtered.filter(app => app.direction === params.direction)
      }
      if (params?.search) {
        const search = params.search.toLowerCase()
        filtered = filtered.filter(app => 
          app.full_name.toLowerCase().includes(search) ||
          app.phone.includes(search)
        )
      }
      
      return {
        results: filtered,
        count: filtered.length
      }
    }
    
    return this.retryRequest(async () => {
      const response: AxiosResponse = await api.get('/drivers/', { params })
      return response.data
    })
  }

  async getDriverApplication(id: number): Promise<DriverApplication> {
    if (DEMO_MODE) {
      const { mockDriverApplications } = await import('./mock-data')
      const application = mockDriverApplications.find(app => app.id === id)
      if (!application) {
        throw new Error('Driver application not found')
      }
      return application
    }
    
    return this.retryRequest(async () => {
      const response: AxiosResponse = await api.get(`/drivers/${id}/`)
      return response.data
    })
  }

  async approveDriverApplication(id: number, action: 'approve' | 'reject' | 'assign', data?: any): Promise<DriverApplication> {
    if (DEMO_MODE) {
      const { mockDriverApplications } = await import('./mock-data')
      const application = mockDriverApplications.find(app => app.id === id)
      if (!application) {
        throw new Error('Driver application not found')
      }
      
      // Simulate API response
      const updatedApplication = {
        ...application,
        status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'assigned',
        status_display: action === 'approve' ? 'Tasdiqlangan' : action === 'reject' ? 'Rad etilgan' : 'Tayinlangan',
        rejection_reason: action === 'reject' ? data?.rejection_reason || 'Rad etildi' : '',
        reviewed_at: new Date().toISOString(),
        invite_link_sent: action === 'approve'
      }
      
      return updatedApplication
    }
    
    const response: AxiosResponse = await api.post(`/drivers/${id}/approve/`, { action, ...data })
    return response.data.application
  }

  // Orders
  async getOrders(params?: {
    category?: string
    status?: string
    search?: string
    ordering?: string
    page?: number
  }): Promise<{ results: Order[]; count: number }> {
    if (DEMO_MODE) {
      const { mockOrders } = await import('./mock-data')
      let filtered = [...mockOrders]
      
      if (params?.category) {
        filtered = filtered.filter(order => order.category === params.category)
      }
      if (params?.status) {
        filtered = filtered.filter(order => order.status === params.status)
      }
      if (params?.search) {
        const search = params.search.toLowerCase()
        filtered = filtered.filter(order => 
          order.client.full_name.toLowerCase().includes(search) ||
          order.client.phone.includes(search) ||
          order.description.toLowerCase().includes(search)
        )
      }
      
      return {
        results: filtered,
        count: filtered.length
      }
    }
    
    const response: AxiosResponse = await api.get('/orders/', { params })
    return response.data
  }

  async getOrder(id: number): Promise<Order> {
    const response: AxiosResponse = await api.get(`/orders/${id}/`)
    return response.data
  }

  async acceptOrder(id: number, driverId: number): Promise<Order> {
    const response: AxiosResponse = await api.post(`/orders/${id}/accept/`, { driver_id: driverId })
    return response.data.order
  }

  // Ball Payments
  async getBallPayments(params?: {
    status?: string
    search?: string
    ordering?: string
    page?: number
  }): Promise<{ results: BallPayment[]; count: number }> {
    if (DEMO_MODE) {
      const { mockBallPayments } = await import('./mock-data')
      let filtered = [...mockBallPayments]
      
      if (params?.status) {
        filtered = filtered.filter(payment => payment.status === params.status)
      }
      if (params?.search) {
        const search = params.search.toLowerCase()
        filtered = filtered.filter(payment => 
          payment.driver.full_name.toLowerCase().includes(search) ||
          payment.driver.phone.includes(search)
        )
      }
      
      return {
        results: filtered,
        count: filtered.length
      }
    }
    
    const response: AxiosResponse = await api.get('/payments/', { params })
    return response.data
  }

  async getBallPayment(id: number): Promise<BallPayment> {
    if (DEMO_MODE) {
      const { mockBallPayments } = await import('./mock-data')
      const payment = mockBallPayments.find(p => p.id === id)
      if (!payment) {
        throw new Error('Payment not found')
      }
      return payment
    }
    
    const response: AxiosResponse = await api.get(`/payments/${id}/`)
    return response.data
  }

  async confirmBallPayment(id: number, action: 'approve' | 'reject', rejectionReason?: string): Promise<BallPayment> {
    if (DEMO_MODE) {
      const { mockBallPayments } = await import('./mock-data')
      const payment = mockBallPayments.find(p => p.id === id)
      if (!payment) {
        throw new Error('Payment not found')
      }
      
      // Simulate API response
      const updatedPayment = {
        ...payment,
        status: action === 'approve' ? 'approved' : 'rejected',
        status_display: action === 'approve' ? 'Tasdiqlangan' : 'Rad etilgan'
      }
      
      return updatedPayment
    }
    
    const response: AxiosResponse = await api.post(`/payments/${id}/confirm/`, { 
      action, 
      rejection_reason: rejectionReason 
    })
    return response.data.payment
  }

  // Ratings
  async getRatings(params?: {
    score?: number
    search?: string
    ordering?: string
    page?: number
  }): Promise<{ results: Rating[]; count: number }> {
    if (DEMO_MODE) {
      const { mockRatings } = await import('./mock-data')
      let filtered = [...mockRatings]
      
      if (params?.score) {
        filtered = filtered.filter(rating => rating.score === params.score)
      }
      if (params?.search) {
        const search = params.search.toLowerCase()
        filtered = filtered.filter(rating => 
          rating.driver.full_name.toLowerCase().includes(search) ||
          rating.client.full_name.toLowerCase().includes(search)
        )
      }
      
      return {
        results: filtered,
        count: filtered.length
      }
    }
    
    const response: AxiosResponse = await api.get('/ratings/', { params })
    return response.data
  }

  // Flight Tickets
  async getFlightTickets(params?: {
    status?: string
    search?: string
    ordering?: string
    page?: number
  }): Promise<{ results: FlightTicket[]; count: number }> {
    if (DEMO_MODE) {
      const { mockFlightTickets } = await import('./mock-data')
      let filtered = [...mockFlightTickets]
      
      if (params?.status) {
        filtered = filtered.filter(ticket => ticket.status === params.status)
      }
      if (params?.search) {
        const search = params.search.toLowerCase()
        filtered = filtered.filter(ticket => 
          ticket.full_name.toLowerCase().includes(search) ||
          ticket.phone.includes(search) ||
          ticket.from_location.toLowerCase().includes(search) ||
          ticket.to_location.toLowerCase().includes(search)
        )
      }
      
      return {
        results: filtered,
        count: filtered.length
      }
    }
    
    const response: AxiosResponse = await api.get('/flight-tickets/', { params })
    return response.data
  }

  // Train Tickets
  async getTrainTickets(params?: {
    status?: string
    search?: string
    ordering?: string
    page?: number
  }): Promise<{ results: TrainTicket[]; count: number }> {
    if (DEMO_MODE) {
      const { mockTrainTickets } = await import('./mock-data')
      let filtered = [...mockTrainTickets]
      
      if (params?.status) {
        filtered = filtered.filter(ticket => ticket.status === params.status)
      }
      if (params?.search) {
        const search = params.search.toLowerCase()
        filtered = filtered.filter(ticket => 
          ticket.full_name.toLowerCase().includes(search) ||
          ticket.phone.includes(search) ||
          ticket.from_location.toLowerCase().includes(search) ||
          ticket.to_location.toLowerCase().includes(search)
        )
      }
      
      return {
        results: filtered,
        count: filtered.length
      }
    }
    
    const response: AxiosResponse = await api.get('/train-tickets/', { params })
    return response.data
  }

  // Statistics
  async getGeneralStatistics(): Promise<Statistics> {
    if (DEMO_MODE) {
      const { mockStatistics } = await import('./mock-data')
      return mockStatistics
    }
    
    return this.retryRequest(async () => {
      const response: AxiosResponse = await api.get('/stats/general/')
      return response.data
    })
  }

  async getDriverStatistics(driverId: number): Promise<DriverStatistics> {
    const response: AxiosResponse = await api.get(`/stats/driver/${driverId}/`)
    return response.data
  }

  async getDriverDetail(driverId: number): Promise<Driver> {
    return this.retryRequest(async () => {
      const response: AxiosResponse = await api.get(`/drivers/${driverId}/detail/`)
      return response.data
    })
  }

  async addBallsToDriver(driverId: number, amount: number): Promise<{ message: string; new_balance: number }> {
    const response: AxiosResponse = await api.post(`/drivers/${driverId}/detail/`, { amount })
    return response.data
  }

  // Countries, Regions, Cities
  async getCountries(search?: string): Promise<Array<{ id: number; code: string; name_uz: string; name_ru: string; name_en: string; name_tj: string; name_kk: string }>> {
    if (DEMO_MODE) {
      const mockCountries = [
        { id: 1, code: 'UZ', name_uz: 'O\'zbekiston', name_ru: 'Узбекистан', name_en: 'Uzbekistan', name_tj: 'Ӯзбекистон', name_kk: 'Өзбекстан' },
        { id: 2, code: 'KZ', name_uz: 'Qozog\'iston', name_ru: 'Казахстан', name_en: 'Kazakhstan', name_tj: 'Қазоқистон', name_kk: 'Қазақстан' },
        { id: 3, code: 'TJ', name_uz: 'Tojikiston', name_ru: 'Таджикистан', name_en: 'Tajikistan', name_tj: 'Тоҷикистон', name_kk: 'Тәжікстан' }
      ]
      
      if (search) {
        return mockCountries.filter(country => 
          country.name_uz.toLowerCase().includes(search.toLowerCase()) ||
          country.name_ru.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      return mockCountries
    }
    
    const response: AxiosResponse = await api.get('/countries/', { params: { search } })
    return response.data.results
  }

  async getRegions(countryId?: number, search?: string): Promise<Array<{ id: number; country: any; name_uz: string; name_ru: string; name_en: string; name_tj: string; name_kk: string }>> {
    if (DEMO_MODE) {
      const mockRegions = [
        { id: 1, country: 1, name_uz: 'Toshkent viloyati', name_ru: 'Ташкентская область', name_en: 'Tashkent Region', name_tj: 'Вилояти Тошканд', name_kk: 'Төшкен облысы' },
        { id: 2, country: 1, name_uz: 'Samarqand viloyati', name_ru: 'Самаркандская область', name_en: 'Samarkand Region', name_tj: 'Вилояти Самарқанд', name_kk: 'Самарқанд облысы' },
        { id: 3, country: 1, name_uz: 'Buxoro viloyati', name_ru: 'Бухарская область', name_en: 'Bukhara Region', name_tj: 'Вилояти Бухоро', name_kk: 'Бұхара облысы' }
      ]
      
      let filtered = mockRegions
      if (countryId) {
        filtered = filtered.filter(region => region.country === countryId)
      }
      if (search) {
        filtered = filtered.filter(region => 
          region.name_uz.toLowerCase().includes(search.toLowerCase()) ||
          region.name_ru.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      return filtered
    }
    
    const response: AxiosResponse = await api.get('/regions/', { params: { country: countryId, search } })
    return response.data.results
  }

  async getCities(regionId?: number, search?: string): Promise<Array<{ id: number; region: any; name_uz: string; name_ru: string; name_en: string; name_tj: string; name_kk: string }>> {
    if (DEMO_MODE) {
      const mockCities = [
        { id: 1, region: 1, name_uz: 'Toshkent', name_ru: 'Ташкент', name_en: 'Tashkent', name_tj: 'Тошканд', name_kk: 'Төшкен' },
        { id: 2, region: 1, name_uz: 'Chirchiq', name_ru: 'Чирчик', name_en: 'Chirchik', name_tj: 'Чирчик', name_kk: 'Шыршық' },
        { id: 3, region: 2, name_uz: 'Samarqand', name_ru: 'Самарканд', name_en: 'Samarkand', name_tj: 'Самарқанд', name_kk: 'Самарқанд' },
        { id: 4, region: 3, name_uz: 'Buxoro', name_ru: 'Бухара', name_en: 'Bukhara', name_tj: 'Бухоро', name_kk: 'Бұхара' }
      ]
      
      let filtered = mockCities
      if (regionId) {
        filtered = filtered.filter(city => city.region === regionId)
      }
      if (search) {
        filtered = filtered.filter(city => 
          city.name_uz.toLowerCase().includes(search.toLowerCase()) ||
          city.name_ru.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      return filtered
    }
    
    return this.retryRequest(() => api.get(`/cities/`, { params: { region: regionId, search } }).then(res => res.data))
  }

  // Bot Settings
  async getBotSettings(): Promise<BotSettings> {
    if (DEMO_MODE) {
      return {
        bot_token: 'demo_bot_token_12345',
        admin_id: '123456789',
        channel_name: 'Taxi UZ Demo',
        channel_link: 'https://t.me/taxiuz_demo',
        channel_description: 'Demo kanal uchun tavsif',
        channel_username: '@taxiuz_demo'
      }
    }
    
    return this.retryRequest(() => api.get('/bot-settings/').then(res => res.data))
  }

  async updateBotSettings(settings: BotSettingsUpdate): Promise<{ message: string; settings: BotSettings }> {
    console.log('API Service: Updating bot settings with data:', settings)
    return this.retryRequest(async () => {
      const response = await api.put('/bot-settings/', settings)
      console.log('API Service: Bot settings update response:', response.data)
      return response.data
    })
  }

  // Admin Settings - Ball Pricing
  async getBallPricing(): Promise<BallPricing[]> {
    if (DEMO_MODE) {
      const { mockBallPricing } = await import('./mock-data')
      return mockBallPricing
    }
    
    return this.retryRequest(() => api.get('/admin/ball-pricing/').then(res => res.data))
  }

  async updateBallPricing(pricing: BallPricingUpdate): Promise<BallPricing> {
    return this.retryRequest(() => api.post('/admin/ball-pricing/', pricing).then(res => res.data))
  }

  // Admin Settings - Location Management
  async getCountries(): Promise<CountryData[]> {
    return this.retryRequest(() => api.get('/admin/countries/').then(res => res.data))
  }

  async getRegions(countryId?: number): Promise<RegionData[]> {
    const params = countryId ? { country_id: countryId } : {}
    return this.retryRequest(() => api.get('/admin/regions/', { params }).then(res => res.data))
  }

  async getCities(regionId?: number): Promise<CityData[]> {
    const params = regionId ? { region_id: regionId } : {}
    return this.retryRequest(() => api.get('/admin/cities/', { params }).then(res => res.data))
  }

  async addCountry(country: Omit<CountryData, 'id'>): Promise<CountryData> {
    return this.retryRequest(() => api.post('/admin/countries/', country).then(res => res.data))
  }

  async addRegion(region: Omit<RegionData, 'id'>): Promise<RegionData> {
    return this.retryRequest(() => api.post('/admin/regions/', region).then(res => res.data))
  }

  async addCity(city: Omit<CityData, 'id'>): Promise<CityData> {
    return this.retryRequest(() => api.post('/admin/cities/', city).then(res => res.data))
  }

  async updateCountry(countryId: number, country: Partial<CountryData>): Promise<CountryData> {
    return this.retryRequest(() => api.put(`/admin/countries/${countryId}/`, country).then(res => res.data))
  }

  async updateRegion(regionId: number, region: Partial<RegionData>): Promise<RegionData> {
    return this.retryRequest(() => api.put(`/admin/regions/${regionId}/`, region).then(res => res.data))
  }

  async updateCity(cityId: number, city: Partial<CityData>): Promise<CityData> {
    return this.retryRequest(() => api.put(`/admin/cities/${cityId}/`, city).then(res => res.data))
  }

  async deleteCountry(countryId: number): Promise<{ message: string }> {
    return this.retryRequest(() => api.delete(`/admin/countries/${countryId}/`).then(res => res.data))
  }

  async deleteRegion(regionId: number): Promise<{ message: string }> {
    return this.retryRequest(() => api.delete(`/admin/regions/${regionId}/`).then(res => res.data))
  }

  async deleteCity(cityId: number): Promise<{ message: string }> {
    return this.retryRequest(() => api.delete(`/admin/cities/${cityId}/`).then(res => res.data))
  }

  // Admin Settings - Payment Management
  async getPayments(): Promise<PaymentData[]> {
    return this.retryRequest(() => api.get('/admin/payments/').then(res => res.data))
  }

  async updatePaymentStatus(paymentId: number, status: 'approved' | 'rejected'): Promise<{ message: string }> {
    return this.retryRequest(() => api.put(`/admin/payments/${paymentId}/status/`, { status }).then(res => res.data))
  }

  // Admin Settings - Statistics
  async getStatistics(): Promise<StatisticsData> {
    return this.retryRequest(() => api.get('/admin/statistics/').then(res => res.data))
  }

  // Admin Settings - Driver Ratings
  async getDriverRatings(): Promise<DriverRatingData[]> {
    return this.retryRequest(() => api.get('/admin/driver-ratings/').then(res => res.data))
  }

  // Admin Settings - Group Settings
  async getGroupSettings(): Promise<GroupSettings> {
    if (DEMO_MODE) {
      return {
        admin_group_id: '-1001234567890',
        taxi_parcel_group_id: '-1001234567891',
        avia_train_group_id: '-1001234567892',
        cargo_group_id: '-1001234567893'
      }
    }
    
    return this.retryRequest(() => api.get('/admin/group-settings/').then(res => res.data))
  }

  async updateGroupSettings(settings: GroupSettingsUpdate): Promise<GroupSettings> {
    return this.retryRequest(() => api.put('/admin/group-settings/', settings).then(res => res.data))
  }

  // Health check method for debugging
  async healthCheck(): Promise<{ status: string; timestamp: string; baseUrl: string }> {
    try {
      const response = await api.get('/health/')
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        baseUrl: API_BASE_URL
      }
    } catch (error: any) {
      logApiError(error, 'Health Check')
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        baseUrl: API_BASE_URL
      }
    }
  }

  // Payment Reminder Settings
  async getPaymentReminderSettings(): Promise<PaymentReminderSettings> {
    if (DEMO_MODE) {
      return {
        reminder_day: 25,
        is_active: true,
        last_sent: '2024-03-20T10:00:00Z'
      }
    }
    
    return this.retryRequest(async () => {
      const response = await api.get('/payment-reminder/')
      return response.data
    })
  }

  async updatePaymentReminderSettings(settings: PaymentReminderUpdate): Promise<{ message: string; settings: PaymentReminderSettings }> {
    return this.retryRequest(async () => {
      const response = await api.put('/payment-reminder/', settings)
      return response.data
    })
  }

  async testPaymentReminder(): Promise<{ message: string }> {
    return this.retryRequest(async () => {
      const response = await api.get('/payment-reminder/test/')
      return response.data
    })
  }

  // Payment Cards
  async getPaymentCards(): Promise<PaymentCard[]> {
    if (DEMO_MODE) {
      const { mockPaymentCards } = await import('./mock-data')
      return mockPaymentCards
    }
    
    return this.retryRequest(async () => {
      const response = await api.get('/payment-cards/')
      return response.data.results || response.data
    })
  }

  async getActivePaymentCards(): Promise<PaymentCard[]> {
    if (DEMO_MODE) {
      const cards = await this.getPaymentCards()
      return cards.filter(card => card.is_active)
    }
    
    return this.retryRequest(async () => {
      const response = await api.get('/payment-cards/active/')
      return response.data
    })
  }

  async getPaymentCard(id: number): Promise<PaymentCard> {
    if (DEMO_MODE) {
      const cards = await this.getPaymentCards()
      const card = cards.find(c => c.id === id)
      if (!card) {
        throw new Error('Payment card not found')
      }
      return card
    }
    
    return this.retryRequest(async () => {
      const response = await api.get(`/payment-cards/${id}/`)
      return response.data
    })
  }

  async createPaymentCard(card: PaymentCardCreate): Promise<PaymentCard> {
    if (DEMO_MODE) {
      const newCard: PaymentCard = {
        id: Math.floor(Math.random() * 1000) + 3,
        ...card,
        masked_number: card.card_number.replace(/(\d{4})\d{8}(\d{4})/, '$1 **** **** $2'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      return newCard
    }
    
    return this.retryRequest(async () => {
      const response = await api.post('/payment-cards/', card)
      return response.data
    })
  }

  async updatePaymentCard(id: number, card: PaymentCardUpdate): Promise<PaymentCard> {
    if (DEMO_MODE) {
      const cards = await this.getPaymentCards()
      const cardToUpdate = cards.find(c => c.id === id)
      if (!cardToUpdate) {
        throw new Error('Payment card not found')
      }
      
      const updatedCard: PaymentCard = {
        ...cardToUpdate,
        ...card,
        masked_number: card.card_number ? card.card_number.replace(/(\d{4})\d{8}(\d{4})/, '$1 **** **** $2') : cardToUpdate.masked_number,
        updated_at: new Date().toISOString()
      }
      return updatedCard
    }
    
    return this.retryRequest(async () => {
      const response = await api.put(`/payment-cards/${id}/`, card)
      return response.data
    })
  }

  async deletePaymentCard(id: number): Promise<{ message: string }> {
    if (DEMO_MODE) {
      return { message: 'Payment card successfully deleted' }
    }
    
    return this.retryRequest(async () => {
      const response = await api.delete(`/payment-cards/${id}/`)
      return response.data
    })
  }

  // Ball Packages CRUD
  async getBallPackages(): Promise<BallPackage[]> {
    if (DEMO_MODE) {
      return [
        {
          id: 1,
          package_name: 'Kichik paket',
          service_type: 'taxi_parcel',
          ball_count: 50,
          price: 25000,
          discount_percentage: 0,
          is_active: true,
          is_popular: false,
          description: 'Kichik sayohatlar uchun',
          sort_order: 1,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          package_name: 'O\'rta paket',
          service_type: 'taxi_parcel',
          ball_count: 100,
          price: 45000,
          discount_percentage: 10,
          is_active: true,
          is_popular: true,
          description: 'Eng mashhur paket',
          sort_order: 2,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 3,
          package_name: 'Katta paket',
          service_type: 'cargo',
          ball_count: 200,
          price: 80000,
          discount_percentage: 20,
          is_active: true,
          is_popular: false,
          description: 'Gruz xizmatlari uchun',
          sort_order: 3,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ]
    }
    
    return this.retryRequest(() => api.get('/ball-packages/').then(res => res.data.results || res.data))
  }

  async createBallPackage(data: BallPackageCreate): Promise<BallPackage> {
    if (DEMO_MODE) {
      const newPackage: BallPackage = {
        id: Math.floor(Math.random() * 1000) + 4,
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      return newPackage
    }
    
    return this.retryRequest(() => api.post('/ball-packages/', data).then(res => res.data))
  }

  async updateBallPackage(id: number, data: BallPackageUpdate): Promise<BallPackage> {
    if (DEMO_MODE) {
      const packages = await this.getBallPackages()
      const packageToUpdate = packages.find(p => p.id === id)
      if (!packageToUpdate) {
        throw new Error('Ball package not found')
      }
      
      const updatedPackage: BallPackage = {
        ...packageToUpdate,
        ...data,
        updated_at: new Date().toISOString()
      }
      return updatedPackage
    }
    
    return this.retryRequest(() => api.put(`/ball-packages/${id}/`, data).then(res => res.data))
  }

  async deleteBallPackage(id: number): Promise<{ message: string }> {
    if (DEMO_MODE) {
      return { message: 'Ball package successfully deleted' }
    }
    
    return this.retryRequest(() => api.delete(`/ball-packages/${id}/`).then(res => res.data))
  }
}

// Export singleton instance
export const apiService = new ApiService()

// Export types
export type {
  User,
  DriverApplication,
  Order,
  BallPayment,
  Rating,
  FlightTicket,
  TrainTicket,
  Statistics,
  DriverStatistics,
  BallPricing,
  BallPricingUpdate,
  LocationData,
  CountryData,
  RegionData,
  CityData,
  GroupSettings,
  GroupSettingsUpdate,
  PaymentCard,
  PaymentCardCreate,
  PaymentCardUpdate,
  BallPackage,
  BallPackageCreate,
  BallPackageUpdate,
} 