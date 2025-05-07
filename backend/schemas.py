from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums
class UserRole(str, Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str

class UserCreate(UserBase):
    password: str
    role: UserRole

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: UserRole

class UserResponse(UserBase):
    id: int
    role: UserRole
    created_at: datetime

    class Config:
        orm_mode = True

# Patient schemas
class PatientCreate(BaseModel):
    date_of_birth: Optional[datetime] = None
    phone_number: Optional[str] = None

class PatientResponse(BaseModel):
    id: int
    user: UserResponse
    date_of_birth: Optional[datetime] = None
    phone_number: Optional[str] = None

    class Config:
        orm_mode = True

# Doctor schemas
class DoctorCreate(BaseModel):
    specialty: str
    bio: Optional[str] = None

class DoctorResponse(BaseModel):
    id: int
    user: UserResponse
    specialty: str
    bio: Optional[str] = None

    class Config:
        orm_mode = True

# Appointment schemas
class AppointmentBase(BaseModel):
    date: datetime
    reason: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    doctor_id: int

class AppointmentResponse(AppointmentBase):
    id: int
    patient_id: int
    doctor_id: int
    status: AppointmentStatus
    created_at: datetime

    class Config:
        orm_mode = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None
    role: Optional[UserRole] = None

# Combined schemas for signup
class PatientSignup(UserCreate):
    patient_data: Optional[PatientCreate] = None

class DoctorSignup(UserCreate):
    doctor_data: DoctorCreate
