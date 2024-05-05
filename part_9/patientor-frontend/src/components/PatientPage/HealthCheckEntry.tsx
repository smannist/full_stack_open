import "../../entry.css";

import {
  Diagnosis,
  HealthCheckRating,
  HealthCheckEntry as HealthCheckEntryType,
} from "../../types";

import { Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { getDiagnosisName } from "../../utils";

interface Props {
  entry: HealthCheckEntryType;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  const healthIconSelector = (
    healthCheckRating: HealthCheckRating
  ): JSX.Element | null => {
    switch (healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon style={{ color: "green" }} />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon style={{ color: "yellow" }} />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon style={{ color: "orange" }} />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <Typography variant="subtitle1">
        {entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <Typography component="div">
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} - {getDiagnosisName(code, diagnoses)}
              </li>
            ))}
          </ul>
        )}
      </Typography>
      <Typography variant="subtitle1">
        {healthIconSelector(entry.healthCheckRating)}
      </Typography>
      <Typography variant="subtitle1">
        Diagnose by {entry.specialist}
      </Typography>
    </div>
  );
};

export default HealthCheckEntry;
