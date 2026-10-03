export const GAME = {
  width: 816,
  height: 624,
  playerSpeed: 145,
  interactionDistance: 78,
  saveKey: 'school_time_save_v3',
} as const;

export type Gender = 'ชาย' | 'หญิง';
export type ClassroomId = 'ป.2/1' | 'ป.2/2';
export type Direction = 'down' | 'left' | 'right' | 'up';

export interface StudentSave {
  version: 3;
  name: string;
  gender: Gender;
  room: ClassroomId;
  x: number;
  y: number;
  direction: Direction;
  xp: number;
  level: number;
  firstVisit: boolean;
}

export const CLASS_DATA: Record<ClassroomId, readonly string[]> = {
  'ป.2/1': ['นัท', 'มิน', 'ฟ้า', 'ต้น', 'ใบหม่อน', 'พีท', 'ข้าวปั้น', 'น้ำ', 'ปัน', 'พลอย', 'ภูมิ', 'มายด์', 'ก้อง', 'อิง', 'เจมส์', 'แพรว', 'บีม'],
  'ป.2/2': ['ไอซ์', 'นนท์', 'พิม', 'เต้', 'มะลิ', 'ภู', 'ออม', 'กาย', 'ฟ้าใส', 'เจเจ', 'เพลง', 'ไนซ์', 'ขิม', 'บอส', 'แนน', 'โอม'],
};

export const DESKS = [
  [205, 250], [385, 250], [565, 250], [745, 250],
  [205, 355], [385, 355], [565, 355], [745, 355],
  [205, 460], [385, 460], [565, 460], [745, 460],
  [205, 565], [385, 565], [565, 565], [745, 565],
  [385, 650],
] as const;
