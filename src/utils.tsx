type RoleOption = {
  value: string;
  label: string;
};

type StyleState = {
  isFocused?: boolean;
  isSelected?: boolean;
};

type StyleFn = (
  provided: Record<string, unknown>,
  state: StyleState
) => Record<string, unknown>;

type MultiStyleFn = (provided: Record<string, unknown>) => Record<string, unknown>;

type SelectStyles = {
  control: StyleFn;
  multiValue: MultiStyleFn;
  multiValueLabel: MultiStyleFn;
  multiValueRemove: MultiStyleFn;
  option: StyleFn;
  placeholder: MultiStyleFn;
};

export function getDateFromTimeStamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}

export const customSelectStyles: SelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "50px",
    padding: "2px 6px",
    borderColor: state.isFocused ? "#0d6efd" : "#dee2e6",
    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(13,110,253,.25)" : "none",
    "&:hover": {
      borderColor: "#0d6efd",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: "50px",
    backgroundColor: "rgba(13,110,253,.1)",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#0d6efd",
    fontWeight: 500,
    padding: "2px 6px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#dc3545",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#dc3545",
      color: "white",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#0d6efd"
      : state.isFocused
        ? "rgba(13,110,253,.1)"
        : "white",
    color: state.isSelected ? "white" : "#212529",
    fontWeight: state.isSelected ? 600 : 400,
    cursor: "pointer",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6c757d",
  }),
};

export type { RoleOption };
