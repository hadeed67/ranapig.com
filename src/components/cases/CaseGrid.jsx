import { CaseCard } from './CaseCard';
import { CASES } from '@/data/cases';
import './CaseGrid.css';

export function CaseGrid({ onOpenCase, disabledCases = [] }) {
  return (
    <div className="case-grid-container">
      <h2 className="section-title">Open Cases</h2>
      <div className="case-grid stagger-animation">
        {CASES.map((caseData) => (
          <div key={caseData.id} className="fade-in-up">
            <CaseCard
              caseData={caseData}
              onOpen={onOpenCase}
              disabled={disabledCases.includes(caseData.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
