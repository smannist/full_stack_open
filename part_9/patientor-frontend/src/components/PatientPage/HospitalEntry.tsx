import "../../entry.css";
import { HospitalEntryProps } from "../../types";

import { Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { getDiagnosisName } from "../../utils";

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div className="container">
      <Typography variant="subtitle1">
        {entry.date} <LocalHospitalIcon />
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

export default HospitalEntry;
