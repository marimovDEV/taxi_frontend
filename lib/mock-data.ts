import { User, DriverApplication, Order, BallPayment, Rating, FlightTicket, TrainTicket, Statistics, BallPricing, PaymentCard } from './api'

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    full_name: 'Admin User',
    phone: '+998901234567',
    role: 'admin',
    balls: 1000,
    language: 'uz',
    status: 'active',
    address: 'Toshkent shahri',
    travel_route: 'Toshkent - Samarqand',
    date_joined: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    username: 'driver1',
    full_name: 'Aziz Karimov',
    phone: '+998901111111',
    role: 'driver',
    balls: 250,
    language: 'uz',
    status: 'active',
    address: 'Toshkent shahri, Chilonzor tumani',
    travel_route: 'Toshkent - Buxoro',
    date_joined: '2024-02-01T09:30:00Z'
  },
  {
    id: 3,
    username: 'driver2',
    full_name: 'Malika Yusupova',
    phone: '+998902222222',
    role: 'driver',
    balls: 180,
    language: 'uz',
    status: 'active',
    address: 'Samarqand shahri',
    travel_route: 'Samarqand - Toshkent',
    date_joined: '2024-02-10T14:20:00Z'
  },
  {
    id: 4,
    username: 'client1',
    full_name: 'Bobur Toshmatov',
    phone: '+998903333333',
    role: 'client',
    balls: 50,
    language: 'uz',
    status: 'active',
    address: 'Toshkent shahri, Yunusobod tumani',
    travel_route: 'Toshkent - Andijon',
    date_joined: '2024-03-01T11:15:00Z'
  }
]

// Mock Driver Applications
export const mockDriverApplications: DriverApplication[] = [
  {
    id: 1,
    application_id: 'APP-001',
    user: mockUsers[1],
    full_name: 'Aziz Karimov',
    phone: '+998901111111',
    car_model: 'Chevrolet Cobalt',
    car_number: '01A777BB',
    car_year: 2020,
    direction: 'taxi',
    direction_display: 'Taksi',
    cargo_capacity: 0,
    passport_file_id: 'passport_1',
    license_file_id: 'license_1',
    sts_file_id: 'sts_1',
    car_photo_file_id: 'car_1',
    passport_image_url: '/api/media/passport_1.jpg',
    license_image_url: '/api/media/license_1.jpg',
    sts_image_url: '/api/media/sts_1.jpg',
    car_photo_url: '/api/media/car_1.jpg',
    assigned_admin_id: 1,
    assigned_admin_username: 'admin',
    assigned_at: '2024-02-01T10:00:00Z',
    status: 'approved',
    status_display: 'Tasdiqlangan',
    rejection_reason: '',
    created_at: '2024-02-01T09:30:00Z',
    updated_at: '2024-02-01T10:00:00Z',
    reviewed_at: '2024-02-01T10:00:00Z',
    invite_link_sent: true
  },
  {
    id: 2,
    application_id: 'APP-002',
    user: mockUsers[2],
    full_name: 'Malika Yusupova',
    phone: '+998902222222',
    car_model: 'Nexia 3',
    car_number: '30B888CC',
    car_year: 2019,
    direction: 'cargo',
    direction_display: 'Gruz',
    cargo_capacity: 500,
    passport_file_id: 'passport_2',
    license_file_id: 'license_2',
    sts_file_id: 'sts_2',
    car_photo_file_id: 'car_2',
    passport_image_url: '/api/media/passport_2.jpg',
    license_image_url: '/api/media/license_2.jpg',
    sts_image_url: '/api/media/sts_2.jpg',
    car_photo_url: '/api/media/car_2.jpg',
    assigned_admin_id: 1,
    assigned_admin_username: 'admin',
    assigned_at: '2024-02-10T15:00:00Z',
    status: 'approved',
    status_display: 'Tasdiqlangan',
    rejection_reason: '',
    created_at: '2024-02-10T14:20:00Z',
    updated_at: '2024-02-10T15:00:00Z',
    reviewed_at: '2024-02-10T15:00:00Z',
    invite_link_sent: true
  },
  {
    id: 3,
    application_id: 'APP-003',
    user: {
      id: 5,
      username: 'driver3',
      full_name: 'Jasur Rahimov',
      phone: '+998904444444',
      role: 'driver',
      balls: 0,
      language: 'uz',
      status: 'pending',
      address: 'Buxoro shahri',
      travel_route: 'Buxoro - Toshkent',
      date_joined: '2024-03-15T16:45:00Z'
    },
    full_name: 'Jasur Rahimov',
    phone: '+998904444444',
    car_model: 'Lacetti',
    car_number: '20D999EE',
    car_year: 2018,
    direction: 'taxi',
    direction_display: 'Taksi',
    cargo_capacity: 0,
    passport_file_id: 'passport_3',
    license_file_id: 'license_3',
    sts_file_id: 'sts_3',
    car_photo_file_id: 'car_3',
    passport_image_url: '/api/media/passport_3.jpg',
    license_image_url: '/api/media/license_3.jpg',
    sts_image_url: '/api/media/sts_3.jpg',
    car_photo_url: '/api/media/car_3.jpg',
    assigned_admin_id: 0,
    assigned_admin_username: '',
    assigned_at: '',
    status: 'pending',
    status_display: 'Kutayotgan',
    rejection_reason: '',
    created_at: '2024-03-15T16:45:00Z',
    updated_at: '2024-03-15T16:45:00Z',
    reviewed_at: '',
    invite_link_sent: false
  }
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 1,
    client: mockUsers[3],
    category: 'taxi',
    category_display: 'Taksi',
    from_location: 'Toshkent, Chorsu',
    to_location: 'Toshkent, Tashkent City',
    date: '2024-03-20T10:00:00Z',
    description: 'Shahar ichida sayohat',
    accepted_driver: mockUsers[1],
    status: 'accepted',
    status_display: 'Qabul qilingan',
    passengers: 2,
    parcel_content: '',
    parcel_weight: '',
    parcel_size: '',
    cargo_type: '',
    cargo_weight: '',
    cargo_vehicle_type: '',
    created_at: '2024-03-20T09:30:00Z'
  },
  {
    id: 2,
    client: {
      id: 6,
      username: 'client2',
      full_name: 'Dilfuza Karimova',
      phone: '+998905555555',
      role: 'client',
      balls: 75,
      language: 'uz',
      status: 'active',
      address: 'Samarqand shahri',
      travel_route: 'Samarqand - Toshkent',
      date_joined: '2024-03-05T13:20:00Z'
    },
    category: 'parcel',
    category_display: 'Pasilka',
    from_location: 'Samarqand, Registon',
    to_location: 'Toshkent, Chorsu',
    date: '2024-03-21T14:00:00Z',
    description: 'Hovli uchun mebellar',
    accepted_driver: mockUsers[2],
    status: 'accepted',
    status_display: 'Qabul qilingan',
    passengers: 0,
    parcel_content: 'Mebellar',
    parcel_weight: '50 kg',
    parcel_size: '100x80x60 cm',
    cargo_type: '',
    cargo_weight: '',
    cargo_vehicle_type: '',
    created_at: '2024-03-21T13:00:00Z'
  },
  {
    id: 3,
    client: {
      id: 7,
      username: 'client3',
      full_name: 'Rustam Toshpulatov',
      phone: '+998906666666',
      role: 'client',
      balls: 120,
      language: 'uz',
      status: 'active',
      address: 'Andijon shahri',
      travel_route: 'Andijon - Toshkent',
      date_joined: '2024-03-10T08:45:00Z'
    },
    category: 'cargo',
    category_display: 'Gruz',
    from_location: 'Andijon, Shahar markazi',
    to_location: 'Toshkent, Sergeli',
    date: '2024-03-22T09:00:00Z',
    description: 'Sanoat jihozlari',
    accepted_driver: null,
    status: 'pending',
    status_display: 'Kutayotgan',
    passengers: 0,
    parcel_content: '',
    parcel_weight: '',
    parcel_size: '',
    cargo_type: 'Sanoat jihozlari',
    cargo_weight: '200 kg',
    cargo_vehicle_type: 'Yuk mashinasi',
    created_at: '2024-03-22T08:30:00Z'
  }
]

