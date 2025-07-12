from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, Session, create_engine
from pydantic import BaseModel
from typing import Optional
import uuid

# ---------- DATABASE SETUP ----------

DATABASE_URL = "sqlite:///./patients.db"
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

# ---------- MODELS ----------

class Patient(SQLModel, table=True):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    email: str
    phone: str
    address: str

class PatientCreate(BaseModel):
    name: str
    email: str
    phone: str
    address: str

# ---------- FASTAPI APP ----------

app = FastAPI()

# ✅ Add this block
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or set specific origins like ["http://localhost:8081"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/register-patient")
def register_patient(
    data: PatientCreate,
    session: Session = Depends(get_session)
):
    patient = Patient(**data.dict())
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return {"patient_id": patient.id, "message": "Patient registered successfully"}

@app.get("/patients")
def get_all_patients(session: Session = Depends(get_session)):
    patients = session.query(Patient).all()
    return patients
