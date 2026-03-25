import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Grid3X3, List, Filter } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import PatientCard from '../components/patients/PatientCard';
import PatientRow from '../components/patients/PatientRow';
import './PatientsPage.css';

const STATUS_FILTERS = ['All', 'Active', 'Critical', 'Inactive', 'Recovered'];

export default function PatientsPage() {
  const navigate = useNavigate();
  const { 
    patients, 
    viewMode, 
    setViewMode, 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter 
  } = useAppStore();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filtered = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handlePatientClick = (id: string) => navigate(`/patients/${id}`);

  return (
    <div className="patients animate-fade-in">
      {/* Toolbar */}
      <div className="patients__toolbar glass-card">
        <div className="input-with-icon patients__search">
          <Search size={15} className="input-icon" />
          <input
            id="patient-search"
            type="text"
            className="input-field"
            placeholder="Search by name, ID, condition, doctor…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="patients__toolbar-right">
          <div className="patients__filters">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                className={`patients__filter-btn ${statusFilter === s ? 'patients__filter-btn--active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="patients__view-toggle">
            <button
              id="view-grid"
              className={`patients__view-btn ${viewMode === 'grid' ? 'patients__view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              id="view-list"
              className={`patients__view-btn ${viewMode === 'list' ? 'patients__view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="patients__meta">
        <span>{filtered.length} patient{filtered.length !== 1 ? 's' : ''} found</span>
        {statusFilter !== 'All' && (
          <button className="btn btn-ghost btn-sm" onClick={() => setStatusFilter('All')}>
            Clear filter ✕
          </button>
        )}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid-3 patients__grid">
          {filtered.map((p, i) => (
            <PatientCard 
              key={p.id} 
              patient={p} 
              index={i} 
              onClick={handlePatientClick} 
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="glass-card patients__list">
          <div className="patients__list-header">
            <span>Patient</span>
            <span>Condition</span>
            <span>Doctor</span>
            <span>Last Visit</span>
            <span>Status</span>
            <span></span>
          </div>
          {filtered.map((p, i) => (
            <PatientRow 
              key={p.id} 
              patient={p} 
              index={i} 
              onClick={handlePatientClick} 
            />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="patients__empty glass-card">
          <Filter size={40} color="var(--text-muted)" />
          <h3>No patients found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button className="btn btn-primary btn-sm" onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
