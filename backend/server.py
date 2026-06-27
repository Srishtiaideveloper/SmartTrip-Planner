"""
SmartTrip Planner — FastAPI Backend Server

Main application entry point. Configures CORS, registers route modules,
and provides global exception handlers.

Run with:
    uvicorn server:app --reload --port 8000
"""

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from config import FRONTEND_ORIGIN
from routes import auth_routes, trip_routes, dashboard_routes


# ── App Initialization ────────────────────────────────────────────────────────

app = FastAPI(
    title="SmartTrip Planner API",
    description="Backend API for the SmartTrip Planner — an AI-powered sustainable travel planning platform.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# ── CORS Middleware ───────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_ORIGIN,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Global Exception Handlers ────────────────────────────────────────────────

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Return 400 with readable validation error messages."""
    errors = []
    for error in exc.errors():
        field = " → ".join(str(loc) for loc in error["loc"])
        errors.append({"field": field, "message": error["msg"]})
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "detail": "Validation error",
            "errors": errors,
        },
    )


@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    """Custom 404 response."""
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": "The requested resource was not found"},
    )


@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    """Custom 500 response."""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."},
    )


# ── Register Route Modules ───────────────────────────────────────────────────

app.include_router(auth_routes.router)
app.include_router(trip_routes.router)
app.include_router(dashboard_routes.router)


# ── Health Check ──────────────────────────────────────────────────────────────

@app.get(
    "/api/health",
    tags=["Health"],
    summary="Health check endpoint",
    responses={200: {"description": "Server is running"}},
)
def health_check():
    """Return server health status. Used for monitoring and deployment checks."""
    return {
        "status": "healthy",
        "service": "SmartTrip Planner API",
        "version": "1.0.0",
    }


# ── Root Redirect ─────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"], include_in_schema=False)
def root():
    """Root endpoint — redirects to API docs."""
    return {
        "message": "Welcome to SmartTrip Planner API",
        "docs": "/docs",
        "health": "/api/health",
    }
