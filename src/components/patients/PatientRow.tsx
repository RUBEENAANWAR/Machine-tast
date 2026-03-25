import { ChevronRight } from 'lucide-react';
import type { Patient } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface PatientRowProps {
  patient: Patient;
  index: number;
  onClick: (id: string) => void;
}

export default function PatientRow({ patient, index, onClick }: PatientRowProps) {
  return (
    <div
      className="patients__list-row animate-fade-in"
      style={{ animationDelay: `${index * 0.03}s` }}
      onClick={() => onClick(patient.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(patient.id)}
    >
      <div className="patients__list-patient">
        <Avatar label={patient.avatar} size="sm" index={index} />
        <div>
          <div className="patients__list-name">{patient.name}</div>
          <div className="patients__list-sub">#{patient.id} · {patient.age}y · {patient.gender}</div>
        </div>
      </div>
      <div>
        <div className="patients__list-condition">{patient.condition}</div>
        <div className="patients__list-sub">{patient.department}</div>
      </div>
      <div className="patients__list-doctor">{patient.doctor}</div>
      <div className="patients__list-date">{patient.lastVisit}</div>
      <div><Badge status={patient.status} /></div>
      <div className="patients__list-arrow"><ChevronRight size={16} /></div>
    </div>
  );
}
