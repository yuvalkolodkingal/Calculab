import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Modal from './components/Modal';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import { calculatorPanels, referenceContent } from './utils/calculatorConfig';

// Import all calculator components
import MolarMassCalculator from './calculators/MolarMassCalculator';
import PercentSolutionCalculator from './calculators/PercentSolutionCalculator';
import MolalityCalculator from './calculators/MolalityCalculator';
import OsmolarityCalculator from './calculators/OsmolarityCalculator';
import HendersonHasselbalchCalculator from './calculators/HendersonHasselbalchCalculator';
import C1V1Calculator from './calculators/C1V1Calculator';
import SerialDilutionCalculator from './calculators/SerialDilutionCalculator';
import FlowDilutionCalculator from './calculators/FlowDilutionCalculator';
import MgLToPpmCalculator from './calculators/MgLToPpmCalculator';
import MassToMolarCalculator from './calculators/MassToMolarCalculator';
import MolarToMassCalculator from './calculators/MolarToMassCalculator';
import BeerLambertCalculator from './calculators/BeerLambertCalculator';
import NAQuantCalculator from './calculators/NAQuantCalculator';
import PurityRatioCalculator from './calculators/PurityRatioCalculator';
import ProteinA280Calculator from './calculators/ProteinA280Calculator';
import BradfordCalculator from './calculators/BradfordCalculator';
import HemocytometerCalculator from './calculators/HemocytometerCalculator';
import SeedingVolumeCalculator from './calculators/SeedingVolumeCalculator';
import SplitRatioCalculator from './calculators/SplitRatioCalculator';
import CFUCalculator from './calculators/CFUCalculator';
import EnzymeActivityCalculator from './calculators/EnzymeActivityCalculator';
import PCRMasterMixCalculator from './calculators/PCRMasterMixCalculator';
import PrimerReconstitutionCalculator from './calculators/PrimerReconstitutionCalculator';
import DeltaCtCalculator from './calculators/DeltaCtCalculator';
import DeltaDeltaCtCalculator from './calculators/DeltaDeltaCtCalculator';
import FoldChangeCalculator from './calculators/FoldChangeCalculator';
import PfafflCalculator from './calculators/PfafflCalculator';
import StandardCurveCalculator from './calculators/StandardCurveCalculator';
import EfficiencyFromSlopeCalculator from './calculators/EfficiencyFromSlopeCalculator';
import CopyNumberCalculator from './calculators/CopyNumberCalculator';
import CopyNumberFromMassCalculator from './calculators/CopyNumberFromMassCalculator';
import AmplificationEfficiencyCalculator from './calculators/AmplificationEfficiencyCalculator';
import BeadCountCalculator from './calculators/BeadCountCalculator';
import RPMToRCFCalculator from './calculators/RPMToRCFCalculator';
import RCFToRPMCalculator from './calculators/RCFToRPMCalculator';
import BasicStatsCalculator from './calculators/BasicStatsCalculator';
import MichaelisMentenCalculator from './calculators/MichaelisMentenCalculator';
import DNAReverseComplementCalculator from './calculators/DNAReverseComplementCalculator';
import BatchCalculator from './calculators/BatchCalculator';

// Map calculator IDs to their components
const calculatorComponents = {
  molarMass: MolarMassCalculator,
  percentSolution: PercentSolutionCalculator,
  molality: MolalityCalculator,
  osmolarity: OsmolarityCalculator,
  hendersonHasselbalch: HendersonHasselbalchCalculator,
  c1v1: C1V1Calculator,
  serialDilution: SerialDilutionCalculator,
  flowDilution: FlowDilutionCalculator,
  mgLToPpm: MgLToPpmCalculator,
  massToMolar: MassToMolarCalculator,
  molarToMass: MolarToMassCalculator,
  beerLambert: BeerLambertCalculator,
  naQuant: NAQuantCalculator,
  purityRatio: PurityRatioCalculator,
  proteinA280: ProteinA280Calculator,
  bradford: BradfordCalculator,
  hemocytometer: HemocytometerCalculator,
  seedingVolume: SeedingVolumeCalculator,
  splitRatio: SplitRatioCalculator,
  cfu: CFUCalculator,
  enzymeActivity: EnzymeActivityCalculator,
  pcrMasterMix: PCRMasterMixCalculator,
  primerReconstitution: PrimerReconstitutionCalculator,
  deltaCt: DeltaCtCalculator,
  deltaDeltaCt: DeltaDeltaCtCalculator,
  foldChange: FoldChangeCalculator,
  pfaffl: PfafflCalculator,
  standardCurve: StandardCurveCalculator,
  efficiencyFromSlope: EfficiencyFromSlopeCalculator,
  copyNumber: CopyNumberCalculator,
  copyNumberFromMass: CopyNumberFromMassCalculator,
  amplificationEfficiency: AmplificationEfficiencyCalculator,
  beadCount: BeadCountCalculator,
  rpmToRcf: RPMToRCFCalculator,
  rcfToRpm: RCFToRPMCalculator,
  basicStats: BasicStatsCalculator,
  michaelisMenten: MichaelisMentenCalculator,
  dnaReverseComplement: DNAReverseComplementCalculator,
  batchCalculator: BatchCalculator,
};

/**
 * Core App component that sets up routing, handles active calculator/reference modal state,
 * manages the global status bar, and maps panel configurations to calculators.
 * 
 * @returns {React.JSX.Element} The root application shell with routing
 */
