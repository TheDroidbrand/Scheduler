import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment variables
DATABASE_URL = os.getenv("SUPABASE_DB_URL")

if not DATABASE_URL:
    # Fallback to individual connection parameters if available
    POSTGRES_USER = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_HOST = os.getenv("POSTGRES_HOST")
    POSTGRES_DATABASE = os.getenv("POSTGRES_DATABASE")
    
    if POSTGRES_USER and POSTGRES_PASSWORD and POSTGRES_HOST and POSTGRES_DATABASE:
        DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:5432/{POSTGRES_DATABASE}"
    else:
        # Try direct Postgres URL if available
        DATABASE_URL = os.getenv("POSTGRES_URL")

if not DATABASE_URL:
    raise ValueError("Database connection information is not available in environment variables")

print(f"Connecting to database at: {DATABASE_URL.split('@')[1]}")

# Create SQLAlchemy engine with SSL mode required for Supabase
engine = create_engine(
    DATABASE_URL, 
    connect_args={"sslmode": "require"},
    pool_pre_ping=True
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
