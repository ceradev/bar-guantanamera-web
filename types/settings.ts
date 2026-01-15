export interface WeeklyScheduleItem {
  day: number; // 0 (Domingo) - 6 (Sábado)
  name: string;
  open: string;
  close: string;
  enabled: boolean;
}

export interface PublicSettings {
  orders_enabled: boolean;
  weekly_schedule: WeeklyScheduleItem[];
  prep_time: number;
  store_name: string;
  store_address: string;
  store_phone: string;
}