function App() {
  const [activeCalculator, setActiveCalculator] = useState(null);
  const [activeReference, setActiveReference] = useState(null);
  const [status, setStatus] = useState({
    message: 'Status & Instructions: Select a calculator to begin',
    color: 'black',
  });
  
  const navigate = useNavigate();

  /**
   * Updates the global status bar message and color.
   * 
   * @param {string} message - Status message to display in the status bar
   * @param {string} [color='black'] - Color code (hex or color name) for the status text
   * @returns {void}
   */
  const updateStatus = (message, color = 'black') => {
    setStatus({ message, color });
  };

  /**
   * Opens the specified calculator and updates status bar instructions.
   * 
   * @param {string} calculatorId - CamelCase ID of the calculator component to open
   * @returns {void}
   */
  const openCalculator = (calculatorId) => {
    updateStatus(`Status: Opening ${calculatorId} calculator...`, 'blue');
    setActiveCalculator(calculatorId);
  };

  /**
   * Closes the active calculator modal and resets the status bar.
   * 
   * @returns {void}
   */
  const closeCalculator = () => {
    setActiveCalculator(null);
    updateStatus('Status & Instructions: Ready for calculations');
  };

  /**
   * Opens the specified reference modal and updates status bar.
   * 
   * @param {string} refId - ID of the reference sheet to open
   * @returns {void}
   */
  const openReference = (refId) => {
    setActiveReference(refId);
    updateStatus(`Status: Displayed ${refId}`, 'green');
  };

  /**
   * Closes the active reference modal and resets the status bar.
   * 
   * @returns {void}
   */
  const closeReference = () => {
    setActiveReference(null);
    updateStatus('Status & Instructions: Ready for calculations');
  };

  /**
   * Resets the status bar to default instructions.
   * 
   * @returns {void}
   */
  const clearStatus = () => {
    updateStatus('Status & Instructions: Ready for calculations');
  };

  /**
   * Dynamically renders the active calculator component based on activeCalculator state.
   * Passes the required onClose and onStatusUpdate props to conform to the calculator contract.
   * 
   * @returns {React.JSX.Element|null} The rendered calculator component or null if none active
   */
  const renderCalculator = () => {
    if (!activeCalculator) return null;

    const CalculatorComponent = calculatorComponents[activeCalculator];

    if (CalculatorComponent) {
      return (
        <CalculatorComponent
          onClose={closeCalculator}
          onStatusUpdate={updateStatus}
        />
      );
    }

    return (
      <div>
        <div className="error">Calculator '{activeCalculator}' not yet implemented</div>
        <div className="button-group">
          <button className="btn btn-secondary" onClick={closeCalculator}>
            Close
          </button>
        </div>
      </div>
    );
  };

  /**
   * Retrieves the human-readable display name of the currently active calculator.
   * 
   * @returns {string} The display name of the active calculator, or 'Calculator' as a fallback
   */
  const getCalculatorTitle = () => {
    for (const panel of calculatorPanels) {
      for (const calc of panel.calculators) {
        if (calc.id === activeCalculator) {
          return calc.name;
        }
      }
    }
    return 'Calculator';
  };

  /**
   * Check if the application is running in an installed Progressive Web App (PWA) context.
   * Standalone display-mode matches either native media query or iOS specific navigator property.
   * 
   * @returns {boolean} True if running as standalone PWA
   */
  const isPWA = useCallback(() => {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
  }, []);

  /**
   * Handles click events on the header logo.
   * Navigates back to the landing page, except when running in standalone PWA mode.
   * 
   * @returns {void}
   */
  const handleLogoClick = useCallback(() => {
    // Navigate to landing page in browser, but not when running as installed PWA
    if (!isPWA()) {
      navigate('/');
    }
  }, [isPWA, navigate]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage onEnterApp={() => navigate('/app')} />} />
        <Route path="/app" element={
        <div className="container">
          <div className="header">
            <h1>
              <img 
                src="/logo.svg" 
                alt="CalcuLab logo" 
                className="logo" 
                onClick={handleLogoClick}
                style={{ cursor: isPWA() ? 'default' : 'pointer' }}
              />
              <span>CalcuLab</span>
            </h1>
            <p>Molecular Biology &amp; Biochemistry Tools</p>
          </div>

          <div className="panels-container">
            {calculatorPanels.map((panel, index) => (
              <div className="panel" key={index}>
                <h3>{panel.title}</h3>
                {panel.calculators.map((calc) => (
                  <button
                    key={calc.id}
                    className="calc-button"
                    onClick={() =>
                      calc.isReference ? openReference(calc.id) : openCalculator(calc.id)
                    }
                  >
                    {calc.name}
                  </button>
                ))}
                {panel.title === 'Utilities & Help' && (
                  <button className="calc-button" onClick={clearStatus}>
                    Clear Status
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="status-bar" style={{ color: status.color }}>
            {status.message}
          </div>

          {/* Calculator Modal */}
          <Modal
            isOpen={!!activeCalculator}
            onClose={closeCalculator}
            title={getCalculatorTitle()}
          >
            {renderCalculator()}
          </Modal>

          {/* Reference Modal */}
          <Modal
            isOpen={!!activeReference}
            onClose={closeReference}
            title={referenceContent[activeReference]?.title || 'Reference'}
          >
            {activeReference && referenceContent[activeReference] && (
              <div className="result">
                <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'inherit' }}>
                  {referenceContent[activeReference].content}
                </pre>
              </div>
            )}
          </Modal>
        </div>
      } />
    </Routes>
    </>
  );
}

export default App;