// Mock Ball Payments
export const mockBallPayments: BallPayment[] = [
  {
    id: 1,
    driver: mockUsers[1],
    amount: 100,
    screenshot: 'payment_1.jpg',
    screenshot_url: '/api/media/payment_1.jpg',
    status: 'approved',
    status_display: 'Tasdiqlangan',
    created_at: '2024-03-19T15:30:00Z'
  },
  {
    id: 2,
    driver: mockUsers[2],
    amount: 150,
    screenshot: 'payment_2.jpg',
    screenshot_url: '/api/media/payment_2.jpg',
    status: 'pending',
    status_display: 'Kutayotgan',
    created_at: '2024-03-20T12:15:00Z'
  },
  {
    id: 3,
    driver: {
      id: 8,
      username: 'driver4',
      full_name: 'Olimjon Sobirov',
      phone: '+998907777777',
      role: 'driver',
      balls: 80,
      language: 'uz',
      status: 'active',
      address: 'Farg\'ona shahri',
      travel_route: 'Farg\'ona - Toshkent',
      date_joined: '2024-03-01T10:20:00Z'
    },
    amount: 200,
    screenshot: 'payment_3.jpg',
    screenshot_url: '/api/media/payment_3.jpg',
    status: 'rejected',
    status_display: 'Rad etilgan',
    created_at: '2024-03-18T09:45:00Z'
  }
]

