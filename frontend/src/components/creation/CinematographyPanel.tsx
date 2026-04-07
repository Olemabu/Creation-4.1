import { CameraMovement, ShotType } from "../../types/creation";

interface Props {
  shotType: ShotType;
  cameraMovement: CameraMovement;
  onShotTypeChange: (s: ShotType) => void;
  onCameraMovementChange: (c: CameraMovement) => void;
}

const SHOT_TYPES = [
  { value: ShotType.WIDE, label: "Wide", icon: "WS" },
  { value: ShotType.MEDIUM, label: "Medium", icon: "MS" },
  { value: ShotType.CLOSE_UP, label: "Close Up", icon: "CU" },
  { value: ShotType.EXTREME_CLOSE_UP, label: "XCU", icon: "XCU" },
];

const CAMERA_GROUPS = [
  { label: "Zoom", moves: [
    { value: CameraMovement.ZOOM_IN, label: "Zoom In", icon: "Z+" },
    { value: CameraMovement.ZOOM_OUT, label: "Zoom Out", icon: "Z-" },
    { value: CameraMovement.ZOOM_TO_CENTER, label: "Center", icon: "ZC" },
  ]},
  { label: "Pan", moves: [
    { value: CameraMovement.PAN_LEFT, label: "Left", icon: "<" },
    { value: CameraMovement.PAN_RIGHT, label: "Right", icon: ">" },
    { value: CameraMovement.PAN_UP, label: "Up", icon: "^" },
    { value: CameraMovement.PAN_DOWN, label: "Down", icon: "v" },
    { value: CameraMovement.PAN_UP_LEFT, label: "UL", icon: "UL" },
    { value: CameraMovement.PAN_UP_RIGHT, label: "UR", icon: "UR" },
    { value: CameraMovement.PAN_DOWN_LEFT, label: "DL", icon: "DL" },
    { value: CameraMovement.PAN_DOWN_RIGHT, label: "DR", icon: "DR" },
  ]},
  { label: "Dynamic", moves: [
    { value: CameraMovement.TILT_UP, label: "Tilt Up", icon: "TU" },
    { value: CameraMovement.TILT_DOWN, label: "Tilt Down", icon: "TD" },
    { value: CameraMovement.SHAKE, label: "Shake", icon: "SH" },
    { value: CameraMovement.STATIC, label: "Static", icon: "ST" },
  ]},
];

export function CinematographyPanel({ shotType, cameraMovement, onShotTypeChange, onCameraMovementChange }: Props) {
  return (
    <div className="flex flex-col gap-4 text-white">
      <div>
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Shot Type</div>
        <div className="grid grid-cols-4 gap-1">
          {SHOT_TYPES.map(s => (
            <button key={s.value} onClick={() => onShotTypeChange(s.value)}
              className={"flex flex-col items-center py-2 px-1 rounded-lg text-xs transition-colors " + (shotType === s.value ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700")}>
              <span className="font-bold mb-0.5 text-xs">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Camera Movement</div>
        <div className="flex flex-col gap-2">
          {CAMERA_GROUPS.map(group => (
            <div key={group.label}>
              <div className="text-xs text-gray-600 mb-1">{group.label}</div>
              <div className="flex flex-wrap gap-1">
                {group.moves.map(move => (
                  <button key={move.value} onClick={() => onCameraMovementChange(move.value)} title={move.label}
                    className={"w-9 h-9 rounded text-xs font-bold transition-colors " + (cameraMovement === move.value ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700")}>
                    {move.icon}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
     }
