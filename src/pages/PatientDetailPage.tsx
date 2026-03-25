import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Phone, Mail, MapPin, Heart, Thermometer, Wind,
  Droplets, Activity, User, Calendar, Shield, Pill, FileText, AlertTriangle
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import './PatientDetailPage.css';

function VitalCard({ icon: Icon, label, value, unit, normal, color }: {
  icon: any; label: string; value: number | string; unit: string; normal: string; color: string;
}) {
  return (
    <div className="vital-card glass-card">
      <div className="vital-card__icon" style={{ color, background: `${color}18` }}>
        <Icon size={18} />
      </div>
      <div className="vital-card__value">{value}<span className="vital-card__unit">{unit}</span></div>
      <div className="vital-card__label">{label}</div>
      <div className="vital-card__normal">Normal: {normal}</div>
    </div>
  );
}

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients } = useAppStore();

  const patient = patients.find((p) => p.id === id);
  const idx = patients.findIndex((p) => p.id === id);

  if (!patient) {
    return (
      <div className="patient-detail__not-found glass-card">
        <AlertTriangle size={48} color="var(--warning)" />
        <h2>Patient Not Found</h2>
        <p>No patient with ID #{id} exists.</p>
        <button className="btn btn-primary" onClick={() => navigate('/patients')}>
          Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="patient-detail animate-fade-in">
      {/* Breadcrumb */}
      <button className="btn btn-ghost btn-sm patient-detail__back" onClick={() => navigate('/patients')}>
        <ArrowLeft size={16} /> Back to Patients
      </button>

      {/* Hero */}
      <div className="glass-card patient-detail__hero">
        <div className="patient-detail__hero-left">
          <Avatar label={patient.avatar} size="xl" index={idx} />
          <div>
            <div className="patient-detail__name-row">
              <h1 className="patient-detail__name">{patient.name}</h1>
              <Badge status={patient.status} />
            </div>
            <p className="patient-detail__sub">
              #{patient.id} · {patient.age} years · {patient.gender} · Blood: {patient.bloodType}
            </p>
            <p className="patient-detail__condition">{patient.condition}</p>
            <div className="patient-detail__contacts">
              <span><Phone size={13} /> {patient.phone}</span>
              <span><Mail size={13} /> {patient.email}</span>
              <span><MapPin size={13} /> {patient.address}</span>
            </div>
          </div>
        </div>

        <div className="patient-detail__hero-right">
          <div className="patient-detail__meta-grid">
            {[
              { icon: Calendar, label: 'Last Visit', value: patient.lastVisit },
              { icon: Calendar, label: 'Next Appointment', value: patient.nextAppointment },
              { icon: User, label: 'Attending Doctor', value: patient.doctor },
              { icon: Activity, label: 'Department', value: patient.department },
              { icon: Shield, label: 'Insurance', value: patient.insurance },
              { icon: Calendar, label: 'Admission Date', value: patient.admissionDate },
            ].map((item, i) => (
              <div key={i} className="patient-detail__meta-item">
                <item.icon size={14} />
                <div>
                  <span className="patient-detail__meta-label">{item.label}</span>
                  <span className="patient-detail__meta-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vitals */}
      <div>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Current Vitals</h2>
        <div className="grid-4">
          <VitalCard icon={Heart} label="Heart Rate" value={patient.vitals.heartRate} unit=" bpm" normal="60–100" color="#ef4444" />
          <VitalCard icon={Activity} label="Blood Pressure" value={patient.vitals.bloodPressure} unit=" mmHg" normal="120/80" color="#6366f1" />
          <VitalCard icon={Thermometer} label="Temperature" value={patient.vitals.temperature} unit="°F" normal="98.6°F" color="#f59e0b" />
          <VitalCard icon={Wind} label="O₂ Saturation" value={patient.vitals.oxygenSat} unit="%" normal="95–100%" color="#06b6d4" />
          <VitalCard icon={Droplets} label="Weight" value={patient.vitals.weight} unit=" kg" normal="BMI 18.5–24.9" color="#10b981" />
          <VitalCard icon={User} label="Height" value={patient.vitals.height} unit=" cm" normal="—" color="#8b5cf6" />
        </div>
      </div>

      {/* Medical history + Medications */}
      <div className="grid-2">
        <div className="glass-card patient-detail__section">
          <div className="patient-detail__section-header">
            <FileText size={18} color="var(--primary-light)" />
            <h2 className="section-title">Medical History</h2>
          </div>
          <ul className="patient-detail__list">
            {patient.medicalHistory.map((item) => (
              <li key={item} className="patient-detail__list-item">
                <span className="patient-detail__list-dot" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card patient-detail__section">
          <div className="patient-detail__section-header">
            <Pill size={18} color="var(--secondary)" />
            <h2 className="section-title">Current Medications</h2>
          </div>
          <ul className="patient-detail__list">
            {patient.medications.map((med) => (
              <li key={med} className="patient-detail__list-item">
                <span className="patient-detail__list-dot" style={{ background: 'var(--secondary)' }} />
                {med}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="patient-detail__actions">
        <button className="btn btn-primary">Schedule Appointment</button>
        <button className="btn btn-secondary">Edit Patient Record</button>
        <button className="btn btn-secondary">Download Report</button>
        <button className="btn btn-danger">Mark Critical</button>
      </div>
    </div>
  );
}
