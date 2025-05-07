from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime
import bcrypt
import jwt
from typing import List, Optional

from . import models, schemas

# JWT settings
SECRET_KEY = "your-secret-key"  # In production, use a secure environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# User operations
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    # Hash the password
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Create user
    db_user = models.User(
        email=user.email,
        password_hash=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(plain_password: str, hashed_password: str):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def authenticate_user(db: Session, email: str, password: str, role: schemas.UserRole):
    user = get_user_by_email(db, email)
    if not user or user.role != role:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user

def create_access_token(user_id: int, role: str):
    # In a real app, you would include expiration time
    payload = {"sub": str(user_id), "role": role}
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Patient operations
def create_patient(db: Session, user_id: int, patient_data: Optional[schemas.PatientCreate] = None):
    db_patient = models.Patient(user_id=user_id)
    
    if patient_data:
        if patient_data.date_of_birth:
            db_patient.date_of_birth = patient_data.date_of_birth
        if patient_data.phone_number:
            db_patient.phone_number = patient_data.phone_number
    
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def get_patient_by_user_id(db: Session, user_id: int):
    return db.query(models.Patient).filter(models.Patient.user_id == user_id).first()

# Doctor operations
def create_doctor(db: Session, user_id: int, doctor_data: schemas.DoctorCreate):
    db_doctor = models.Doctor(
        user_id=user_id,
        specialty=doctor_data.specialty,
        bio=doctor_data.bio
    )
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

def get_doctor_by_user_id(db: Session, user_id: int):
    return db.query(models.Doctor).filter(models.Doctor.user_id == user_id).first()

def get_all_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Doctor).offset(skip).limit(limit).all()

# Appointment operations
def create_appointment(db: Session, appointment: schemas.AppointmentCreate, patient_id: int):
    db_appointment = models.Appointment(
        patient_id=patient_id,
        doctor_id=appointment.doctor_id,
        date=appointment.date,
        reason=appointment.reason,
        status=models.AppointmentStatus.PENDING
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def get_user_appointments(db: Session, user_id: int, role: schemas.UserRole):
    if role == schemas.UserRole.PATIENT:
        patient = get_patient_by_user_id(db, user_id)
        if not patient:
            return []
        return db.query(models.Appointment).filter(models.Appointment.patient_id == patient.id).all()
    else:  # DOCTOR
        doctor = get_doctor_by_user_id(db, user_id)
        if not doctor:
            return []
        return db.query(models.Appointment).filter(models.Appointment.doctor_id == doctor.id).all()
