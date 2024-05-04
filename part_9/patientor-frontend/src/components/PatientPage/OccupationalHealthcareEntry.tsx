import "../../entry.css";

import { OccupationalHealthcareEntryProps } from "../../types";

import { Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

import { getDiagnosisName } from "../../utils";

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryProps) => {
  return (
    <div className="container">
      <Typography variant="subtitle1">
        {entry.date} <WorkIcon /> {entry.employerName}
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <Typography>
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
        Diagnose by {entry.specialist}
      </Typography>
    </div>
  );
};

export default OccupationalHealthcareEntry;
