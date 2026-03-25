import { Phone, Calendar } from 'lucide-react';
import type { Patient } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface PatientCardProps {
  patient: Patient;
  index: number;
  onClick: (id: string) => void;
}

export default function PatientCard({ patient, index, onClick }: PatientCardProps) {
  return (
    <div
      className="glass-card patient-card animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onClick(patient.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(patient.id)}
    >
      <div className="patient-card__top">
        <Avatar label={patient.avatar} size="md" index={index} />
        <div className="patient-card__info">
          <h3 className="patient-card__name">{patient.name}</h3>
          <span className="patient-card__id">#{patient.id}</span>
        </div>
        <Badge status={patient.status} />
      </div>

      <div className="patient-card__details">
        <div className="patient-card__detail">
          <span className="patient-card__detail-label">Condition</span>
          <span className="patient-card__detail-value">{patient.condition}</span>
        </div>
        <div className="patient-card__detail">
          <span className="patient-card__detail-label">Doctor</span>
          <span className="patient-card__detail-value">{patient.doctor}</span>
        </div>
        <div className="patient-card__detail">
          <span className="patient-card__detail-label">Department</span>
          <span className="patient-card__detail-value">{patient.department}</span>
        </div>
        <div className="patient-card__detail">
          <span className="patient-card__detail-label">Age / Blood</span>
          <span className="patient-card__detail-value">{patient.age}y / {patient.bloodType}</span>
        </div>
      </div>

      <div className="patient-card__footer">
        <div className="patient-card__contact">
          <Phone size={12} />
          <span>{patient.phone}</span>
        </div>
        <div className="patient-card__next">
          <Calendar size={12} />
          <span>{patient.nextAppointment}</span>
        </div>
      </div>
    </div>
  );
}
