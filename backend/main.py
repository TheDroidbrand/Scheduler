from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import logging

from . import crud, models, schemas
from .database import engine, get_db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create database tables
try:
    models.Base.metadata.create_all(bind=engine)
    logger.info("Successfully connected to database and created tables")
except Exception as e:
    logger.error(f"Database connection error: {str(e)}")
    raise

app = FastAPI(title="Healthcare Appointment API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Healthcare Appointment API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "connected"}

@app.post("/signup", response_model=schemas.Token)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = crud.get_user_by_email(db, email=user_data.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user = crud.create_user(db=db, user=user_data)
    
    # Create patient or doctor based on role
    if user.role == schemas.UserRole.PATIENT:
        crud.create_patient(db=db, user_id=user.id)
    elif user.role == schemas.UserRole.DOCTOR:
        # For doctors, we need specialty information
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Doctor registration requires specialty information"
        )
    
    # Generate token
    access_token = crud.create_access_token(user_id=user.id, role=user.role)
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/signup/doctor", response_model=schemas.Token)
def signup_doctor(user_data: schemas.DoctorSignup, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = crud.get_user_by_email(db, email=user_data.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user = crud.create_user(db=db, user=user_data)
    
    # Create doctor
    crud.create_doctor(db=db, user_id=user.id, doctor_data=user_data.doctor_data)
    
    # Generate token
    access_token = crud.create_access_token(user_id=user.id, role=user.role)
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/signup/patient", response_model=schemas.Token)
def signup_patient(user_data: schemas.PatientSignup, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = crud.get_user_by_email(db, email=user_data.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user = crud.create_user(db=db, user=user_data)
    
    # Create patient
    crud.create_patient(db=db, user_id=user.id, patient_data=user_data.patient_data)
    
    # Generate token
    access_token = crud.create_access_token(user_id=user.id, role=user.role)
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=schemas.Token)
def login(user_data: schemas.UserLogin, db: Session = Depends(get_db)):
    # Authenticate user
    user = crud.authenticate_user(
        db, 
        email=user_data.email, 
        password=user_data.password,
        role=user_data.role
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email, password, or role",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate token
    access_token = crud.create_access_token(user_id=user.id, role=user.role)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/doctors", response_model=List[schemas.DoctorResponse])
def get_doctors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    doctors = crud.get_all_doctors(db, skip=skip, limit=limit)
    return doctors

@app.post("/appointments", response_model=schemas.AppointmentResponse)
def create_appointment(
    appointment: schemas.AppointmentCreate, 
    user_id: int,  # In a real app, this would come from the token
    db: Session = Depends(get_db)
):
    # Get patient
    patient = crud.get_patient_by_user_id(db, user_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    
    # Create appointment
    return crud.create_appointment(db=db, appointment=appointment, patient_id=patient.id)

@app.get("/appointments/{user_id}", response_model=List[schemas.AppointmentResponse])
def get_user_appointments(
    user_id: int, 
    role: schemas.UserRole,  # In a real app, this would come from the token
    db: Session = Depends(get_db)
):
    appointments = crud.get_user_appointments(db, user_id=user_id, role=role)
    return appointments
