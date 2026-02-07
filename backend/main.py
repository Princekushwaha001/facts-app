from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="Facts API",
    description="A simple API that returns interesting facts",
    version="1.0.0"
)

# Configure CORS - Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hardcoded facts data
facts_data = [
    {"id": 1, "fact": "The sun is a star."},
    {"id": 2, "fact": "Water boils at 100°C."},
    {"id": 3, "fact": "Earth has one moon."},
    {"id": 4, "fact": "Honey never spoils."},
    {"id": 5, "fact": "A day on Venus is longer than its year."},
    {"id": 6, "fact": "Bananas are berries, but strawberries aren't."},
    {"id": 7, "fact": "Octopuses have three hearts."},
    {"id": 8, "fact": "The Eiffel Tower can grow taller in summer."},
]

# Facts endpoint - Main requirement
@app.get("/")
def get_facts():
    """
    Returns a list of interesting facts
    """
    return facts_data

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}