// Mock Ratings
export const mockRatings: Rating[] = [
  {
    id: 1,
    client: mockUsers[3],
    driver: mockUsers[1],
    score: 5,
    comment: 'Ajoyib xizmat! Haydovchi juda do\'stona va xavfsiz haydovchilik qildi.',
    created_at: '2024-03-20T11:30:00Z'
  },
  {
    id: 2,
    client: {
      id: 6,
      username: 'client2',
      full_name: 'Dilfuza Karimova',
      phone: '+998905555555',
      role: 'client',
      balls: 75,
      language: 'uz',
      status: 'active',
      address: 'Samarqand shahri',
      travel_route: 'Samarqand - Toshkent',
      date_joined: '2024-03-05T13:20:00Z'
    },
    driver: mockUsers[2],
    score: 4,
    comment: 'Yaxshi xizmat, lekin biroz kechikdi.',
    created_at: '2024-03-21T16:00:00Z'
  }
]

// Mock Flight Tickets
export const mockFlightTickets: FlightTicket[] = [
  {
    id: 1,
    ticket_id: 'FLT-001',
    client: mockUsers[3],
    full_name: 'Bobur Toshmatov',
    phone: '+998903333333',
    passport_number: 'AA1234567',
    passport_photo: 'passport_flight_1.jpg',
    passport_image_url: '/api/media/passport_flight_1.jpg',
    from_location: 'Toshkent',
    to_location: 'Istanbul',
    travel_date: '2024-04-15T08:00:00Z',
    status: 'pending',
    status_display: 'Kutayotgan',
    description: 'Ish safari uchun bilet',
    admin_comment: 'Bilet narxi: 2,500,000 so\'m',
    created_at: '2024-03-20T14:00:00Z',
    updated_at: '2024-03-20T14:00:00Z',
    admin_responded_at: '',
    admin_responded_by: null
  }
]

// Mock Train Tickets
export const mockTrainTickets: TrainTicket[] = [
  {
    id: 1,
    ticket_id: 'TRN-001',
    client: {
      id: 9,
      username: 'client4',
      full_name: 'Marhabo Nurmatova',
      phone: '+998908888888',
      role: 'client',
      balls: 90,
      language: 'uz',
      status: 'active',
      address: 'Qarshi shahri',
      travel_route: 'Qarshi - Toshkent',
      date_joined: '2024-03-12T11:30:00Z'
    },
    full_name: 'Marhabo Nurmatova',
    phone: '+998908888888',
    passport_number: 'BB9876543',
    passport_photo: 'passport_train_1.jpg',
    passport_image_url: '/api/media/passport_train_1.jpg',
    from_location: 'Qarshi',
    to_location: 'Toshkent',
    travel_date: '2024-04-10T20:00:00Z',
    status: 'approved',
    status_display: 'Tasdiqlangan',
    description: 'O\'qish uchun Toshkentga borish',
    admin_comment: 'Bilet narxi: 150,000 so\'m',
    created_at: '2024-03-19T10:15:00Z',
    updated_at: '2024-03-19T15:30:00Z',
    admin_responded_at: '2024-03-19T15:30:00Z',
    admin_responded_by: mockUsers[0]
  }
]

// Mock Statistics
export const mockStatistics: Statistics = {
  total_users: 156,
  total_drivers: 89,
  total_orders: 1247,
  total_payments: 234,
  pending_applications: 3,
  pending_payments: 12,
  total_revenue: 4560000,
  orders_by_category: {
    taxi: 789,
    parcel: 234,
    cargo: 224
  },
  orders_by_status: {
    pending: 45,
    accepted: 1156,
    cancelled: 46
  },
  recent_orders: mockOrders.slice(0, 5),
  recent_payments: mockBallPayments.slice(0, 5)
}

// Mock Ball Pricing
export const mockBallPricing: BallPricing[] = [
  {
    id: 1,
    service_type: 'taxi_parcel',
    service_type_display: 'Taxi / Pasilka',
    base_price: 50000,
    price_per_person: 10000,
    cargo_price_per_ball: 0,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-03-01T12:00:00Z'
  },
  {
    id: 2,
    service_type: 'cargo',
    service_type_display: 'Gruz',
    base_price: 100000,
    price_per_person: 0,
    cargo_price_per_ball: 5000,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-03-01T12:00:00Z'
  }
]

// Mock Payment Cards
export const mockPaymentCards: PaymentCard[] = [
  {
    id: 1,
    card_number: '8600123456789012',
    cardholder_name: 'Aziz Karimov',
    bank_name: 'NBU',
    is_active: true,
    masked_number: '8600 **** **** 9012',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    card_number: '8600987654321098',
    cardholder_name: 'Malika Yusupova',
    bank_name: 'NBU',
    is_active: true,
    masked_number: '8600 **** **** 1098',
    created_at: '2024-02-10T14:20:00Z',
    updated_at: '2024-02-10T14:20:00Z'
  }
]

// Mock data for demo mode
export const getMockData = () => ({
  users: mockUsers,
  driverApplications: mockDriverApplications,
  orders: mockOrders,
  ballPayments: mockBallPayments,
  ratings: mockRatings,
  flightTickets: mockFlightTickets,
  trainTickets: mockTrainTickets,
  statistics: mockStatistics,
  ballPricing: mockBallPricing,
  paymentCards: mockPaymentCards
}) 