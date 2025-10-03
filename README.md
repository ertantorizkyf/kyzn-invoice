# KYZN Invoice

A full-stack invoice management application built with React and Node.js that allows users to create invoices, view invoice lists, and analyze revenue data through time series graphs.

## Features

- **Invoice Management**: Create and manage invoices with customer details, products, and payment information
- **Invoice List View**: Browse and search through all created invoices
- **Time Series Revenue Analysis**: Visualize revenue trends over time with interactive charts

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Redux** - State management
- **Recharts** - Data visualization for charts
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **MySQL2** - Database driver
- **CORS** - Cross-origin resource sharing

### Database
- **MySQL 8.0** - Relational database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for frontend

## Project Structure

```
kyzn-invoice/
├── be/                          # Backend application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # Database configuration and connection
│   │   ├── controllers/         # Request handlers
│   │   │   ├── invoiceController.js    # Invoice list and create endpoints
│   │   │   ├── productController.js    # Product search endpoints
│   │   │   └── revenueController.js    # Revenue analytics endpoints
│   │   ├── models/              # Database models
│   │   │   ├── invoiceModel.js         # Invoice data model
│   │   │   ├── invoiceProductModel.js  # Invoice-Product junction model
│   │   │   └── productModel.js         # Product data model
│   │   ├── routes/              # API route definitions
│   │   │   ├── invoiceRoutes.js        # Invoice API routes
│   │   │   ├── productRoutes.js        # Product API routes
│   │   │   └── revenueRoutes.js        # Revenue API routes
│   │   ├── services/            # Business logic layer
│   │   │   ├── invoiceService.js       # Invoice business logic
│   │   │   ├── productService.js       # Product business logic
│   │   │   └── revenueService.js       # Revenue calculation logic
│   │   └── server.js            # Express server entry point
│   ├── package.json             # Backend dependencies
│   └── package-lock.json        # Dependency lock file
├── fe/                          # Frontend application
│   ├── src/
│   │   ├── api/                 # API integration layer
│   │   │   ├── http.js          # Axios configuration
│   │   │   ├── invoiceApi.js    # Invoice API calls
│   │   │   ├── productApi.js    # Product API calls
│   │   │   └── revenueApi.js    # Revenue API calls
│   │   ├── components/          # Reusable UI components
│   │   │   ├── InvoiceCard.jsx         # Invoice display card
│   │   │   ├── InvoiceModal.jsx        # Invoice creation/edit modal
│   │   │   ├── ProductDropdown.jsx     # Product selection dropdown
│   │   │   ├── ProductInput.jsx        # Product input form
│   │   │   ├── RevenueChart.jsx        # Revenue visualization chart
│   │   │   └── SidebarLayout.jsx       # Main layout wrapper
│   │   ├── pages/               # Page components
│   │   │   ├── InvoiceForm.jsx         # Invoice creation page
│   │   │   ├── InvoiceList.jsx         # Invoice listing page
│   │   │   └── TimeSeriesRevenue.jsx   # Revenue analytics page
│   │   ├── redux/               # State management
│   │   │   ├── invoiceListSlice.js     # Invoice list state
│   │   │   ├── invoiceSlice.js         # Invoice form state
│   │   │   ├── productSlice.js         # Product state
│   │   │   ├── revenueSlice.js         # Revenue data state
│   │   │   └── store.js                # Redux store configuration
│   │   ├── utils/               # Utility functions
│   │   │   ├── formatNumber.js         # Number formatting helpers
│   │   │   └── paymentType.js          # Payment type constants
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # Application entry point
│   │   └── styles.css           # Global styles
│   ├── index.html               # HTML template
│   ├── nginx.conf               # Nginx configuration
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration
├── docker/                      # Docker configuration
│   ├── be.Dockerfile            # Backend container definition
│   ├── fe.Dockerfile            # Frontend container definition
│   └── docker-compose.yml       # Multi-container orchestration
├── documentations/              # Project documentation
│   ├── erd.puml                 # Entity Relationship Diagram
│   ├── kyzl.sql                 # Database schema
│   └── KYZN Invoice BE Collection.postman_collection.json  # API documentation
├── Makefile                     # Build and deployment commands
└── README.md                    # This file
```

## Prerequisites

Before running the application, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Node.js** (version 18 or higher) - for local development
- **MySQL** (version 8.0 or higher) - for local development

## Installation & Setup

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kyzn-invoice
   ```

2. **Set up environment variables**
   
   Create `.env` files in both `be/` and `fe/` directories:
   
   **Backend (.env in `be/` directory):**
   ```env
   PORT=5050
   FE_ORIGIN=http://localhost:5051
   DB_HOST=db
   DB_USER=root
   DB_PASS=root
   DB_NAME=kyzn_invoice
   ```
   
   **Frontend (.env in `fe/` directory):**
   ```env
   VITE_FE_PORT=5051
   VITE_API_URL=http://localhost:5050
   ```

3. **Start the application**
   ```bash
   # Start all services (backend, frontend, database)
   make up
   
   # Or using docker-compose directly
   docker-compose -f docker/docker-compose.yml up -d
   ```

4. **Initialize the database**
   
   The database will be automatically created. You can import the schema:
   ```bash
   # Connect to MySQL container
   docker exec -it kyzn-invoice-db mysql -u root -p
   
   # Import the schema
   source /path/to/documentations/kyzl.sql
   ```

### Option 2: Local Development

1. **Set up the database**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE kyzn_invoice;
   
   # Import schema
   mysql -u root -p kyzn_invoice < documentations/kyzl.sql
   ```

2. **Install backend dependencies**
   ```bash
   cd be
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd fe
   npm install
   ```

4. **Start the backend**
   ```bash
   cd be
   npm run dev
   ```

5. **Start the frontend** (in a new terminal)
   ```bash
   cd fe
   npm run dev
   ```

## Running the Application

### Using Docker (Recommended)

```bash
# Start all services
make up

# Stop all services
make down

# Rebuild and restart
make rebuild

# Rebuild and restart without affecting db container
make rebuild-app
```

### Using Local Development

```bash
# Backend (Terminal 1)
cd be
npm run dev

# Frontend (Terminal 2)
cd fe
npm run dev
```

## Accessing the Application

- **Frontend**: http://localhost:5051
- **Backend API**: http://localhost:5050
- **Database**: localhost:3306

## Available Scripts

### Docker Scripts (via Makefile)
- `make up` - Start all services
- `make down` - Stop all services
- `make build` - Build all images
- `make restart` - Restart all services
- `make rebuild` - Clean rebuild everything
- `make rebuild-app` - Rebuild only app services (keep DB)
- `make rebuild-fe` - Rebuild only frontend
- `make rebuild-be` - Rebuild only backend

## API Endpoints

### Products
- `GET /api/products` - Get all products

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create new invoice

### Revenue
- `GET /api/revenues` - Get revenue time series data

## Database Schema

The application uses three main tables:

- **invoices**: Stores invoice header information
- **products**: Stores product catalog
- **invoice_products**: Junction table for invoice line items

See `documentations/kyzl.sql` for the complete schema.

## License

This project is licensed under the MIT License.
